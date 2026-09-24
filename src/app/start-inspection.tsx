import { ProtectedActionRoute } from '@/components/dashboard/ProtectedActionRoute';

export default function StartInspectionRoute() {
  return (
    <ProtectedActionRoute
      title="Start inspection"
      description="Inspection setup will be available in the field inspection phase."
    />
  );
}
