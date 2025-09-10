"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"

const monthlyData = [
  { month: "Jan", amount: 2400, groups: 3 },
  { month: "Feb", amount: 1800, groups: 2 },
  { month: "Mar", amount: 3200, groups: 4 },
  { month: "Apr", amount: 2800, groups: 3 },
  { month: "May", amount: 4100, groups: 5 },
  { month: "Jun", amount: 3600, groups: 4 },
]

const categoryData = [
  { name: "Food & Dining", value: 8500, color: "hsl(var(--chart-1))" },
  { name: "Transportation", value: 3200, color: "hsl(var(--chart-2))" },
  { name: "Entertainment", value: 2800, color: "hsl(var(--chart-3))" },
  { name: "Utilities", value: 4200, color: "hsl(var(--chart-4))" },
  { name: "Shopping", value: 1800, color: "hsl(var(--chart-5))" },
]

const weeklyTrend = [
  { day: "Mon", spent: 450 },
  { day: "Tue", spent: 320 },
  { day: "Wed", spent: 680 },
  { day: "Thu", spent: 290 },
  { day: "Fri", spent: 890 },
  { day: "Sat", spent: 1200 },
  { day: "Sun", spent: 750 },
]

export function ExpenseChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
          <CardDescription>Your spending pattern over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amount: {
                label: "Amount",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
          <CardDescription>Breakdown of your spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Amount",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Weekly Spending Trend</CardTitle>
          <CardDescription>Your daily expenses for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              spent: {
                label: "Spent",
                color: "hsl(var(--secondary))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="spent"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
