"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import { Smile, Frown, Meh, AlertCircle } from "lucide-react"

const EmotionDetection = ({ user, onLogout }) => {
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [emotionHistory, setEmotionHistory] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [insights, setInsights] = useState([])

  const emotions = [
    { name: "Happy", icon: Smile, color: "text-green-400", bgColor: "bg-green-400/20" },
    { name: "Sad", icon: Frown, color: "text-blue-400", bgColor: "bg-blue-400/20" },
    { name: "Neutral", icon: Meh, color: "text-gray-400", bgColor: "bg-gray-400/20" },
    { name: "Distressed", icon: AlertCircle, color: "text-red-400", bgColor: "bg-red-400/20" },
  ]

  // Simulate emotion detection
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
        const confidence = Math.random() * 30 + 70 // 70-100% confidence

        const emotionData = {
          id: Date.now(),
          emotion: randomEmotion.name,
          confidence: confidence.toFixed(1),
          timestamp: new Date().toLocaleTimeString(),
          icon: randomEmotion.icon,
          color: randomEmotion.color,
        }

        setCurrentEmotion(emotionData)
        setEmotionHistory((prev) => [...prev.slice(-9), emotionData])

        // Generate insights
        if (randomEmotion.name === "Distressed") {
          setInsights((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: "Baby appears distressed. Check if feeding time or diaper change is needed.",
              time: new Date().toLocaleTimeString(),
              type: "warning",
            },
          ])
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isAnalyzing])

  const getEmotionStats = () => {
    if (emotionHistory.length === 0) return {}

    const stats = {}
    emotionHistory.forEach((entry) => {
      stats[entry.emotion] = (stats[entry.emotion] || 0) + 1
    })

    return stats
  }

  const emotionStats = getEmotionStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
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
    <Navbar user={user} onLogout={onLogout} />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Emotion Detection</h1>
          <p className="text-gray-300">AI-powered baby emotion recognition and analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Live Emotion Analysis</h2>
                <button
                  onClick={() => setIsAnalyzing(!isAnalyzing)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isAnalyzing
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {isAnalyzing ? "Stop Analysis" : "Start Analysis"}
                </button>
              </div>

              {/* Camera Feed */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-4">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Baby Emotion Monitor"
                  className="w-full h-full object-cover"
                />
                {isAnalyzing && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">ANALYZING</span>
                  </div>
                )}

                {/* Current Emotion Overlay */}
                {currentEmotion && (
                  <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <currentEmotion.icon className={`h-8 w-8 ${currentEmotion.color}`} />
                      <div>
                        <p className="text-white font-medium">{currentEmotion.emotion}</p>
                        <p className="text-gray-400 text-sm">{currentEmotion.confidence}% confidence</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Emotion History Chart */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-3">Emotion Timeline</h3>
                <div className="flex space-x-2 overflow-x-auto">
                  {emotionHistory.slice(-10).map((entry, index) => {
                    const EmotionIcon = entry.icon
                    return (
                      <div key={entry.id} className="flex-shrink-0 text-center">
                        <div
                          className={`w-12 h-12 rounded-full ${emotions.find((e) => e.name === entry.emotion)?.bgColor} flex items-center justify-center mb-1`}
                        >
                          <EmotionIcon className={`h-6 w-6 ${entry.color}`} />
                        </div>
                        <p className="text-xs text-gray-400">{entry.timestamp.split(":").slice(0, 2).join(":")}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">AI Insights</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {insights.length > 0 ? (
                  insights
                    .slice(-5)
                    .reverse()
                    .map((insight) => (
                      <div key={insight.id} className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-400" />
                          <div className="flex-1">
                            <p className="text-white text-sm">{insight.message}</p>
                            <p className="text-gray-400 text-xs">{insight.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    {isAnalyzing ? "Analyzing emotions..." : "Start analysis to see insights"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Current Status</h3>
              {currentEmotion ? (
                <div className="text-center">
                  <div
                    className={`w-20 h-20 rounded-full ${emotions.find((e) => e.name === currentEmotion.emotion)?.bgColor} flex items-center justify-center mx-auto mb-3`}
                  >
                    <currentEmotion.icon className={`h-10 w-10 ${currentEmotion.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white">{currentEmotion.emotion}</p>
                  <p className="text-gray-400">{currentEmotion.confidence}% confidence</p>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No emotion detected</p>
              )}
            </div>

            {/* Emotion Statistics */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Emotion Statistics</h3>
              <div className="space-y-3">
                {emotions.map((emotion) => {
                  const count = emotionStats[emotion.name] || 0
                  const percentage = emotionHistory.length > 0 ? ((count / emotionHistory.length) * 100).toFixed(1) : 0

                  return (
                    <div key={emotion.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <emotion.icon className={`h-4 w-4 ${emotion.color}`} />
                        <span className="text-gray-300">{emotion.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${emotion.color.replace("text-", "bg-")}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-400 text-sm w-8">{percentage}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Analysis Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Real-time Alerts</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Emotion Logging</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Daily Reports</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmotionDetection
