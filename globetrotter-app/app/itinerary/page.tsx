"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, DollarSign, ArrowLeft } from "lucide-react"

export default function ItineraryPage() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch trips from API
    fetch('/api/trips')
      .then(res => res.json())
      .then(data => setTrips(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <h1 className="text-2xl font-serif">Your Itinerary</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-sage">Loading your trips...</p>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sage">No trips yet. Create your first trip to get started!</p>
            <Link href="/create-trip">
              <Button className="mt-4 bg-sage hover:bg-sage/90 text-white">
                Create Your First Trip
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-sage">{trip.title}</CardTitle>
                  <CardDescription>{trip.destination}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sage" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sage" />
                      <span>{trip.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-sage" />
                      <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-sage" />
                      <span>{trip.budget}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/itinerary/${trip.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-sage" />
                      <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-sage" />
                      <span>{trip.budget}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/itinerary/${trip.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
