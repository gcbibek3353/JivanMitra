import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, ShieldCheck, FileText, Brain, BookOpen, AlertCircle, HeartPulse, Stethoscope } from "lucide-react";

const terms = () => {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center p-8 rounded-lg bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent border border-blue-100 dark:border-blue-900 shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
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
              By using JivanMitra, you agree to these terms of service. Please read them carefully before using our AI-powered health assistance platform.
            </p>
          </CardContent>
        </Card>

          <div className="space-y-8">
            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
              </div>
              <div className="ml-7 space-y-2">
                <p>By accessing or using JivanMitra, you agree to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Comply with all terms and conditions</li>
                  <li>Provide accurate information during interactions</li>
                  <li>Use the service for its intended purpose</li>
                  <li>Accept that AI suggestions are preliminary</li>
                  <li>Not misuse or abuse the service</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Service Description</h2>
              </div>
              <div className="ml-7 space-y-2">
                <p>JivanMitra provides:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>AI-powered preliminary health assessments</li>
                  <li>Voice-based interaction for health queries</li>
                  <li>Basic health information and guidance</li>
                  <li>Symptom analysis and preliminary recommendations</li>
                  <li>Health tracking and monitoring features</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">User Responsibilities</h2>
              </div>
              <div className="ml-7">
                <p className="mb-2">Users must:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Provide accurate health information</li>
                  <li>Not use the service for emergency medical situations</li>
                  <li>Maintain confidentiality of their account</li>
                  <li>Report any security concerns or misuse</li>
                  <li>Follow recommended medical advice from healthcare professionals</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Limitations of Service</h2>
              </div>
              <div className="ml-7">
                <ul className="list-disc ml-6 space-y-2">
                  <li>Not a substitute for professional medical advice</li>
                  <li>No guarantee of accuracy or completeness</li>
                  <li>May experience service interruptions</li>
                  <li>Limited to preliminary assessments only</li>
                  <li>Response time may vary based on system load</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Medical Disclaimer</h2>
              </div>
              <div className="ml-7">
                <ul className="list-disc ml-6 space-y-2">
                  <li>Not a diagnostic tool or medical device</li>
                  <li>Does not establish a doctor-patient relationship</li>
                  <li>Should not be used in medical emergencies</li>
                  <li>Consult healthcare providers for medical decisions</li>
                  <li>Results are suggestive, not definitive</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Termination of Service</h2>
              </div>
              <div className="ml-7">
                <p>JivanMitra reserves the right to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Suspend or terminate access without notice</li>
                  <li>Modify or discontinue services</li>
                  <li>Block users violating terms</li>
                  <li>Retain or delete user data per privacy policy</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4 p-4 rounded-lg border border-blue-50 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold">Contact Information</h2>
              </div>
              <div className="ml-7">
                <p>For questions about these terms, contact us at:</p>
                <p className="mt-2">
                  Email: legal@jivanmitra.com<br />
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

export default terms;