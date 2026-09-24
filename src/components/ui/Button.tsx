import { Button as PaperButton, type ButtonProps } from 'react-native-paper';

export function Button({ mode = 'contained', ...props }: ButtonProps) {
  return <PaperButton mode={mode} {...props} />;
}
