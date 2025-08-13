import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  firstName: string
  lastName: string
  imageUrl?: string
  size?: "sm" | "md" | "lg"
}

export function UserAvatar({ firstName, lastName, imageUrl, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-20 h-20 text-xl",
  }

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={imageUrl || "/placeholder.svg"} alt="Profile" />
      <AvatarFallback className="bg-sage text-white">
        {firstName[0]}
        {lastName[0]}
      </AvatarFallback>
    </Avatar>
  )
}
