import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Instagram, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Reel {
  id: string;
  embed_url: string;
  caption: string;
  thumbnail_url: string;
  publish_date: string;
  instagram_id: string;
}

const extractYouTubeShortId = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/shorts\/([^&\s?]+)/,
    /youtu\.be\/([^&\s?]+)/,
    /youtube\.com\/embed\/([^&\s?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const hardcodedReels = [
  {
    id: '1',
    embed_url: 'https://www.youtube.com/embed/U3BaDTMkvQ0',
    caption: 'He turned a religion into a business & made millions🤣',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '2',
    embed_url: 'https://www.youtube.com/embed/d7Ya-Y0Kv78',
    caption: 'Why can\'t we be full of ourselves?',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '3',
    embed_url: 'https://www.youtube.com/embed/n0dflCF_Z2Y',
    caption: 'Having a baby changed my life',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '4',
    embed_url: 'https://www.youtube.com/embed/rCOY9cuqdCE',
    caption: 'Debbie talks about the dark side of the aesthetics game',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '5',
    embed_url: 'https://www.youtube.com/embed/mvWQNb0A7KY',
    caption: 'Working away a lot isn\'t for the weak. Need a strong woman by your side',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '6',
    embed_url: 'https://www.youtube.com/embed/6ycdwA7eLZ0',
    caption: 'Wild night to be a doorman',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '7',
    embed_url: 'https://www.youtube.com/embed/kS1SQ8hQNTE',
    caption: 'The problem was always trying to fit in',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '8',
    embed_url: 'https://www.youtube.com/embed/7wdCNyjM9HA',
    caption: 'Jay Short 3',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '9',
    embed_url: 'https://www.youtube.com/embed/WhaLygBgJFU',
    caption: 'Jay Short 2',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  },
  {
    id: '10',
    embed_url: 'https://www.youtube.com/embed/0mJBR4He794',
    caption: 'Jay Short 1',
    thumbnail_url: '',
    publish_date: '',
    instagram_id: ''
  }
];

const Reels = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reels')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Error fetching reels:', error);
    }
    
    // Combine hardcoded reels with database reels, with hardcoded reels first
    const allReels = [...hardcodedReels, ...(data || [])];
    setReels(allReels);
    setLoading(false);
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Reels</h1>
        <p className="text-muted-foreground mb-6">
          Watch our latest short-form content featuring highlights, behind-the-scenes moments, and quick insights.
        </p>
        
        <Button variant="outline" asChild>
          <a 
            href="https://www.instagram.com/noplanb.pod/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="mr-2 h-4 w-4" />
            Follow on Instagram
          </a>
        </Button>
      </div>

      {reels.length === 0 ? (
        <div className="text-center py-12">
          <Instagram className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No reels available yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Check back soon for our latest short-form content!
          </p>
          <Button asChild>
            <a 
              href="https://www.instagram.com/noplanb.pod/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Follow on Instagram
            </a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reels.map((reel) => {
            const youtubeShortId = extractYouTubeShortId(reel.embed_url);
            
            return (
              <Card key={reel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[9/16] bg-muted relative">
                    {youtubeShortId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeShortId}`}
                        title={reel.caption || 'YouTube Short'}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : reel.thumbnail_url ? (
                      <>
                        <img 
                          src={reel.thumbnail_url}
                          alt="Reel thumbnail"
                          className="w-full h-full object-cover"
                        />
                        {reel.embed_url && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button size="sm" asChild>
                              <a href={reel.embed_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Reel
                              </a>
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Instagram className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    {reel.caption && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                        {reel.caption}
                      </p>
                    )}
                    
                    {reel.publish_date && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(reel.publish_date)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reels;