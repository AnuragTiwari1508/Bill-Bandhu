"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CheckCircle, Clock, AlertCircle, Send, Bell, Search, Filter, CreditCard, Smartphone } from "lucide-react"

interface Settlement {
  id: string
  groupName: string
  memberName: string
  amount: number
  status: "pending" | "completed" | "overdue"
  dueDate: string
  expenseTitle: string
  paymentMethod?: string
  paidAt?: string
}

const mockSettlements: Settlement[] = [
  {
    id: "1",
    groupName: "College Gang",
    memberName: "Priya Sharma",
    amount: 450,
    status: "pending",
    dueDate: "2024-01-20",
    expenseTitle: "Dinner at Pizza Hut",
  },
  {
    id: "2",
    groupName: "Roommates 203",
    memberName: "Amit Kumar",
    amount: 320,
    status: "completed",
    dueDate: "2024-01-18",
    expenseTitle: "Electricity Bill",
    paymentMethod: "UPI",
    paidAt: "2024-01-17T10:30:00Z",
  },
  {
    id: "3",
    groupName: "Office Team",
    memberName: "Sarah Johnson",
    amount: 180,
    status: "overdue",
    dueDate: "2024-01-15",
    expenseTitle: "Team Lunch",
  },
  {
    id: "4",
    groupName: "College Gang",
    memberName: "Vikram Singh",
    amount: 200,
    status: "completed",
    dueDate: "2024-01-16",
    expenseTitle: "Movie Night",
    paymentMethod: "Card",
    paidAt: "2024-01-16T15:45:00Z",
  },
]

export function SettlementTracker() {
  const [settlements] = useState<Settlement[]>(mockSettlements)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredSettlements = settlements.filter((settlement) => {
    const matchesSearch =
      settlement.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      settlement.expenseTitle.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && settlement.status === "pending"
    if (activeTab === "completed") return matchesSearch && settlement.status === "completed"
    if (activeTab === "overdue") return matchesSearch && settlement.status === "overdue"

    return matchesSearch
  })

  const handleSendReminder = (settlementId: string) => {
    // In a real app, this would send a notification/reminder
    console.log("Sending reminder for settlement:", settlementId)
  }

  const getStatusIcon = (status: Settlement["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: Settlement["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
    }
  }

  const totalPending = settlements
    .filter((s) => s.status === "pending" || s.status === "overdue")
    .reduce((sum, s) => sum + s.amount, 0)

  const totalCompleted = settlements.filter((s) => s.status === "completed").reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-500">₹{totalPending}</div>
            <div className="text-sm text-muted-foreground">Pending Settlements</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-500">₹{totalCompleted}</div>
            <div className="text-sm text-muted-foreground">Completed This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">{settlements.length}</div>
            <div className="text-sm text-muted-foreground">Total Transactions</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settlement History</CardTitle>
          <CardDescription>Track payments and settlements across all your groups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search settlements..."
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({settlements.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({settlements.filter((s) => s.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="overdue">
                Overdue ({settlements.filter((s) => s.status === "overdue").length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({settlements.filter((s) => s.status === "completed").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="space-y-3">
                {filteredSettlements.map((settlement) => (
                  <div key={settlement.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt={settlement.memberName} />
                          <AvatarFallback>{settlement.memberName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{settlement.memberName}</div>
                          <div className="text-sm text-muted-foreground">
                            {settlement.groupName} • {settlement.expenseTitle}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Due: {new Date(settlement.dueDate).toLocaleDateString()}
                            {settlement.paidAt && (
                              <span> • Paid: {new Date(settlement.paidAt).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="font-semibold">₹{settlement.amount}</div>
                          {settlement.paymentMethod && (
                            <div className="text-xs text-muted-foreground flex items-center">
                              {settlement.paymentMethod === "UPI" && <Smartphone className="mr-1 h-3 w-3" />}
                              {settlement.paymentMethod === "Card" && <CreditCard className="mr-1 h-3 w-3" />}
                              {settlement.paymentMethod}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusIcon(settlement.status)}
                          {getStatusBadge(settlement.status)}
                        </div>

                        {settlement.status === "pending" && (
                          <Button onClick={() => handleSendReminder(settlement.id)} size="sm" variant="outline">
                            <Bell className="h-3 w-3 mr-1" />
                            Remind
                          </Button>
                        )}

                        {settlement.status === "overdue" && (
                          <Button onClick={() => handleSendReminder(settlement.id)} size="sm" variant="destructive">
                            <Send className="h-3 w-3 mr-1" />
                            Follow Up
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredSettlements.length === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No settlements found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? "Try adjusting your search terms" : "No settlements match the selected filter"}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
