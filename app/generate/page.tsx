"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Wand2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [options, setOptions] = useState({
    topic: "Calculus",
    complexity: "Intermediate",
    duration: 5,
    style: "3Blue1Brown",
    narration: "None",
  })

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // if (!session) {
  //   router.push("/api/auth/signin")
  //   return null
  // }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          options,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/video/${data.videoId}`)
      } else {
        alert("Failed to generate video: " + data.error)
      }
    } catch (error) {
      console.error("Error generating video:", error)
      alert("Failed to generate video")
    } finally {
      setIsGenerating(false)
    }
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
            <span className="text-gray-300">Welcome, {session?.user?.name}</span>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white"
              onClick={() => router.push("/api/auth/signout")}
            >
              Sign Out
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

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-900/50 text-blue-200 hover:bg-blue-900/70">
            AI Video Generator
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Generate Your Educational Video
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Describe the mathematical concept you want to visualize, and our AI will create a beautiful Manim animation for you.
          </p>
        </div>

        {/* Generation Form */}
        <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">
            What math concept would you like to visualize?
          </h2>
          
          <div className="mb-6">
            <Input
              placeholder="Explain the concept of Fourier transforms with visual examples showing how complex signals can be broken down into simpler sine waves..."
              className="bg-gray-800 border-gray-700 text-white text-lg p-4 h-auto min-h-[100px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <Tabs defaultValue="options" className="mb-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger
                value="options"
                className="data-[state=active]:bg-gray-700"
              >
                Options
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-gray-700"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="options" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Topic
                  </label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    value={options.topic}
                    onChange={(e) => setOptions({...options, topic: e.target.value})}
                    disabled={isGenerating}
                  >
                    <option>Calculus</option>
                    <option>Linear Algebra</option>
                    <option>Probability</option>
                    <option>Statistics</option>
                    <option>Number Theory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Complexity
                  </label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    value={options.complexity}
                    onChange={(e) => setOptions({...options, complexity: e.target.value})}
                    disabled={isGenerating}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration: {options.duration} min
                  </label>
                  <div className="px-2">
                    <Slider
                      value={[options.duration]}
                      onValueChange={(value) => setOptions({...options, duration: value[0]})}
                      max={15}
                      step={1}
                      className="my-4"
                      disabled={isGenerating}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>1 min</span>
                      <span>15 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Animation Style
                  </label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    value={options.style}
                    onChange={(e) => setOptions({...options, style: e.target.value})}
                    disabled={isGenerating}
                  >
                    <option>3Blue1Brown</option>
                    <option>Minimalist</option>
                    <option>Colorful</option>
                    <option>Detailed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Narration
                  </label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    value={options.narration}
                    onChange={(e) => setOptions({...options, narration: e.target.value})}
                    disabled={isGenerating}
                  >
                    <option>None</option>
                    <option>Male Voice</option>
                    <option>Female Voice</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-3"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Video
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 