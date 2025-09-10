"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowRight } from "lucide-react"

interface Group {
  id: string
  name: string
  members: number
  avatar: string
  membersList: Array<{ id: string; name: string; email: string; avatar?: string }>
}

interface GroupSelectorProps {
  onGroupSelected: (group: Group) => void
}

const availableGroups: Group[] = [
  {
    id: "1",
    name: "College Gang",
    members: 6,
    avatar: "/college-friends.png",
    membersList: [
      { id: "1", name: "You (Rahul)", email: "rahul@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "Priya Sharma", email: "priya@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Arjun Patel", email: "arjun@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Sneha Gupta", email: "sneha@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Vikram Singh", email: "vikram@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "6", name: "Anita Roy", email: "anita@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "2",
    name: "Roommates 203",
    members: 4,
    avatar: "/roommates.jpg",
    membersList: [
      { id: "1", name: "You (Rahul)", email: "rahul@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "7", name: "Amit Kumar", email: "amit@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "8", name: "Ravi Mehta", email: "ravi@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "9", name: "Suresh Yadav", email: "suresh@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "3",
    name: "Office Team",
    members: 8,
    avatar: "/diverse-office-team.png",
    membersList: [
      { id: "1", name: "You (Rahul)", email: "rahul@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "10", name: "Sarah Johnson", email: "sarah@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "11", name: "Mike Chen", email: "mike@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "12", name: "Lisa Wang", email: "lisa@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "13", name: "David Brown", email: "david@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "14", name: "Emma Davis", email: "emma@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "15", name: "Alex Wilson", email: "alex@example.com", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "16", name: "Maya Patel", email: "maya@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

export function GroupSelector({ onGroupSelected }: GroupSelectorProps) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group)
  }

  const handleProceed = () => {
    if (selectedGroup) {
      onGroupSelected(selectedGroup)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Select Group</span>
          </CardTitle>
          <CardDescription>Choose which group this expense belongs to</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableGroups.map((group) => (
              <div
                key={group.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedGroup?.id === group.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => handleSelectGroup(group)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar>
                    <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                    <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{group.name}</div>
                    <div className="text-sm text-muted-foreground">{group.members} members</div>
                  </div>
                  {selectedGroup?.id === group.id && (
                    <Badge variant="default" className="ml-auto">
                      Selected
                    </Badge>
                  )}
                </div>
                <div className="flex -space-x-2">
                  {group.membersList.slice(0, 4).map((member) => (
                    <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {group.members > 4 && (
                    <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                      +{group.members - 4}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedGroup && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Selected: {selectedGroup.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Ready to split expense among {selectedGroup.members} members
                  </div>
                </div>
                <Button onClick={handleProceed} size="lg">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
