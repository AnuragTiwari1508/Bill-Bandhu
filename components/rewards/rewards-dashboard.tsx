"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Gift, Zap, Target, Users, Calendar, CreditCard } from "lucide-react"

const achievements = [
  { id: 1, name: "First Split", description: "Split your first bill", icon: Zap, earned: true, points: 50 },
  { id: 2, name: "Group Creator", description: "Create your first group", icon: Users, earned: true, points: 100 },
  { id: 3, name: "Bill Scanner", description: "Scan 5 bills using OCR", icon: Target, earned: true, points: 150 },
  {
    id: 4,
    name: "Payment Pro",
    description: "Make 10 UPI payments",
    icon: CreditCard,
    earned: false,
    points: 200,
    progress: 7,
  },
  {
    id: 5,
    name: "Monthly Master",
    description: "Use app for 30 consecutive days",
    icon: Calendar,
    earned: false,
    points: 300,
    progress: 18,
  },
  {
    id: 6,
    name: "Split Specialist",
    description: "Split 50 bills",
    icon: Trophy,
    earned: false,
    points: 500,
    progress: 23,
  },
]

const recentRewards = [
  { type: "Cashback", amount: "₹12", description: "Bill split with College Gang", date: "2 hours ago" },
  { type: "Points", amount: "150", description: "Achievement: Bill Scanner", date: "1 day ago" },
  { type: "Cashback", amount: "₹8", description: "Payment to Roommates group", date: "2 days ago" },
  { type: "Points", amount: "100", description: "Achievement: Group Creator", date: "3 days ago" },
]

export function RewardsDashboard() {
  const totalPoints = 1250
  const totalCashback = 156
  const currentLevel = 3
  const nextLevelPoints = 1500
  const progressToNext = (totalPoints / nextLevelPoints) * 100

  return (
    <div className="space-y-6">
      {/* Points & Level Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">Total Points</p>
                <p className="text-3xl font-bold text-emerald-900">{totalPoints.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Cashback</p>
                <p className="text-3xl font-bold text-blue-900">₹{totalCashback}</p>
              </div>
              <Gift className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Current Level</p>
                <p className="text-3xl font-bold text-purple-900">{currentLevel}</p>
                <p className="text-xs text-purple-600">Split Master</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {currentLevel}: Split Master</span>
              <span>
                {totalPoints} / {nextLevelPoints} points
              </span>
            </div>
            <Progress value={progressToNext} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {nextLevelPoints - totalPoints} points to reach Level {currentLevel + 1}: Bill Guru
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievement.earned ? "bg-emerald-100" : "bg-gray-100"}`}>
                      <Icon className={`h-4 w-4 ${achievement.earned ? "text-emerald-600" : "text-gray-400"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{achievement.name}</h4>
                        {achievement.earned && (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                            +{achievement.points}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {!achievement.earned && achievement.progress && (
                        <div className="mt-2">
                          <Progress
                            value={
                              (achievement.progress / (achievement.id === 4 ? 10 : achievement.id === 5 ? 30 : 50)) *
                              100
                            }
                            className="h-2"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {achievement.progress} / {achievement.id === 4 ? 10 : achievement.id === 5 ? 30 : 50}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Rewards */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${reward.type === "Cashback" ? "bg-green-100" : "bg-blue-100"}`}>
                    {reward.type === "Cashback" ? (
                      <Gift className="h-4 w-4 text-green-600" />
                    ) : (
                      <Star className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {reward.type === "Cashback" ? reward.amount : `${reward.amount} points`}
                    </p>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{reward.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redeem Points */}
      <Card>
        <CardHeader>
          <CardTitle>Redeem Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Gift className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <h4 className="font-medium">₹10 Cashback</h4>
              <p className="text-sm text-muted-foreground mb-3">500 points</p>
              <Button size="sm" className="w-full">
                Redeem
              </Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Gift className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <h4 className="font-medium">₹25 Cashback</h4>
              <p className="text-sm text-muted-foreground mb-3">1,000 points</p>
              <Button size="sm" className="w-full">
                Redeem
              </Button>
            </div>
            <div className="p-4 border rounded-lg text-center opacity-50">
              <Gift className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <h4 className="font-medium">₹50 Cashback</h4>
              <p className="text-sm text-muted-foreground mb-3">2,000 points</p>
              <Button size="sm" className="w-full" disabled>
                Need 750 more
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
