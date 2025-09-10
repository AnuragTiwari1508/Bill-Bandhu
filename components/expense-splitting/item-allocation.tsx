"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, DollarSign, ArrowRight } from "lucide-react"

interface ExtractedItem {
  name: string
  price: number
  quantity: number
}

interface ExtractedData {
  merchantName: string
  date: string
  items: ExtractedItem[]
  subtotal: number
  tax?: number
  serviceCharge?: number
  total: number
  paymentMethod: string
}

interface Group {
  id: string
  name: string
  members: number
  membersList: Array<{ id: string; name: string; email: string; avatar?: string }>
}

interface ItemAllocation {
  itemIndex: number
  memberIds: string[]
  customAmounts?: { [memberId: string]: number }
}

interface ItemAllocationProps {
  billData: ExtractedData
  group: Group
  onSplitComplete: (splitData: any) => void
}

export function ItemAllocation({ billData, group, onSplitComplete }: ItemAllocationProps) {
  const [splitMode, setSplitMode] = useState<"equal" | "items" | "custom">("items")
  const [itemAllocations, setItemAllocations] = useState<ItemAllocation[]>([])
  const [customAmounts, setCustomAmounts] = useState<{ [memberId: string]: number }>({})

  // Initialize allocations
  useEffect(() => {
    const initialAllocations = billData.items.map((_, index) => ({
      itemIndex: index,
      memberIds: group.membersList.map((m) => m.id), // Start with all members selected
    }))
    setItemAllocations(initialAllocations)
  }, [billData.items, group.membersList])

  const handleItemMemberToggle = (itemIndex: number, memberId: string) => {
    setItemAllocations((prev) =>
      prev.map((allocation) => {
        if (allocation.itemIndex === itemIndex) {
          const isSelected = allocation.memberIds.includes(memberId)
          return {
            ...allocation,
            memberIds: isSelected
              ? allocation.memberIds.filter((id) => id !== memberId)
              : [...allocation.memberIds, memberId],
          }
        }
        return allocation
      }),
    )
  }

  const handleCustomAmountChange = (memberId: string, amount: number) => {
    setCustomAmounts((prev) => ({
      ...prev,
      [memberId]: amount,
    }))
  }

  const calculateMemberShare = (memberId: string) => {
    if (splitMode === "equal") {
      return billData.total / group.membersList.length
    }

    if (splitMode === "custom") {
      return customAmounts[memberId] || 0
    }

    // Item-based calculation
    let memberSubtotal = 0
    itemAllocations.forEach((allocation) => {
      const item = billData.items[allocation.itemIndex]
      if (allocation.memberIds.includes(memberId)) {
        const itemTotal = item.price * item.quantity
        const sharePerMember = itemTotal / allocation.memberIds.length
        memberSubtotal += sharePerMember
      }
    })

    // Add proportional tax and service charge
    const subtotalRatio = memberSubtotal / billData.subtotal
    const memberTax = (billData.tax || 0) * subtotalRatio
    const memberServiceCharge = (billData.serviceCharge || 0) * subtotalRatio

    return memberSubtotal + memberTax + memberServiceCharge
  }

  const calculateTotalAllocated = () => {
    if (splitMode === "custom") {
      return Object.values(customAmounts).reduce((sum, amount) => sum + amount, 0)
    }
    return billData.total
  }

  const handleProceedToPayment = () => {
    const memberShares = group.membersList.map((member) => ({
      memberId: member.id,
      memberName: member.name,
      amount: Math.round(calculateMemberShare(member.id) * 100) / 100,
    }))

    const splitData = {
      billData,
      group,
      splitMode,
      memberShares,
      itemAllocations: splitMode === "items" ? itemAllocations : undefined,
      customAmounts: splitMode === "custom" ? customAmounts : undefined,
    }

    onSplitComplete(splitData)
  }

  const isValidSplit = () => {
    if (splitMode === "custom") {
      const totalAllocated = calculateTotalAllocated()
      return Math.abs(totalAllocated - billData.total) < 0.01
    }
    return true
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Split Expense</span>
          </CardTitle>
          <CardDescription>Choose how to divide this expense among group members</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={splitMode} onValueChange={(value) => setSplitMode(value as any)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="equal">Equal Split</TabsTrigger>
              <TabsTrigger value="items">By Items</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>

            <TabsContent value="equal" className="space-y-4">
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Equal Split</h3>
                <p className="text-muted-foreground mb-4">
                  Total amount will be divided equally among all {group.membersList.length} members
                </p>
                <div className="text-2xl font-bold text-primary">
                  ₹{Math.round((billData.total / group.membersList.length) * 100) / 100} per person
                </div>
              </div>
            </TabsContent>

            <TabsContent value="items" className="space-y-4">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Select which members consumed each item. Tax and service charges will be distributed proportionally.
                </div>

                {billData.items.map((item, itemIndex) => {
                  const allocation = itemAllocations.find((a) => a.itemIndex === itemIndex)
                  return (
                    <Card key={itemIndex} className="border-l-4 border-l-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                            </div>
                          </div>
                          <Badge variant="outline">{allocation?.memberIds.length || 0} members</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          {group.membersList.map((member) => {
                            const isSelected = allocation?.memberIds.includes(member.id) || false
                            return (
                              <div
                                key={member.id}
                                className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                                  isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/50"
                                }`}
                                onClick={() => handleItemMemberToggle(itemIndex, member.id)}
                              >
                                <Checkbox checked={isSelected} readOnly />
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm truncate">{member.name.split(" ")[0]}</span>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Enter custom amounts for each member. Total must equal ₹{billData.total}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.membersList.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Label htmlFor={`amount-${member.id}`} className="text-sm font-medium">
                          {member.name}
                        </Label>
                        <Input
                          id={`amount-${member.id}`}
                          type="number"
                          placeholder="0.00"
                          value={customAmounts[member.id] || ""}
                          onChange={(e) => handleCustomAmountChange(member.id, Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Total Allocated:</span>
                    <span
                      className={`font-semibold ${
                        Math.abs(calculateTotalAllocated() - billData.total) < 0.01 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ₹{calculateTotalAllocated()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bill Total:</span>
                    <span className="font-semibold">₹{billData.total}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Difference:</span>
                    <span
                      className={
                        Math.abs(calculateTotalAllocated() - billData.total) < 0.01 ? "text-green-600" : "text-red-600"
                      }
                    >
                      ₹{Math.abs(calculateTotalAllocated() - billData.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          {/* Member Shares Summary */}
          <div className="space-y-4">
            <h4 className="font-semibold">Member Shares</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.membersList.map((member) => {
                const share = calculateMemberShare(member.id)
                return (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                    <span className="font-semibold text-primary">₹{Math.round(share * 100) / 100}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <div className="text-sm text-muted-foreground">
              {!isValidSplit() && splitMode === "custom" && (
                <span className="text-red-600">Please ensure total amounts equal the bill total</span>
              )}
            </div>
            <Button onClick={handleProceedToPayment} disabled={!isValidSplit()} size="lg">
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
