"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, Clock, User, BookOpen, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"

interface GeneratedVideo {
  success: boolean
  manimCode: string
  title: string
  prompt: string
  options: {
    topic: string
    complexity: string
    duration: number
    style: string
    narration: string
  }
  message: string
}

type VideoStatus = 'loading' | 'generating' | 'ready' | 'error'

export default function ResultsPage() {
  const [videoData, setVideoData] = useState<GeneratedVideo | null>(null)
  const [videoStatus, setVideoStatus] = useState<VideoStatus>('loading')
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem('generatedVideo')
    if (data) {
      const parsedData = JSON.parse(data)
      setVideoData(parsedData)
      generateVideo(parsedData)
    }
  }, [])

  const generateVideo = async (data: GeneratedVideo) => {
    try {
      setVideoStatus('generating')
      setError(null)

      const response = await fetch('/api/execute-manim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          manimCode: data.manimCode,
          title: data.title
        })
      })

      const result = await response.json()

      if (result.success) {
        setVideoUrl(result.videoUrl)
        setVideoStatus('ready')
      } else {
        throw new Error(result.error || 'Failed to generate video')
      }
    } catch (err: any) {
      console.error('Error generating video:', err)
      setError(err.message || 'Failed to generate video')
      setVideoStatus('error')
    }
  }

  if (!videoData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No video data found</h1>
          <Link href="/generate">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
              Generate New Video
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const renderVideoPlayer = () => {
    switch (videoStatus) {
      case 'loading':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-400" />
              <p className="text-gray-400">Loading...</p>
            </div>
          </div>
        )
      
      case 'generating':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Generating Video</h3>
              <p className="text-gray-400">Executing Manim code and rendering your video...</p>
              <p className="text-sm text-gray-500 mt-2">This may take 30-60 seconds</p>
            </div>
          </div>
        )
      
      case 'error':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-semibold mb-2 text-red-400">Generation Failed</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <Button 
                onClick={() => generateVideo(videoData)}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Try Again
              </Button>
            </div>
          </div>
        )
      
      case 'ready':
        return videoUrl ? (
          <video
            controls
            className="w-full h-full object-contain"
            poster="/placeholder-video-poster.jpg"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Video ready but URL not available</p>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-700"></div>
              <h1 className="text-xl font-semibold">{videoData.title}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-700"
                disabled={videoStatus !== 'ready'}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-500 to-purple-600"
                disabled={videoStatus !== 'ready'}
                onClick={() => videoUrl && window.open(videoUrl, '_blank')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-t-lg overflow-hidden">
                  {renderVideoPlayer()}
                </div>
              </CardContent>
            </Card>

            {/* Video Description */}
            <Card className="bg-gray-900 border-gray-800 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span>About This Video</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  {videoData.prompt}
                </p>
                <div className="flex items-center space-x-6 mt-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{videoData.options.duration} minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{videoData.options.style} Style</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Generation Status */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Generation Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {videoStatus === 'generating' && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      <span className="text-blue-400">Generating...</span>
                    </>
                  )}
                  {videoStatus === 'ready' && (
                    <>
                      <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400">Ready</span>
                    </>
                  )}
                  {videoStatus === 'error' && (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-400">Failed</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Generation Details */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Generation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">Topic</label>
                  <p className="text-white">{videoData.options.topic}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Complexity</label>
                  <p className="text-white">{videoData.options.complexity}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Style</label>
                  <p className="text-white">{videoData.options.style}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Duration</label>
                  <p className="text-white">{videoData.options.duration} minutes</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={videoStatus !== 'ready'}
                  onClick={() => videoUrl && window.open(videoUrl, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Video
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700"
                  disabled={videoStatus !== 'ready'}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Video
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700"
                  onClick={() => {
                    navigator.clipboard.writeText(videoData.manimCode)
                  }}
                >
                  Copy Manim Code
                </Button>
              </CardContent>
            </Card>

            {/* Generate Another */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Create Another Video</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Generate more educational content with AI
                </p>
                <Link href="/generate">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Generate New Video
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 