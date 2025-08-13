import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif text-sage mb-2">GlobeTrotter</CardTitle>
          <CardDescription className="text-sage">Empowering Personalized Travel Planning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-6">
            <img src="/bali-beach-sunset.png" alt="GlobeTrotter Logo" className="mx-auto mb-4 rounded-xl" />
            <p className="text-sm text-sage">
              Plan your perfect journey with personalized recommendations and community insights
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/login" className="block">
              <Button className="w-full bg-sage hover:bg-sage/90 text-white">Sign In</Button>
            </Link>

            <Link href="/register" className="block">
              <Button variant="outline" className="w-full border-sage text-sage hover:bg-sage-pale bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-sage/70">Join thousands of travelers planning their dream trips</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
