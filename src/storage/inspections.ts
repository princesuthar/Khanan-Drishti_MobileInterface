import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Inspection } from '@/types/inspection';

const INSPECTIONS_KEY = 'khanan-drishti.inspections';

export async function readInspections(): Promise<Inspection[]> {
  const value = await AsyncStorage.getItem(INSPECTIONS_KEY);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as Inspection[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveInspection(inspection: Inspection) {
  const inspections = await readInspections();
  await AsyncStorage.setItem(INSPECTIONS_KEY, JSON.stringify([inspection, ...inspections]));
}
