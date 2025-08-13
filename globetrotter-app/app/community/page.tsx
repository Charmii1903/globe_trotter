"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MessageCircle, Heart, Share2, Search, Plus, MapPin, Calendar, Users } from "lucide-react"

interface CommunityPost {
  id: string
  author: {
    name: string
    avatar: string
    location: string
  }
  title: string
  content: string
  image?: string
  category: string
  likes: number
  comments: number
  timeAgo: string
  tags: string[]
}

interface TravelTip {
  id: string
  author: {
    name: string
    avatar: string
  }
  destination: string
  tip: string
  category: "budget" | "food" | "transport" | "culture" | "safety"
  likes: number
  timeAgo: string
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  const communityPosts: CommunityPost[] = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        location: "San Francisco, CA",
      },
      title: "Amazing 2-week European Adventure - Tips & Highlights!",
      content:
        "Just got back from an incredible 2-week trip through Europe! Visited Paris, Rome, and Barcelona. Here are my top recommendations and budget tips for anyone planning a similar journey...",
      image: "/european-cities-collage.png",
      category: "Trip Report",
      likes: 24,
      comments: 8,
      timeAgo: "2 hours ago",
      tags: ["Europe", "Budget Travel", "Solo Travel"],
    },
    {
      id: "2",
      author: {
        name: "Mike Chen",
        avatar: "/placeholder.svg",
        location: "Tokyo, Japan",
      },
      title: "Hidden Gems in Tokyo - Local's Perspective",
      content:
        "As a Tokyo local, I want to share some amazing spots that most tourists miss. These places offer authentic experiences and are perfect for travelers who want to see the real Japan...",
      image: "/tokyo-skyline-night.png",
      category: "Local Tips",
      likes: 42,
      comments: 15,
      timeAgo: "5 hours ago",
      tags: ["Tokyo", "Local Tips", "Hidden Gems"],
    },
    {
      id: "3",
      author: {
        name: "Emma Rodriguez",
        avatar: "/placeholder.svg",
        location: "Barcelona, Spain",
      },
      title: "Solo Female Travel Safety Tips for Southeast Asia",
      content:
        "Recently completed a 3-month solo journey through Thailand, Vietnam, and Cambodia. Here's everything I learned about staying safe while having the adventure of a lifetime...",
      category: "Safety & Tips",
      likes: 67,
      comments: 23,
      timeAgo: "1 day ago",
      tags: ["Solo Travel", "Safety", "Southeast Asia", "Female Travel"],
    },
  ]

  const travelTips: TravelTip[] = [
    {
      id: "1",
      author: { name: "Alex Thompson", avatar: "/placeholder.svg" },
      destination: "Paris, France",
      tip: "Visit the Eiffel Tower early morning (7 AM) to avoid crowds and get the best photos. The golden hour lighting is incredible!",
      category: "culture",
      likes: 15,
      timeAgo: "3 hours ago",
    },
    {
      id: "2",
      author: { name: "Lisa Park", avatar: "/placeholder.svg" },
      destination: "Bangkok, Thailand",
      tip: "Use the BTS Skytrain instead of taxis during rush hour. It's faster, cheaper, and you'll avoid the notorious Bangkok traffic.",
      category: "transport",
      likes: 28,
      timeAgo: "6 hours ago",
    },
    {
      id: "3",
      author: { name: "David Wilson", avatar: "/placeholder.svg" },
      destination: "Rome, Italy",
      tip: "Book Vatican Museums tickets online in advance. Skip-the-line tickets are worth every penny, especially during peak season.",
      category: "culture",
      likes: 22,
      timeAgo: "12 hours ago",
    },
    {
      id: "4",
      author: { name: "Maria Garcia", avatar: "/placeholder.svg" },
      destination: "Bali, Indonesia",
      tip: "Eat at local warungs instead of tourist restaurants. You'll get authentic food for 1/3 of the price and support local families.",
      category: "food",
      likes: 35,
      timeAgo: "1 day ago",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "trip report":
        return "bg-sage text-white"
      case "local tips":
        return "bg-sage-light text-sage"
      case "safety & tips":
        return "bg-sage-pale text-sage"
      case "budget":
        return "bg-green-100 text-green-800"
      case "food":
        return "bg-orange-100 text-orange-800"
      case "transport":
        return "bg-blue-100 text-blue-800"
      case "culture":
        return "bg-purple-100 text-purple-800"
      case "safety":
        return "bg-red-100 text-red-800"
      default:
        return "bg-sage text-white"
    }
  }

  const handleNewPost = () => {
    if (newPostContent.trim()) {
      // TODO: Implement post creation
      console.log("Creating new post:", newPostContent)
      setNewPostContent("")
      setShowNewPostForm(false)
    }
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
            <h1 className="text-2xl font-serif">Travel Community</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-sage-light border-sage-light text-white placeholder:text-white/70 focus:bg-white focus:text-sage"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="discussions" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Travel Tips
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-sage data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            {/* New Post Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sage font-serif">Share Your Travel Experience</CardTitle>
                  <Button
                    onClick={() => setShowNewPostForm(!showNewPostForm)}
                    className="bg-sage hover:bg-sage/90 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              {showNewPostForm && (
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Share your travel story, tips, or ask for advice..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="border-sage-pale focus:border-sage focus:ring-sage min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleNewPost} className="bg-sage hover:bg-sage/90 text-white">
                      Post
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewPostForm(false)}
                      className="border-sage text-sage hover:bg-sage-pale bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback className="bg-sage text-white">
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-sage">{post.author.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-sage/70">
                            <MapPin className="w-3 h-3" />
                            <span>{post.author.location}</span>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sage text-lg mb-2">{post.title}</h4>
                      <p className="text-sage/80">{post.content}</p>
                    </div>

                    {post.image && (
                      <div className="relative h-48 rounded-lg overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-sage-pale text-sage text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-sage-pale">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-sage hover:bg-sage-pale">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sage hover:bg-sage-pale">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-sage hover:bg-sage-pale">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Travel Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sage font-serif">Quick Travel Tips</CardTitle>
                <CardDescription>Bite-sized advice from experienced travelers</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {travelTips.map((tip) => (
                <Card key={tip.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={tip.author.avatar || "/placeholder.svg"} alt={tip.author.name} />
                          <AvatarFallback className="bg-sage text-white text-sm">
                            {tip.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sage text-sm">{tip.author.name}</p>
                          <p className="text-xs text-sage/70">{tip.timeAgo}</p>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(tip.category)} variant="outline">
                        {tip.category}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3 text-sage" />
                        <span className="font-semibold text-sage text-sm">{tip.destination}</span>
                      </div>
                      <p className="text-sage/80 text-sm">{tip.tip}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="text-sage hover:bg-sage-pale">
                        <Heart className="w-3 h-3 mr-1" />
                        {tip.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-sage hover:bg-sage-pale">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sage font-serif">Upcoming Travel Events</CardTitle>
                <CardDescription>Connect with fellow travelers at meetups and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-sage-pale rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sage">Tokyo Travel Meetup</h4>
                      <Badge className="bg-sage text-white">Upcoming</Badge>
                    </div>
                    <p className="text-sage/80 text-sm mb-3">
                      Join fellow travelers for a casual meetup in Tokyo. Share experiences, get local tips, and make
                      new friends!
                    </p>
                    <div className="flex items-center gap-4 text-sm text-sage/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>March 25, 2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Shibuya, Tokyo</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>12 attending</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-sage-pale rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sage">European Backpacking Workshop</h4>
                      <Badge className="bg-sage text-white">Upcoming</Badge>
                    </div>
                    <p className="text-sage/80 text-sm mb-3">
                      Learn the essentials of backpacking through Europe on a budget. Tips on routes, accommodations,
                      and must-see destinations.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-sage/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>March 30, 2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Online Event</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>45 attending</span>
                      </div>
                    </div>
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
