import type { UserRole } from './auth';

export type DashboardMetric = {
  label: string;
  value: string;
  icon: string;
  tone: 'primary' | 'warning' | 'danger' | 'neutral';
};

export type DashboardData = {
  assignedSite: string;
  shift: string;
  metrics: DashboardMetric[];
  highRiskAlerts: string[];
  syncStatus: 'synced' | 'pending';
  lastSyncedAt: string;
};

export function getMockDashboardData(role: UserRole): DashboardData {
  return {
    assignedSite: role === 'inspector' ? 'Dhanbad Central Mine' : 'Bokaro East Mine',
    shift: role === 'inspector' ? 'Day shift · 06:00 - 14:00' : 'Day shift · 07:00 - 15:00',
    metrics: [
      { label: "Today's inspections", value: role === 'inspector' ? '04' : '02', icon: 'clipboard-check-outline', tone: 'primary' },
      { label: 'Pending inspections', value: role === 'inspector' ? '02' : '01', icon: 'clock-alert-outline', tone: 'warning' },
      { label: 'Open incidents', value: '03', icon: 'alert-circle-outline', tone: 'danger' },
    ],
    highRiskAlerts: [
      'Ventilation sensor requires review',
      'Haul road visibility below threshold',
    ],
    syncStatus: 'synced',
    lastSyncedAt: 'Today, 09:42',
  };
}
