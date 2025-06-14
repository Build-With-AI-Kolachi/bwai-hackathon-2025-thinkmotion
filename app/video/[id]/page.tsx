"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Share2, ThumbsUp, Clock, Wand2, Copy, Check } from "lucide-react"
import Link from "next/link"
import VideoPlayer from "@/components/video-player"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import GenerationChat from "@/components/generation-chat"

export default function VideoPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)

  // In a real app, you would fetch this data based on the video ID
  const videoData = {
    id: params.id,
    title: "Understanding Fourier Transforms",
    prompt:
      "Create a video explaining Fourier transforms with visual examples showing how complex signals can be broken down into simpler sine waves. Include animations of the circular motion representation.",
    videoUrl: "/placeholder.svg?height=720&width=1280",
    duration: "4:32",
    createdAt: "2023-05-05T14:30:00Z",
    options: {
      topic: "Calculus",
      complexity: "Intermediate",
      duration: "5 minutes",
      style: "3Blue1Brown",
      narration: "None",
    },
    manimCode: `from manim import *

class FourierCirclesScene(Scene):
    def construct(self):
        self.camera.background_color = "#111111"
        
        # Add title
        title = Text("Understanding Fourier Transforms", font="Arial")
        title.to_edge(UP)
        self.play(Write(title))
        
        # Create axes
        axes = Axes(
            x_range=[-1, 5, 1],
            y_range=[-1.5, 1.5, 1],
            axis_config={"color": BLUE}
        )
        axes_labels = axes.get_axis_labels(x_label="t", y_label="f(t)")
        
        # Create a sine wave
        sine_wave = axes.plot(lambda x: np.sin(2 * PI * x), color=YELLOW)
        sine_label = Text("Original Signal", font="Arial", font_size=24)
        sine_label.next_to(sine_wave, UP)
        
        self.play(Create(axes), Create(axes_labels))
        self.play(Create(sine_wave), Write(sine_label))
        
        # Show Fourier decomposition
        circles = VGroup()
        dots = VGroup()
        for n in range(1, 5):
            circle = Circle(radius=1/n, color=BLUE_E)
            circle.move_to(axes.c2p(n, 0))
            
            dot = Dot(color=RED)
            dot.move_to(circle.point_from_proportion(0))
            
            circles.add(circle)
            dots.add(dot)
        
        self.play(Create(circles))
        self.play(Create(dots))
        
        # Animate the Fourier transform
        self.play(
            *[
                Rotating(
                    dots[i], 
                    about_point=circles[i].get_center(),
                    rate_func=linear,
                    run_time=5,
                    radians=TAU * (i+1)
                )
                for i in range(len(circles))
            ]
        )
        
        # Conclusion
        conclusion = Text("Fourier transforms decompose signals into frequency components", 
                          font="Arial", font_size=24)
        conclusion.to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2)`,
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-full"></div>
            <span className="text-xl font-bold">MathMotion</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-300 hover:text-white pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        {/* Video title and actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{videoData.title}</h1>
            <div className="flex items-center mt-2 text-gray-400 text-sm">
              <Clock className="h-4 w-4 mr-1" /> {videoData.duration}
              <span className="mx-2">•</span>
              <span>Generated on {formatDate(videoData.createdAt)}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={() => setLiked(!liked)}
                  >
                    <ThumbsUp className={`h-5 w-5 ${liked ? "text-blue-400 fill-blue-400" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{liked ? "Unlike" : "Like"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Download className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video player and details */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl overflow-hidden mb-6">
              <VideoPlayer videoUrl={videoData.videoUrl} />
            </div>

            <Tabs defaultValue="details" className="mb-6">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="details" className="data-[state=active]:bg-gray-700">
                  Details
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-gray-700">
                  Manim Code
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Options</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Topic</h4>
                      <p className="text-white">{videoData.options.topic}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Complexity</h4>
                      <p className="text-white">{videoData.options.complexity}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Duration</h4>
                      <p className="text-white">{videoData.options.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Style</h4>
                      <p className="text-white">{videoData.options.style}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Narration</h4>
                      <p className="text-white">{videoData.options.narration}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Generated Manim Code</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={() => copyToClipboard(videoData.manimCode)}
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" /> Copy Code
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-sm">
                      <code>{videoData.manimCode}</code>
                    </pre>
                  </div>
                  <div className="mt-4 text-gray-400 text-sm">
                    <p>
                      This code uses the Manim library to create the animation. You can run it locally if you have Manim
                      installed.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Generation Chat Interface */}
            <div className="mt-6">
              <GenerationChat initialPrompt={videoData.prompt} videoId={videoData.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related videos */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Related Videos</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Visualizing Complex Numbers",
                    duration: "3:45",
                    thumbnail: "/placeholder.svg?height=90&width=160",
                    complexity: "Intermediate",
                  },
                  {
                    title: "Wave Equations Explained",
                    duration: "5:12",
                    thumbnail: "/placeholder.svg?height=90&width=160",
                    complexity: "Advanced",
                  },
                  {
                    title: "Introduction to Signal Processing",
                    duration: "6:30",
                    thumbnail: "/placeholder.svg?height=90&width=160",
                    complexity: "Intermediate",
                  },
                ].map((video, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 px-1 text-xs rounded">{video.duration}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                      <Badge variant="outline" className="mt-1 bg-blue-900/30 text-blue-300 border-blue-700 text-xs">
                        {video.complexity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Try another prompt */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Try Another Prompt</h3>
              <p className="text-gray-300 mb-4">Generate a new educational math video with a different concept.</p>
              <div className="space-y-3">
                {[
                  "Explain the concept of eigenvalues and eigenvectors with visual examples",
                  "Create a video about the Mandelbrot set and how it relates to complex numbers",
                  "Visualize the fundamental theorem of calculus",
                ].map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    <span className="truncate text-left">{prompt}</span>
                  </Button>
                ))}
              </div>
              <Separator className="my-4 bg-gray-700" />
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Create Custom Video
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-6 h-6 rounded-full"></div>
            <span className="text-lg font-bold text-white">MathMotion</span>
          </div>
          <p>© {new Date().getFullYear()} MathMotion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
