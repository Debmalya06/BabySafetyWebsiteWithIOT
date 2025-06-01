"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import { Camera, AlertTriangle, Phone, Shield, Play, Pause, RefreshCw } from "lucide-react"

const ObjectDetection = ({ user, onLogout }) => {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState([])
  const [alertStatus, setAlertStatus] = useState("safe")
  const [lastDetection, setLastDetection] = useState(null)

  // Simulate real-time object detection
  useEffect(() => {
    let interval
    if (isMonitoring) {
      interval = setInterval(() => {
        // Simulate random object detection
        const objects = ["toy", "blanket", "bottle", "pillow"]
        const dangerousObjects = ["small_object", "sharp_item", "unknown_object"]

        const randomDetection = Math.random()
        if (randomDetection > 0.7) {
          const isDangerous = Math.random() > 0.8
          const objectType = isDangerous
            ? dangerousObjects[Math.floor(Math.random() * dangerousObjects.length)]
            : objects[Math.floor(Math.random() * objects.length)]

          const detection = {
            id: Date.now(),
            object: objectType,
            confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
            timestamp: new Date().toLocaleTimeString(),
            dangerous: isDangerous,
            position: {
              x: Math.floor(Math.random() * 400),
              y: Math.floor(Math.random() * 300),
            },
          }

          setDetectedObjects((prev) => [detection, ...prev.slice(0, 9)])
          setLastDetection(detection)

          if (isDangerous) {
            setAlertStatus("danger")
            // Simulate emergency call
            setTimeout(() => setAlertStatus("safe"), 5000)
          }
        }
      }, 2000)
    }

    return () => clearInterval(interval)
  }, [isMonitoring])

  const handleEmergencyCall = () => {
    alert("Emergency call initiated to: " + user?.mobile)
  }

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
                  <Camera className="h-8 w-8 text-blue-600 mr-3" />
                  Object Detection System
                </h1>
                <p className="text-gray-600 mt-1">Real-time AI monitoring for baby safety</p>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    alertStatus === "safe" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {alertStatus === "safe" ? "Safe" : "Alert!"}
                </div>
                <button
                  onClick={() => setIsMonitoring(!isMonitoring)}
                  className={`flex items-center px-4 py-2 rounded-md font-medium ${
                    isMonitoring ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isMonitoring ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Monitoring
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Monitoring
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Camera Feed */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Camera Feed</h2>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Baby Monitor Camera Feed"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay detection boxes */}
                  {isMonitoring &&
                    detectedObjects.slice(0, 3).map((detection) => (
                      <div
                        key={detection.id}
                        className={`absolute border-2 ${
                          detection.dangerous ? "border-red-500" : "border-green-500"
                        } rounded`}
                        style={{
                          left: `${(detection.position.x / 600) * 100}%`,
                          top: `${(detection.position.y / 400) * 100}%`,
                          width: "80px",
                          height: "60px",
                        }}
                      >
                        <div
                          className={`absolute -top-6 left-0 px-2 py-1 text-xs rounded ${
                            detection.dangerous ? "bg-red-500 text-white" : "bg-green-500 text-white"
                          }`}
                        >
                          {detection.object} ({(detection.confidence * 100).toFixed(0)}%)
                        </div>
                      </div>
                    ))}

                  {/* Status indicator */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        isMonitoring ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          isMonitoring ? "bg-white animate-pulse" : "bg-gray-300"
                        }`}
                      ></div>
                      {isMonitoring ? "LIVE" : "OFFLINE"}
                    </div>
                  </div>
                </div>

                {/* Camera Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </button>
                    <span className="text-sm text-gray-600">Resolution: 1920x1080 | FPS: 30</span>
                  </div>
                  {alertStatus === "danger" && (
                    <button
                      onClick={handleEmergencyCall}
                      className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium animate-pulse"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Call
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Detection Panel */}
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">System Status</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        isMonitoring ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {isMonitoring ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Objects Detected</span>
                    <span className="text-sm font-medium">{detectedObjects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Detection</span>
                    <span className="text-sm font-medium">{lastDetection ? lastDetection.timestamp : "None"}</span>
                  </div>
                </div>
              </div>

              {/* Recent Detections */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Detections</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {detectedObjects.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No objects detected yet</p>
                  ) : (
                    detectedObjects.map((detection) => (
                      <div
                        key={detection.id}
                        className={`p-3 rounded-lg border ${
                          detection.dangerous ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {detection.dangerous ? (
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            ) : (
                              <Shield className="h-4 w-4 text-green-500 mr-2" />
                            )}
                            <span className="font-medium text-sm capitalize">{detection.object.replace("_", " ")}</span>
                          </div>
                          <span className="text-xs text-gray-500">{detection.timestamp}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          Confidence: {(detection.confidence * 100).toFixed(0)}%
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Primary: {user?.name}</span>
                    <span className="text-sm text-gray-600">{user?.mobile}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">Emergency Services</span>
                    <span className="text-sm text-gray-600">911</span>
                  </div>
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
