"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Smartphone, QrCode, CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react"

interface MemberShare {
  memberId: string
  memberName: string
  amount: number
}

interface PaymentSummaryProps {
  splitData: {
    billData: any
    group: any
    splitMode: string
    memberShares: MemberShare[]
  }
  onPaymentComplete: (paymentData: any) => void
}

export function PaymentSummary({ splitData, onPaymentComplete }: PaymentSummaryProps) {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cash" | "card">("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed" | "failed">("pending")

  const { billData, group, memberShares } = splitData
  const yourShare = memberShares.find((share) => share.memberName.includes("You"))?.amount || 0
  const othersShares = memberShares.filter((share) => !share.memberName.includes("You"))

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStatus("processing")

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success (90% success rate)
    const isSuccess = Math.random() > 0.1
    setPaymentStatus(isSuccess ? "completed" : "failed")
    setIsProcessing(false)

    if (isSuccess) {
      const paymentData = {
        ...splitData,
        paymentMethod,
        paymentId: `PAY_${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: "completed",
      }
      setTimeout(() => onPaymentComplete(paymentData), 1000)
    }
  }

  const generateUPILink = () => {
    // In a real app, this would generate actual UPI deep links
    const upiId = "merchant@paytm" // Mock UPI ID
    const amount = yourShare
    const note = `BillBandhu: ${billData.merchantName} - ${group.name}`
    return `upi://pay?pa=${upiId}&am=${amount}&tn=${encodeURIComponent(note)}`
  }

  if (paymentStatus === "completed") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground mb-6">Your payment of ₹{yourShare} has been processed successfully.</p>
          <div className="space-y-2 text-sm text-muted-foreground mb-6">
            <div>Payment ID: PAY_{Date.now()}</div>
            <div>Method: {paymentMethod.toUpperCase()}</div>
            <div>Time: {new Date().toLocaleString()}</div>
          </div>
          <Button onClick={() => onPaymentComplete(splitData)} size="lg">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h3>
          <p className="text-muted-foreground mb-6">There was an issue processing your payment. Please try again.</p>
          <div className="space-x-4">
            <Button onClick={() => setPaymentStatus("pending")} size="lg">
              Try Again
            </Button>
            <Button variant="outline" size="lg">
              Choose Different Method
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>Payment Summary</span>
          </CardTitle>
          <CardDescription>Review the expense split and make your payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bill Summary */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-semibold">{billData.merchantName}</div>
                <div className="text-sm text-muted-foreground">{billData.date}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹{billData.total}</div>
                <div className="text-sm text-muted-foreground">Total Bill</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Split among {memberShares.length} members in {group.name}
            </div>
          </div>

          {/* Your Payment */}
          <div className="space-y-4">
            <h4 className="font-semibold">Your Payment</h4>
            <div className="p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Your Share</div>
                  <div className="text-sm text-muted-foreground">
                    Split method:{" "}
                    {splitData.splitMode === "equal"
                      ? "Equal Split"
                      : splitData.splitMode === "items"
                        ? "By Items"
                        : "Custom"}
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">₹{yourShare}</div>
              </div>
            </div>
          </div>

          {/* Other Members */}
          <div className="space-y-4">
            <h4 className="font-semibold">Other Members ({othersShares.length})</h4>
            <div className="space-y-2">
              {othersShares.map((share) => (
                <div key={share.memberId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={share.memberName} />
                      <AvatarFallback className="text-xs">{share.memberName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{share.memberName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">₹{share.amount}</span>
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-semibold">Choose Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "upi"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <div className="text-center">
                  <Smartphone className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">UPI Payment</div>
                  <div className="text-xs text-muted-foreground">PhonePe, GPay, Paytm</div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="text-center">
                  <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Card Payment</div>
                  <div className="text-xs text-muted-foreground">Debit/Credit Card</div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "cash"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                <div className="text-center">
                  <QrCode className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="font-medium">Cash/Offline</div>
                  <div className="text-xs text-muted-foreground">Mark as paid offline</div>
                </div>
              </div>
            </div>
          </div>

          {paymentMethod === "upi" && (
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                You'll be redirected to your UPI app to complete the payment of ₹{yourShare}
              </AlertDescription>
            </Alert>
          )}

          {paymentMethod === "cash" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This will mark your payment as completed offline. Make sure you've paid the amount in cash.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-3 pt-4">
            <Button onClick={handlePayment} disabled={isProcessing} className="flex-1" size="lg">
              {isProcessing ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {paymentMethod === "upi" && <Smartphone className="mr-2 h-4 w-4" />}
                  {paymentMethod === "card" && <CreditCard className="mr-2 h-4 w-4" />}
                  {paymentMethod === "cash" && <QrCode className="mr-2 h-4 w-4" />}
                  Pay ₹{yourShare}
                </>
              )}
            </Button>
            <Button variant="outline" size="lg">
              Save for Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
