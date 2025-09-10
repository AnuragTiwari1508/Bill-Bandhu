"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Receipt, Edit3, Check, X, Plus, Trash2, Calendar, MapPin, CreditCard, Users } from "lucide-react"
import Link from "next/link"

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

interface ExtractedItemsProps {
  data: ExtractedData
  onProceedToSplit: (data: ExtractedData) => void
}

export function ExtractedItems({ data, onProceedToSplit }: ExtractedItemsProps) {
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [items, setItems] = useState<ExtractedItem[]>(data.items)
  const [editedItem, setEditedItem] = useState<ExtractedItem>({ name: "", price: 0, quantity: 1 })

  const handleEditItem = (index: number) => {
    setEditingItem(index)
    setEditedItem(items[index])
  }

  const handleSaveEdit = () => {
    if (editingItem !== null) {
      const newItems = [...items]
      newItems[editingItem] = editedItem
      setItems(newItems)
      setEditingItem(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setEditedItem({ name: "", price: 0, quantity: 1 })
  }

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const handleAddItem = () => {
    setItems([...items, { name: "New Item", price: 0, quantity: 1 }])
    setEditingItem(items.length)
    setEditedItem({ name: "New Item", price: 0, quantity: 1 })
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const updatedData = {
    ...data,
    items,
    subtotal: calculateSubtotal(),
    total: calculateSubtotal() + (data.tax || 0) + (data.serviceCharge || 0),
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Receipt className="h-5 w-5 text-primary" />
                <span>Extracted Bill Details</span>
              </CardTitle>
              <CardDescription>Review and edit the extracted information before splitting</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Check className="mr-1 h-3 w-3" />
              Scan Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bill Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{data.merchantName}</div>
                <div className="text-xs text-muted-foreground">Merchant</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{data.date}</div>
                <div className="text-xs text-muted-foreground">Date</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">{data.paymentMethod}</div>
                <div className="text-xs text-muted-foreground">Payment</div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Items ({items.length})</h4>
              <Button onClick={handleAddItem} size="sm" variant="outline">
                <Plus className="mr-1 h-3 w-3" />
                Add Item
              </Button>
            </div>

            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  {editingItem === index ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <Input
                        value={editedItem.name}
                        onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                        placeholder="Item name"
                        className="md:col-span-2"
                      />
                      <Input
                        type="number"
                        value={editedItem.price}
                        onChange={(e) => setEditedItem({ ...editedItem, price: Number(e.target.value) })}
                        placeholder="Price"
                      />
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={editedItem.quantity}
                          onChange={(e) => setEditedItem({ ...editedItem, quantity: Number(e.target.value) })}
                          placeholder="Qty"
                          className="w-16"
                        />
                        <Button onClick={handleSaveEdit} size="sm" variant="default">
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button onClick={handleCancelEdit} size="sm" variant="outline">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ₹{item.price} × {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                        <Button onClick={() => handleEditItem(index)} size="sm" variant="ghost">
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem(index)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Bill Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
            {data.tax && (
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span>₹{data.tax}</span>
              </div>
            )}
            {data.serviceCharge && (
              <div className="flex justify-between text-sm">
                <span>Service Charge:</span>
                <span>₹{data.serviceCharge}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{updatedData.total}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Link href="/split" className="flex-1">
              <Button className="w-full" size="lg">
                <Users className="mr-2 h-4 w-4" />
                Proceed to Split
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Save for Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
