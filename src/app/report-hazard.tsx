import { ProtectedActionRoute } from '@/components/dashboard/ProtectedActionRoute';

export default function ReportHazardRoute() {
  return (
    <ProtectedActionRoute
      title="Report hazard"
      description="Hazard reporting will be available in the incident reporting phase."
    />
  );
}
