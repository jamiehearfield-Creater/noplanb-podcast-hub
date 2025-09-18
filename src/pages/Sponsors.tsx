import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  website_link: string;
  featured: boolean;
}

const Sponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('featured', { ascending: false })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching sponsors:', error);
    } else {
      setSponsors(data || []);
    }
    setLoading(false);
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Our Sponsors</h1>
        <p className="text-muted-foreground">
          We're grateful to our sponsors who support No Plan B Podcast and believe in our mission 
          to inspire entrepreneurs and share valuable insights about startups and mindset.
        </p>
      </div>

      {sponsors.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No sponsors available yet
          </h3>
          <p className="text-muted-foreground">
            We're always looking for partners who share our vision. Check back soon!
          </p>
        </div>
      ) : (
        <>
          {/* Featured Sponsors */}
          {sponsors.some(sponsor => sponsor.featured) && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Featured Sponsors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sponsors
                    .filter(sponsor => sponsor.featured)
                    .map((sponsor) => (
                      <Card key={sponsor.id} className="border-secondary hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                                {sponsor.logo_url ? (
                                  <img 
                                    src={sponsor.logo_url} 
                                    alt={sponsor.name}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                ) : (
                                  <Building2 className="h-8 w-8 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <CardTitle className="text-xl">{sponsor.name}</CardTitle>
                                <Badge variant="secondary" className="mt-1">
                                  Featured
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {sponsor.description && (
                            <p className="text-muted-foreground mb-4">
                              {sponsor.description}
                            </p>
                          )}
                          {sponsor.website_link && (
                            <Button asChild>
                              <a href={sponsor.website_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Website
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* All Other Sponsors */}
          {sponsors.some(sponsor => !sponsor.featured) && (
            <>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {sponsors.some(sponsor => sponsor.featured) ? 'Our Partners' : 'All Sponsors'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsors
                  .filter(sponsor => !sponsor.featured)
                  .map((sponsor) => (
                    <Card key={sponsor.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-20 h-20 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                          {sponsor.logo_url ? (
                            <img 
                              src={sponsor.logo_url} 
                              alt={sponsor.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            <Building2 className="h-10 w-10 text-muted-foreground" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {sponsor.name}
                        </h3>
                        {sponsor.description && (
                          <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                            {sponsor.description}
                          </p>
                        )}
                        {sponsor.website_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={sponsor.website_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-3 w-3" />
                              Visit Site
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Sponsorship CTA */}
      <div className="mt-16 text-center bg-muted/20 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Interested in Sponsoring?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Partner with No Plan B Podcast to reach an engaged audience of entrepreneurs, 
          startup founders, and business-minded individuals who are passionate about growth and success.
        </p>
        <Button size="lg" asChild>
          <a 
            href="https://wa.me/447975924957?text=Hi%20there%20-%20I'm%20interested%20in%20sponsoring%20No%20Plan%20B%20Podcast"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in Touch
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Sponsors;