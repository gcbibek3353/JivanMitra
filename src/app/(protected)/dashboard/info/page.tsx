import { MedicationTracker } from "@/components/medical-tracker";

export default function info() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Patient Medication Tracker</h1>
      <MedicationTracker />
    </div>
  );
}
