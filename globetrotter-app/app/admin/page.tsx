"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowLeft, Users, MapPin, MessageCircle, Star, AlertTriangle, Settings, BarChart3, Shield } from "lucide-react"

export default function AdminDashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")

  // Sample analytics data
  const userGrowthData = [
    { month: "Jan", users: 1200, trips: 450 },
    { month: "Feb", users: 1350, trips: 520 },
    { month: "Mar", users: 1580, trips: 680 },
    { month: "Apr", users: 1720, trips: 750 },
    { month: "May", users: 1950, trips: 890 },
    { month: "Jun", users: 2180, trips: 1020 },
  ]

  const destinationData = [
    { name: "Europe", value: 35, color: "#819a91" },
    { name: "Asia", value: 28, color: "#a7c1a8" },
    { name: "North America", value: 20, color: "#d1d8be" },
    { name: "South America", value: 10, color: "#eeefe0" },
    { name: "Africa", value: 4, color: "#6b8a7a" },
    { name: "Oceania", value: 3, color: "#5a7c6b" },
  ]

  const recentUsers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      joinDate: "2024-03-15",
      trips: 3,
      status: "active",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      joinDate: "2024-03-14",
      trips: 1,
      status: "active",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      email: "emma.r@email.com",
      joinDate: "2024-03-13",
      trips: 5,
      status: "active",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.w@email.com",
      joinDate: "2024-03-12",
      trips: 0,
      status: "pending",
    },
  ]

  const recentReports = [
    {
      id: "1",
      type: "Inappropriate Content",
      reporter: "user123",
      target: "Community Post #456",
      date: "2024-03-15",
      status: "pending",
      severity: "medium",
    },
    {
      id: "2",
      type: "Spam",
      reporter: "user789",
      target: "User Profile: spammer_user",
      date: "2024-03-14",
      status: "resolved",
      severity: "low",
    },
    {
      id: "3",
      type: "Fake Review",
      reporter: "user456",
      target: "Restaurant Review #789",
      date: "2024-03-13",
      status: "investigating",
      severity: "high",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-blue-100 text-blue-800"
      case "investigating":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-sage text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-sage-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to App
              </Button>
            </Link>
            <h1 className="text-2xl font-serif">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-sage-light text-sage">Administrator</Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-sage bg-transparent"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage">Total Users</CardTitle>
              <Users className="h-4 w-4 text-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage">2,180</div>
              <p className="text-xs text-sage/70">+12% from last month</p>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage">Active Trips</CardTitle>
              <MapPin className="h-4 w-4 text-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage">1,020</div>
              <p className="text-xs text-sage/70">+18% from last month</p>
              <Progress value={82} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage">Community Posts</CardTitle>
              <MessageCircle className="h-4 w-4 text-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage">3,456</div>
              <p className="text-xs text-sage/70">+25% from last month</p>
              <Progress value={90} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage">Avg. Rating</CardTitle>
              <Star className="h-4 w-4 text-sage" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sage">4.7</div>
              <p className="text-xs text-sage/70">+0.2 from last month</p>
              <Progress value={94} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">User Growth & Trip Creation</CardTitle>
                  <CardDescription>Monthly trends over the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#819a91" name="New Users" />
                      <Bar dataKey="trips" fill="#a7c1a8" name="Trips Created" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Popular Destinations</CardTitle>
                  <CardDescription>Distribution of trip destinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={destinationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {destinationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sage font-serif">Platform Activity Timeline</CardTitle>
                <CardDescription>Daily active users and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#819a91" strokeWidth={2} name="Active Users" />
                    <Line type="monotone" dataKey="trips" stroke="#a7c1a8" strokeWidth={2} name="Trip Interactions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sage font-serif">Recent User Registrations</CardTitle>
                <CardDescription>New users who joined in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border border-sage-pale rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-sage text-white rounded-full flex items-center justify-center font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sage">{user.name}</h4>
                          <p className="text-sm text-sage/70">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-sage">{user.trips} trips</p>
                          <p className="text-xs text-sage/70">Joined {user.joinDate}</p>
                        </div>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">User Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Active Users</span>
                    <span className="font-semibold text-sage">1,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Inactive Users</span>
                    <span className="font-semibold text-sage">333</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Premium Users</span>
                    <span className="font-semibold text-sage">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Avg. Trips per User</span>
                    <span className="font-semibold text-sage">2.3</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">North America</span>
                    <span className="font-semibold text-sage">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Europe</span>
                    <span className="font-semibold text-sage">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Asia</span>
                    <span className="font-semibold text-sage">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Other</span>
                    <span className="font-semibold text-sage">5%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Daily Active Users</span>
                    <span className="font-semibold text-sage">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Avg. Session Time</span>
                    <span className="font-semibold text-sage">12m 34s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Posts per Day</span>
                    <span className="font-semibold text-sage">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">User Retention</span>
                    <span className="font-semibold text-sage">78%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Content Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Total Posts</span>
                    <span className="font-semibold text-sage">3,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Trip Reports</span>
                    <span className="font-semibold text-sage">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Travel Tips</span>
                    <span className="font-semibold text-sage">987</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Reviews</span>
                    <span className="font-semibold text-sage">1,235</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Moderation Queue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Pending Review</span>
                    <span className="font-semibold text-orange-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Flagged Content</span>
                    <span className="font-semibold text-red-600">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Auto-Approved</span>
                    <span className="font-semibold text-green-600">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Rejected</span>
                    <span className="font-semibold text-sage">12</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Popular Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Most Liked Post</span>
                    <span className="font-semibold text-sage">234 ❤️</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Most Commented</span>
                    <span className="font-semibold text-sage">89 💬</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Most Shared</span>
                    <span className="font-semibold text-sage">67 🔄</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Trending Topic</span>
                    <span className="font-semibold text-sage">#Japan</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Content Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-sage hover:bg-sage/90 text-white" size="sm">
                    Review Queue
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-sage text-sage hover:bg-sage-pale bg-transparent"
                    size="sm"
                  >
                    Content Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-sage text-sage hover:bg-sage-pale bg-transparent"
                    size="sm"
                  >
                    Bulk Actions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sage font-serif">Recent Reports</CardTitle>
                    <CardDescription>User reports requiring admin attention</CardDescription>
                  </div>
                  <Badge className="bg-red-100 text-red-800">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {recentReports.filter((r) => r.status === "pending").length} Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-sage-pale rounded-lg"
                    >
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-sage">{report.type}</h4>
                          <p className="text-sm text-sage/70 mb-1">{report.target}</p>
                          <p className="text-xs text-sage/50">
                            Reported by {report.reporter} on {report.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Report Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Total Reports</span>
                    <span className="font-semibold text-sage">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Resolved</span>
                    <span className="font-semibold text-green-600">32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Pending</span>
                    <span className="font-semibold text-orange-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Investigating</span>
                    <span className="font-semibold text-blue-600">3</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Report Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Spam</span>
                    <span className="font-semibold text-sage">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Inappropriate</span>
                    <span className="font-semibold text-sage">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Fake Reviews</span>
                    <span className="font-semibold text-sage">9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Other</span>
                    <span className="font-semibold text-sage">5</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sage font-serif">Moderation Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="sm">
                    Review High Priority
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-sage text-sage hover:bg-sage-pale bg-transparent"
                    size="sm"
                  >
                    Bulk Review
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-sage text-sage hover:bg-sage-pale bg-transparent"
                    size="sm"
                  >
                    Export Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
