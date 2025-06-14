import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const video = await prisma.video.findFirst({
      where: {
        id: params.id,
        // userId: (session.user as any)?.id ?? "demo-user",
      },
      select: {
        id: true,
        status: true,
        videoUrl: true,
        thumbnailUrl: true,
        duration: true,
        updatedAt: true,
      },
    })

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: video.id,
      status: video.status,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration,
      lastUpdated: video.updatedAt,
    })
  } catch (error) {
    console.error('Error fetching video status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video status' },
      { status: 500 }
    )
  }
} 