# 🚀 MathMotion - Hackathon Quick Setup

## ⚡ Quick Start (5 minutes)

### 1. Environment Setup
```bash
# Your .env.local is already created, just fill in the values:
# - DATABASE_URL (from Railway/Supabase)
# - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET (Google Cloud Console)
# - GEMINI_API_KEY (Google AI Studio)
# - CLOUDINARY credentials (Cloudinary Dashboard)
# - NEXTAUTH_SECRET is already generated: 6119fec4343dd122471267b3510d7148c703acec3e5ee2bc07367ae1622cd9b9
```

### 2. Database Setup
```bash
npm run db:push    # Push schema to your database
```

### 3. Verify Setup
```bash
npm run setup:check    # Check if all environment variables are set
```

### 4. Install Manim (for Real Video Generation)
```bash
npm run setup:manim    # Automated Manim installation
```

### 5. Start Development
```bash
npm run dev    # Server runs on http://localhost:3000
```

## 🔑 API Keys Quick Links

| Service | Link | What to Copy |
|---------|------|--------------|
| **Google OAuth** | [Console](https://console.cloud.google.com/) | Client ID + Secret |
| **Gemini AI** | [AI Studio](https://makersuite.google.com/app/apikey) | API Key |
| **Cloudinary** | [Dashboard](https://cloudinary.com/) | Cloud Name + API Key + Secret |
| **Database** | [Railway](https://railway.app) or [Supabase](https://supabase.com) | Connection String |

## 🎯 Demo Flow

1. **Landing Page** → Click "Get Started"
2. **Sign In** → Google OAuth
3. **Generate Page** → Enter math concept prompt
4. **Video Page** → View generated video + Manim code
5. **Chat Interface** → Refine the video

## 🛠 Troubleshooting

### Common Issues:
- **Auth not working?** → Check Google OAuth redirect URI: `http://localhost:3000/api/auth/callback/google`
- **Database errors?** → Run `npm run db:push` after setting DATABASE_URL
- **AI not generating?** → Verify GEMINI_API_KEY is valid
- **Videos not loading?** → Check Cloudinary credentials

### Debug Commands:
```bash
npm run setup:check    # Verify all environment variables
npm run setup:manim    # Install/check Manim installation
npm run db:generate    # Regenerate Prisma client
npm run lint          # Check for code issues
```

## 🎨 Features Ready to Demo

✅ **Landing Page** - Modern dark UI with gradients  
✅ **Authentication** - Google OAuth integration  
✅ **AI Generation** - Gemini-powered Manim code creation  
✅ **Video Management** - Save and view generated videos  
✅ **Chat Interface** - Refine videos with AI  
✅ **Responsive Design** - Works on all devices  

## 🚀 Deployment Ready

The app is configured for easy deployment to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**

Just connect your GitHub repo and set the environment variables!

---

**Need help?** Check the main README.md for detailed setup instructions.

**Hackathon Tip:** Focus on the user experience - the AI generation and beautiful UI will impress judges! 🏆 