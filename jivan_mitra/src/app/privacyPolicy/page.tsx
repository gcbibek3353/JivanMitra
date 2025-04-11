import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, FileText, Brain, Mic, Database, UserCheck, AlertTriangle } from "lucide-react";

const privacyPolicy = () => {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center p-8 rounded-lg bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent border border-blue-100 dark:border-blue-900 shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="border-blue-100 dark:border-blue-900 shadow-md bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/10 dark:to-transparent">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle>JivanMitra AI Voice Health Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              JivanMitra is an AI-powered voice health assistant designed to provide preliminary health assessments and guidance. This privacy policy explains how we collect, use, and protect your information.
            </p>
          </CardContent>
        </Card>

          <div className="space-y-8">
            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Information We Collect</h2>
              </div>
              <div className="ml-7 space-y-2">
                <p>We collect the following types of information:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Voice recordings during interactions with the AI assistant</li>
                  <li>Health-related information you provide</li>
                  <li>Symptoms and medical history shared during consultations</li>
                  <li>Usage patterns and interaction data</li>
                  <li>Device and technical information</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">How We Protect Your Data</h2>
              </div>
              <div className="ml-7 space-y-2">
                <ul className="list-disc ml-6 space-y-2">
                  <li>End-to-end encryption for all voice interactions</li>
                  <li>Secure, HIPAA-compliant data storage</li>
                  <li>Regular security audits and updates</li>
                  <li>Strict access controls and authentication</li>
                  <li>Data anonymization for AI training</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Voice Data Processing</h2>
              </div>
              <div className="ml-7">
                <p className="mb-2">Your voice interactions are:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Processed in real-time for immediate responses</li>
                  <li>Temporarily stored for service improvement</li>
                  <li>Automatically deleted after 30 days</li>
                  <li>Never shared with third parties without consent</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Data Usage</h2>
              </div>
              <div className="ml-7">
                <p className="mb-2">We use your data to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Provide accurate health assessments</li>
                  <li>Improve our AI models and responses</li>
                  <li>Enhance user experience</li>
                  <li>Maintain service quality</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Your Rights</h2>
              </div>
              <div className="ml-7">
                <ul className="list-disc ml-6 space-y-2">
                  <li>Access your personal data</li>
                  <li>Request data deletion</li>
                  <li>Opt-out of data collection</li>
                  <li>Export your data</li>
                  <li>Update your information</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Important Disclaimers</h2>
              </div>
              <div className="ml-7">
                <ul className="list-disc ml-6 space-y-2">
                  <li>JivanMitra is not a replacement for professional medical care</li>
                  <li>Always consult healthcare professionals for medical decisions</li>
                  <li>AI assessments are preliminary and not definitive diagnoses</li>
                  <li>Seek immediate medical attention for emergencies</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Contact Us</h2>
              </div>
              <div className="ml-7">
                <p>For privacy-related inquiries or to exercise your rights, contact us at:</p>
                <p className="mt-2">
                  Email: privacy@jivanmitra.com<br />
                  Phone: 1-800-JIVAN-HELP<br />
                  Address: Jivan Mitra Colony, Bangalore, India
                </p>
              </div>
            </section>
          </div>
      </div>
    </div>
  );
};

export default privacyPolicy;