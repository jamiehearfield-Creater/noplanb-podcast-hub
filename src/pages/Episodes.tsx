import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, ExternalLink, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Episode {
  id: string;
  title: string;
  description: string;
  spotify_link: string;
  youtube_link: string;
  apple_link: string;
  amazon_link: string;
  publish_date: string;
  guest: string;
  tags: string[];
  featured: boolean;
  thumbnail_url: string;
  duration: string;
}

const Episodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('episodes')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Error fetching episodes:', error);
    } else {
      setEpisodes(data || []);
    }
    setLoading(false);
  };

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.guest?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Episodes</h1>
        <p className="text-muted-foreground mb-6">
          Explore all episodes of No Plan B Podcast. From startup insights to mindset transformation.
        </p>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredEpisodes.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchTerm ? 'No episodes found' : 'No episodes available yet'}
          </h3>
          <p className="text-muted-foreground">
            {searchTerm 
              ? 'Try adjusting your search terms.' 
              : 'Check back soon for our latest episodes!'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map((episode) => (
            <Card key={episode.id} className={`hover:shadow-lg transition-shadow ${episode.featured ? 'border-secondary' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-2 flex-1">{episode.title}</CardTitle>
                  {episode.featured && (
                    <Badge variant="secondary" className="ml-2 shrink-0">
                      Featured
                    </Badge>
                  )}
                </div>
                
                {episode.guest && (
                  <p className="text-sm text-muted-foreground">Guest: {episode.guest}</p>
                )}
                
                {episode.publish_date && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(episode.publish_date)}
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                {episode.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {episode.description}
                  </p>
                )}

                {episode.tags && episode.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {episode.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {episode.spotify_link && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={episode.spotify_link} target="_blank" rel="noopener noreferrer">
                        <Play className="h-3 w-3 mr-1" />
                        Spotify
                      </a>
                    </Button>
                  )}
                  {episode.youtube_link && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={episode.youtube_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        YouTube
                      </a>
                    </Button>
                  )}
                  {episode.apple_link && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={episode.apple_link} target="_blank" rel="noopener noreferrer">
                        Apple
                      </a>
                    </Button>
                  )}
                  {episode.amazon_link && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={episode.amazon_link} target="_blank" rel="noopener noreferrer">
                        Amazon
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Episodes;