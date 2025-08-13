"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    country: "",
    additionalInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual registration
    console.log("Registration attempt:", formData)
    router.push("/dashboard")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-sage">Join GlobeTrotter</CardTitle>
          <CardDescription className="text-sage">Create your account to start planning amazing trips</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sage">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border-sage-pale focus:border-sage focus:ring-sage"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sage">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border-sage-pale focus:border-sage focus:ring-sage"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sage">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-sage-pale focus:border-sage focus:ring-sage"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sage">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border-sage-pale focus:border-sage focus:ring-sage"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sage">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className="border-sage-pale focus:border-sage focus:ring-sage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sage">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  className="border-sage-pale focus:border-sage focus:ring-sage"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-sage">
                Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="border-sage-pale focus:border-sage focus:ring-sage min-h-[80px]"
                placeholder="Tell us about your travel preferences..."
              />
            </div>

            <Button type="submit" className="w-full bg-sage hover:bg-sage/90 text-white">
              Register User
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-sage">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-sage hover:underline">
                Sign in
              </Link>
            </p>
            <Link href="/" className="text-xs text-sage/70 hover:underline mt-2 block">
              Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
