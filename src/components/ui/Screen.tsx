import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

type ScreenProps = PropsWithChildren<
  ScrollViewProps & {
    contentContainerStyle?: ViewStyle;
    scroll?: boolean;
  }
>;

export function Screen({
  children,
  contentContainerStyle,
  scroll = true,
  ...props
}: ScreenProps) {
  const content = <View style={[styles.content, contentContainerStyle]}>{children}</View>;

  return (
    <SafeAreaView style={styles.safeArea}>
      {scroll ? (
        <ScrollView
          {...props}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    padding: Spacing.four,
    gap: Spacing.three,
  },
});
