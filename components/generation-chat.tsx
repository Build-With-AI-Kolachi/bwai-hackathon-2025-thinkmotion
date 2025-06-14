"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Wand2, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface GenerationChatProps {
  initialPrompt: string
  videoId: string
}

export default function GenerationChat({ initialPrompt, videoId }: GenerationChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-prompt",
      content: initialPrompt,
      sender: "user",
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    },
    {
      id: "initial-response",
      content: `I've generated a video explaining Fourier transforms with visual examples. The video includes:

1. An introduction to the concept
2. Animations showing how complex signals break down into sine waves
3. Circular motion representation of Fourier transforms
4. Practical applications

You can view the video above. Would you like me to make any adjustments to the explanation or visuals?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response (would connect to actual AI in production)
    setTimeout(() => {
      let responseContent = ""

      // Simple pattern matching for demo purposes
      if (inputValue.toLowerCase().includes("longer") || inputValue.toLowerCase().includes("extend")) {
        responseContent = `I can extend the video to include more detailed explanations. Would you like me to:

1. Add more examples of Fourier transforms in real-world applications
2. Include a deeper mathematical explanation of the formulas
3. Add more visualizations of different signals being decomposed

Let me know which aspects you'd like to expand on, and I'll regenerate the video with those additions.`
      } else if (
        inputValue.toLowerCase().includes("simpler") ||
        inputValue.toLowerCase().includes("beginner") ||
        inputValue.toLowerCase().includes("easier")
      ) {
        responseContent = `I'll simplify the explanation to make it more beginner-friendly. I'll:

1. Use more basic terminology
2. Add step-by-step breakdowns of each concept
3. Include more intuitive analogies
4. Slow down the pace of the animations

I'll regenerate the video with these changes. It should be much more accessible for beginners.`
      } else if (inputValue.toLowerCase().includes("color") || inputValue.toLowerCase().includes("visual")) {
        responseContent = `I can enhance the visuals of the video. Would you like me to:

1. Use a different color scheme (perhaps more vibrant colors)
2. Add more visual cues to highlight important concepts
3. Include additional diagrams or illustrations
4. Improve the transitions between scenes

Let me know your preferences, and I'll update the video accordingly.`
      } else {
        responseContent = `Thanks for your feedback. I can modify the video based on your request. Would you like me to:

1. Focus more on the mathematical foundations
2. Add more practical examples
3. Change the pacing of the explanations
4. Adjust the visual style

Let me know what specific changes you'd like, and I'll regenerate the video to better match your needs.`
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleRegenerate = () => {
    setIsRegenerating(true)

    // Simulate regeneration process
    setTimeout(() => {
      setIsRegenerating(false)

      // Add a system message about regeneration
      const systemMessage: Message = {
        id: `regenerate-${Date.now()}`,
        content: "Video has been regenerated based on your feedback. The new version is now available above.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, systemMessage])
    }, 3000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Wand2 className="h-5 w-5 mr-2 text-blue-200" />
          <h3 className="font-bold text-white">Generation Chat</h3>
          <Badge className="ml-2 bg-blue-500/30 text-blue-200 border-blue-400">Video #{videoId}</Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-blue-400 bg-blue-500/20 text-blue-100 hover:bg-blue-500/30"
          onClick={handleRegenerate}
          disabled={isRegenerating}
        >
          {isRegenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Regenerating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" /> Regenerate Video
            </>
          )}
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="h-[400px] p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                  {message.sender === "user" ? (
                    <User className="h-5 w-5 text-gray-300" />
                  ) : (
                    <Bot className="h-5 w-5 text-blue-300" />
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100 border border-gray-600"
                  }`}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-200" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-row">
                <Avatar className="h-8 w-8 mr-2">
                  <Bot className="h-5 w-5 text-blue-300" />
                </Avatar>
                <div className="bg-gray-700 text-gray-100 rounded-lg p-3 border border-gray-600">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Provide feedback or request changes to the video..."
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
