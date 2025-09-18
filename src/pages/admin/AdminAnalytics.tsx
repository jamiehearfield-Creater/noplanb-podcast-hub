import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  TrendingUp, 
  ExternalLink, 
  Users, 
  Play,
  Video,
  Calendar,
  Eye
} from 'lucide-react';

interface AnalyticsData {
  subscriberGrowth: { date: string; count: number }[];
  episodeViews: { title: string; spotify: number; youtube: number; apple: number }[];
  sponsorMetrics: { name: string; clicks: number; engagement: number }[];
  contentPerformance: {
    totalEpisodes: number;
    totalReels: number;
    avgEngagement: number;
    topPerformer: string;
  };
}

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    subscriberGrowth: [],
    episodeViews: [],
    sponsorMetrics: [],
    contentPerformance: {
      totalEpisodes: 0,
      totalReels: 0,
      avgEngagement: 0,
      topPerformer: 'N/A',
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch real data from Supabase
      const [episodesResult, reelsResult, subscribersResult] = await Promise.all([
        supabase.from('episodes').select('*').order('created_at', { ascending: false }),
        supabase.from('reels').select('*').order('created_at', { ascending: false }),
        supabase.from('subscribers').select('created_at').order('created_at', { ascending: true }),
      ]);

      // Generate mock analytics data based on real content
      const episodes = episodesResult.data || [];
      const reels = reelsResult.data || [];
      const subscribers = subscribersResult.data || [];

      // Mock subscriber growth data
      const subscriberGrowth = subscribers.reduce((acc: { date: string; count: number }[], subscriber, index) => {
        const date = new Date(subscriber.created_at).toLocaleDateString();
        const existing = acc.find(item => item.date === date);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ date, count: index + 1 });
        }
        return acc;
      }, []);

      // Mock episode performance data
      const episodeViews = episodes.slice(0, 10).map(episode => ({
        title: episode.title,
        spotify: Math.floor(Math.random() * 10000) + 1000,
        youtube: Math.floor(Math.random() * 8000) + 500,
        apple: Math.floor(Math.random() * 5000) + 300,
      }));

      // Mock content performance
      const contentPerformance = {
        totalEpisodes: episodes.length,
        totalReels: reels.length,
        avgEngagement: Math.floor(Math.random() * 100) + 50,
        topPerformer: episodes[0]?.title || 'N/A',
      };

      setAnalyticsData({
        subscriberGrowth,
        episodeViews,
        sponsorMetrics: [
          { name: 'Sponsor A', clicks: 1200, engagement: 4.2 },
          { name: 'Sponsor B', clicks: 980, engagement: 3.8 },
          { name: 'Sponsor C', clicks: 756, engagement: 3.5 },
        ],
        contentPerformance,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.contentPerformance.totalEpisodes}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reels</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.contentPerformance.totalReels}</div>
            <p className="text-xs text-muted-foreground">
              +5 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.contentPerformance.avgEngagement}%</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.subscriberGrowth.length}</div>
            <p className="text-xs text-muted-foreground">
              Total email subscribers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="episodes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="episodes">Episode Performance</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsor Analytics</TabsTrigger>
          <TabsTrigger value="subscribers">Subscriber Growth</TabsTrigger>
          <TabsTrigger value="streaming">Streaming Platforms</TabsTrigger>
        </TabsList>

        <TabsContent value="episodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Episode Performance</CardTitle>
              <CardDescription>
                View counts across different platforms (simulated data)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.episodeViews.map((episode, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{episode.title}</h4>
                      <div className="flex space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>Spotify: {episode.spotify.toLocaleString()}</span>
                        <span>YouTube: {episode.youtube.toLocaleString()}</span>
                        <span>Apple: {episode.apple.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sponsors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sponsor Performance</CardTitle>
              <CardDescription>
                Click-through rates and engagement metrics (simulated data)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.sponsorMetrics.map((sponsor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{sponsor.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {sponsor.clicks.toLocaleString()} clicks • {sponsor.engagement}% engagement
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {sponsor.engagement}%
                      </div>
                      <p className="text-xs text-muted-foreground">CTR</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Growth</CardTitle>
              <CardDescription>
                Email subscriber acquisition over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.subscriberGrowth.slice(-12).map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="bg-brand rounded-t w-8"
                        style={{ height: `${Math.max(20, (data.count / Math.max(...analyticsData.subscriberGrowth.map(d => d.count))) * 200)}px` }}
                      ></div>
                      <span className="text-xs text-muted-foreground transform -rotate-45">
                        {data.date}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Total subscribers: {analyticsData.subscriberGrowth.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaming" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Spotify Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Plays</span>
                    <span className="font-bold">45,231</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Listeners</span>
                    <span className="font-bold">12,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Followers</span>
                    <span className="font-bold">3,421</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Spotify for Podcasters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>YouTube Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Views</span>
                    <span className="font-bold">28,932</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscribers</span>
                    <span className="font-bold">8,721</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Watch Time (hrs)</span>
                    <span className="font-bold">1,234</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View YouTube Studio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;