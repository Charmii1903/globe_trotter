"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  time: string
  category: "activity" | "restaurant" | "transport" | "accommodation"
  cost: string
}

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}

export default function CalendarViewPage({ params }: { params: { tripId: string } }) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)) // March 2024

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Sample events for the trip
  const tripEvents: { [key: string]: CalendarEvent[] } = {
    "15": [
      { id: "1", title: "City Walk", time: "9:00 AM", category: "activity", cost: "Free" },
      { id: "2", title: "Bistro Lunch", time: "12:30 PM", category: "restaurant", cost: "$25" },
      { id: "3", title: "Museum Visit", time: "2:00 PM", category: "activity", cost: "$15" },
    ],
    "16": [
      { id: "4", title: "Hotel Breakfast", time: "8:00 AM", category: "restaurant", cost: "Included" },
      { id: "5", title: "City Tour", time: "10:00 AM", category: "activity", cost: "$35" },
      { id: "6", title: "Market Visit", time: "1:00 PM", category: "activity", cost: "$20" },
    ],
    "17": [
      { id: "7", title: "Day Trip", time: "9:00 AM", category: "transport", cost: "$50" },
      { id: "8", title: "Countryside Tour", time: "10:00 AM", category: "activity", cost: "$40" },
    ],
  }

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: CalendarDay[] = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const dayNumber = date.getDate()
      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === today.toDateString()
      const events = tripEvents[dayNumber.toString()] || []

      days.push({
        date: dayNumber,
        isCurrentMonth,
        isToday,
        events,
      })
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "activity":
        return "bg-sage"
      case "restaurant":
        return "bg-sage-light"
      case "transport":
        return "bg-sage-pale"
      case "accommodation":
        return "bg-cream border border-sage"
      default:
        return "bg-sage"
    }
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/itinerary/${params.tripId}/view`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-sage-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Itinerary
              </Button>
            </Link>
            <h1 className="text-2xl font-serif">Calendar View</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-xl font-serif text-sage mb-2">European Adventure</h2>
          <p className="text-sage/70">Trip Schedule Overview</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sage font-serif flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                  className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                  className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-2 text-center font-semibold text-sage border-b border-sage-pale">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-sage-pale/50 ${
                    day.isCurrentMonth ? "bg-white" : "bg-sage-pale/20"
                  } ${day.isToday ? "ring-2 ring-sage" : ""}`}
                >
                  <div
                    className={`text-sm font-medium mb-2 ${
                      day.isCurrentMonth ? "text-sage" : "text-sage/40"
                    } ${day.isToday ? "text-sage font-bold" : ""}`}
                  >
                    {day.date}
                  </div>
                  <div className="space-y-1">
                    {day.events.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white ${getCategoryColor(event.category)} truncate`}
                      >
                        <div className="font-medium">{event.time}</div>
                        <div>{event.title}</div>
                      </div>
                    ))}
                    {day.events.length > 3 && (
                      <div className="text-xs text-sage/70 font-medium">+{day.events.length - 3} more</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sage font-serif text-lg">Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-sage rounded"></div>
                <span className="text-sm text-sage">Activities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-sage-light rounded"></div>
                <span className="text-sm text-sage">Restaurants</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-sage-pale rounded"></div>
                <span className="text-sm text-sage">Transport</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cream border border-sage rounded"></div>
                <span className="text-sm text-sage">Accommodation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
