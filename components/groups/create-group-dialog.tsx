"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Users, X, UserPlus } from "lucide-react"

interface CreateGroupDialogProps {
  onGroupCreated: (group: any) => void
}

export function CreateGroupDialog({ onGroupCreated }: CreateGroupDialogProps) {
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [description, setDescription] = useState("")
  const [memberEmail, setMemberEmail] = useState("")
  const [members, setMembers] = useState<Array<{ id: string; name: string; email: string; avatar?: string }>>([
    { id: "1", name: "You", email: "rahul@example.com", avatar: "/placeholder.svg?height=32&width=32" },
  ])

  const handleAddMember = () => {
    if (memberEmail && !members.find((m) => m.email === memberEmail)) {
      const newMember = {
        id: Date.now().toString(),
        name: memberEmail.split("@")[0],
        email: memberEmail,
        avatar: `/placeholder.svg?height=32&width=32&text=${memberEmail.charAt(0).toUpperCase()}`,
      }
      setMembers([...members, newMember])
      setMemberEmail("")
    }
  }

  const handleRemoveMember = (id: string) => {
    if (id !== "1") {
      // Can't remove yourself
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      const newGroup = {
        id: Date.now().toString(),
        name: groupName,
        description,
        members: members.length,
        membersList: members,
        totalExpenses: 0,
        yourShare: 0,
        balance: 0,
        lastActivity: "Just created",
        recentExpense: "No expenses yet",
        avatar: `/placeholder.svg?height=40&width=40&text=${groupName.charAt(0).toUpperCase()}`,
        createdAt: new Date().toISOString(),
      }
      onGroupCreated(newGroup)
      setOpen(false)
      setGroupName("")
      setDescription("")
      setMembers([{ id: "1", name: "You", email: "rahul@example.com", avatar: "/placeholder.svg?height=32&width=32" }])
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Create New Group</span>
          </DialogTitle>
          <DialogDescription>
            Create a group to start splitting expenses with friends, family, or colleagues.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="e.g., College Friends, Roommates, Office Team"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the group"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <Label>Members ({members.length})</Label>

            <div className="flex space-x-2">
              <Input
                placeholder="Enter email address"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddMember()}
              />
              <Button onClick={handleAddMember} size="sm" variant="outline">
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 max-h-32 overflow-y-auto">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                  {member.id === "1" ? (
                    <Badge variant="secondary" className="text-xs">
                      You
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => handleRemoveMember(member.id)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={handleCreateGroup} className="flex-1" disabled={!groupName.trim()}>
              Create Group
            </Button>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
