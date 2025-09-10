import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RewardsDashboard } from "@/components/rewards/rewards-dashboard"
import { GroupLeaderboard } from "@/components/rewards/group-leaderboard"

export default function RewardsPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Rewards & Achievements</h1>
        <p className="text-muted-foreground">Earn points, unlock achievements, and compete with friends</p>
      </div>

      <Tabs defaultValue="rewards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rewards">My Rewards</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards">
          <RewardsDashboard />
        </TabsContent>

        <TabsContent value="leaderboard">
          <GroupLeaderboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
