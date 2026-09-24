import Constants from 'expo-constants';

type ExpoExtra = {
  apiUrl?: string;
  environment?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;

export const env = {
  apiUrl: extra.apiUrl ?? 'http://localhost:3000',
  environment: extra.environment ?? 'development',
} as const;
