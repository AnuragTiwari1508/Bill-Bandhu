"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, TrendingUp, TrendingDown, Clock } from "lucide-react"
import Link from "next/link"

const groupData = [
  {
    id: 1,
    name: "College Gang",
    members: 6,
    totalExpenses: 12500,
    yourShare: 2100,
    balance: -450,
    lastActivity: "2 hours ago",
    recentExpense: "Dinner at Pizza Hut",
    avatar: "/college-friends.png",
  },
  {
    id: 2,
    name: "Roommates 203",
    members: 4,
    totalExpenses: 8900,
    yourShare: 2225,
    balance: 320,
    lastActivity: "1 day ago",
    recentExpense: "Electricity Bill",
    avatar: "/roommates.jpg",
  },
  {
    id: 3,
    name: "Office Team",
    members: 8,
    totalExpenses: 15600,
    yourShare: 1950,
    balance: -180,
    lastActivity: "3 days ago",
    recentExpense: "Team Lunch",
    avatar: "/diverse-office-team.png",
  },
  {
    id: 4,
    name: "Family House",
    members: 5,
    totalExpenses: 22400,
    yourShare: 4480,
    balance: 0,
    lastActivity: "5 days ago",
    recentExpense: "Grocery Shopping",
    avatar: "/diverse-family-portrait.png",
  },
]

export function GroupSummary() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Your Groups</h3>
        <Link href="/groups">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Manage Groups
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groupData.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                    <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.members} members</CardDescription>
                  </div>
                </div>
                <Badge variant={group.balance > 0 ? "default" : group.balance < 0 ? "destructive" : "secondary"}>
                  {group.balance > 0 && <TrendingUp className="mr-1 h-3 w-3" />}
                  {group.balance < 0 && <TrendingDown className="mr-1 h-3 w-3" />}₹{Math.abs(group.balance)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Expenses:</span>
                <span className="font-semibold">₹{group.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Your Share:</span>
                <span className="font-semibold">₹{group.yourShare.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {group.lastActivity}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Recent: {group.recentExpense}</div>
              <Link href={`/groups/${group.id}`}>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
