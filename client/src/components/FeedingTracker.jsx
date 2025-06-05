"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import { Plus, Clock } from "lucide-react"

const FeedingTracker = ({ user, onLogout }) => {
  const [selectedBaby, setSelectedBaby] = useState(null)
  const [feedingEntries, setFeedingEntries] = useState([
    { id: 1, time: "08:00", food: "Breast Milk", amount: "120ml", notes: "Good appetite", date: "2024-06-04" },
    { id: 2, time: "12:00", food: "Baby Formula", amount: "100ml", notes: "Finished completely", date: "2024-06-04" },
    { id: 3, time: "16:00", food: "Puree (Apple)", amount: "50g", notes: "Loved it!", date: "2024-06-04" },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    time: "",
    food: "",
    amount: "",
    notes: "",
  })
  const [cryAnalysis, setCryAnalysis] = useState([
    { id: 1, time: "14:30", reason: "Hunger", confidence: 85, recommendation: "Feed baby soon" },
    { id: 2, time: "18:45", reason: "Food Quality", confidence: 72, recommendation: "Check formula temperature" },
  ])

  const babies = [
    { id: 1, name: "Emma", age: "6 months", healthIssues: "None", photo: "/placeholder.svg?height=60&width=60" },
    {
      id: 2,
      name: "Liam",
      age: "8 months",
      healthIssues: "Lactose intolerant",
      photo: "/placeholder.svg?height=60&width=60",
    },
  ]

  const handleAddEntry = (e) => {
    e.preventDefault()
    const entry = {
      id: Date.now(),
      ...newEntry,
      date: new Date().toISOString().split("T")[0],
    }
    setFeedingEntries([...feedingEntries, entry])
    setNewEntry({ time: "", food: "", amount: "", notes: "" })
    setShowAddForm(false)
  }

  const getTodayEntries = () => {
    const today = new Date().toISOString().split("T")[0]
    return feedingEntries.filter((entry) => entry.date === today)
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
          <h1 className="text-4xl font-bold text-white mb-2">Smart Feeding Tracker</h1>
          <p className="text-gray-300">AI-powered feeding analysis and recommendations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Baby Selection */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Select Baby</h3>
            <div className="space-y-3">
              {babies.map((baby) => (
                <div
                  key={baby.id}
                  onClick={() => setSelectedBaby(baby)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedBaby?.id === baby.id
                      ? "bg-purple-600/50 border border-purple-400"
                      : "bg-gray-700/50 hover:bg-gray-600/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={baby.photo || "/placeholder.svg"}
                      alt={baby.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">{baby.name}</p>
                      <p className="text-gray-400 text-sm">{baby.age}</p>
                      {baby.healthIssues !== "None" && <p className="text-yellow-400 text-xs">{baby.healthIssues}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feeding Log */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Today's Feeding Log</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Entry</span>
                </button>
              </div>

              {selectedBaby ? (
                <div className="space-y-4">
                  {getTodayEntries().length > 0 ? (
                    getTodayEntries().map((entry) => (
                      <div key={entry.id} className="bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-purple-400" />
                            <span className="text-white font-medium">{entry.time}</span>
                          </div>
                          <span className="text-gray-400 text-sm">{entry.amount}</span>
                        </div>
                        <p className="text-white">{entry.food}</p>
                        {entry.notes && <p className="text-gray-400 text-sm mt-1">{entry.notes}</p>}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-8">No feeding entries for today</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Select a baby to view feeding log</p>
              )}
            </div>

            {/* Add Entry Form */}
            {showAddForm && (
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Add Feeding Entry</h3>
                <form onSubmit={handleAddEntry} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                      <input
                        type="time"
                        value={newEntry.time}
                        onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                      <input
                        type="text"
                        value={newEntry.amount}
                        onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                        placeholder="e.g., 120ml, 50g"
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Food Type</label>
                    <select
                      value={newEntry.food}
                      onChange={(e) => setNewEntry({ ...newEntry, food: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select food type</option>
                      <option value="Breast Milk">Breast Milk</option>
                      <option value="Baby Formula">Baby Formula</option>
                      <option value="Puree (Apple)">Puree (Apple)</option>
                      <option value="Puree (Banana)">Puree (Banana)</option>
                      <option value="Cereal">Cereal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Notes (Optional)</label>
                    <textarea
                      value={newEntry.notes}
                      onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                      placeholder="Any observations or notes..."
                      rows="3"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Add Entry
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* AI Analysis */}
          <div className="space-y-6">
            {/* Cry Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Cry Analysis</h3>
              <div className="space-y-3">
                {cryAnalysis.map((analysis) => (
                  <div key={analysis.id} className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{analysis.time}</span>
                      <span className="text-purple-400 text-sm">{analysis.confidence}%</span>
                    </div>
                    <p className="text-yellow-400 text-sm font-medium">{analysis.reason}</p>
                    <p className="text-gray-300 text-sm">{analysis.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feeding Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Feedings</span>
                  <span className="text-white font-bold">{getTodayEntries().length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Feeding</span>
                  <span className="text-white font-bold">
                    {getTodayEntries().length > 0 ? getTodayEntries().slice(-1)[0].time : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Next Feeding</span>
                  <span className="text-purple-400 font-bold">In 2h 30m</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium">Feeding Pattern</p>
                  <p className="text-white text-sm">Baby shows consistent 4-hour feeding intervals</p>
                </div>
                <div className="p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-medium">Nutrition</p>
                  <p className="text-white text-sm">Good variety in food types this week</p>
                </div>
                <div className="p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm font-medium">Suggestion</p>
                  <p className="text-white text-sm">Consider introducing new puree flavors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedingTracker
