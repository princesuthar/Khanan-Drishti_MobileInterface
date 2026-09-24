import { ProtectedActionRoute } from '@/components/dashboard/ProtectedActionRoute';

export default function InspectionHistoryRoute() {
  return (
    <ProtectedActionRoute
      title="Inspection history"
      description="Historical inspection records will be available when inspection storage is implemented."
    />
  );
}
