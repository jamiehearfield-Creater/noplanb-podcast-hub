import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Lightbulb, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">About No Plan B</h1>
        <p className="text-xl text-muted-foreground">
          The story behind the podcast that's changing how we think about entrepreneurship
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <Target className="h-6 w-6 text-secondary mr-3" />
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground text-lg leading-relaxed">
            No Plan B Podcast was born from a simple belief: when you eliminate the safety net, 
            you create space for extraordinary outcomes. We're here to explore the mindset, grit, 
            and determination required to succeed when failure isn't an option.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Through honest conversations with successful entrepreneurs, startup founders, and 
            industry leaders, we uncover the real stories behind building businesses, overcoming 
            challenges, and maintaining the mental fortitude to keep pushing forward when the odds are stacked against you.
          </p>
        </div>
      </div>

      {/* Hosts Section */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <Users className="h-6 w-6 text-secondary mr-3" />
          <h2 className="text-2xl font-bold text-foreground">Meet Your Hosts</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Jay */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  {/* Placeholder for Jay's photo */}
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Jay</h3>
                  <p className="text-muted-foreground">
                    An entrepreneur and startup enthusiast with years of experience in building and scaling businesses. 
                    Jay brings practical insights and real-world experience to every conversation, having walked the 
                    difficult path of turning ideas into reality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Harley */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  {/* Placeholder for Harley's photo */}
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Harley</h3>
                  <p className="text-muted-foreground">
                    A mindset coach and business strategist focused on the psychological aspects of entrepreneurship. 
                    Harley explores the mental frameworks and habits that separate successful entrepreneurs from 
                    those who give up when things get tough.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What We Cover */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <Lightbulb className="h-6 w-6 text-secondary mr-3" />
          <h2 className="text-2xl font-bold text-foreground">What We Cover</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Mindset</h3>
              <p className="text-sm text-muted-foreground">
                The mental frameworks and psychological tools needed to thrive under pressure
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Startups</h3>
              <p className="text-sm text-muted-foreground">
                Real stories from founders who've built successful companies from the ground up
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Grit</h3>
              <p className="text-sm text-muted-foreground">
                The determination and resilience required to push through when everyone says it's impossible
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16 bg-muted/20 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Authenticity</h3>
            <p className="text-sm text-muted-foreground">
              We share real stories, including the failures and setbacks that most people don't talk about.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Action-Oriented</h3>
            <p className="text-sm text-muted-foreground">
              Every conversation is designed to provide actionable insights you can apply to your own journey.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">No Fluff</h3>
            <p className="text-sm text-muted-foreground">
              We cut through the noise and focus on what actually works in the real world.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground">
              We're building a community of like-minded individuals who support each other's growth.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Ready to Join the Journey?
        </h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to No Plan B Podcast and never miss an episode. Get exclusive content, 
          early access to episodes, and join a community of entrepreneurs who refuse to accept mediocrity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/subscribe">
            <Button size="lg">Subscribe Now</Button>
          </Link>
          <Button size="lg" variant="outline" asChild>
            <a 
              href="https://wa.me/447975924957?text=Hey%20%E2%80%94%20I%20found%20No%20Plan%20B%20via%20your%20website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;