import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Code, Play, Video, Wand2 } from "lucide-react";
import Link from "next/link";
import VideoCard from "@/components/video-card";
import FeatureCard from "@/components/feature-card";
import PricingCard from "@/components/pricing-card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-full"></div>
            <span className="text-xl font-bold">MathMotion</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </Link>
            <Link
              href="#examples"
              className="text-gray-300 hover:text-white transition"
            >
              Examples
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition"
            >
              Pricing
            </Link>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-900/50 text-blue-200 hover:bg-blue-900/70">
              Powered by AI + Manim
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              Generate Educational Math Videos with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Create stunning 3Blue1Brown-style animations and explanations with
              just a prompt. No coding required.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
              <Link href="/generate">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Watch Demo <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Prompt Input */}
          <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              What math concept would you like to visualize?
            </h2>
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Explain the concept of Fourier transforms with visual examples..."
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Link href="/generate">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 min-w-[120px]">
                  Generate <Wand2 className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="options">
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
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white">
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
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Duration
                    </label>
                    <div className="px-2">
                      <Slider
                        defaultValue={[5]}
                        max={15}
                        step={1}
                        className="my-4"
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
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white">
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
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white">
                      <option>None</option>
                      <option>Male Voice</option>
                      <option>Female Voice</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From prompt to polished educational video in minutes, not days
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Wand2 className="h-10 w-10 text-blue-400" />}
              title="1. Enter Your Prompt"
              description="Describe the mathematical concept you want to explain. Be as detailed or as brief as you like."
            />
            <FeatureCard
              icon={<Code className="h-10 w-10 text-purple-400" />}
              title="2. AI Generates Manim Code"
              description="Our AI translates your prompt into Manim code, handling all the complex animation logic."
            />
            <FeatureCard
              icon={<Video className="h-10 w-10 text-blue-400" />}
              title="3. Render Beautiful Video"
              description="The code is executed to create a high-quality educational video ready to share or download."
            />
          </div>

          <div className="mt-16 text-center">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Example Videos Section */}
      <section id="examples" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Example Videos</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what our AI can create with the power of Manim
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VideoCard
              title="Understanding Euler's Identity"
              duration="4:32"
              thumbnail="/placeholder.svg?height=200&width=350"
              complexity="Intermediate"
            />
            <VideoCard
              title="Visualizing Vector Calculus"
              duration="7:15"
              thumbnail="/placeholder.svg?height=200&width=350"
              complexity="Advanced"
            />
            <VideoCard
              title="Introduction to Eigenvalues"
              duration="5:48"
              thumbnail="/placeholder.svg?height=200&width=350"
              complexity="Intermediate"
            />
          </div>

          <div className="mt-16 text-center">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              View More Examples <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your educational video needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Starter"
              price="$9"
              description="Perfect for beginners and casual users"
              features={[
                "5 videos per month",
                "720p video quality",
                "Basic animation styles",
                "Email support",
              ]}
              buttonText="Get Started"
              popular={false}
            />
            <PricingCard
              title="Pro"
              price="$29"
              description="For educators and content creators"
              features={[
                "30 videos per month",
                "1080p video quality",
                "Advanced animation styles",
                "Narration options",
                "Priority rendering",
                "Priority support",
              ]}
              buttonText="Get Pro"
              popular={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For institutions and large teams"
              features={[
                "Unlimited videos",
                "4K video quality",
                "Custom animation styles",
                "API access",
                "Dedicated support",
                "Custom integrations",
              ]}
              buttonText="Contact Us"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-full"></div>
                <span className="text-xl font-bold">MathMotion</span>
              </div>
              <p className="text-gray-400">
                Creating beautiful math explanations with AI and Manim.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MathMotion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
