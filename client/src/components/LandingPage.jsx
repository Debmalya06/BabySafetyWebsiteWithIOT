import { Link } from "react-router-dom"
import { Shield, Heart, Brain } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 relative z-10">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">BabyCare AI</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-purple-300 transition-colors">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Transform Your Baby's
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {" "}
            Safety with AI Power
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Advanced IoT sensors combined with AI technology to monitor your baby's safety, detect emotions, and provide
          intelligent feeding recommendations in real-time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Start Monitoring
          </Link>
          <button className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Intelligent Baby Monitoring Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <Shield className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Object Detection</h3>
            <p className="text-gray-300">
              Real-time AI-powered object detection with automatic emergency alerts to parents when potential hazards
              are detected near your baby.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <Heart className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Emotion Detection</h3>
            <p className="text-gray-300">
              Advanced emotion recognition to understand your baby's feelings and provide insights into their comfort
              and well-being.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <Brain className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Smart Feeding</h3>
            <p className="text-gray-300">
              Intelligent feeding tracker with AI analysis to determine crying reasons and provide personalized feeding
              recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* IoT Sensors Section */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Advanced IoT Sensor Network</h2>
            <p className="text-gray-300 mb-8">
              Our comprehensive sensor system monitors your baby's environment 24/7 with precision and reliability.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white">Temperature & Humidity Sensors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white">Motion Detection Sensors</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white">Sound & Cry Detection</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-white">Air Quality Monitoring</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="IoT Sensors Dashboard"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
            <div className="text-gray-300">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-300">Monitoring</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
            <div className="text-gray-300">Happy Parents</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">5★</div>
            <div className="text-gray-300">User Rating</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-purple-400" />
              <span className="text-xl font-bold text-white">BabyCare AI</span>
            </div>
            <div className="text-gray-400">© 2024 BabyCare AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage