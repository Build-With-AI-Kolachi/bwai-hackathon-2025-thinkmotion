import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { VideoGenerator } from "@/lib/video-generator";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { prompt, options } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Simplified version - no database storage for hackathon demo
    // Generate Manim code using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const manimPrompt = `
You are an expert in creating educational math videos using the Manim library (Mathematical Animation Engine). 
Generate Python code using Manim that creates a beautiful, educational animation based on this prompt: "${prompt}"

Requirements:
1. Use Manim's latest syntax and best practices
2. Create visually appealing animations similar to 3Blue1Brown style
3. Include proper scene setup with dark background (#111111)
4. Use appropriate colors (blues, yellows, whites for contrast)
5. Add smooth transitions and animations
6. Include text explanations where appropriate
7. Make the animation educational and easy to follow
8. The code should be complete and runnable
9. Duration should be around 30-60 seconds

Please provide only the Python code without any explanations or markdown formatting.
Start with the imports and end with the scene class.
`;

    const result = await model.generateContent(manimPrompt);
    const manimCode = result.response.text();

    // Return the generated code directly for immediate display
    return NextResponse.json({
      success: true,
      manimCode: manimCode,
      title: prompt.slice(0, 100) + (prompt.length > 100 ? "..." : ""),
      prompt: prompt,
      options: options,
      message: "Manim code generated successfully",
    });

    // COMMENTED OUT: Database and video generation for hackathon simplicity
    /*
    // Create video record in database
    const video = await prisma.video.create({
      data: {
        title: prompt.slice(0, 100) + (prompt.length > 100 ? "..." : ""),
        prompt,
        options,
        // userId: (session?.user as any)?.id ?? "demo-user",
        status: "GENERATING",
      },
    });

    // Update video with generated code
    await prisma.video.update({
      where: { id: video.id },
      data: { manimCode },
    });

    // Generate actual video from Manim code
    setImmediate(async () => {
      try {
        console.log(`Starting video generation for ${video.id}`);
        
        const videoGenerator = new VideoGenerator();
        const result = await videoGenerator.generateVideo(manimCode, video.id);

        if (result.success) {
          await prisma.video.update({
            where: { id: video.id },
            data: {
              status: "COMPLETED",
              videoUrl: result.videoUrl,
              thumbnailUrl: result.thumbnailUrl,
              duration: result.duration,
            },
          });
          console.log(`Video generation completed for ${video.id}`);
        } else {
          await prisma.video.update({
            where: { id: video.id },
            data: { 
              status: "FAILED",
            },
          });
          console.error(`Video generation failed for ${video.id}:`, result.error);
        }
      } catch (error) {
        console.error(`Video generation error for ${video.id}:`, error);
        await prisma.video.update({
          where: { id: video.id },
          data: { status: "FAILED" },
        });
      }
    });

    return NextResponse.json({
      success: true,
      videoId: video.id,
      message: "Video generation started",
    });
    */
  } catch (error) {
    console.error("Error generating video:", error);
    return NextResponse.json(
      { error: "Failed to generate video" },
      { status: 500 }
    );
  }
}
