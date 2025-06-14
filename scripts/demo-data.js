#!/usr/bin/env node

// Demo data seeder for testing
// Run with: node scripts/demo-data.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const demoVideos = [
  {
    title: "Understanding Fourier Transforms",
    prompt: "Create a video explaining Fourier transforms with visual examples showing how complex signals can be broken down into simpler sine waves.",
    manimCode: `from manim import *

class FourierTransformScene(Scene):
    def construct(self):
        self.camera.background_color = "#111111"
        
        title = Text("Fourier Transforms", font="Arial", font_size=48)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Create a complex wave
        axes = Axes(x_range=[-2, 2, 0.5], y_range=[-2, 2, 0.5])
        wave = axes.plot(lambda x: np.sin(2*PI*x) + 0.5*np.sin(4*PI*x), color=YELLOW)
        
        self.play(Create(axes))
        self.play(Create(wave))
        self.wait(2)`,
    videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
    duration: "3:45",
    status: "COMPLETED",
    options: {
      topic: "Calculus",
      complexity: "Intermediate",
      duration: "5 minutes",
      style: "3Blue1Brown",
      narration: "None"
    }
  },
  {
    title: "Visualizing Eigenvalues",
    prompt: "Explain eigenvalues and eigenvectors with geometric transformations and visual examples.",
    manimCode: `from manim import *

class EigenvalueScene(Scene):
    def construct(self):
        self.camera.background_color = "#111111"
        
        title = Text("Eigenvalues & Eigenvectors", font="Arial", font_size=48)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Create matrix transformation
        plane = NumberPlane()
        vector = Arrow(ORIGIN, [2, 1, 0], color=RED)
        
        self.play(Create(plane))
        self.play(Create(vector))
        self.wait(2)`,
    videoUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
    duration: "4:20",
    status: "COMPLETED",
    options: {
      topic: "Linear Algebra",
      complexity: "Advanced",
      duration: "5 minutes",
      style: "3Blue1Brown",
      narration: "None"
    }
  }
];

async function seedDemoData() {
  console.log('🌱 Seeding demo data...');
  
  try {
    // Note: This would normally require a user ID
    // For demo purposes, you'd need to create a user first or modify this
    console.log('Demo videos ready to be added to database');
    console.log('Videos:', demoVideos.length);
    
    console.log('✅ Demo data prepared');
    console.log('💡 To use: Create a user account first, then modify this script with the user ID');
    
  } catch (error) {
    console.error('❌ Error seeding demo data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedDemoData();
}

module.exports = { demoVideos }; 