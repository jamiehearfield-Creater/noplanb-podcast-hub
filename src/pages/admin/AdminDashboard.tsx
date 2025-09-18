import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Play, 
  Video, 
  UserCheck,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface DashboardStats {
  totalEpisodes: number;
  totalReels: number;
  totalSponsors: number;
  totalSubscribers: number;
  recentEpisodes: number;
  recentReels: number;
  overdueMaintenanceCount: number;
  completedMaintenanceCount: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEpisodes: 0,
    totalReels: 0,
    totalSponsors: 0,
    totalSubscribers: 0,
    recentEpisodes: 0,
    recentReels: 0,
    overdueMaintenanceCount: 0,
    completedMaintenanceCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch all stats in parallel
      const [
        episodesResult,
        reelsResult,
        sponsorsResult,
        subscribersResult,
        recentEpisodesResult,
        recentReelsResult,
        overdueMaintenanceResult,
        completedMaintenanceResult,
      ] = await Promise.all([
        supabase.from('episodes').select('id', { count: 'exact' }),
        supabase.from('reels').select('id', { count: 'exact' }),
        supabase.from('sponsors').select('id', { count: 'exact' }),
        supabase.from('subscribers').select('id', { count: 'exact' }),
        supabase.from('episodes').select('id', { count: 'exact' }).gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('reels').select('id', { count: 'exact' }).gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('maintenance_logs').select('id', { count: 'exact' }).eq('status', 'needs_attention').is('closed_at', null),
        supabase.from('maintenance_logs').select('id', { count: 'exact' }).eq('status', 'ok'),
      ]);

      setStats({
        totalEpisodes: episodesResult.count || 0,
        totalReels: reelsResult.count || 0,
        totalSponsors: sponsorsResult.count || 0,
        totalSubscribers: subscribersResult.count || 0,
        recentEpisodes: recentEpisodesResult.count || 0,
        recentReels: recentReelsResult.count || 0,
        overdueMaintenanceCount: overdueMaintenanceResult.count || 0,
        completedMaintenanceCount: completedMaintenanceResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Episodes',
      value: stats.totalEpisodes,
      description: `${stats.recentEpisodes} added this month`,
      icon: Play,
      color: 'text-blue-600',
    },
    {
      title: 'Total Reels',
      value: stats.totalReels,
      description: `${stats.recentReels} added this month`,
      icon: Video,
      color: 'text-purple-600',
    },
    {
      title: 'Sponsors',
      value: stats.totalSponsors,
      description: 'Active sponsors',
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers,
      description: 'Email subscribers',
      icon: UserCheck,
      color: 'text-brand',
    },
    {
      title: 'Maintenance Issues',
      value: stats.overdueMaintenanceCount,
      description: 'Need attention',
      icon: AlertTriangle,
      color: 'text-red-600',
    },
    {
      title: 'Completed Maintenance',
      value: stats.completedMaintenanceCount,
      description: 'All time',
      icon: CheckCircle,
      color: 'text-green-600',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest content and subscriber activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Episodes this month</span>
              <span className="font-medium">{stats.recentEpisodes}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Reels this month</span>
              <span className="font-medium">{stats.recentReels}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total subscribers</span>
              <span className="font-medium">{stats.totalSubscribers}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>System Status</span>
            </CardTitle>
            <CardDescription>
              Equipment and maintenance overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Maintenance issues</span>
              <span className={`font-medium ${stats.overdueMaintenanceCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {stats.overdueMaintenanceCount}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Completed checks</span>
              <span className="font-medium text-green-600">{stats.completedMaintenanceCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">System status</span>
              <span className={`font-medium ${stats.overdueMaintenanceCount === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                {stats.overdueMaintenanceCount === 0 ? 'All Good' : 'Needs Attention'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;