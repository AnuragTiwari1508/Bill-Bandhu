"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Receipt } from "lucide-react"
import { BillUpload } from "@/components/bill-scanner/bill-upload"
import { ExtractedItems } from "@/components/bill-scanner/extracted-items"
import Link from "next/link"

export default function ScanPage() {
  const [extractedData, setExtractedData] = useState(null)
  const [currentStep, setCurrentStep] = useState<"upload" | "review" | "split">("upload")

  const handleScanComplete = (data: any) => {
    setExtractedData(data)
    setCurrentStep("review")
  }

  const handleProceedToSplit = (data: any) => {
    // In a real app, this would navigate to the splitting interface
    console.log("Proceeding to split with data:", data)
    setCurrentStep("split")
  }

  const handleNewScan = () => {
    setExtractedData(null)
    setCurrentStep("upload")
  }

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
              <Receipt className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary font-[family-name:var(--font-playfair)]">Bill Scanner</h1>
            </div>
          </div>
          {extractedData && (
            <Button onClick={handleNewScan} variant="outline">
              Scan New Bill
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentStep === "upload" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
                  Scan Your Bill
                </h2>
                <p className="text-muted-foreground">
                  Upload a photo of your receipt and let our AI extract all the details automatically
                </p>
              </div>
              <BillUpload onScanComplete={handleScanComplete} />
            </div>
          )}

          {currentStep === "review" && extractedData && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
                  Review Extracted Data
                </h2>
                <p className="text-muted-foreground">
                  Check the extracted information and make any necessary corrections
                </p>
              </div>
              <ExtractedItems data={extractedData} onProceedToSplit={handleProceedToSplit} />
            </div>
          )}

          {currentStep === "split" && (
            <div className="text-center py-12">
              <Receipt className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-playfair)]">
                Ready to Split!
              </h2>
              <p className="text-muted-foreground mb-8">
                Your bill has been processed successfully. The splitting interface will be available in the next update.
              </p>
              <div className="space-x-4">
                <Button onClick={handleNewScan}>Scan Another Bill</Button>
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
