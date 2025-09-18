import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Cookies = () => {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better browsing experience by remembering your preferences 
              and understanding how you use our site.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li>To ensure our website functions properly</li>
              <li>To remember your preferences and settings</li>
              <li>To analyse website traffic and user behaviour</li>
              <li>To improve our website and services</li>
              <li>To provide personalised content and advertisements (if applicable)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types of Cookies We Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
              <p className="text-muted-foreground text-sm">
                These cookies are necessary for the website to function properly. They cannot be disabled 
                and are set in response to actions you take, such as filling out forms or setting preferences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
              <p className="text-muted-foreground text-sm">
                These cookies help us understand how visitors interact with our website by collecting 
                and reporting information anonymously. This helps us improve our website's performance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Functional Cookies</h4>
              <p className="text-muted-foreground text-sm">
                These cookies remember your preferences and settings to provide you with a more 
                personalised experience on subsequent visits.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Marketing Cookies (if applicable)</h4>
              <p className="text-muted-foreground text-sm">
                These cookies may be used to track visitors across websites to display relevant 
                advertisements. They may be set by advertising partners through our site.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Third-Party Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We may use third-party services that set their own cookies, including:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 space-y-1">
              <li><strong>Google Analytics:</strong> To analyse website traffic and user behaviour</li>
              <li><strong>Meta Pixel (Facebook):</strong> For advertising and analytics purposes (if implemented)</li>
              <li><strong>Embedded content:</strong> Such as YouTube videos, Spotify players, or social media widgets</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Managing Your Cookie Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You have several options for managing cookies:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Browser Settings</h4>
                <p className="text-muted-foreground text-sm">
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="text-muted-foreground text-sm list-disc pl-6 mt-2 space-y-1">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies</li>
                  <li>Delete existing cookies</li>
                  <li>Receive notifications when cookies are set</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cookie Banner</h4>
                <p className="text-muted-foreground text-sm">
                  When you first visit our website, you'll see a cookie banner where you can choose 
                  which types of cookies to accept or reject.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact of Disabling Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              While you can browse our website with cookies disabled, some functionality may be limited. 
              Disabling cookies may affect:
            </p>
            <ul className="text-muted-foreground list-disc pl-6 mt-2 space-y-1">
              <li>Website performance and loading times</li>
              <li>Personalisation features</li>
              <li>Form functionality</li>
              <li>Analytics that help us improve the site</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Updates to This Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Cookie Policy from time to time to reflect changes in technology, 
              legislation, or our practices. Any changes will be posted on this page with an updated date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our use of cookies, please contact us:
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

export default Cookies;