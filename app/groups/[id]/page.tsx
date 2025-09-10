"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Receipt, CreditCard, Settings, UserPlus, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for group details
const groupDetails = {
  "1": {
    id: "1",
    name: "College Gang",
    description: "Our awesome college friend group for all hangouts and trips",
    members: [
      {
        id: "1",
        name: "You (Rahul)",
        email: "rahul@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        balance: -450,
        isYou: true,
      },
      {
        id: "2",
        name: "Priya Sharma",
        email: "priya@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        balance: 200,
      },
      {
        id: "3",
        name: "Arjun Patel",
        email: "arjun@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        balance: 150,
      },
      {
        id: "4",
        name: "Sneha Gupta",
        email: "sneha@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        balance: -100,
      },
      {
        id: "5",
        name: "Vikram Singh",
        email: "vikram@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        balance: 300,
      },
      {
        id: "6",
        name: "Anita Roy",
        email: "anita@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        balance: -100,
      },
    ],
    totalExpenses: 12500,
    yourShare: 2100,
    balance: -450,
    createdAt: "2023-09-15",
    expenses: [
      {
        id: "1",
        title: "Dinner at Pizza Hut",
        amount: 1568,
        date: "2024-01-15",
        paidBy: "Priya Sharma",
        participants: 4,
        category: "Food & Dining",
        status: "settled",
      },
      {
        id: "2",
        title: "Movie Night - Multiplex",
        amount: 2400,
        date: "2024-01-12",
        paidBy: "You",
        participants: 6,
        category: "Entertainment",
        status: "pending",
      },
      {
        id: "3",
        title: "Uber to Airport",
        amount: 850,
        date: "2024-01-10",
        paidBy: "Vikram Singh",
        participants: 3,
        category: "Transportation",
        status: "settled",
      },
    ],
  },
}

export default function GroupDetailPage() {
  const params = useParams()
  const groupId = params.id as string
  const group = groupDetails[groupId as keyof typeof groupDetails]
  const [activeTab, setActiveTab] = useState("overview")

  if (!group) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Group not found</h2>
          <p className="text-muted-foreground mb-4">The group you're looking for doesn't exist.</p>
          <Link href="/groups">
            <Button>Back to Groups</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/groups">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Groups
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/college-friends.png" alt={group.name} />
                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-primary font-[family-name:var(--font-playfair)]">{group.name}</h1>
                <p className="text-sm text-muted-foreground">{group.members.length} members</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="balances">Balances</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary">₹{group.totalExpenses.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Expenses</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-secondary">₹{group.yourShare.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Your Share</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div
                      className={`text-2xl font-bold ${group.balance < 0 ? "text-red-500" : group.balance > 0 ? "text-green-500" : "text-muted-foreground"}`}
                    >
                      ₹{Math.abs(group.balance)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {group.balance < 0 ? "You Owe" : group.balance > 0 ? "You're Owed" : "Settled"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Expenses</CardTitle>
                    <CardDescription>Latest transactions in this group</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {group.expenses.slice(0, 3).map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Receipt className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{expense.title}</div>
                            <div className="text-sm text-muted-foreground flex items-center space-x-2">
                              <Calendar className="h-3 w-3" />
                              <span>{expense.date}</span>
                              <span>•</span>
                              <span>Paid by {expense.paidBy}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{expense.amount}</div>
                          <Badge variant={expense.status === "settled" ? "default" : "secondary"} className="text-xs">
                            {expense.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Group Info</CardTitle>
                    <CardDescription>Details about this group</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Description</div>
                      <div className="text-sm text-muted-foreground">{group.description}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium mb-1">Created</div>
                      <div className="text-sm text-muted-foreground">{group.createdAt}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium mb-1">Members</div>
                      <div className="flex -space-x-2">
                        {group.members.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {group.members.length > 5 && (
                          <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                            +{group.members.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="expenses">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Expenses</CardTitle>
                      <CardDescription>Complete expense history for this group</CardDescription>
                    </div>
                    <Link href={`/scan?group=${groupId}`}>
                      <Button>
                        <Receipt className="mr-2 h-4 w-4" />
                        Add Expense
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Receipt className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{expense.title}</div>
                            <div className="text-sm text-muted-foreground flex items-center space-x-2">
                              <Calendar className="h-3 w-3" />
                              <span>{expense.date}</span>
                              <span>•</span>
                              <span>{expense.participants} participants</span>
                              <span>•</span>
                              <span>{expense.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lg">₹{expense.amount}</div>
                          <div className="text-sm text-muted-foreground">Paid by {expense.paidBy}</div>
                          <Badge
                            variant={expense.status === "settled" ? "default" : "secondary"}
                            className="text-xs mt-1"
                          >
                            {expense.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Group Members</CardTitle>
                      <CardDescription>Manage members in this group</CardDescription>
                    </div>
                    <Button variant="outline">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center space-x-2">
                              <span>{member.name}</span>
                              {member.isYou && (
                                <Badge variant="secondary" className="text-xs">
                                  You
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-semibold ${member.balance < 0 ? "text-red-500" : member.balance > 0 ? "text-green-500" : "text-muted-foreground"}`}
                          >
                            {member.balance !== 0 && (
                              <>
                                {member.balance < 0 ? (
                                  <TrendingDown className="inline h-3 w-3 mr-1" />
                                ) : (
                                  <TrendingUp className="inline h-3 w-3 mr-1" />
                                )}
                                ₹{Math.abs(member.balance)}
                              </>
                            )}
                            {member.balance === 0 && <span className="text-muted-foreground">Settled</span>}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {member.balance < 0 ? "Owes" : member.balance > 0 ? "Owed" : ""}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="balances">
              <Card>
                <CardHeader>
                  <CardTitle>Settlement Summary</CardTitle>
                  <CardDescription>Who owes whom in this group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-red-600">Members who owe money</h4>
                        <div className="space-y-2">
                          {group.members
                            .filter((m) => m.balance < 0)
                            .map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center justify-between p-3 border border-red-200 rounded-lg"
                              >
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                    <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{member.name}</span>
                                </div>
                                <span className="text-sm font-semibold text-red-600">₹{Math.abs(member.balance)}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Members owed money</h4>
                        <div className="space-y-2">
                          {group.members
                            .filter((m) => m.balance > 0)
                            .map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center justify-between p-3 border border-green-200 rounded-lg"
                              >
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                    <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{member.name}</span>
                                </div>
                                <span className="text-sm font-semibold text-green-600">₹{member.balance}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {group.balance !== 0 && (
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Your balance in this group:</span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`font-bold text-lg ${group.balance < 0 ? "text-red-500" : "text-green-500"}`}
                            >
                              ₹{Math.abs(group.balance)}
                            </span>
                            <Button size="sm" variant={group.balance < 0 ? "default" : "outline"}>
                              <CreditCard className="mr-2 h-3 w-3" />
                              {group.balance < 0 ? "Pay Now" : "Request Payment"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
