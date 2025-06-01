"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import { Calendar, Clock, Plus, Edit, Trash2, Baby, Utensils } from "lucide-react"

const FeedingSchedule = ({ user, onLogout }) => {
  const [selectedBaby, setSelectedBaby] = useState("Emma")
  const [showAddForm, setShowAddForm] = useState(false)
  const [feedingEntries, setFeedingEntries] = useState([
    {
      id: 1,
      baby: "Emma",
      time: "08:00",
      date: "2024-01-06",
      foodType: "Formula",
      amount: "120ml",
      notes: "Fed well, no issues",
    },
    {
      id: 2,
      baby: "Emma",
      time: "12:00",
      date: "2024-01-06",
      foodType: "Baby Food - Carrots",
      amount: "50g",
      notes: "Loved it!",
    },
    {
      id: 3,
      baby: "Oliver",
      time: "09:30",
      date: "2024-01-06",
      foodType: "Milk",
      amount: "150ml",
      notes: "Normal feeding",
    },
  ])

  const [newEntry, setNewEntry] = useState({
    time: "",
    date: new Date().toISOString().split("T")[0],
    foodType: "",
    amount: "",
    notes: "",
  })

  const babies = ["Emma", "Oliver"]
  const foodTypes = [
    "Formula",
    "Breast Milk",
    "Baby Food - Fruits",
    "Baby Food - Vegetables",
    "Baby Food - Cereals",
    "Milk",
    "Water",
    "Juice",
  ]

  const handleAddEntry = (e) => {
    e.preventDefault()
    const entry = {
      id: Date.now(),
      baby: selectedBaby,
      ...newEntry,
    }

    setFeedingEntries([entry, ...feedingEntries])
    setNewEntry({
      time: "",
      date: new Date().toISOString().split("T")[0],
      foodType: "",
      amount: "",
      notes: "",
    })
    setShowAddForm(false)
  }

  const deleteEntry = (id) => {
    setFeedingEntries(feedingEntries.filter((entry) => entry.id !== id))
  }

  const filteredEntries = feedingEntries.filter((entry) => entry.baby === selectedBaby)

  const getTodayStats = () => {
    const today = new Date().toISOString().split("T")[0]
    const todayEntries = filteredEntries.filter((entry) => entry.date === today)
    return {
      totalFeeds: todayEntries.length,
      lastFeed: todayEntries.length > 0 ? todayEntries[0].time : "None",
      nextFeed: getNextFeedTime(todayEntries),
    }
  }

  const getNextFeedTime = (todayEntries) => {
    if (todayEntries.length === 0) return "Not scheduled"

    const lastFeedTime = todayEntries[0].time
    const [hours, minutes] = lastFeedTime.split(":").map(Number)
    const nextHour = (hours + 3) % 24 // Assuming 3-hour intervals
    return `${nextHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  const stats = getTodayStats()

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
                  <Utensils className="h-8 w-8 text-green-600 mr-3" />
                  Feeding Schedule Management
                </h1>
                <p className="text-gray-600 mt-1">Track and manage feeding schedules for your babies</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feeding
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Baby Selection & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Baby Selection */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Baby</h2>
                <div className="space-y-2">
                  {babies.map((baby) => (
                    <button
                      key={baby}
                      onClick={() => setSelectedBaby(baby)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                        selectedBaby === baby
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <Baby className="h-5 w-5 text-green-600 mr-3" />
                        <span className="font-medium">{baby}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Today's Stats */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-900">Total Feeds</span>
                    </div>
                    <span className="text-lg font-bold text-blue-700">{stats.totalFeeds}</span>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-900">Last Feed</span>
                    </div>
                    <span className="text-lg font-bold text-green-700">{stats.lastFeed}</span>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Clock className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-purple-900">Next Feed</span>
                    </div>
                    <span className="text-lg font-bold text-purple-700">{stats.nextFeed}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feeding Entries */}
            <div className="lg:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Feeding History for {selectedBaby}</h2>

                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No feeding entries found for {selectedBaby}</p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                      Add First Entry
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="text-sm">{entry.date}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-sm">{entry.time}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <span className="text-sm font-medium text-gray-700">Food Type:</span>
                                <p className="text-gray-900">{entry.foodType}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700">Amount:</span>
                                <p className="text-gray-900">{entry.amount}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700">Notes:</span>
                                <p className="text-gray-900">{entry.notes || "No notes"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button className="p-2 text-gray-400 hover:text-blue-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="p-2 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Feeding Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Feeding Entry for {selectedBaby}</h3>
              <form onSubmit={handleAddEntry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    required
                    value={newEntry.time}
                    onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Food Type</label>
                  <select
                    required
                    value={newEntry.foodType}
                    onChange={(e) => setNewEntry({ ...newEntry, foodType: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select food type</option>
                    {foodTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 120ml, 50g"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                  <textarea
                    rows="3"
                    placeholder="Any additional notes..."
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
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
                  <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                    Add Entry
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

export default FeedingSchedule
