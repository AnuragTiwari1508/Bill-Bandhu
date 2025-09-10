"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, TrendingUp, TrendingDown, Clock, Settings, MoreVertical, Receipt } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface GroupCardProps {
  group: {
    id: string
    name: string
    members: number
    totalExpenses: number
    yourShare: number
    balance: number
    lastActivity: string
    recentExpense: string
    avatar: string
  }
  onEdit?: (group: any) => void
  onDelete?: (groupId: string) => void
}

export function GroupCard({ group, onEdit, onDelete }: GroupCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
              <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{group.members} members</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={group.balance > 0 ? "default" : group.balance < 0 ? "destructive" : "secondary"}>
              {group.balance > 0 && <TrendingUp className="mr-1 h-3 w-3" />}
              {group.balance < 0 && <TrendingDown className="mr-1 h-3 w-3" />}₹{Math.abs(group.balance)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(group)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Group
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => onDelete?.(group.id)}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Delete Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
        <div className="flex space-x-2">
          <Link href={`/groups/${group.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
          <Link href={`/scan?group=${group.id}`}>
            <Button size="sm" className="px-3">
              <Receipt className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
