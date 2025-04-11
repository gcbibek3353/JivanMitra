interface AgentProps {
    patientName: string;
    patientId?: string;
    consultId?: string;
    reportId?: string;
    summary: any;
  }
  
  interface createReportParams {
    patientId: string;
    transcript: { role: string; content: string }[];
    reportId?: string;
  }