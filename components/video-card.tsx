import { Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface VideoCardProps {
  title: string
  duration: string
  thumbnail: string
  complexity: string
}

export default function VideoCard({ title, duration, thumbnail, complexity }: VideoCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="relative">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={350}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blue-500 rounded-full p-3">
            <Play className="h-8 w-8" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-sm">{duration}</div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">
            {complexity}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <span>Generated with MathMotion</span>
        </div>
      </div>
    </div>
  )
}
