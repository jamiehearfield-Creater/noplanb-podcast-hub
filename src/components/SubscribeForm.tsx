import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SubscribeFormProps {
  className?: string;
}

const SubscribeForm = ({ className }: SubscribeFormProps) => {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !privacyConsent) {
      toast({
        title: "Error",
        description: "Please provide your email and accept the privacy policy.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert({
          email,
          mobile: mobile || null,
          marketing_consent: marketingConsent,
          privacy_consent: privacyConsent,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our updates.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been subscribed to No Plan B Podcast updates.",
        });
        setEmail('');
        setMobile('');
        setMarketingConsent(false);
        setPrivacyConsent(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="mobile">Mobile Number (Optional)</Label>
          <Input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+44 7xxx xxx xxx"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="marketing"
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
            />
            <Label htmlFor="marketing" className="text-sm">
              I would like to receive marketing updates and promotional content
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy"
              checked={privacyConsent}
              onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
              required
            />
            <Label htmlFor="privacy" className="text-sm">
              I accept the{' '}
              <a href="/privacy" className="text-secondary underline hover:no-underline">
                Privacy Policy
              </a>{' '}
              *
            </Label>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
        </Button>
      </div>
    </form>
  );
};

export default SubscribeForm;