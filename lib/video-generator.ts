import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const execAsync = promisify(exec);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface VideoGenerationResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  error?: string;
}

export class VideoGenerator {
  private tempDir: string;

  constructor() {
    this.tempDir = path.join(process.cwd(), 'temp');
  }

  async generateVideo(manimCode: string, videoId: string): Promise<VideoGenerationResult> {
    try {
      // Ensure temp directory exists
      await this.ensureTempDir();

      // Create Python file with the Manim code
      const pythonFilePath = path.join(this.tempDir, `${videoId}.py`);
      await fs.writeFile(pythonFilePath, manimCode);

      // Execute Manim to generate video
      const outputDir = path.join(this.tempDir, 'media');
      const command = `manim -pql ${pythonFilePath} --output_file ${videoId}`;
      
      console.log(`Executing Manim command: ${command}`);
      
      const { stdout, stderr } = await execAsync(command, {
        cwd: this.tempDir,
        timeout: 120000, // 2 minutes timeout
      });

      console.log('Manim stdout:', stdout);
      if (stderr) console.log('Manim stderr:', stderr);

      // Find the generated video file
      const videoPath = await this.findGeneratedVideo(outputDir, videoId);
      
      if (!videoPath) {
        throw new Error('Generated video file not found');
      }

      // Upload to Cloudinary
      const uploadResult = await this.uploadToCloudinary(videoPath, videoId);

      // Clean up temporary files
      await this.cleanup(pythonFilePath, videoPath);

      return {
        success: true,
        videoUrl: uploadResult.secure_url,
        thumbnailUrl: uploadResult.secure_url.replace(/\.[^/.]+$/, ".jpg"), // Generate thumbnail URL
        duration: await this.getVideoDuration(uploadResult.duration),
      };

    } catch (error) {
      console.error('Video generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async ensureTempDir(): Promise<void> {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  private async findGeneratedVideo(outputDir: string, videoId: string): Promise<string | null> {
    try {
      const files = await fs.readdir(outputDir, { recursive: true });
      
      // Look for video files (mp4, mov, etc.)
      const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
      
      for (const file of files) {
        const filePath = String(file);
        if (videoExtensions.some(ext => filePath.toLowerCase().endsWith(ext))) {
          return path.join(outputDir, filePath);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error finding generated video:', error);
      return null;
    }
  }

  private async uploadToCloudinary(videoPath: string, videoId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        videoPath,
        {
          resource_type: 'video',
          public_id: `mathmotion/videos/${videoId}`,
          folder: 'mathmotion',
          quality: 'auto',
          format: 'mp4',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  private async cleanup(...filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.warn(`Failed to cleanup file ${filePath}:`, error);
      }
    }
  }

  private async getVideoDuration(durationSeconds?: number): Promise<string> {
    if (!durationSeconds) return '0:00';
    
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Check if Manim is installed
  static async checkManimInstallation(): Promise<boolean> {
    try {
      await execAsync('manim --version');
      return true;
    } catch {
      return false;
    }
  }

  // Install Manim (for development setup)
  static async installManim(): Promise<void> {
    console.log('Installing Manim...');
    try {
      await execAsync('pip install manim');
      console.log('Manim installed successfully');
    } catch (error) {
      console.error('Failed to install Manim:', error);
      throw new Error('Manim installation failed. Please install manually: pip install manim');
    }
  }
} 