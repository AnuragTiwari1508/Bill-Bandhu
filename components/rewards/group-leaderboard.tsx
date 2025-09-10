"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    name: "Rahul Sharma",
    avatar: "/avatars/rahul.jpg",
    points: 2450,
    bills: 34,
    savings: 1250,
    badge: "Split Champion",
  },
  {
    rank: 2,
    name: "You",
    avatar: "/avatars/you.jpg",
    points: 1250,
    bills: 23,
    savings: 890,
    badge: "Split Master",
    isCurrentUser: true,
  },
  {
    rank: 3,
    name: "Priya Patel",
    avatar: "/avatars/priya.jpg",
    points: 980,
    bills: 18,
    savings: 650,
    badge: "Bill Tracker",
  },
  {
    rank: 4,
    name: "Arjun Singh",
    avatar: "/avatars/arjun.jpg",
    points: 750,
    bills: 15,
    savings: 420,
    badge: "Split Starter",
  },
  {
    rank: 5,
    name: "Sneha Gupta",
    avatar: "/avatars/sneha.jpg",
    points: 650,
    bills: 12,
    savings: 380,
    badge: "Split Starter",
  },
]

const groupStats = [
  { label: "Total Bills Split", value: "102", icon: TrendingUp },
  { label: "Total Savings", value: "₹3,590", icon: Trophy },
  { label: "Active Members", value: "5", icon: Award },
]

export function GroupLeaderboard() {
  return (
    <div className="space-y-6">
      {/* Group Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groupStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            College Gang Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  user.isCurrentUser ? "border-emerald-200 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8">
                  {user.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500" />}
                  {user.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
                  {user.rank === 3 && <Award className="h-5 w-5 text-amber-600" />}
                  {user.rank > 3 && <span className="text-lg font-bold text-muted-foreground">{user.rank}</span>}
                </div>

                {/* Avatar */}
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{user.name}</h4>
                    {user.isCurrentUser && (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.badge}</p>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <p className="font-bold text-emerald-600">{user.points.toLocaleString()} pts</p>
                  <p className="text-xs text-muted-foreground">
                    {user.bills} bills • ₹{user.savings} saved
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Challenge */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">Monthly Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-purple-900">Split 20 bills this month</h4>
              <Badge className="bg-purple-100 text-purple-700">15/20</Badge>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <p className="text-sm text-purple-700">
              Complete this challenge to earn 500 bonus points and unlock the "Monthly Master" badge!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
