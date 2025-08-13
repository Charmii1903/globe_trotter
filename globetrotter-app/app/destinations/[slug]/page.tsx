"use client"

import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, ArrowLeft } from "lucide-react"

type DestinationData = {
  name: string
  image: string
  rating: number
  description: string
  highlights: string[]
  bestTime: string
  currency: string
  language: string
}

const destinationData: Record<string, DestinationData> = {
  "paris-france": {
    name: "Paris, France",
    image: "/paris-eiffel-tower.png",
    rating: 4.8,
    description: "Experience the romance and culture of the City of Light. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise", "Montmartre", "Champs-Élysées"],
    bestTime: "April to June, September to November",
    currency: "EUR",
    language: "French"
  },
  "tokyo-japan": {
    name: "Tokyo, Japan",
    image: "/tokyo-skyline-night.png",
    rating: 4.9,
    description: "Discover the perfect blend of tradition and modernity. Experience cutting-edge technology alongside ancient temples and traditional culture.",
    highlights: ["Senso-ji Temple", "Tokyo Skytree", "Shibuya Crossing", "Meiji Shrine", "Tsukiji Market"],
    bestTime: "March to May, September to November",
    currency: "JPY",
    language: "Japanese"
  },
  "bali-indonesia": {
    name: "Bali, Indonesia",
    image: "/bali-beach-sunset.png",
    rating: 4.7,
    description: "Relax on pristine beaches and explore ancient temples. Experience the spiritual culture and natural beauty of the Island of Gods.",
    highlights: ["Tanah Lot Temple", "Ubud Monkey Forest", "Tegallalang Rice Terraces", "Uluwatu Temple", "Seminyak Beach"],
    bestTime: "April to October",
    currency: "IDR",
    language: "Indonesian"
  },
  "new-york-usa": {
    name: "New York, USA",
    image: "/nyc-skyline-twilight.png",
    rating: 4.6,
    description: "Experience the energy and excitement of the Big Apple. From Broadway shows to Central Park, there's something for everyone in this vibrant metropolis.",
    highlights: ["Statue of Liberty", "Central Park", "Empire State Building", "Times Square", "Brooklyn Bridge"],
    bestTime: "April to June, September to November",
    currency: "USD",
    language: "English"
  }
}

export default function DestinationDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  
  const slug = params.slug as string
  const name = searchParams.get('name') || "Destination"
  const rating = searchParams.get('rating') || "0"

  const destination = destinationData[slug] ?? {
    name,
    image: "/placeholder.svg",
    rating: parseFloat(rating),
    description: "Explore this amazing destination",
    highlights: ["Explore", "Discover", "Experience"],
    bestTime: "Year-round",
    currency: "Local",
    language: "Local"
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-sage text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-sage/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-serif">{destination.name}</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <Card className="overflow-hidden">
          <div className="relative h-96">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <h2 className="text-4xl font-serif mb-2">{destination.name}</h2>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">{destination.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Destination Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-sage mb-4">About {destination.name}</h3>
                <p className="text-sage/80 leading-relaxed">{destination.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-sage mb-4">Top Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sage" />
                      <span className="text-sage/80">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-sage mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sage/70">Best Time to Visit:</span>
                    <span className="text-sage">{destination.bestTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Currency:</span>
                    <span className="text-sage">{destination.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage/70">Language:</span>
                    <span className="text-sage">{destination.language}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-sage mb-4">Plan Your Trip</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-sage text-white hover:bg-sage/90">
                    Create Trip to {destination.name}
                  </Button>
                  <Button variant="outline" className="w-full border-sage text-sage hover:bg-sage-pale">
                    View Sample Itinerary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
