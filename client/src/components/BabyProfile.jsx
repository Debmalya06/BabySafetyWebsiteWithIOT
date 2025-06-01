"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { Baby, Plus, Edit, Calendar, Heart, AlertCircle, Clock } from "lucide-react"

const BabyProfile = ({ user, onLogout }) => {
  const [babies, setBabies] = useState([
    {
      id: 1,
      name: "Emma",
      age: "8 months",
      birthDate: "2024-05-15",
      healthIssues: ["Mild lactose sensitivity"],
      weight: "8.2 kg",
      height: "68 cm",
      lastFeed: "2 hours ago",
      nextFeed: "In 1 hour",
    },
    {
      id: 2,
      name: "Oliver",
      age: "14 months",
      birthDate: "2023-11-20",
      healthIssues: ["None"],
      weight: "10.5 kg",
      height: "78 cm",
      lastFeed: "3 hours ago",
      nextFeed: "In 30 minutes",
    },
  ])

  const [selectedBaby, setSelectedBaby] = useState(babies[0])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBaby, setNewBaby] = useState({
    name: "",
    birthDate: "",
    healthIssues: "",
    weight: "",
    height: "",
  })

  const handleAddBaby = (e) => {
    e.preventDefault()
    const baby = {
      id: Date.now(),
      name: newBaby.name,
      birthDate: newBaby.birthDate,
      age: calculateAge(newBaby.birthDate),
      healthIssues: newBaby.healthIssues ? newBaby.healthIssues.split(",").map((h) => h.trim()) : ["None"],
      weight: newBaby.weight,
      height: newBaby.height,
      lastFeed: "Never",
      nextFeed: "Not scheduled",
    }

    setBabies([...babies, baby])
    setNewBaby({ name: "", birthDate: "", healthIssues: "", weight: "", height: "" })
    setShowAddForm(false)
  }

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate)
    const now = new Date()
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
    return `${months} months`
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
                  <Baby className="h-8 w-8 text-pink-600 mr-3" />
                  Baby Profiles & Feeding Management
                </h1>
                <p className="text-gray-600 mt-1">Manage baby profiles and track feeding schedules</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Baby
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Baby Selection Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Babies</h2>
                <div className="space-y-3">
                  {babies.map((baby) => (
                    <button
                      key={baby.id}
                      onClick={() => setSelectedBaby(baby)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                        selectedBaby.id === baby.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="bg-pink-100 p-2 rounded-full mr-3">
                          <Baby className="h-4 w-4 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{baby.name}</h3>
                          <p className="text-sm text-gray-600">{baby.age}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {selectedBaby && (
                <div className="space-y-6">
                  {/* Baby Details */}
                  <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">{selectedBaby.name}'s Profile</h2>
                      <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                          <h3 className="font-medium text-blue-900">Age</h3>
                        </div>
                        <p className="text-blue-700">{selectedBaby.age}</p>
                        <p className="text-sm text-blue-600">Born: {selectedBaby.birthDate}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Heart className="h-5 w-5 text-green-600 mr-2" />
                          <h3 className="font-medium text-green-900">Physical</h3>
                        </div>
                        <p className="text-green-700">Weight: {selectedBaby.weight}</p>
                        <p className="text-green-700">Height: {selectedBaby.height}</p>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                          <h3 className="font-medium text-yellow-900">Health</h3>
                        </div>
                        <div className="space-y-1">
                          {selectedBaby.healthIssues.map((issue, index) => (
                            <p key={index} className="text-yellow-700 text-sm">
                              {issue}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feeding Status */}
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Feeding Status</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-orange-600 mr-2" />
                          <h3 className="font-medium text-orange-900">Last Feed</h3>
                        </div>
                        <p className="text-orange-700 text-lg">{selectedBaby.lastFeed}</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-purple-600 mr-2" />
                          <h3 className="font-medium text-purple-900">Next Feed</h3>
                        </div>
                        <p className="text-purple-700 text-lg">{selectedBaby.nextFeed}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Link
                        to="/feeding-schedule"
                        className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Manage Feeding Schedule
                      </Link>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Heart className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Fed formula - 120ml</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Baby className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Diaper changed</p>
                          <p className="text-xs text-gray-500">3 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Nap time - 2 hours</p>
                          <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Baby Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Baby</h3>
              <form onSubmit={handleAddBaby} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={newBaby.name}
                    onChange={(e) => setNewBaby({ ...newBaby, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                  <input
                    type="date"
                    required
                    value={newBaby.birthDate}
                    onChange={(e) => setNewBaby({ ...newBaby, birthDate: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight</label>
                  <input
                    type="text"
                    placeholder="e.g., 8.2 kg"
                    value={newBaby.weight}
                    onChange={(e) => setNewBaby({ ...newBaby, weight: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Height</label>
                  <input
                    type="text"
                    placeholder="e.g., 68 cm"
                    value={newBaby.height}
                    onChange={(e) => setNewBaby({ ...newBaby, height: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Health Issues</label>
                  <input
                    type="text"
                    placeholder="Separate multiple issues with commas"
                    value={newBaby.healthIssues}
                    onChange={(e) => setNewBaby({ ...newBaby, healthIssues: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md">
                    Add Baby
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BabyProfile
