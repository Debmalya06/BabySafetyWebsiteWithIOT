"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import { Plus, Edit, Trash2, Heart, AlertTriangle } from "lucide-react"

const BabyProfile = ({ user, onLogout }) => {
  const [babies, setBabies] = useState([
    {
      id: 1,
      name: "Emma",
      age: "6 months",
      birthDate: "2023-12-04",
      weight: "7.2 kg",
      height: "65 cm",
      healthIssues: "None",
      allergies: "None",
      photo: "/placeholder.svg?height=120&width=120",
      notes: "Very active and happy baby",
    },
    {
      id: 2,
      name: "Liam",
      age: "8 months",
      birthDate: "2023-10-04",
      weight: "8.1 kg",
      height: "68 cm",
      healthIssues: "Lactose intolerant",
      allergies: "Dairy products",
      photo: "/placeholder.svg?height=120&width=120",
      notes: "Loves solid foods, especially fruits",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBaby, setEditingBaby] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    weight: "",
    height: "",
    healthIssues: "",
    allergies: "",
    notes: "",
  })

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate)
    const today = new Date()
    const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth())
    return `${months} months`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const babyData = {
      ...formData,
      age: calculateAge(formData.birthDate),
      photo: "/placeholder.svg?height=120&width=120",
    }

    if (editingBaby) {
      setBabies(babies.map((baby) => (baby.id === editingBaby.id ? { ...baby, ...babyData } : baby)))
      setEditingBaby(null)
    } else {
      setBabies([...babies, { ...babyData, id: Date.now() }])
    }

    setFormData({
      name: "",
      birthDate: "",
      weight: "",
      height: "",
      healthIssues: "",
      allergies: "",
      notes: "",
    })
    setShowAddForm(false)
  }

  const handleEdit = (baby) => {
    setEditingBaby(baby)
    setFormData({
      name: baby.name,
      birthDate: baby.birthDate,
      weight: baby.weight,
      height: baby.height,
      healthIssues: baby.healthIssues,
      allergies: baby.allergies,
      notes: baby.notes,
    })
    setShowAddForm(true)
  }

  const handleDelete = (babyId) => {
    if (window.confirm("Are you sure you want to delete this baby profile?")) {
      setBabies(babies.filter((baby) => baby.id !== babyId))
    }
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Baby Profiles</h1>
              <p className="text-gray-300">Manage your babies' information and health details</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Baby</span>
            </button>
          </div>
        </div>

        {/* Baby Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {babies.map((baby) => (
            <div key={baby.id} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={baby.photo || "/placeholder.svg"}
                    alt={baby.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{baby.name}</h3>
                    <p className="text-gray-400">{baby.age}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(baby)}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(baby.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Birth Date:</span>
                  <span className="text-white">{new Date(baby.birthDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Weight:</span>
                  <span className="text-white">{baby.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Height:</span>
                  <span className="text-white">{baby.height}</span>
                </div>

                {baby.healthIssues !== "None" && (
                  <div className="p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">Health Issues</span>
                    </div>
                    <p className="text-white text-sm mt-1">{baby.healthIssues}</p>
                  </div>
                )}

                {baby.allergies !== "None" && (
                  <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span className="text-red-400 text-sm font-medium">Allergies</span>
                    </div>
                    <p className="text-white text-sm mt-1">{baby.allergies}</p>
                  </div>
                )}

                {baby.notes && (
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-300 text-sm">{baby.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">{editingBaby ? "Edit Baby Profile" : "Add New Baby"}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Baby Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter baby's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Birth Date *</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 7.2 kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Height</label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 65 cm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Health Issues</label>
                  <input
                    type="text"
                    value={formData.healthIssues}
                    onChange={(e) => setFormData({ ...formData, healthIssues: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter any health issues or 'None'"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Allergies</label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter any allergies or 'None'"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Any additional notes about your baby..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  {editingBaby ? "Update Profile" : "Add Baby"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingBaby(null)
                    setFormData({
                      name: "",
                      birthDate: "",
                      weight: "",
                      height: "",
                      healthIssues: "",
                      allergies: "",
                      notes: "",
                    })
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default BabyProfile
