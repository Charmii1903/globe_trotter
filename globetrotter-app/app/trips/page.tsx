import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Plus, Eye } from "lucide-react"

export default function TripsPage() {
  const upcomingTrips = [
    {
      title: "Summer in Greece",
      destination: "Athens, Santorini, Mykonos",
      startDate: "July 15, 2024",
      endDate: "July 28, 2024",
      status: "Upcoming",
      image: "/greek-islands-white-buildings-blue-sea.png",
    },
    {
      title: "Business Trip to London",
      destination: "London, UK",
      startDate: "June 10, 2024",
      endDate: "June 15, 2024",
      status: "Upcoming",
      image: "/london-big-ben-thames.png",
    },
  ]

  const completedTrips = [
    {
      title: "European Adventure",
      destination: "Paris, Rome, Barcelona",
      startDate: "March 5, 2024",
      endDate: "March 20, 2024",
      status: "Completed",
      image: "/european-cities-collage.png",
    },
    {
      title: "Asian Discovery",
      destination: "Tokyo, Kyoto, Osaka",
      startDate: "January 8, 2024",
      endDate: "January 22, 2024",
      status: "Completed",
      image: "/japanese-temples-cities.png",
    },
    {
      title: "Beach Getaway",
      destination: "Maldives",
      startDate: "December 15, 2023",
      endDate: "December 25, 2023",
      status: "Completed",
      image: "/placeholder-4wh2p.png",
    },
    {
      title: "Mountain Adventure",
      destination: "Swiss Alps",
      startDate: "October 10, 2023",
      endDate: "October 20, 2023",
      status: "Completed",
      image: "/swiss-alps-snow.png",
    },
  ]

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
            <h1 className="text-2xl font-serif">My Trips</h1>
          </div>
          <Link href="/create-trip">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-sage bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              New Trip
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Upcoming Trips */}
        <section>
          <h2 className="text-2xl font-serif text-sage mb-6">Upcoming Trips</h2>
          {upcomingTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <img
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-sage text-white">{trip.status}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sage mb-2">{trip.title}</h3>
                    <div className="space-y-1 text-sm text-sage/70 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {trip.startDate} - {trip.endDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-sage hover:bg-sage/90 text-white">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-sage text-sage hover:bg-sage-pale bg-transparent"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-sage/70 mb-4">No upcoming trips planned</p>
                <Link href="/create-trip">
                  <Button className="bg-sage hover:bg-sage/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Plan Your First Trip
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Completed Trips */}
        <section>
          <h2 className="text-2xl font-serif text-sage mb-6">Completed Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {completedTrips.map((trip, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-full object-cover" />
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
                      <span>{trip.startDate.split(",")[0]}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-sage text-sage hover:bg-sage-pale text-xs bg-transparent"
                  >
                    <Eye className="w-3 h-3 mr-1" />
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
