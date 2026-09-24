import type { UserRole } from './auth';

export type InspectionType =
  | 'safety'
  | 'environmental'
  | 'equipment'
  | 'worker-safety'
  | 'general-compliance';

export type InspectionItemStatus = 'PASS' | 'FAIL' | 'NOT_APPLICABLE';
export type ViolationSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type InspectionItem = {
  id: string;
  question: string;
  mandatory: boolean;
};

export type Checklist = {
  id: string;
  inspectionType: InspectionType;
  title: string;
  items: InspectionItem[];
};

export type Violation = {
  itemId: string;
  comment?: string;
  severity?: ViolationSeverity;
  photoUri?: string;
};

export type ViolationDetails = Omit<Violation, 'itemId'>;

export type InspectionResult = {
  itemId: string;
  status: InspectionItemStatus;
  violation?: Violation;
};

export type Inspection = {
  id: string;
  inspectorId: string;
  inspectorRole: UserRole;
  siteId: string;
  siteName: string;
  type: InspectionType;
  notes: string;
  checklistId: string;
  results: InspectionResult[];
  submittedAt: string;
  status: 'SUBMITTED';
};

export type InspectionDraft = {
  siteId: string;
  siteName: string;
  type: InspectionType;
  results: InspectionResult[];
  notes: string;
};

export const inspectionTypeLabels: Record<InspectionType, string> = {
  safety: 'Safety Inspection',
  environmental: 'Environmental Inspection',
  equipment: 'Equipment Inspection',
  'worker-safety': 'Worker Safety Inspection',
  'general-compliance': 'General Compliance Inspection',
};

export const mockSites = [
  { id: 'dhanbad-central', name: 'Dhanbad Central Mine' },
  { id: 'bokaro-east', name: 'Bokaro East Mine' },
  { id: 'jharia-west', name: 'Jharia West Mine' },
];

const questions = [
  'Required safety signage is visible and current',
  'Emergency access routes are clear',
  'Required records are available at the work area',
];

export function getChecklist(type: InspectionType): Checklist {
  return {
    id: `${type}-checklist-v1`,
    inspectionType: type,
    title: inspectionTypeLabels[type],
    items: questions.map((question, index) => ({
      id: `${type}-item-${index + 1}`,
      question,
      mandatory: true,
    })),
  };
}
