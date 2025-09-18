import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              We collect information you provide directly to us, such as when you subscribe to our podcast updates, 
              contact us, or interact with our website. This may include:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>Email address</li>
              <li>Mobile phone number (optional)</li>
              <li>Name (if provided)</li>
              <li>Communication preferences</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>Send you podcast episode notifications and updates</li>
              <li>Communicate with you about our services</li>
              <li>Respond to your enquiries and provide customer support</li>
              <li>Send marketing communications (only with your consent)</li>
              <li>Improve our website and services</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Legal Basis for Processing (UK GDPR)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Under UK GDPR, we process your personal data based on:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li><strong>Consent:</strong> For marketing communications and optional services</li>
              <li><strong>Legitimate interests:</strong> For providing our podcast service and improving user experience</li>
              <li><strong>Contract:</strong> To provide services you've requested</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except in the following circumstances:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>With service providers who assist us in operating our website and services</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We implement appropriate technical and organisational security measures to protect your personal data 
              against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Under UK GDPR, you have the right to:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us using the details below.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, 
              unless a longer retention period is required by law. You may request deletion of your data at any time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our website may use cookies and similar tracking technologies to improve user experience and analyse website usage. 
              You can control cookie settings through your browser. For more information, see our 
              <a href="/cookies" className="text-secondary underline hover:no-underline"> Cookie Policy</a>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an 
              updated revision date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="text-muted-foreground">
              <p><strong>No Plan B Podcast</strong></p>
              <p>Email: Available via WhatsApp contact</p>
              <p>WhatsApp: <a href="https://wa.me/447975924957" className="text-secondary underline hover:no-underline">+44 7975 924957</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;