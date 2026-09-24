import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { InspectionDraft, InspectionResult, InspectionType } from '@/types/inspection';

type InspectionDraftContextValue = {
  draft: InspectionDraft;
  setSite: (siteId: string, siteName: string) => void;
  setType: (type: InspectionType) => void;
  setResult: (result: InspectionResult) => void;
  setNotes: (notes: string) => void;
  reset: () => void;
};

const emptyDraft: InspectionDraft = { siteId: '', siteName: '', type: 'safety', results: [], notes: '' };
const DraftContext = createContext<InspectionDraftContextValue | undefined>(undefined);

export function InspectionDraftProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<InspectionDraft>(emptyDraft);
  const setSite = useCallback((siteId: string, siteName: string) => setDraft((current) => ({ ...current, siteId, siteName })), []);
  const setType = useCallback((type: InspectionType) => setDraft((current) => ({ ...current, type, results: [] })), []);
  const setResult = useCallback((result: InspectionResult) => setDraft((current) => ({
    ...current,
    results: [...current.results.filter((item) => item.itemId !== result.itemId), result],
  })), []);
  const setNotes = useCallback((notes: string) => setDraft((current) => ({ ...current, notes })), []);
  const reset = useCallback(() => setDraft(emptyDraft), []);
  const value = useMemo(() => ({ draft, setSite, setType, setResult, setNotes, reset }), [draft, reset, setNotes, setResult, setSite, setType]);
  return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useInspectionDraft() {
  const context = useContext(DraftContext);
  if (!context) throw new Error('useInspectionDraft must be used inside InspectionDraftProvider');
  return context;
}
