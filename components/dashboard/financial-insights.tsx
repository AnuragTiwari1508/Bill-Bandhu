"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, CheckCircle } from "lucide-react"

const insights = [
  {
    title: "Monthly Budget Status",
    description: "You've spent 78% of your monthly budget",
    value: 78,
    status: "warning",
    icon: Target,
    details: "₹15,600 of ₹20,000 budget used",
  },
  {
    title: "Spending Trend",
    description: "Your expenses increased by 12% this month",
    value: 12,
    status: "increase",
    icon: TrendingUp,
    details: "Compared to last month",
  },
  {
    title: "Settlement Rate",
    description: "You've settled 85% of your expenses on time",
    value: 85,
    status: "good",
    icon: CheckCircle,
    details: "Great job maintaining good payment habits!",
  },
  {
    title: "Group Activity",
    description: "Most active group: College Gang",
    value: 45,
    status: "neutral",
    icon: TrendingUp,
    details: "45% of total expenses from this group",
  },
]

const savingsGoals = [
  {
    name: "Emergency Fund",
    current: 25000,
    target: 50000,
    progress: 50,
  },
  {
    name: "Vacation Fund",
    current: 8500,
    target: 30000,
    progress: 28,
  },
  {
    name: "New Laptop",
    current: 35000,
    target: 80000,
    progress: 44,
  },
]

export function FinancialInsights() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Financial Insights</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Icon
                    className={`h-5 w-5 ${
                      insight.status === "warning"
                        ? "text-yellow-500"
                        : insight.status === "increase"
                          ? "text-red-500"
                          : insight.status === "good"
                            ? "text-green-500"
                            : "text-blue-500"
                    }`}
                  />
                  <Badge
                    variant={
                      insight.status === "warning"
                        ? "secondary"
                        : insight.status === "increase"
                          ? "destructive"
                          : insight.status === "good"
                            ? "default"
                            : "outline"
                    }
                  >
                    {insight.value}%
                  </Badge>
                </div>
                <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs mb-2">{insight.description}</CardDescription>
                <Progress value={insight.value} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">{insight.details}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Savings Goals</CardTitle>
          <CardDescription>Track your progress towards financial goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {savingsGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                </span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {goal.progress}% complete • ₹{(goal.target - goal.current).toLocaleString()} remaining
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
