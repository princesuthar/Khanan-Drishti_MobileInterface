/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme,
} from 'react-native-paper';

export const Colors = {
  light: {
    text: '#172016',
    background: '#F4F6F1',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E4E9DE',
    textSecondary: '#5D6759',
    accent: '#2F6B3B',
    primary: '#2F6B3B',
    warning: '#C78A16',
    danger: '#B84034',
    border: '#D6DED0',
  },
  dark: {
    text: '#F1F5EC',
    background: '#111611',
    backgroundElement: '#1B231B',
    backgroundSelected: '#2B382B',
    textSecondary: '#B2BDAF',
    accent: '#8DCB8A',
    primary: '#8DCB8A',
    warning: '#E5B84D',
    danger: '#F08A7A',
    border: '#344134',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const paperLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: '#D9EAD6',
    onPrimaryContainer: '#123518',
    secondary: '#66705E',
    background: Colors.light.background,
    surface: Colors.light.backgroundElement,
    surfaceVariant: Colors.light.backgroundSelected,
    onSurface: Colors.light.text,
    onSurfaceVariant: Colors.light.textSecondary,
    outline: Colors.light.border,
    error: Colors.light.danger,
  },
};

export const paperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.dark.primary,
    primaryContainer: '#29432C',
    onPrimaryContainer: '#D9EAD6',
    secondary: '#B8C5AD',
    background: Colors.dark.background,
    surface: Colors.dark.backgroundElement,
    surfaceVariant: Colors.dark.backgroundSelected,
    onSurface: Colors.dark.text,
    onSurfaceVariant: Colors.dark.textSecondary,
    outline: Colors.dark.border,
    error: Colors.dark.danger,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
