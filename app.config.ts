import type { ExpoConfig } from 'expo/config';
import appJson from './app.json';

const baseConfig = appJson.expo as unknown as ExpoConfig;

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';
const environment = process.env.APP_ENV ?? 'development';

const config: ExpoConfig = {
  ...baseConfig,
  extra: {
    ...baseConfig.extra,
    apiUrl,
    environment,
  },
};

export default config;
