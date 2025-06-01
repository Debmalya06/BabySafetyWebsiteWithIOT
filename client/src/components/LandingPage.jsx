import { Link } from "react-router-dom"
import { Shield, Heart, Camera, Brain, Phone, Baby } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Baby className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SmartBaby Monitor</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Baby <span className="text-blue-600">Monitoring</span> System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced IoT-powered baby monitoring with AI object detection, emotion analysis, and intelligent feeding
            management for complete peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advanced Baby Monitoring Features</h2>
            <p className="text-xl text-gray-600">Comprehensive IoT solution with AI-powered monitoring and analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Object Detection */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Object Detection</h3>
              <p className="text-gray-600">
                Real-time AI-powered object detection around baby's surface with instant emergency alerts to parents.
              </p>
            </div>

            {/* Emotion Detection */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emotion Analysis</h3>
              <p className="text-gray-600">
                Advanced emotion detection to understand baby's mood and crying patterns with AI analysis.
              </p>
            </div>

            {/* Emergency Alerts */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Calls</h3>
              <p className="text-gray-600">
                Automatic emergency calls to parents when potential dangers are detected around the baby.
              </p>
            </div>

            {/* IoT Sensors */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">IoT Sensors</h3>
              <p className="text-gray-600">
                Temperature, humidity, and gas detection sensors for complete environmental monitoring.
              </p>
            </div>

            {/* Feeding Management */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Feeding Schedule</h3>
              <p className="text-gray-600">
                Comprehensive feeding management with health tracking and AI-powered cry analysis.
              </p>
            </div>

            {/* Health Monitoring */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Baby className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Health Tracking</h3>
              <p className="text-gray-600">
                Monitor baby's health conditions and get insights on crying reasons through AI analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple setup, powerful monitoring, intelligent analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Setup IoT Sensors</h3>
              <p className="text-gray-600">
                Install temperature, humidity, and gas detection sensors in baby's room for environmental monitoring.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Monitoring</h3>
              <p className="text-gray-600">
                Our AI models continuously monitor for objects and analyze baby's emotions and crying patterns.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Alerts</h3>
              <p className="text-gray-600">
                Receive instant notifications and emergency calls when attention is needed for your baby's safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Baby className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">SmartBaby Monitor</span>
            </div>
            <p className="text-gray-400 mb-4">Advanced IoT-powered baby monitoring for modern parents</p>
            <div className="flex justify-center space-x-6">
              <Link to="/login" className="text-gray-400 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-white">
                Register
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
