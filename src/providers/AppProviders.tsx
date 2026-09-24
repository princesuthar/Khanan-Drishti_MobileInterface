import { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { MD3Theme, PaperProvider, Text } from 'react-native-paper';

import { paperDarkTheme, paperLightTheme } from '@/constants/theme';
import { AuthProvider } from './AuthProvider';

export function AppProviders({ children }: PropsWithChildren) {
  const scheme = useColorScheme();
  const theme: MD3Theme = scheme === 'dark' ? paperDarkTheme : paperLightTheme;

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </PaperProvider>
  );
}

export function AppLoading({ message = 'Preparing field workspace...' }: { message?: string }) {
  return (
    <View style={styles.loading} accessibilityLabel={message}>
      <ActivityIndicator />
      <Text variant="bodyMedium">{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});
