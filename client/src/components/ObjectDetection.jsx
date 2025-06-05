"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import { AlertTriangle, Phone, Play, Pause } from "lucide-react"

const ObjectDetection = ({ user, onLogout }) => {
  const [isLive, setIsLive] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState([])
  const [alerts, setAlerts] = useState([])
  const [emergencyCall, setEmergencyCall] = useState(false)

  // Simulate object detection
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        const objects = [
          { id: 1, name: "Baby", confidence: 98.5, safe: true },
          { id: 2, name: "Blanket", confidence: 95.2, safe: true },
          { id: 3, name: "Toy", confidence: 87.3, safe: true },
        ]

        // Randomly add a hazardous object
        if (Math.random() > 0.8) {
          objects.push({ id: 4, name: "Small Object", confidence: 92.1, safe: false })
          setAlerts((prev) => [
            ...prev,
            {
              id: Date.now(),
              message: "Potential hazard detected near baby",
              time: new Date().toLocaleTimeString(),
              severity: "high",
            },
          ])
        }

        setDetectedObjects(objects)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isLive])

  const handleEmergencyCall = () => {
    setEmergencyCall(true)
    setTimeout(() => setEmergencyCall(false), 3000)
  }

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
          <h1 className="text-4xl font-bold text-white mb-2">Object Detection</h1>
          <p className="text-gray-300">Real-time AI-powered safety monitoring</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Feed */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Live Camera Feed</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsLive(!isLive)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>{isLive ? "Stop" : "Start"} Live</span>
                  </button>
                </div>
              </div>

              {/* Video Feed Placeholder */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Baby Monitor Feed"
                  className="w-full h-full object-cover"
                />
                {isLive && (
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">LIVE</span>
                  </div>
                )}

                {/* Object Detection Overlays */}
                {isLive &&
                  detectedObjects.map((obj) => (
                    <div
                      key={obj.id}
                      className={`absolute border-2 rounded ${obj.safe ? "border-green-400" : "border-red-400"}`}
                      style={{
                        top: `${Math.random() * 60 + 10}%`,
                        left: `${Math.random() * 60 + 10}%`,
                        width: "120px",
                        height: "80px",
                      }}
                    >
                      <div
                        className={`px-2 py-1 text-xs font-medium ${
                          obj.safe ? "bg-green-400 text-green-900" : "bg-red-400 text-red-900"
                        }`}
                      >
                        {obj.name} ({obj.confidence.toFixed(1)}%)
                      </div>
                    </div>
                  ))}
              </div>

              {/* Emergency Call Button */}
              {alerts.some((alert) => alert.severity === "high") && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-red-400 font-medium">Emergency Detected!</span>
                    </div>
                    <button
                      onClick={handleEmergencyCall}
                      disabled={emergencyCall}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{emergencyCall ? "Calling..." : "Emergency Call"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detection Panel */}
          <div className="space-y-6">
            {/* Detected Objects */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Detected Objects</h3>
              <div className="space-y-3">
                {detectedObjects.length > 0 ? (
                  detectedObjects.map((obj) => (
                    <div key={obj.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{obj.name}</p>
                        <p className="text-gray-400 text-sm">{obj.confidence.toFixed(1)}% confidence</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${obj.safe ? "bg-green-400" : "bg-red-400"}`}></div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    {isLive ? "Scanning for objects..." : "Start live feed to detect objects"}
                  </p>
                )}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Recent Alerts</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {alerts.length > 0 ? (
                  alerts
                    .slice(-5)
                    .reverse()
                    .map((alert) => (
                      <div key={alert.id} className="p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle
                            className={`h-4 w-4 mt-0.5 ${
                              alert.severity === "high" ? "text-red-400" : "text-yellow-400"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-white text-sm">{alert.message}</p>
                            <p className="text-gray-400 text-xs">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-400 text-center py-4">No alerts yet</p>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Detection Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto Emergency Call</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sound Alerts</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">SMS Notifications</span>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObjectDetection
