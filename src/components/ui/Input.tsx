import { TextInput, type TextInputProps } from 'react-native-paper';

export function Input({ mode = 'outlined', ...props }: TextInputProps) {
  return <TextInput mode={mode} {...props} />;
}
