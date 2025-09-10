"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard } from "lucide-react"
import { SettlementTracker } from "@/components/payments/settlement-tracker"
import Link from "next/link"

export default function PaymentsPage() {
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
              <CreditCard className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[family-name:var(--font-playfair)]">
                Payments & Settlements
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
              Manage Your Payments
            </h2>
            <p className="text-muted-foreground">Track settlements, send reminders, and manage your expense payments</p>
          </div>

          <SettlementTracker />
        </div>
      </main>
    </div>
  )
}
