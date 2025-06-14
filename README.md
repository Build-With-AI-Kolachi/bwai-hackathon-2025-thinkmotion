# MathMotion - AI Educational Video Generator

A platform similar to v0.dev but focused on generating educational math videos using AI and Manim, inspired by 3Blue1Brown's style.

## Features

- 🤖 AI-powered video generation using Google Gemini
- 🎥 Beautiful mathematical animations with Manim
- 🔐 Google OAuth authentication
- 💾 Video storage with Cloudinary
- 📱 Modern dark UI with gradients
- 💰 Freemium model support

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with Google Provider
- **AI**: Google Gemini API
- **File Storage**: Cloudinary
- **Animation**: Manim (Mathematical Animation Engine)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd ai-video-generator
npm install
```

### 2. Environment Variables

Copy the example environment file and fill in your API keys:

```bash
cp env.example .env.local
```

Fill in the following variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mathmotion?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Gemini AI (Get from Google AI Studio)
GEMINI_API_KEY="your-gemini-api-key"

# Cloudinary (Get from Cloudinary Dashboard)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### 3. Database Setup

Set up your PostgreSQL database and run Prisma migrations:

```bash
npm run db:generate
npm run db:push
```

### 4. API Keys Setup

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

#### Google Gemini API:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env.local`

#### Cloudinary:
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your `.env.local`

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Sign In**: Use Google OAuth to authenticate
2. **Generate Video**: Click "Get Started" and describe the math concept you want to visualize
3. **Customize**: Choose topic, complexity, duration, and style options
4. **Generate**: AI will create Manim code and generate the video
5. **View & Share**: Watch your generated video and share with others

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── generate-video/ # Video generation endpoint
│   │   ├── video/          # Video data endpoints
│   │   └── videos/         # User videos endpoint
│   ├── generate/           # Video generation page
│   ├── video/[id]/         # Individual video page
│   └── page.tsx            # Landing page
├── components/             # React components
├── lib/                   # Utility libraries
├── prisma/                # Database schema
└── public/                # Static assets
```

## MVP Features (Hackathon Ready)

This is an MVP built for hackathons with the following core features:

- ✅ User authentication with Google
- ✅ AI-powered Manim code generation
- ✅ Video generation simulation (placeholder videos)
- ✅ Modern dark UI with gradients
- ✅ Video storage and retrieval
- ✅ User dashboard and video management

## Future Enhancements

- [ ] Actual Manim video rendering
- [ ] Real-time video generation status
- [ ] Video editing capabilities
- [ ] Community features and sharing
- [ ] Advanced AI prompting
- [ ] Multiple export formats
- [ ] Voice narration integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
