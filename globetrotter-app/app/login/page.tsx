"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual authentication
    console.log("Login attempt:", formData)
    router.push("/dashboard")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-sage">Welcome Back</CardTitle>
          <CardDescription className="text-sage">Sign in to continue your travel planning</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sage">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="border-sage-pale focus:border-sage focus:ring-sage"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sage">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="border-sage-pale focus:border-sage focus:ring-sage"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-sage hover:bg-sage/90 text-white">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-sage">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-sage hover:underline">
                Sign up
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
