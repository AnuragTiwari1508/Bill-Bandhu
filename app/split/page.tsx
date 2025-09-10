"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Receipt } from "lucide-react"
import { GroupSelector } from "@/components/expense-splitting/group-selector"
import { ItemAllocation } from "@/components/expense-splitting/item-allocation"
import { PaymentSummary } from "@/components/payments/payment-summary"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Mock bill data - in real app this would come from the scanning process
const mockBillData = {
  merchantName: "Pizza Palace",
  date: "2024-01-15",
  items: [
    { name: "Margherita Pizza (Large)", price: 450, quantity: 1 },
    { name: "Chicken Wings (6 pcs)", price: 320, quantity: 1 },
    { name: "Garlic Bread", price: 180, quantity: 2 },
    { name: "Coca Cola (500ml)", price: 60, quantity: 3 },
    { name: "Chocolate Brownie", price: 150, quantity: 2 },
  ],
  subtotal: 1340,
  tax: 161,
  serviceCharge: 67,
  total: 1568,
  paymentMethod: "Card",
}

export default function SplitPage() {
  const [currentStep, setCurrentStep] = useState<"group" | "split" | "payment" | "complete">("group")
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [splitData, setSplitData] = useState(null)
  const [billData] = useState(mockBillData)
  const searchParams = useSearchParams()
  const groupId = searchParams.get("group")

  const handleGroupSelected = (group: any) => {
    setSelectedGroup(group)
    setCurrentStep("split")
  }

  const handleSplitComplete = (data: any) => {
    setSplitData(data)
    setCurrentStep("payment")
  }

  const handlePaymentComplete = (paymentData: any) => {
    console.log("Payment completed:", paymentData)
    setCurrentStep("complete")
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "group":
        return "Select Group"
      case "split":
        return "Split Expense"
      case "payment":
        return "Make Payment"
      case "complete":
        return "Expense Added"
      default:
        return "Split Expense"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case "group":
        return "Choose which group this expense belongs to"
      case "split":
        return "Decide how to divide the expense among group members"
      case "payment":
        return "Complete your payment to settle the expense"
      case "complete":
        return "Your expense has been successfully added and split"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={currentStep === "group" ? "/scan" : "#"}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentStep === "split") setCurrentStep("group")
                  else if (currentStep === "payment") setCurrentStep("split")
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Receipt className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[family-name:var(--font-playfair)]">
                {getStepTitle()}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              Step{" "}
              {currentStep === "group" ? "1" : currentStep === "split" ? "2" : currentStep === "payment" ? "3" : "4"} of
              4
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
              {getStepTitle()}
            </h2>
            <p className="text-muted-foreground">{getStepDescription()}</p>
          </div>

          {currentStep === "group" && <GroupSelector onGroupSelected={handleGroupSelected} />}

          {currentStep === "split" && selectedGroup && (
            <ItemAllocation billData={billData} group={selectedGroup} onSplitComplete={handleSplitComplete} />
          )}

          {currentStep === "payment" && splitData && (
            <PaymentSummary splitData={splitData} onPaymentComplete={handlePaymentComplete} />
          )}

          {currentStep === "complete" && (
            <div className="text-center py-12">
              <Receipt className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
                Expense Added Successfully!
              </h2>
              <p className="text-muted-foreground mb-8">
                Your expense has been split and added to the group. Other members will be notified about their shares.
              </p>
              <div className="space-x-4">
                <Link href="/scan">
                  <Button>Add Another Expense</Button>
                </Link>
                <Link href="/payments">
                  <Button variant="outline">View Payments</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
