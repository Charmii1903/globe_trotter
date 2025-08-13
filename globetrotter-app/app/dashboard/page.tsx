"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Plus, Shield } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  const topDestinations = [
    { 
      name: "Paris, France", 
      image: "/paris-eiffel-tower.png", 
      rating: 4.8,
      slug: "paris-france",
      description: "Experience the romance and culture of the City of Light"
    },
    { 
      name: "Tokyo, Japan", 
      image: "/tokyo-skyline-night.png", 
      rating: 4.9,
      slug: "tokyo-japan",
      description: "Discover the perfect blend of tradition and modernity"
    },
    { 
      name: "Bali, Indonesia", 
      image: "/bali-beach-sunset.png", 
      rating: 4.7,
      slug: "bali-indonesia",
      description: "Relax on pristine beaches and explore ancient temples"
    },
    { 
      name: "New York, USA", 
      image: "/nyc-skyline-twilight.png", 
      rating: 4.6,
      slug: "new-york-usa",
      description: "Experience the energy and excitement of the Big Apple"
    },
  ]

  const previousTrips = [
    {
      id: "1",
      title: "European Adventure",
      destination: "Paris, Rome, Barcelona",
      date: "March 2024",
      status: "Completed",
      image: "/european-cities-collage.png",
      description: "A comprehensive tour of Europe's most iconic cities"
    },
    {
      id: "2",
      title: "Asian Discovery",
      destination: "Tokyo, Kyoto, Osaka",
      date: "January 2024",
      status: "Completed",
      image: "/japanese-temples-cities.png",
      description: "Immersive cultural experience in Japan"
    },
    {
      id: "3",
      title: "Beach Getaway",
      destination: "Maldives",
      date: "December 2023",
      status: "Completed",
      image: "/bali-beach-sunset.png",
      description: "Ultimate relaxation in tropical paradise"
    },
  ]

  const handleExploreDestination = (destination: any) => {
    router.push(`/destinations/${destination.slug}?name=${encodeURIComponent(destination.name)}&rating=${destination.rating}`)
  }

  const handleViewTripDetails = (trip: any) => {
    router.push(`/trips/${trip.id}?title=${encodeURIComponent(trip.title)}&destination=${encodeURIComponent(trip.destination)}&date=${encodeURIComponent(trip.date)}`)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif">GlobeTrotter</h1>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/trips" className="hover:underline">
              My Trips
            </Link>
            <Link href="/community" className="hover:underline">
              Community
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <Link href="/admin" className="hover:underline">
              <Shield className="w-4 h-4 inline mr-1" />
              Admin
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-sage bg-transparent"
            >
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Banner Section */}
        <Card className="relative overflow-hidden">
          <div className="relative h-64 bg-gradient-to-r from-sage to-sage-light">
            <img
              src="/serene-mountain-lake.png"
              alt="Travel Banner"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-sage/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-serif mb-4">Plan Your Next Adventure</h2>
                <p className="text-lg mb-6">Discover amazing destinations and create unforgettable memories</p>
                <Link href="/create-trip">
                  <Button size="lg" className="bg-white text-sage hover:bg-cream">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Trip
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Top Recommended Destinations */}
        <section>
          <h3 className="text-2xl font-serif text-sage mb-6">Top Recommended Destinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-sage text-white">⭐ {destination.rating}</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sage mb-2">{destination.name}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-sage text-sage hover:bg-sage-pale bg-transparent"
                    onClick={() => handleExploreDestination(destination)}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Previous Trips */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-serif text-sage">Previous Trips</h3>
            <Link href="/trips">
              <Button variant="outline" className="border-sage text-sage hover:bg-sage-pale bg-transparent">
                View All Trips
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousTrips.map((trip, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-40">
                  <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-2 right-2 bg-sage text-white">{trip.status}</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sage mb-2">{trip.title}</h4>
                  <div className="space-y-1 text-sm text-sage/70 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.date}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-sage text-sage hover:bg-sage-pale bg-transparent"
                    onClick={() => handleViewTripDetails(trip)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
