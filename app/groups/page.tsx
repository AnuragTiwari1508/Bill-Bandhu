"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Users, Filter } from "lucide-react"
import { CreateGroupDialog } from "@/components/groups/create-group-dialog"
import { GroupCard } from "@/components/groups/group-card"
import Link from "next/link"

const initialGroups = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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

export default function GroupsPage() {
  const [groups, setGroups] = useState(initialGroups)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const handleGroupCreated = (newGroup: any) => {
    setGroups([newGroup, ...groups])
  }

  const handleEditGroup = (group: any) => {
    // In a real app, this would open an edit dialog
    console.log("Edit group:", group)
  }

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter((g) => g.id !== groupId))
  }

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && group.totalExpenses > 0
    if (activeTab === "settled") return matchesSearch && group.balance === 0
    if (activeTab === "pending") return matchesSearch && group.balance !== 0

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[family-name:var(--font-playfair)]">Groups</h1>
            </div>
          </div>
          <CreateGroupDialog onGroupCreated={handleGroupCreated} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
              Manage Your Groups
            </h2>
            <p className="text-muted-foreground">
              Organize your expenses across different groups of friends, family, and colleagues
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Groups ({groups.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({groups.filter((g) => g.totalExpenses > 0).length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({groups.filter((g) => g.balance !== 0).length})</TabsTrigger>
              <TabsTrigger value="settled">Settled ({groups.filter((g) => g.balance === 0).length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGroups.map((group) => (
                    <GroupCard key={group.id} group={group} onEdit={handleEditGroup} onDelete={handleDeleteGroup} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No groups found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first group to get started"}
                  </p>
                  {!searchTerm && <CreateGroupDialog onGroupCreated={handleGroupCreated} />}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
