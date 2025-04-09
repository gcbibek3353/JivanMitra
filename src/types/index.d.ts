
interface AgentProps {
  patientName: string;
  patientId?: string;
  consultId?: string;
  reportId?: string;
}

interface createReportParams {
  patientId: string;
  transcript: { role: string; content: string }[];
  reportId?: string;
}

interface addReportParams {
  patientId : string;
  report : Report
}