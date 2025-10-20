import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Play, Users, Calendar } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Episode {
  id: string;
  title: string;
  description: string;
  spotify_link: string;
  youtube_link: string;
  publish_date: string;
  guest: string;
  thumbnail_url: string;
}

interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  website_link: string;
}

const hardcodedEpisodes: Episode[] = [
  {
    id: 'ep-001',
    title: 'No Plan B - The Truth Behind It All',
    description: 'Episode 001',
    spotify_link: '',
    youtube_link: 'https://www.youtube.com/embed/S0hIugZDT8Q',
    publish_date: '2024-01-01',
    guest: '',
    thumbnail_url: ''
  },
  {
    id: 'ep-002',
    title: 'No Plan B - From Leeds Streets to Protecting Premier League Stars',
    description: 'Episode 002',
    spotify_link: '',
    youtube_link: 'https://www.youtube.com/embed/r58GT-4Oyp8',
    publish_date: '2024-01-02',
    guest: '',
    thumbnail_url: ''
  },
  {
    id: 'ep-003',
    title: 'No Plan B - From Council Estate to Scaling Multiple Businesses',
    description: 'With Debbie Askey - Episode 003',
    spotify_link: '',
    youtube_link: 'https://www.youtube.com/embed/xy9ds6PiytY',
    publish_date: '2024-01-03',
    guest: 'Debbie Askey',
    thumbnail_url: ''
  }
];

const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
    /youtube\.com\/embed\/([^&\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const Landing = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    fetchLatestEpisodes();
    fetchFeaturedSponsors();
  }, []);

  const fetchLatestEpisodes = async () => {
    const { data } = await supabase
      .from('episodes')
      .select('*')
      .order('publish_date', { ascending: false })
      .limit(3);
    
    // Use hardcoded episodes if no database episodes exist
    const allEpisodes = data && data.length > 0 ? data : hardcodedEpisodes;
    setEpisodes(allEpisodes);
  };

  const fetchFeaturedSponsors = async () => {
    const { data } = await supabase
      .from('sponsors')
      .select('*')
      .eq('featured', true)
      .limit(4);
    
    if (data) setSponsors(data);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="wrap">
            <div className="hero-copy">
              <h1>
                No Plan <span className="accent">B</span>
              </h1>
              <p>
                Mindset. Startups. Grit. Join Jay and Harley as they explore what it takes to succeed when there's no backup plan.
              </p>
              <div className="hero-ctas">
                <a 
                  href="https://open.spotify.com/show/5ygCkKbn7il15DLX71Tk4N?si=d311e06c364c4b1d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Play className="h-5 w-5" />
                  Listen on Spotify
                </a>
                <Link to="/episodes" className="btn btn-ghost">
                  <ExternalLink className="h-5 w-5" />
                  Browse Episodes
                </Link>
                <Link to="/reels" className="btn btn-ghost">
                  <ExternalLink className="h-5 w-5" />
                  Watch Reels
                </Link>
              </div>
            </div>
            <div className="hero-media">
              <div className="frame" style={{ aspectRatio: 'auto', minHeight: '400px' }}>
                <div className="on-air">ON AIR</div>
                <img 
                  src="/jay-and-harley.jpeg" 
                  alt="Jay and Harley recording No Plan B podcast"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Latest Episodes</h2>
            <Link to="/episodes">
              <Button variant="outline">View All Episodes</Button>
            </Link>
          </div>
          
          {episodes.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No episodes available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((episode) => {
                const youtubeVideoId = extractYouTubeVideoId(episode.youtube_link);
                
                return (
                  <Card key={episode.id} className="hover:shadow-lg transition-shadow">
                    {youtubeVideoId && (
                      <div className="aspect-video w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                          title={episode.title}
                          className="w-full h-full rounded-t-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{episode.title}</CardTitle>
                      {episode.guest && (
                        <p className="text-sm text-muted-foreground">Guest: {episode.guest}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {episode.description}
                      </p>
                      <div className="flex gap-2">
                        {episode.spotify_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={episode.spotify_link} target="_blank" rel="noopener noreferrer">
                              Spotify
                            </a>
                          </Button>
                        )}
                        {episode.youtube_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={episode.youtube_link} target="_blank" rel="noopener noreferrer">
                              YouTube
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Sponsors Spotlight */}
      {sponsors.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Our Sponsors</h2>
              <Link to="/sponsors">
                <Button variant="outline">View All Sponsors</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sponsors.map((sponsor) => (
                <Card key={sponsor.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                      {sponsor.logo_url ? (
                        <img 
                          src={sponsor.logo_url} 
                          alt={sponsor.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">Logo</span>
                      )}
                    </div>
                    <h3 className="font-semibold mb-2">{sponsor.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {sponsor.description}
                    </p>
                    {sponsor.website_link && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={sponsor.website_link} target="_blank" rel="noopener noreferrer">
                          Visit Site
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe Section */}
      <section className="py-16">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get notified when new episodes drop and receive exclusive content from the No Plan B team.
          </p>
          
          <Card className="text-left">
            <CardContent className="p-6">
              <SubscribeForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-16 bg-card">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            About No Plan B
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            A podcast dedicated to exploring the mindset, grit, and determination required to succeed in startups and life. 
            Join Jay and Harley as they share insights, interview successful entrepreneurs, and discuss what it really takes 
            when there's no backup plan.
          </p>
          <Link to="/about">
            <Button size="lg">Learn More About Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;