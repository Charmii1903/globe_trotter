"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Clock, MapPin, DollarSign, Edit, Trash2, Calendar } from "lucide-react"

interface ItinerarySection {
  id: string
  title: string
  description: string
  time: string
  location: string
  cost: string
  category: "activity" | "restaurant" | "transport" | "accommodation"
}

export default function ItineraryBuilderPage({ params }: { params: { tripId: string } }) {
  const [sections, setSections] = useState<ItinerarySection[]>([
    {
      id: "1",
      title: "Morning City Walk",
      description: "Explore the historic downtown area and visit local markets",
      time: "09:00 AM",
      location: "Downtown Historic District",
      cost: "Free",
      category: "activity",
    },
    {
      id: "2",
      title: "Lunch at Local Bistro",
      description: "Try authentic local cuisine at this highly rated restaurant",
      time: "12:30 PM",
      location: "Café de la Place",
      cost: "$25",
      category: "restaurant",
    },
    {
      id: "3",
      title: "Museum Visit",
      description: "Discover the rich history and culture at the national museum",
      time: "02:00 PM",
      location: "National History Museum",
      cost: "$15",
      category: "activity",
    },
  ])

  const [newSection, setNewSection] = useState<Partial<ItinerarySection>>({
    title: "",
    description: "",
    time: "",
    location: "",
    cost: "",
    category: "activity",
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const addSection = () => {
    if (newSection.title && newSection.time) {
      const section: ItinerarySection = {
        id: Date.now().toString(),
        title: newSection.title || "",
        description: newSection.description || "",
        time: newSection.time || "",
        location: newSection.location || "",
        cost: newSection.cost || "",
        category: (newSection.category as ItinerarySection["category"]) || "activity",
      }
      setSections([...sections, section])
      setNewSection({
        title: "",
        description: "",
        time: "",
        location: "",
        cost: "",
        category: "activity",
      })
      setShowAddForm(false)
    }
  }

  const removeSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "activity":
        return "bg-sage text-white"
      case "restaurant":
        return "bg-sage-light text-sage"
      case "transport":
        return "bg-sage-pale text-sage"
      case "accommodation":
        return "bg-cream text-sage border border-sage"
      default:
        return "bg-sage text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "activity":
        return "🎯"
      case "restaurant":
        return "🍽️"
      case "transport":
        return "🚗"
      case "accommodation":
        return "🏨"
      default:
        return "📍"
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/trips">
              <Button variant="ghost" size="sm" className="text-white hover:bg-sage-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trips
              </Button>
            </Link>
            <h1 className="text-2xl font-serif">Build Itinerary</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/itinerary/${params.tripId}/view`}>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-sage bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-serif text-sage mb-2">European Adventure - Day 1</h2>
          <p className="text-sage/70">Paris, France • March 15, 2024</p>
        </div>

        {/* Itinerary Sections */}
        <div className="space-y-4 mb-6">
          {sections.map((section, index) => (
            <Card key={section.id} className="border-sage-pale">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getCategoryIcon(section.category)}</div>
                    <div>
                      <CardTitle className="text-sage text-lg">{section.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-sage/70 mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{section.time}</span>
                        </div>
                        {section.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{section.location}</span>
                          </div>
                        )}
                        {section.cost && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{section.cost}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(section.category)}>{section.category}</Badge>
                    <Button variant="ghost" size="sm" className="text-sage hover:bg-sage-pale">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => removeSection(section.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {section.description && (
                <CardContent className="pt-0">
                  <p className="text-sage/80">{section.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Add New Section */}
        {showAddForm ? (
          <Card className="border-sage">
            <CardHeader>
              <CardTitle className="text-sage">Add New Section</CardTitle>
              <CardDescription>Add an activity, meal, or other item to your itinerary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sage">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newSection.title || ""}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                    placeholder="Activity or location name"
                    className="border-sage-pale focus:border-sage focus:ring-sage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sage">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={newSection.time || ""}
                    onChange={(e) => setNewSection({ ...newSection, time: e.target.value })}
                    className="border-sage-pale focus:border-sage focus:ring-sage"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sage">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newSection.description || ""}
                  onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                  placeholder="Brief description of the activity"
                  className="border-sage-pale focus:border-sage focus:ring-sage"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sage">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newSection.location || ""}
                    onChange={(e) => setNewSection({ ...newSection, location: e.target.value })}
                    placeholder="Address or area"
                    className="border-sage-pale focus:border-sage focus:ring-sage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost" className="text-sage">
                    Cost
                  </Label>
                  <Input
                    id="cost"
                    value={newSection.cost || ""}
                    onChange={(e) => setNewSection({ ...newSection, cost: e.target.value })}
                    placeholder="$0 or Free"
                    className="border-sage-pale focus:border-sage focus:ring-sage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sage">
                    Category
                  </Label>
                  <Select
                    value={newSection.category}
                    onValueChange={(value) =>
                      setNewSection({ ...newSection, category: value as ItinerarySection["category"] })
                    }
                  >
                    <SelectTrigger className="border-sage-pale focus:border-sage focus:ring-sage">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="accommodation">Accommodation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={addSection} className="bg-sage hover:bg-sage/90 text-white">
                  Add Section
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-sage hover:bg-sage/90 text-white border-2 border-dashed border-sage-pale bg-transparent text-sage hover:bg-sage-pale"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Section
          </Button>
        )}
      </div>
    </div>
  )
}
