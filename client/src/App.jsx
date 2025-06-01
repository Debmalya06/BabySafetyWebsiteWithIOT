"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import ObjectDetection from "./components/ObjectDetection"
import EmotionDetection from "./components/EmotionDetection"
import BabyProfile from "./components/BabyProfile"
import FeedingSchedule from "./components/FeedingSchedule"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onRegister={handleLogin} />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/object-detection"
            element={
              isAuthenticated ? <ObjectDetection user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/emotion-detection"
            element={
              isAuthenticated ? <EmotionDetection user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/baby-profile"
            element={isAuthenticated ? <BabyProfile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/feeding-schedule"
            element={
              isAuthenticated ? <FeedingSchedule user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
