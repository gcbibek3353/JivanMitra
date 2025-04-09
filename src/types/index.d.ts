
interface AgentProps {
  patientName: string;
  patientId?: string;
  consultId?: string;
  reportId?: string;
  summary : string;
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

interface UserInfoParams {
  age : string;
  height : string;
  weight : string;
  gender : string;
  summary : string
}

interface addNutritionParams{
  patientId : string;
  nutrition : Nutrition
}