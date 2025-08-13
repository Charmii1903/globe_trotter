"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, MapPin, Star, Clock } from "lucide-react"

interface SearchResult {
  id: string
  type: "activity" | "restaurant" | "attraction" | "accommodation"
  title: string
  description: string
  location: string
  rating: number
  price: string
  duration?: string
  image: string
  tags: string[]
}

export default function CommunitySearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const searchResults: SearchResult[] = [
    {
      id: "1",
      type: "activity",
      title: "Guided Walking Tour of Historic Paris",
      description: "Explore the charming streets of Montmartre and learn about Parisian history from a local guide.",
      location: "Paris, France",
      rating: 4.8,
      price: "$25",
      duration: "3 hours",
      image: "/paris-eiffel-tower.png",
      tags: ["History", "Walking", "Local Guide"],
    },
    {
      id: "2",
      type: "restaurant",
      title: "Authentic Ramen Experience",
      description: "Hidden gem ramen shop in Tokyo's backstreets, known for its rich tonkotsu broth.",
      location: "Tokyo, Japan",
      rating: 4.9,
      price: "$12",
      image: "/tokyo-skyline-night.png",
      tags: ["Authentic", "Local Favorite", "Ramen"],
    },
    {
      id: "3",
      type: "attraction",
      title: "Sunset Beach Yoga Session",
      description: "Relax and unwind with a peaceful yoga session on the beautiful beaches of Bali.",
      location: "Bali, Indonesia",
      rating: 4.7,
      price: "$15",
      duration: "1.5 hours",
      image: "/bali-beach-sunset.png",
      tags: ["Wellness", "Beach", "Sunset"],
    },
    {
      id: "4",
      type: "activity",
      title: "Central Park Photography Workshop",
      description: "Learn photography techniques while capturing the beauty of New York's most famous park.",
      location: "New York, USA",
      rating: 4.6,
      price: "$45",
      duration: "2 hours",
      image: "/nyc-skyline-twilight.png",
      tags: ["Photography", "Nature", "Workshop"],
    },
    {
      id: "5",
      type: "accommodation",
      title: "Cozy Boutique Hotel in Old Town",
      description: "Charming hotel with traditional architecture and modern amenities in the heart of the city.",
      location: "Prague, Czech Republic",
      rating: 4.5,
      price: "$89/night",
      image: "/placeholder.svg",
      tags: ["Boutique", "Historic", "Central"],
    },
    {
      id: "6",
      type: "restaurant",
      title: "Rooftop Tapas Bar",
      description: "Enjoy traditional Spanish tapas with stunning views of the Barcelona skyline.",
      location: "Barcelona, Spain",
      rating: 4.4,
      price: "$35",
      image: "/placeholder.svg",
      tags: ["Tapas", "Rooftop", "Views"],
    },
  ]

  const filteredResults = searchResults.filter((result) => {
    const matchesSearch =
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || result.type === selectedCategory
    const matchesLocation = selectedLocation === "all" || result.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  const getCategoryColor = (type: string) => {
    switch (type) {
      case "activity":
        return "bg-sage text-white"
      case "restaurant":
        return "bg-sage-light text-sage"
      case "attraction":
        return "bg-sage-pale text-sage"
      case "accommodation":
        return "bg-cream text-sage border border-sage"
      default:
        return "bg-sage text-white"
    }
  }

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case "activity":
        return "🎯"
      case "restaurant":
        return "🍽️"
      case "attraction":
        return "🏛️"
      case "accommodation":
        return "🏨"
      default:
        return "📍"
    }
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
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/community">
            <Button variant="ghost" size="sm" className="text-white hover:bg-sage-light">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community
            </Button>
          </Link>
          <h1 className="text-2xl font-serif">Activity & City Search</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sage font-serif">Find Your Perfect Experience</CardTitle>
            <CardDescription>Search for activities, restaurants, attractions, and accommodations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage/70 w-4 h-4" />
              <Input
                placeholder="Search for activities, places, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-sage-pale focus:border-sage focus:ring-sage"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-sage">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-sage-pale focus:border-sage focus:ring-sage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="activity">Activities</SelectItem>
                    <SelectItem value="restaurant">Restaurants</SelectItem>
                    <SelectItem value="attraction">Attractions</SelectItem>
                    <SelectItem value="accommodation">Accommodations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-sage">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="border-sage-pale focus:border-sage focus:ring-sage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Paris">Paris</SelectItem>
                    <SelectItem value="Tokyo">Tokyo</SelectItem>
                    <SelectItem value="Bali">Bali</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Barcelona">Barcelona</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-sage">Sort By</label>
                <Select defaultValue="rating">
                  <SelectTrigger className="border-sage-pale focus:border-sage focus:ring-sage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-sage">
              {filteredResults.length} Results {searchQuery && `for "${searchQuery}"`}
            </h2>
            <Button variant="outline" className="border-sage text-sage hover:bg-sage-pale bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result) => (
              <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={result.image || "/placeholder.svg"}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-2 left-2 ${getCategoryColor(result.type)}`}>
                    {getCategoryIcon(result.type)} {result.type}
                  </Badge>
                  <div className="absolute top-2 right-2 bg-white/90 rounded px-2 py-1">
                    <div className="flex items-center gap-1">
                      {renderStars(result.rating)}
                      <span className="text-sm font-medium text-sage ml-1">{result.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-sage mb-2">{result.title}</h3>
                  <p className="text-sm text-sage/80 mb-3 line-clamp-2">{result.description}</p>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-sage/70">
                      <MapPin className="w-4 h-4" />
                      <span>{result.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-sage">{result.price}</span>
                        {result.duration && (
                          <div className="flex items-center gap-1 text-sage/70">
                            <Clock className="w-3 h-3" />
                            <span>{result.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {result.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="border-sage-pale text-sage text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-sage hover:bg-sage/90 text-white">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
