import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

type CardProps = PropsWithChildren<{
  mode?: 'elevated' | 'outlined' | 'contained';
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}>;

export function Card({ children, mode = 'elevated', ...props }: CardProps) {
  return (
    <PaperCard mode={mode} {...props}>
      {children}
    </PaperCard>
  );
}
