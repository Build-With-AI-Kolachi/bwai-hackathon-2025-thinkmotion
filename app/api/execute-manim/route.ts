import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { manimCode, title } = await request.json()

    if (!manimCode) {
      return NextResponse.json(
        { error: 'Manim code is required' },
        { status: 400 }
      )
    }

    // Create a unique filename
    const timestamp = Date.now()
    const filename = `video_${timestamp}`
    const pythonFile = path.join(process.cwd(), 'temp', `${filename}.py`)
    const outputDir = path.join(process.cwd(), 'public', 'videos')

    // Ensure directories exist
    await fs.mkdir(path.dirname(pythonFile), { recursive: true })
    await fs.mkdir(outputDir, { recursive: true })

    // Write the Manim code to a Python file
    await fs.writeFile(pythonFile, manimCode)

    console.log('Executing Manim code...')
    
    // Execute Manim to generate the video
    const { stdout, stderr } = await execAsync(
      `cd ${path.dirname(pythonFile)} && manim -pql ${filename}.py --output_file ${filename} --media_dir ${outputDir}`,
      { timeout: 60000 } // 60 second timeout
    )

    console.log('Manim stdout:', stdout)
    if (stderr) console.log('Manim stderr:', stderr)

    // Find the generated video file
    const videoFiles = await fs.readdir(outputDir, { recursive: true })
    const videoFile = videoFiles.find(file => 
      typeof file === 'string' && 
      file.includes(filename) && 
      (file.endsWith('.mp4') || file.endsWith('.mov'))
    )

    if (!videoFile) {
      throw new Error('Video file not found after generation')
    }

    const videoPath = `/videos/${videoFile}`

    // Clean up the temporary Python file
    try {
      await fs.unlink(pythonFile)
    } catch (error) {
      console.warn('Could not delete temporary file:', error)
    }

    return NextResponse.json({
      success: true,
      videoUrl: videoPath,
      message: 'Video generated successfully'
    })

  } catch (error: any) {
    console.error('Error executing Manim:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate video',
        details: error.message,
        stderr: error.stderr || ''
      },
      { status: 500 }
    )
  }
} 