interface AgentProps {
  patientName: string;
  patientId?: string;
  consultId?: string;
  reportId?: string;
}

interface createReportParams {
  consultId: string;
  patientId: string;
  transcript: { role: string; content: string }[];
  reportId?: string;
}