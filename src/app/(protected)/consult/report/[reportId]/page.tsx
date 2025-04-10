'use client'
import { useFirebase } from '@/firebase/firebaseConfig';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

const ReportPage = () => {
  const params = useParams();
  const { loggedInUser } = useFirebase();
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

  const downloadPdf = async () => {
    if (!report || !loggedInUser) return;
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add title
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 128); // Navy blue
    pdf.text('Medical Report', 105, 20, { align: 'center' });
    
    // Add patient information
    pdf.setFontSize(12);
    pdf.setTextColor(100); // Dark gray
    pdf.text(`Patient Name: ${loggedInUser.displayName || 'Not provided'}`, 20, 30);
    pdf.text(`Email: ${loggedInUser.email || 'Not provided'}`, 20, 37);
    pdf.text(`Report ID: ${params.reportId}`, 20, 44);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 51);
  
    // Set styles for content
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0); // Black
  
    let yPosition = 65; // Start below patient info
  
    // Function to add section
    const addSection = (title: string, content: string | string[]) => {
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 128); // Navy blue
      pdf.text(title + ':', 20, yPosition);
      yPosition += 8;
  
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Black
  
      if (Array.isArray(content)) {
        content.forEach(item => {
          pdf.text('• ' + item, 25, yPosition);
          yPosition += 7;
        });
      } else {
        const lines = pdf.splitTextToSize(content, 170);
        pdf.text(lines, 20, yPosition);
        yPosition += lines.length * 7;
      }
      
      yPosition += 10; // Space between sections
    };
  
    // Add all sections
    addSection('Symptoms', report.symptoms);
    addSection('Potential Causes', report.causes);
    addSection('Precautions', report.precaution);
    addSection('Diagnostic Tests', report.suggested_Diagnostic_tests);
    addSection('Symptoms to Monitor', report.symptoms_to_monitor);
    addSection('Medications', report.medications);
    addSection('Next Steps', report.next_step);
  
    pdf.save(`medical-report-${loggedInUser.displayName || 'patient'}-${params.reportId}.pdf`);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!report || !loggedInUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-white w-full">
        <p className="text-xl text-gray-700">Report not found or user not logged in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full h-full">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
            Medical Report
          </h1>
          <p className="text-gray-600">Detailed analysis and recommendations</p>
        </div>

        <div id="report-content" className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Header with patient info */}
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  {loggedInUser.photoURL && (
                    <img 
                      src={loggedInUser.photoURL} 
                      alt="Patient" 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-blue-800">Patient Report</h2>
                    <p className="text-sm text-gray-600">{loggedInUser.displayName}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{loggedInUser.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Report ID: {params.reportId}</p>
                <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Symptoms Section */}
          <Section title="Symptoms" icon="🩺">
            <ul className="space-y-2">
              {report.symptoms.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Causes Section */}
          <Section title="Potential Causes" icon="🔍">
            <p className="text-gray-700 whitespace-pre-line">{report.causes}</p>
          </Section>

          {/* Precaution Section */}
          <Section title="Precautions" icon="🛡️">
            <p className="text-gray-700 whitespace-pre-line">{report.precaution}</p>
          </Section>

          {/* Diagnostic Tests Section */}
          <Section title="Diagnostic Tests" icon="🧪">
            <p className="text-gray-700 whitespace-pre-line">{report.suggested_Diagnostic_tests}</p>
          </Section>

          {/* Symptoms to Monitor Section */}
          <Section title="Symptoms to Monitor" icon="👁️">
            <ul className="space-y-2">
              {report.symptoms_to_monitor.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Medications Section */}
          <Section title="Medications" icon="💊">
            <p className="text-gray-700 whitespace-pre-line">{report.medications}</p>
          </Section>

          {/* Next Steps Section */}
          <Section title="Next Steps" icon="🔄">
            <p className="text-gray-700 whitespace-pre-line">{report.next_step}</p>
          </Section>
        </div>

        <div className="mt-10 text-center space-x-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-all duration-300 shadow hover:shadow-md"
          >
            Return to Dashboard
          </button>
          <button 
            onClick={downloadPdf}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 shadow hover:shadow-md"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// Enhanced Section component with icon support
const Section = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) => (
  <div className="border-b border-gray-200 last:border-b-0 px-6 py-5 hover:bg-blue-50 transition-colors duration-200">
    <div className="flex items-center mb-3">
      {icon && <span className="text-xl mr-3">{icon}</span>}
      <h2 className="text-2xl font-semibold text-blue-700">{title}</h2>
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