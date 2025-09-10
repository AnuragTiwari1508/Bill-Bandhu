"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, FileImage, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface BillUploadProps {
  onScanComplete: (extractedData: any) => void
}

export function BillUpload({ onScanComplete }: BillUploadProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const simulateOCRProcessing = async (file: File) => {
    setIsScanning(true)
    setScanProgress(0)

    // Simulate OCR processing steps
    const steps = [
      { progress: 20, message: "Analyzing image quality..." },
      { progress: 40, message: "Detecting text regions..." },
      { progress: 60, message: "Extracting items and prices..." },
      { progress: 80, message: "Processing tax and totals..." },
      { progress: 100, message: "Scan complete!" },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setScanProgress(step.progress)
    }

    // Mock extracted data based on common bill types
    const mockExtractedData = {
      restaurant: {
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
      },
      grocery: {
        merchantName: "Fresh Mart Supermarket",
        date: "2024-01-15",
        items: [
          { name: "Basmati Rice (5kg)", price: 450, quantity: 1 },
          { name: "Chicken Breast (1kg)", price: 280, quantity: 1 },
          { name: "Onions (2kg)", price: 60, quantity: 1 },
          { name: "Tomatoes (1kg)", price: 40, quantity: 1 },
          { name: "Milk (1L)", price: 55, quantity: 2 },
          { name: "Bread (White)", price: 35, quantity: 1 },
          { name: "Eggs (12 pcs)", price: 84, quantity: 1 },
        ],
        subtotal: 1059,
        tax: 0,
        total: 1059,
        paymentMethod: "UPI",
      },
    }

    // Randomly select between restaurant and grocery bill
    const billType = Math.random() > 0.5 ? "restaurant" : "grocery"
    const extractedData = mockExtractedData[billType]

    setIsScanning(false)
    onScanComplete(extractedData)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      simulateOCRProcessing(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    // For demo, we'll simulate with a sample bill
    const mockFile = new File([""], "camera-capture.jpg", { type: "image/jpeg" })
    setUploadedFile(mockFile)
    setPreviewUrl("/placeholder.svg?height=400&width=300&text=Sample+Restaurant+Bill")
    simulateOCRProcessing(mockFile)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-primary" />
            <span>Scan Your Bill</span>
          </CardTitle>
          <CardDescription>
            Upload a photo of your bill or receipt. Our AI will automatically extract items and prices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadedFile && !isScanning && (
            <>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-primary">Drop your bill image here...</p>
                ) : (
                  <div>
                    <p className="text-foreground font-medium mb-2">Drag & drop your bill image here</p>
                    <p className="text-muted-foreground text-sm">or click to browse files</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1 border-t border-muted-foreground/25"></div>
                <span className="text-muted-foreground text-sm">OR</span>
                <div className="flex-1 border-t border-muted-foreground/25"></div>
              </div>

              <Button onClick={handleCameraCapture} variant="outline" className="w-full bg-transparent" size="lg">
                <Camera className="mr-2 h-4 w-4" />
                Take Photo with Camera
              </Button>
            </>
          )}

          {(uploadedFile || isScanning) && (
            <div className="space-y-4">
              {previewUrl && (
                <div className="flex justify-center">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Uploaded bill"
                    className="max-w-xs max-h-64 object-contain rounded-lg border"
                  />
                </div>
              )}

              {isScanning && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Processing bill...</span>
                    <Badge variant="secondary">
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      {scanProgress}%
                    </Badge>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {scanProgress < 20 && "Analyzing image quality..."}
                      {scanProgress >= 20 && scanProgress < 40 && "Detecting text regions..."}
                      {scanProgress >= 40 && scanProgress < 60 && "Extracting items and prices..."}
                      {scanProgress >= 60 && scanProgress < 80 && "Processing tax and totals..."}
                      {scanProgress >= 80 && "Finalizing results..."}
                    </span>
                  </div>
                </div>
              )}

              {!isScanning && uploadedFile && (
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Scan completed successfully!</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <FileImage className="h-4 w-4" />
              <span>Supports JPG, PNG, WebP</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Max file size: 10MB</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>Clear, well-lit images work best</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
