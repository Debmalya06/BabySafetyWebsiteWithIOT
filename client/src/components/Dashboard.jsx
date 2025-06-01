import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { Camera, Brain, Baby, Shield, Heart, Thermometer, Droplets } from "lucide-react"

const Dashboard = ({ user, onLogout }) => {
  const stats = [
    { name: "Active Sensors", value: "4", icon: Shield, color: "bg-green-500" },
    { name: "Temperature", value: "22°C", icon: Thermometer, color: "bg-blue-500" },
    { name: "Humidity", value: "45%", icon: Droplets, color: "bg-cyan-500" },
    { name: "Baby Profiles", value: "2", icon: Baby, color: "bg-purple-500" },
  ]

  const features = [
    {
      title: "Object Detection",
      description: "Real-time AI monitoring for baby safety",
      icon: Camera,
      link: "/object-detection",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Emotion Detection",
      description: "Analyze baby emotions and crying patterns",
      icon: Brain,
      link: "/emotion-detection",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Baby Profile & Feeding",
      description: "Manage baby profiles and feeding schedules",
      icon: Heart,
      link: "/baby-profile",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600">
                Monitor your baby's safety and well-being with our advanced AI-powered system.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${item.color} p-3 rounded-md`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                        <dd className="text-lg font-medium text-gray-900">{item.value}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Features */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Main Features</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link} className="group block">
                <div className={`${feature.bgColor} rounded-lg p-6 hover:shadow-lg transition-shadow duration-200`}>
                  <div
                    className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">All sensors are functioning normally</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Camera className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Object detection system active</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Heart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Feeding schedule updated for Emma</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
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

export default Dashboard
