import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LogOut, BarChart3, Video, Users, Upload } from "lucide-react";
import { z } from "zod";

const episodeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  youtube_link: z.string().url("Invalid YouTube URL").optional().or(z.literal("")),
  spotify_link: z.string().url("Invalid Spotify URL").optional().or(z.literal("")),
  apple_link: z.string().url("Invalid Apple URL").optional().or(z.literal("")),
  amazon_link: z.string().url("Invalid Amazon URL").optional().or(z.literal("")),
  guest: z.string().optional(),
});

const reelSchema = z.object({
  caption: z.string().max(500).optional(),
  embed_url: z.string().url("Invalid embed URL"),
  instagram_id: z.string().optional(),
});

const AdminStats = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({ subscribers: 0, episodes: 0, reels: 0, sponsors: 0 });
  const [uploading, setUploading] = useState(false);

  // Episode form state
  const [episodeData, setEpisodeData] = useState({
    title: "",
    description: "",
    youtube_link: "",
    spotify_link: "",
    apple_link: "",
    amazon_link: "",
    guest: "",
  });

  // Reel form state
  const [reelData, setReelData] = useState({
    caption: "",
    embed_url: "",
    instagram_id: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      const [subscribersRes, episodesRes, reelsRes, sponsorsRes] = await Promise.all([
        supabase.from("subscribers").select("*", { count: "exact", head: true }),
        supabase.from("episodes").select("*", { count: "exact", head: true }),
        supabase.from("reels").select("*", { count: "exact", head: true }),
        supabase.from("sponsors").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        subscribers: subscribersRes.count || 0,
        episodes: episodesRes.count || 0,
        reels: reelsRes.count || 0,
        sponsors: sponsorsRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleUploadEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = episodeSchema.parse(episodeData);
      setUploading(true);

      const { error } = await supabase.from("episodes").insert([
        {
          title: validated.title,
          description: validated.description || null,
          youtube_link: validated.youtube_link || null,
          spotify_link: validated.spotify_link || null,
          apple_link: validated.apple_link || null,
          amazon_link: validated.amazon_link || null,
          guest: validated.guest || null,
          publish_date: new Date().toISOString(),
          featured: false,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Episode uploaded successfully.",
      });

      setEpisodeData({
        title: "",
        description: "",
        youtube_link: "",
        spotify_link: "",
        apple_link: "",
        amazon_link: "",
        guest: "",
      });
      fetchStats();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to upload episode.",
          variant: "destructive",
        });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleUploadReel = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = reelSchema.parse(reelData);
      setUploading(true);

      const { error } = await supabase.from("reels").insert([
        {
          embed_url: validated.embed_url,
          caption: validated.caption || null,
          instagram_id: validated.instagram_id || null,
          publish_date: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Reel uploaded successfully.",
      });

      setReelData({
        caption: "",
        embed_url: "",
        instagram_id: "",
      });
      fetchStats();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to upload reel.",
          variant: "destructive",
        });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>
              Your account doesn't have admin privileges yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To grant admin access, run this SQL command in your Supabase SQL Editor:
            </p>
            <code className="block bg-muted p-3 rounded text-xs">
              INSERT INTO user_roles (user_id, role)<br />
              VALUES ('{user.id}', 'admin');
            </code>
            <div className="flex gap-2">
              <Button onClick={handleSignOut} variant="outline" className="flex-1">
                Sign Out
              </Button>
              <Button onClick={() => window.location.reload()} className="flex-1">
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.subscribers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Episodes</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.episodes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reels</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reels}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sponsors}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="episodes">Upload Episode</TabsTrigger>
            <TabsTrigger value="reels">Upload Reel</TabsTrigger>
          </TabsList>

          <TabsContent value="episodes">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Episode</CardTitle>
                <CardDescription>
                  Add a new podcast episode to the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadEpisode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={episodeData.title}
                      onChange={(e) => setEpisodeData({ ...episodeData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={episodeData.description}
                      onChange={(e) => setEpisodeData({ ...episodeData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guest">Guest</Label>
                    <Input
                      id="guest"
                      value={episodeData.guest}
                      onChange={(e) => setEpisodeData({ ...episodeData, guest: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube Link</Label>
                      <Input
                        id="youtube"
                        type="url"
                        placeholder="https://youtube.com/..."
                        value={episodeData.youtube_link}
                        onChange={(e) => setEpisodeData({ ...episodeData, youtube_link: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="spotify">Spotify Link</Label>
                      <Input
                        id="spotify"
                        type="url"
                        placeholder="https://spotify.com/..."
                        value={episodeData.spotify_link}
                        onChange={(e) => setEpisodeData({ ...episodeData, spotify_link: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apple">Apple Podcasts Link</Label>
                      <Input
                        id="apple"
                        type="url"
                        placeholder="https://podcasts.apple.com/..."
                        value={episodeData.apple_link}
                        onChange={(e) => setEpisodeData({ ...episodeData, apple_link: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amazon">Amazon Music Link</Label>
                      <Input
                        id="amazon"
                        type="url"
                        placeholder="https://music.amazon.com/..."
                        value={episodeData.amazon_link}
                        onChange={(e) => setEpisodeData({ ...episodeData, amazon_link: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload Episode"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reels">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Reel</CardTitle>
                <CardDescription>
                  Add a new Instagram reel to the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadReel} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="embed_url">Instagram Embed URL *</Label>
                    <Input
                      id="embed_url"
                      type="url"
                      placeholder="https://www.instagram.com/reel/..."
                      value={reelData.embed_url}
                      onChange={(e) => setReelData({ ...reelData, embed_url: e.target.value })}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Paste the full Instagram reel URL
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea
                      id="caption"
                      value={reelData.caption}
                      onChange={(e) => setReelData({ ...reelData, caption: e.target.value })}
                      rows={3}
                      maxLength={500}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram_id">Instagram ID (optional)</Label>
                    <Input
                      id="instagram_id"
                      value={reelData.instagram_id}
                      onChange={(e) => setReelData({ ...reelData, instagram_id: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload Reel"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminStats;