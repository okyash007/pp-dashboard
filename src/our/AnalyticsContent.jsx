import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react'

export function AnalyticsContent() {
  const analyticsData = [
    {
      title: 'Total Views',
      value: '45,678',
      change: '+15%',
      icon: Eye,
      description: 'From last month'
    },
    {
      title: 'Engagement Rate',
      value: '8.2%',
      change: '+2.1%',
      icon: TrendingUp,
      description: 'From last month'
    },
    {
      title: 'Active Users',
      value: '12,456',
      change: '+7%',
      icon: Users,
      description: 'From last month'
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '+0.8%',
      icon: BarChart3,
      description: 'From last month'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed insights into your content performance and audience engagement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{item.change}</span> {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>
              Your content performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>Chart visualization coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>
              Your most engaging posts and videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Video: "Getting Started"</p>
                  <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">12.5K views</p>
                  <p className="text-xs text-green-600">+25%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Post: "Tips & Tricks"</p>
                  <p className="text-xs text-muted-foreground">Posted 1 week ago</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">8.9K views</p>
                  <p className="text-xs text-green-600">+18%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Story: "Behind the Scenes"</p>
                  <p className="text-xs text-muted-foreground">Posted 3 days ago</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">5.2K views</p>
                  <p className="text-xs text-green-600">+12%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
