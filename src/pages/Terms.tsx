import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              By accessing and using the No Plan B Podcast website and services, you agree to be bound by these 
              Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No Plan B Podcast provides audio and video content focused on entrepreneurship, startups, and mindset development. 
              Our services include podcast episodes, newsletters, and community features accessible through our website and 
              third-party platforms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts and Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              When you subscribe to our services, you agree to:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Keep your contact information up to date</li>
              <li>Be responsible for maintaining the confidentiality of any account information</li>
              <li>Notify us immediately of any unauthorised use of your account</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You agree not to use our services to:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Distribute spam, malware, or other harmful content</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Use our content for commercial purposes without permission</li>
              <li>Harass, threaten, or intimidate other users</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              All content provided through our services, including but not limited to audio recordings, 
              video content, text, graphics, and logos, is owned by No Plan B Podcast or our licensors and 
              is protected by copyright and other intellectual property laws.
            </p>
            <p className="text-muted-foreground">
              You may not reproduce, distribute, modify, or create derivative works from our content without 
              our express written permission, except for personal, non-commercial use.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. User-Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you submit content to us (such as comments, feedback, or suggestions), you grant us a 
              non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and distribute 
              that content in connection with our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Third-Party Links and Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites or services (such as Spotify, YouTube, etc.). 
              We are not responsible for the content, privacy policies, or practices of these third-party services. 
              Your use of third-party services is subject to their own terms and conditions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Disclaimers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our services are provided "as is" without warranties of any kind. We specifically disclaim:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>Any guarantee that our services will be uninterrupted or error-free</li>
              <li>The accuracy, completeness, or reliability of content</li>
              <li>That our services will meet your specific requirements</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              The content provided is for informational and entertainment purposes only and should not be 
              considered professional advice.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, No Plan B Podcast shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, including but not limited to loss of profits, 
              data, or other intangible losses, resulting from your use of our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Indemnification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless No Plan B Podcast from any claims, damages, losses, or 
              expenses (including legal fees) arising from your use of our services or violation of these terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may terminate or suspend your access to our services at any time, with or without cause or notice. 
              You may also terminate your subscription at any time by contacting us or unsubscribing through the 
              methods provided in our communications.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms of Service are governed by and construed in accordance with the laws of England and Wales. 
              Any disputes arising from these terms or your use of our services will be subject to the exclusive 
              jurisdiction of the courts of England and Wales.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>13. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page 
              with an updated effective date. Continued use of our services after changes constitutes acceptance of 
              the revised terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>14. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-muted-foreground">
              <p><strong>No Plan B Podcast</strong></p>
              <p>WhatsApp: <a href="https://wa.me/447975924957" className="text-secondary underline hover:no-underline">+44 7975 924957</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;