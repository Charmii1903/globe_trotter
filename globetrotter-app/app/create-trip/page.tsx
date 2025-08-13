"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Users, Plane } from "lucide-react"

export default function CreateTripPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "1",
    interests: [] as string[],
  })

  const [suggestions, setSuggestions] = useState([
    { type: "Restaurant", name: "Local Bistro", description: "Authentic local cuisine" },
    { type: "Activity", name: "City Walking Tour", description: "Explore historic districts" },
    { type: "Attraction", name: "Art Museum", description: "World-class exhibitions" },
    { type: "Activity", name: "Cooking Class", description: "Learn traditional recipes" },
    { type: "Restaurant", name: "Rooftop Bar", description: "Sunset views and cocktails" },
    { type: "Attraction", name: "Botanical Garden", description: "Beautiful flora and peaceful walks" },
  ])

  const interestOptions = ["Culture", "Food", "Adventure", "Relaxation", "History", "Nature", "Nightlife", "Shopping"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement trip creation
    console.log("Creating trip:", formData)
    // Redirect to itinerary builder for the new trip
    router.push("/itinerary/new-trip-id")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-sage-light">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-serif">Create a New Trip</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trip Details Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sage font-serif">Trip Details</CardTitle>
              <CardDescription>Tell us about your dream destination</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-sage">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    name="destination"
                    type="text"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="Where do you want to go?"
                    className="border-sage-pale focus:border-sage focus:ring-sage"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sage">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="border-sage-pale focus:border-sage focus:ring-sage"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sage">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="border-sage-pale focus:border-sage focus:ring-sage"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sage">
                    Budget Range
                  </Label>
                  <Select>
                    <SelectTrigger className="border-sage-pale focus:border-sage focus:ring-sage">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget ($0 - $1,000)</SelectItem>
                      <SelectItem value="mid">Mid-range ($1,000 - $3,000)</SelectItem>
                      <SelectItem value="luxury">Luxury ($3,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travelers" className="text-sage">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Travelers
                  </Label>
                  <Select>
                    <SelectTrigger className="border-sage-pale focus:border-sage focus:ring-sage">
                      <SelectValue placeholder="How many people?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Solo (1 person)</SelectItem>
                      <SelectItem value="2">Couple (2 people)</SelectItem>
                      <SelectItem value="3-4">Small group (3-4 people)</SelectItem>
                      <SelectItem value="5+">Large group (5+ people)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sage">Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.interests.includes(interest)
                            ? "bg-sage text-white"
                            : "border-sage text-sage hover:bg-sage-pale"
                        }`}
                        onClick={() => toggleInterest(interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-sage hover:bg-sage/90 text-white">
                  <Plane className="w-4 h-4 mr-2" />
                  Create Trip & Build Itinerary
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Suggestions Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sage font-serif">
                Suggestions for Places to Visit/Activities to Perform
              </CardTitle>
              <CardDescription>Based on your preferences, here are some recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="border border-sage-pale rounded-lg p-4 hover:bg-sage-pale/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sage">{suggestion.name}</h4>
                      <Badge variant="outline" className="border-sage text-sage text-xs">
                        {suggestion.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-sage/70 mb-3">{suggestion.description}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                    >
                      Add to Trip
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
