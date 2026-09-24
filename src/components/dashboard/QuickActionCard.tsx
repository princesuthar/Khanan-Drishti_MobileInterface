import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';

import { Colors, Spacing } from '@/constants/theme';

type QuickActionCardProps = {
  label: string;
  icon: string;
  onPress: () => void;
};

export function QuickActionCard({ label, icon, onPress }: QuickActionCardProps) {
  return (
    <TouchableRipple borderless onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <Icon source={icon} size={26} color={Colors.light.primary} />
        <Text variant="labelLarge" style={styles.label}>
          {label}
        </Text>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 92,
    borderRadius: Spacing.two,
    backgroundColor: Colors.light.backgroundElement,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
  },
  label: { color: Colors.light.text, textAlign: 'center' },
});
