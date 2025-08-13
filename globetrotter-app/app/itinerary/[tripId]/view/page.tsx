"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign, Edit } from "lucide-react"

interface ItineraryDay {
  date: string
  day: string
  activities: {
    id: string
    time: string
    title: string
    location: string
    cost: string
    category: "activity" | "restaurant" | "transport" | "accommodation"
    description?: string
  }[]
}

export default function ItineraryViewPage({ params }: { params: { tripId: string } }) {
  const [selectedDay, setSelectedDay] = useState("day1")

  const itinerary: ItineraryDay[] = [
    {
      date: "March 15, 2024",
      day: "Day 1",
      activities: [
        {
          id: "1",
          time: "09:00 AM",
          title: "Morning City Walk",
          location: "Downtown Historic District",
          cost: "Free",
          category: "activity",
          description: "Explore the historic downtown area and visit local markets",
        },
        {
          id: "2",
          time: "12:30 PM",
          title: "Lunch at Local Bistro",
          location: "Café de la Place",
          cost: "$25",
          category: "restaurant",
          description: "Try authentic local cuisine at this highly rated restaurant",
        },
        {
          id: "3",
          time: "02:00 PM",
          title: "Museum Visit",
          location: "National History Museum",
          cost: "$15",
          category: "activity",
          description: "Discover the rich history and culture at the national museum",
        },
        {
          id: "4",
          time: "07:00 PM",
          title: "Dinner & Evening Stroll",
          location: "Riverside District",
          cost: "$40",
          category: "restaurant",
          description: "Fine dining followed by a romantic walk along the river",
        },
      ],
    },
    {
      date: "March 16, 2024",
      day: "Day 2",
      activities: [
        {
          id: "5",
          time: "08:00 AM",
          title: "Hotel Breakfast",
          location: "Hotel Grand Plaza",
          cost: "Included",
          category: "restaurant",
        },
        {
          id: "6",
          time: "10:00 AM",
          title: "Guided City Tour",
          location: "City Center",
          cost: "$35",
          category: "activity",
          description: "Professional guide showing major landmarks and hidden gems",
        },
        {
          id: "7",
          time: "01:00 PM",
          title: "Traditional Market Visit",
          location: "Central Market",
          cost: "$20",
          category: "activity",
          description: "Shopping for local crafts and trying street food",
        },
        {
          id: "8",
          time: "06:30 PM",
          title: "Cultural Show",
          location: "National Theater",
          cost: "$50",
          category: "activity",
          description: "Traditional music and dance performance",
        },
      ],
    },
  ]

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

  const calculateDayTotal = (activities: ItineraryDay["activities"]) => {
    return activities.reduce((total, activity) => {
      const cost = activity.cost.replace(/[^0-9.]/g, "")
      return total + (cost ? Number.parseFloat(cost) : 0)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/itinerary/${params.tripId}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-sage-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Builder
              </Button>
            </Link>
            <h1 className="text-2xl font-serif">Itinerary View</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/itinerary/${params.tripId}/calendar`}>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-sage bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar View
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-serif text-sage mb-2">European Adventure</h2>
          <p className="text-sage/70">Paris, France • March 15-20, 2024</p>
        </div>

        <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="day1" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              Day 1
            </TabsTrigger>
            <TabsTrigger value="day2" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              Day 2
            </TabsTrigger>
          </TabsList>

          {itinerary.map((day, dayIndex) => (
            <TabsContent key={dayIndex} value={`day${dayIndex + 1}`} className="space-y-4">
              <Card className="border-sage-pale">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sage font-serif">{day.day}</CardTitle>
                      <p className="text-sage/70">{day.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-sage/70">Total Budget</p>
                      <p className="text-lg font-semibold text-sage">${calculateDayTotal(day.activities).toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="space-y-3">
                {day.activities.map((activity, activityIndex) => (
                  <Card key={activity.id} className="border-sage-pale hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-2xl mt-1">{getCategoryIcon(activity.category)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-sage">{activity.title}</h3>
                              <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-sage/70 mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{activity.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{activity.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>{activity.cost}</span>
                              </div>
                            </div>
                            {activity.description && <p className="text-sm text-sage/80">{activity.description}</p>}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-sage hover:bg-sage-pale">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
