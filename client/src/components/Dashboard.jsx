"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { Shield, Heart, Brain } from "lucide-react"

const Dashboard = ({ user, onLogout }) => {
  const [alerts] = useState([
    { id: 1, type: "info", message: "Baby is sleeping peacefully", time: "5 min ago" },
    { id: 2, type: "warning", message: "Room temperature slightly high", time: "15 min ago" },
    { id: 3, type: "success", message: "Feeding reminder completed", time: "1 hour ago" },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative">
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
      {/* Navbar always on top */}
      <Navbar user={user} onLogout={onLogout} />
      <div className="container mx-auto px-6 py-8 relative">
        {/* ECG Heartbeat Background - behind Welcome section */}
        <div className="absolute left-50 right-0 top-0 flex justify-center z-0" style={{ pointerEvents: "none" }}>
          <svg width="100%" height="120" viewBox="0 0 1200 200" fill="none" style={{ opacity: 0.7 }}>
            <polyline
              points="0,100 100,100 140,40 180,180 220,100 360,100 400,60 440,140 480,100 1200,100.200"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {/* Welcome Section */}
        <div className="mb-8 relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-300">Monitor your baby's safety and well-being with our AI-powered system</p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">
          <Link
            to="/object-detection"
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors group"
          >
            <Shield className="h-12 w-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-4">Object Detection</h3>
            <p className="text-gray-300 mb-4">
              Real-time monitoring with AI-powered object detection and automatic emergency alerts.
            </p>
            <div className="flex items-center text-purple-400">
              <span>View Live Feed</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="/emotion-detection"
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors group"
          >
            <Heart className="h-12 w-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-4">Emotion Detection</h3>
            <p className="text-gray-300 mb-4">
              Advanced emotion recognition to understand your baby's feelings and comfort levels.
            </p>
            <div className="flex items-center text-purple-400">
              <span>Analyze Emotions</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="/feeding-tracker"
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors group"
          >
            <Brain className="h-12 w-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-4">Smart Feeding</h3>
            <p className="text-gray-300 mb-4">
              Intelligent feeding tracker with AI analysis for personalized recommendations.
            </p>
            <div className="flex items-center text-purple-400">
              <span>Track Feeding</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Recent Alerts */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 relative z-10">
          <h3 className="text-2xl font-bold text-white mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full ${
                    alert.type === "success"
                      ? "bg-green-400"
                      : alert.type === "warning"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-white">{alert.message}</p>
                  <p className="text-gray-400 text-sm">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard