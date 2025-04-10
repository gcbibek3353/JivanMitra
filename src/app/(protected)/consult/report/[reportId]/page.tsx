'use client'
import { useFirebase } from '@/firebase/firebaseConfig';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ReportPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const res = await firebase.getReportByReportId(params.reportId);
      if (!res.success) {
        console.log('Failed to fetch report');
        router.push('/dashboard');
        return;
      }
      setReport(res.report.report);
    } catch (error) {
      console.log('Error while getting the report', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-xl text-gray-300">Report not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Medical Report
          </h1>
          <p className="text-gray-400">Detailed analysis and recommendations</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Symptoms Section */}
          <Section title="Symptoms" icon="🩺">
            <ul className="space-y-2">
              {report.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">{symptom}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Causes Section */}
          <Section title="Potential Causes" icon="🔍">
            <p className="text-gray-300 whitespace-pre-line">{report.causes}</p>
          </Section>

          {/* Precaution Section */}
          <Section title="Precautions" icon="🛡️">
            <p className="text-gray-300 whitespace-pre-line">{report.precaution}</p>
          </Section>

          {/* Diagnostic Tests Section */}
          <Section title="Diagnostic Tests" icon="🧪">
            <p className="text-gray-300 whitespace-pre-line">{report.suggested_Diagnostic_tests}</p>
          </Section>

          {/* Symptoms to Monitor Section */}
          <Section title="Symptoms to Monitor" icon="👁️">
            <ul className="space-y-2">
              {report.symptoms_to_monitor.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span className="text-gray-300">{symptom}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Medications Section */}
          <Section title="Medications" icon="💊">
            <p className="text-gray-300 whitespace-pre-line">{report.medications}</p>
          </Section>

          {/* Next Steps Section */}
          <Section title="Next Steps" icon="🔄">
            <p className="text-gray-300 whitespace-pre-line">{report.next_step}</p>
          </Section>
        </div>

        <div className="mt-10 text-center">
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Section component with icon support
const Section = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) => (
  <div className="border-b border-gray-700 last:border-b-0 px-6 py-5 hover:bg-gray-750 transition-colors duration-200">
    <div className="flex items-center mb-3">
      {icon && <span className="text-xl mr-3">{icon}</span>}
      <h2 className="text-2xl font-semibold text-cyan-400">{title}</h2>
    </div>
    <div className="pl-9">
      {children}
    </div>
  </div>
);

export default ReportPage;

type Report = {
  symptoms: string[];
  causes: string;
  precaution: string;
  suggested_Diagnostic_tests: string;
  symptoms_to_monitor: string[];
  medications: string;
  next_step: string;
};