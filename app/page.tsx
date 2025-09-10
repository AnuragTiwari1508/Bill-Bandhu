"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smartphone,
  Users,
  Receipt,
  CreditCard,
  Shield,
  Zap,
  TrendingUp,
  Trophy,
  Sparkles,
  Target,
  Award,
} from "lucide-react"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { GroupSummary } from "@/components/dashboard/group-summary"
import { FinancialInsights } from "@/components/dashboard/financial-insights"
import Link from "next/link"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in real app would integrate with Firebase Auth
    if (email && password) {
      setIsAuthenticated(true)
    }
  }

  const handleGoogleLogin = () => {
    // Mock Google OAuth - in real app would integrate with Firebase Auth
    setIsAuthenticated(true)
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Receipt className="h-10 w-10 text-primary animate-float" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
                  BillBandhu
                </h1>
                <p className="text-xs text-muted-foreground">Smart Expense Splitting</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/rewards">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 card-hover">
                  <Trophy className="h-4 w-4 text-accent" />
                  <span className="hidden sm:inline">Rewards</span>
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="button-glow">
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-scale-in">
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold text-foreground mb-2 font-[family-name:var(--font-playfair)]">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Rahul!</span>
              </h2>
              <Sparkles className="absolute -top-2 -right-8 h-6 w-6 text-accent animate-pulse" />
            </div>
            <p className="text-muted-foreground text-lg">Here's your expense overview and insights</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg transition-all duration-300">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg transition-all duration-300">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="groups" className="rounded-lg transition-all duration-300">
                Groups
              </TabsTrigger>
              <TabsTrigger value="insights" className="rounded-lg transition-all duration-300">
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="card-hover bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">₹18,450</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                    <div className="text-xs text-green-600 flex items-center justify-center mt-2">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">4</div>
                    <div className="text-sm text-muted-foreground">Active Groups</div>
                    <div className="text-xs text-muted-foreground mt-2">College, Office, Family, Roommates</div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-gradient-to-br from-red-50 to-red-100 border-red-200 dark:from-red-950/20 dark:to-red-900/10 dark:border-red-800/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-1">₹630</div>
                    <div className="text-sm text-muted-foreground">You Owe</div>
                    <div className="text-xs text-muted-foreground mt-2">Across 2 groups</div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/20 dark:to-green-900/10 dark:border-green-800/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">₹320</div>
                    <div className="text-sm text-muted-foreground">You're Owed</div>
                    <div className="text-xs text-muted-foreground mt-2">From 1 group</div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50 border-purple-200 animate-gradient dark:from-purple-950/30 dark:via-purple-900/20 dark:to-pink-950/20 dark:border-purple-700/30">
                  <CardContent className="p-6 text-center relative overflow-hidden">
                    <Award className="absolute top-2 right-2 h-5 w-5 text-purple-500 animate-pulse" />
                    <div className="text-3xl font-bold text-purple-600 mb-1">1,250</div>
                    <div className="text-sm text-purple-700 font-medium">Reward Points</div>
                    <div className="text-xs text-purple-600 mt-2 flex items-center justify-center gap-1">
                      <Target className="h-3 w-3" />
                      Level 3: Split Master
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Link href="/scan">
                  <Card className="card-hover bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 group">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3 text-lg">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Receipt className="h-5 w-5 text-primary" />
                        </div>
                        <span>Scan New Bill</span>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Upload a photo and let AI extract items automatically
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full button-glow bg-primary hover:bg-primary/90">
                        <Zap className="h-4 w-4 mr-2" />
                        Start Scanning
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/payments">
                  <Card className="card-hover bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 group">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3 text-lg">
                        <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                          <CreditCard className="h-5 w-5 text-accent" />
                        </div>
                        <span>Settle Expenses</span>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        Pay your pending balances with one-click UPI
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full button-glow bg-transparent" variant="outline">
                        <span className="text-red-600 font-semibold">Pay ₹630</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/groups">
                  <Card className="card-hover bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 group">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3 text-lg">
                        <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                          <Users className="h-5 w-5 text-secondary" />
                        </div>
                        <span>Manage Groups</span>
                      </CardTitle>
                      <CardDescription className="text-sm">Create and organize your expense groups</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full button-glow bg-transparent" variant="outline">
                        View Groups
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/rewards">
                  <Card className="card-hover bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50 border-purple-200 animate-gradient group dark:from-purple-950/30 dark:via-purple-900/20 dark:to-pink-950/20 dark:border-purple-700/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3 text-lg text-purple-900 dark:text-purple-100">
                        <div className="p-2 bg-purple-200/50 rounded-lg group-hover:bg-purple-200/70 transition-colors dark:bg-purple-800/50 dark:group-hover:bg-purple-800/70">
                          <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>Rewards & Achievements</span>
                      </CardTitle>
                      <CardDescription className="text-purple-700 dark:text-purple-300">
                        Earn points and unlock achievements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white button-glow">
                        <Sparkles className="h-4 w-4 mr-2" />
                        View Rewards
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="animate-slide-up">
              <ExpenseChart />
            </TabsContent>

            <TabsContent value="groups" className="animate-slide-up">
              <GroupSummary />
            </TabsContent>

            <TabsContent value="insights" className="animate-slide-up">
              <FinancialInsights />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 animate-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-scale-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Receipt className="h-16 w-16 text-primary animate-float" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full animate-pulse flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-[family-name:var(--font-playfair)]">
                BillBandhu
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Your Smart Expense Companion</p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Smart expense splitting with AI-powered bill scanning and instant UPI settlements
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">AI Bill Scanning</h3>
              <p className="text-muted-foreground">
                Advanced OCR extracts items and prices automatically from any bill photo
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Smart Splitting</h3>
              <p className="text-muted-foreground">
                Fair allocation based on consumption with automatic tax distribution
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Instant Settlement</h3>
              <p className="text-muted-foreground">One-click UPI payments with real-time tracking and notifications</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <Card className="card-hover bg-card/80 backdrop-blur-md border-2 border-primary/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-[family-name:var(--font-playfair)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get Started
              </CardTitle>
              <CardDescription className="text-base">Sign in to start splitting expenses smartly</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="login" className="transition-all duration-300">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="transition-all duration-300">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full button-glow bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full button-glow bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full button-glow border-2 hover:border-primary/30 bg-transparent"
                onClick={handleGoogleLogin}
              >
                <Shield className="mr-2 h-4 w-4 text-primary" />
                Continue with Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
