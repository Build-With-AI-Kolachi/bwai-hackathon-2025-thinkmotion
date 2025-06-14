"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

// Demo data for quick showcase
const demoManimCode = `from manim import *

class FourierTransformDemo(Scene):
    def construct(self):
        self.camera.background_color = "#111111"
        
        # Title
        title = Text("Fourier Transform Visualization", font_size=36, color=WHITE)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Create axes
        axes = Axes(
            x_range=[-4, 4, 1],
            y_range=[-2, 2, 1],
            axis_config={"color": BLUE}
        )
        
        # Original signal
        signal = axes.plot(
            lambda x: np.sin(2*PI*x) + 0.5*np.sin(4*PI*x),
            color=YELLOW
        )
        
        signal_label = Text("Complex Signal", font_size=24, color=YELLOW)
        signal_label.next_to(signal, UP)
        
        self.play(Create(axes))
        self.play(Create(signal), Write(signal_label))
        self.wait(1)
        
        # Decomposition
        component1 = axes.plot(lambda x: np.sin(2*PI*x), color=RED)
        component2 = axes.plot(lambda x: 0.5*np.sin(4*PI*x), color=GREEN)
        
        comp1_label = Text("Component 1", font_size=20, color=RED)
        comp2_label = Text("Component 2", font_size=20, color=GREEN)
        
        comp1_label.to_edge(LEFT).shift(UP*2)
        comp2_label.to_edge(LEFT).shift(UP*1)
        
        self.play(
            Transform(signal, component1),
            Write(comp1_label)
        )
        self.wait(1)
        
        self.play(
            Create(component2),
            Write(comp2_label)
        )
        self.wait(2)`

export default function DemoButton() {
  const showDemo = () => {
    // Store demo data in sessionStorage
    const demoData = {
      success: true,
      manimCode: demoManimCode,
      title: "Fourier Transform Visualization Demo",
      prompt: "Create a video explaining Fourier transforms with visual examples showing how complex signals can be broken down into simpler sine waves.",
      options: {
        topic: "Calculus",
        complexity: "Intermediate",
        duration: 5,
        style: "3Blue1Brown",
        narration: "None"
      },
      message: "Demo Manim code generated successfully"
    }
    
    sessionStorage.setItem('generatedVideo', JSON.stringify(demoData))
    window.location.href = '/results'
  }

  return (
    <Button
      size="lg"
      variant="outline"
      className="border-gray-700 text-gray-300 hover:bg-gray-800"
      onClick={showDemo}
    >
      View Demo <Play className="ml-2 h-4 w-4" />
    </Button>
  )
} 