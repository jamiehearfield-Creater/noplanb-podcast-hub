import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Play, Music, Headphones } from 'lucide-react';
import SubscribeForm from '@/components/SubscribeForm';

const Subscribe = () => {
  const platforms = [
    {
      name: 'Spotify',
      icon: Play,
      url: 'https://open.spotify.com/show/5ygCkKbn7il15DLX71Tk4N?si=d311e06c364c4b1d',
      description: 'Listen on the world\'s largest music streaming platform',
      color: 'text-green-600'
    },
    {
      name: 'YouTube',
      icon: ExternalLink,
      url: 'https://www.youtube.com/@NoPlanB.podcast',
      description: 'Watch video episodes and behind-the-scenes content',
      color: 'text-red-600'
    },
    {
      name: 'Apple Podcasts',
      icon: Headphones,
      url: 'https://podcasts.apple.com/gb/podcast/no-plan-b-podcast/id1832084964',
      description: 'Subscribe on Apple\'s native podcast app',
      color: 'text-gray-700'
    },
    {
      name: 'Amazon Music',
      icon: Music,
      url: 'https://music.amazon.co.uk/podcasts/e8a3617b-a74d-4d42-a9b7-9330e1091438/no-plan-b-podcast',
      description: 'Available on Amazon\'s music platform',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Subscribe to No Plan B</h1>
        <p className="text-xl text-muted-foreground">
          Never miss an episode. Choose your preferred platform and get notified when new content drops.
        </p>
      </div>

      {/* Platform Buttons */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Listen & Subscribe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <Card key={platform.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`shrink-0 ${platform.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {platform.description}
                      </p>
                      <Button asChild className="w-full">
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          Subscribe on {platform.name}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Email Subscription */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Get Exclusive Updates
          </h2>
          <p className="text-muted-foreground">
            Subscribe to our email list for episode notifications, exclusive content, 
            behind-the-scenes updates, and early access to special episodes.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Email Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <SubscribeForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-muted/20 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Subscriber Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">Early Episode Access</h3>
              <p className="text-sm text-muted-foreground">
                Get new episodes before they're released to the general public
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">Exclusive Content</h3>
              <p className="text-sm text-muted-foreground">
                Bonus episodes, extended interviews, and behind-the-scenes content
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">Community Access</h3>
              <p className="text-sm text-muted-foreground">
                Join discussions with other entrepreneurs and like-minded individuals
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">Guest Suggestions</h3>
              <p className="text-sm text-muted-foreground">
                Influence who we interview next and suggest topics you'd like to hear about
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social CTA */}
      <div className="text-center mt-16">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Stay Connected
        </h3>
        <p className="text-muted-foreground mb-6">
          Follow us on social media for daily insights, quotes, and updates from the No Plan B community.
        </p>
        <Button size="lg" asChild>
          <a 
            href="https://wa.me/447975924957?text=Hey%20%E2%80%94%20I%20found%20No%20Plan%20B%20via%20your%20website"
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

export default Subscribe;