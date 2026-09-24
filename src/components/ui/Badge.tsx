import { Chip, type ChipProps } from 'react-native-paper';

export function Badge({ compact = true, ...props }: ChipProps) {
  return <Chip compact={compact} {...props} />;
}
