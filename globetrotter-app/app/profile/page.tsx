"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Save, MapPin, Calendar, Star, Settings, User, History } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phoneNumber: "+1 (555) 123-4567",
    city: "San Francisco",
    country: "United States",
    bio: "Passionate traveler who loves exploring new cultures and cuisines. Always planning the next adventure!",
    travelPreferences: ["Culture", "Food", "Adventure", "History"],
  })

  const preferredTrips = [
    {
      id: "1",
      title: "Summer in Greece",
      destination: "Athens, Santorini, Mykonos",
      image: "/greek-islands-white-buildings-blue-sea.png",
      rating: 5,
      status: "Wishlist",
    },
    {
      id: "2",
      title: "Japanese Culture Tour",
      destination: "Tokyo, Kyoto, Osaka",
      image: "/japanese-temples-cities.png",
      rating: 5,
      status: "Planning",
    },
    {
      id: "3",
      title: "Swiss Alps Adventure",
      destination: "Zermatt, Interlaken",
      image: "/swiss-alps-snow.png",
      rating: 4,
      status: "Wishlist",
    },
  ]

  const previousTrips = [
    {
      id: "4",
      title: "European Adventure",
      destination: "Paris, Rome, Barcelona",
      date: "March 2024",
      image: "/european-cities-collage.png",
      rating: 5,
      status: "Completed",
    },
    {
      id: "5",
      title: "Asian Discovery",
      destination: "Tokyo, Kyoto, Osaka",
      date: "January 2024",
      image: "/japanese-temples-cities.png",
      rating: 4,
      status: "Completed",
    },
    {
      id: "6",
      title: "Beach Getaway",
      destination: "Maldives",
      date: "December 2023",
      image: "/placeholder-4wh2p.png",
      rating: 5,
      status: "Completed",
    },
  ]

  const handleSave = () => {
    // TODO: Implement profile update
    console.log("Saving profile:", profileData)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const togglePreference = (preference: string) => {
    setProfileData((prev) => ({
      ...prev,
      travelPreferences: prev.travelPreferences.includes(preference)
        ? prev.travelPreferences.filter((p) => p !== preference)
        : [...prev.travelPreferences, preference],
    }))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-sage-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-serif">My Profile</h1>
          </div>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-sage bg-transparent"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="trips" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <History className="w-4 h-4 mr-2" />
              Trip History
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-sage text-white text-xl">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sage font-serif text-2xl">
                      {profileData.firstName} {profileData.lastName}
                    </CardTitle>
                    <CardDescription className="text-sage/70">
                      {profileData.city}, {profileData.country}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sage">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-sage-pale focus:border-sage focus:ring-sage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sage">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-sage-pale focus:border-sage focus:ring-sage"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sage">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-sage-pale focus:border-sage focus:ring-sage"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sage">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-sage-pale focus:border-sage focus:ring-sage"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sage">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={profileData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-sage-pale focus:border-sage focus:ring-sage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sage">
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      value={profileData.country}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="border-sage-pale focus:border-sage focus:ring-sage"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sage">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="border-sage-pale focus:border-sage focus:ring-sage min-h-[100px]"
                    placeholder="Tell us about yourself and your travel interests..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sage">Travel Preferences</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Culture", "Food", "Adventure", "Relaxation", "History", "Nature", "Nightlife", "Shopping"].map(
                      (preference) => (
                        <Badge
                          key={preference}
                          variant={profileData.travelPreferences.includes(preference) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            profileData.travelPreferences.includes(preference)
                              ? "bg-sage text-white"
                              : "border-sage text-sage hover:bg-sage-pale"
                          } ${!isEditing ? "cursor-default" : ""}`}
                          onClick={() => isEditing && togglePreference(preference)}
                        >
                          {preference}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trip History Tab */}
          <TabsContent value="trips" className="space-y-6">
            {/* Preferred Trips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sage font-serif">Preferred Trips</CardTitle>
                <CardDescription>Trips you're planning or have on your wishlist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {preferredTrips.map((trip) => (
                    <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-32">
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-sage text-white">{trip.status}</Badge>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sage text-sm mb-1">{trip.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-sage/70 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{trip.destination}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">{renderStars(trip.rating)}</div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-sage text-sage hover:bg-sage-pale text-xs bg-transparent"
                          >
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Previous Trips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sage font-serif">Previous Trips</CardTitle>
                <CardDescription>Your completed travel adventures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {previousTrips.map((trip) => (
                    <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-32">
                        <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-sage-light text-sage">{trip.status}</Badge>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-sage text-sm mb-1">{trip.title}</h4>
                        <div className="space-y-1 text-xs text-sage/70 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{trip.destination}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{trip.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">{renderStars(trip.rating)}</div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-sage text-sage hover:bg-sage-pale text-xs bg-transparent"
                          >
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sage font-serif">Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-sage-pale rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sage">Email Notifications</h4>
                      <p className="text-sm text-sage/70">Receive updates about your trips and recommendations</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                    >
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-sage-pale rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sage">Privacy Settings</h4>
                      <p className="text-sm text-sage/70">Control who can see your profile and trip information</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                    >
                      Configure
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-sage-pale rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sage">Change Password</h4>
                      <p className="text-sm text-sage/70">Update your account password for security</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                    >
                      Change
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-red-600">Delete Account</h4>
                      <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
