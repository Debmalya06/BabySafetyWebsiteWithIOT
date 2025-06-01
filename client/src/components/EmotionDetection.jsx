"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import { Brain, Heart, Volume2, TrendingUp, AlertCircle } from "lucide-react"

const EmotionDetection = ({ user, onLogout }) => {
  const [isActive, setIsActive] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState("calm")
  const [emotionHistory, setEmotionHistory] = useState([])
  const [cryAnalysis, setCryAnalysis] = useState(null)
  const [audioLevel, setAudioLevel] = useState(0)

  const emotions = {
    happy: { color: "text-green-600", bg: "bg-green-100", icon: "😊" },
    calm: { color: "text-blue-600", bg: "bg-blue-100", icon: "😌" },
    crying: { color: "text-red-600", bg: "bg-red-100", icon: "😢" },
    fussy: { color: "text-yellow-600", bg: "bg-yellow-100", icon: "😤" },
    sleeping: { color: "text-purple-600", bg: "bg-purple-100", icon: "😴" },
  }

  const cryReasons = [
    "Hunger - Feeding time may be due",
    "Discomfort - Check diaper or temperature",
    "Tiredness - Baby may need sleep",
    "Temperature - Room may be too hot/cold",
    "Gas/Colic - Digestive discomfort",
  ]

  // Simulate emotion detection
  useEffect(() => {
    let interval
    if (isActive) {
      interval = setInterval(() => {
        const emotionTypes = Object.keys(emotions)
        const randomEmotion = emotionTypes[Math.floor(Math.random() * emotionTypes.length)]
        const newAudioLevel = Math.random() * 100

        setCurrentEmotion(randomEmotion)
        setAudioLevel(newAudioLevel)

        const emotionData = {
          id: Date.now(),
          emotion: randomEmotion,
          timestamp: new Date().toLocaleTimeString(),
          confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
          audioLevel: newAudioLevel.toFixed(0),
        }

        setEmotionHistory((prev) => [emotionData, ...prev.slice(0, 9)])

        // Simulate cry analysis
        if (randomEmotion === "crying" && Math.random() > 0.5) {
          const reason = cryReasons[Math.floor(Math.random() * cryReasons.length)]
          setCryAnalysis({
            reason,
            timestamp: new Date().toLocaleTimeString(),
            confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
          })
        }
      }, 3000)
    }

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Brain className="h-8 w-8 text-purple-600 mr-3" />
                  Emotion Detection System
                </h1>
                <p className="text-gray-600 mt-1">AI-powered emotion analysis and cry pattern recognition</p>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-6 py-2 rounded-md font-medium ${
                  isActive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isActive ? "Stop Detection" : "Start Detection"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Emotion Display */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Emotion</h2>
                <div className="text-center py-8">
                  <div className="text-8xl mb-4">{emotions[currentEmotion]?.icon}</div>
                  <h3 className={`text-3xl font-bold capitalize ${emotions[currentEmotion]?.color}`}>
                    {currentEmotion}
                  </h3>
                  <p className="text-gray-600 mt-2">{isActive ? "Analyzing in real-time..." : "Detection inactive"}</p>
                </div>
              </div>

              {/* Audio Level Visualization */}
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Volume2 className="h-5 w-5 mr-2" />
                  Audio Level
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Level</span>
                    <span className="text-sm font-medium">{audioLevel.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-300 ${
                        audioLevel > 70 ? "bg-red-500" : audioLevel > 40 ? "bg-yellow-500" : "bg-green-500"
                      }`}
                      style={{ width: `${audioLevel}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 text-xs text-gray-500">
                    <span>Quiet</span>
                    <span className="text-center">Normal</span>
                    <span className="text-right">Loud</span>
                  </div>
                </div>
              </div>

              {/* Cry Analysis */}
              {cryAnalysis && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                    Cry Analysis
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium text-red-900">Possible Reason</h3>
                        <p className="text-red-700 mt-1">{cryAnalysis.reason}</p>
                        <div className="mt-2 text-sm text-red-600">
                          <span>Confidence: {(cryAnalysis.confidence * 100).toFixed(0)}%</span>
                          <span className="ml-4">Time: {cryAnalysis.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Emotion Statistics */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Today's Summary
                </h3>
                <div className="space-y-3">
                  {Object.entries(emotions).map(([emotion, config]) => {
                    const count = emotionHistory.filter((h) => h.emotion === emotion).length
                    const percentage = emotionHistory.length > 0 ? (count / emotionHistory.length) * 100 : 0

                    return (
                      <div key={emotion} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{config.icon}</span>
                          <span className="text-sm font-medium capitalize">{emotion}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{count}</div>
                          <div className="text-xs text-gray-500">{percentage.toFixed(0)}%</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recent Emotions */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Emotions</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {emotionHistory.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No emotions detected yet</p>
                  ) : (
                    emotionHistory.map((emotion) => (
                      <div key={emotion.id} className={`p-3 rounded-lg ${emotions[emotion.emotion]?.bg}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{emotions[emotion.emotion]?.icon}</span>
                            <span className="font-medium text-sm capitalize">{emotion.emotion}</span>
                          </div>
                          <span className="text-xs text-gray-500">{emotion.timestamp}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          Confidence: {(emotion.confidence * 100).toFixed(0)}% | Audio: {emotion.audioLevel}%
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-500" />
                  Recommendations
                </h3>
                <div className="space-y-3">
                  {currentEmotion === "crying" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-900 text-sm">Baby is crying</h4>
                      <p className="text-red-700 text-xs mt-1">Check feeding schedule, diaper, or comfort needs</p>
                    </div>
                  )}
                  {currentEmotion === "fussy" && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-900 text-sm">Baby seems fussy</h4>
                      <p className="text-yellow-700 text-xs mt-1">Consider checking temperature or providing comfort</p>
                    </div>
                  )}
                  {currentEmotion === "happy" && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 text-sm">Baby is happy!</h4>
                      <p className="text-green-700 text-xs mt-1">Great time for interaction and play</p>
                    </div>
                  )}
                  {currentEmotion === "sleeping" && (
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900 text-sm">Baby is sleeping</h4>
                      <p className="text-purple-700 text-xs mt-1">Maintain quiet environment for rest</p>
                    </div>
                  )}
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
