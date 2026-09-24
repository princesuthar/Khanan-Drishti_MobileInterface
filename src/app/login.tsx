import { zodResolver } from '@hookform/resolvers/zod';
import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { HelperText, Text } from 'react-native-paper';

import { Badge, Button, Card, Input, Screen } from '@/components/ui';
import { useAuth } from '@/providers/AuthProvider';
import { InvalidCredentialsError } from '@/services/mockAuth';
import { Colors, Spacing } from '@/constants/theme';
import { loginSchema, type LoginFormValues } from '@/validation/auth';

export default function LoginScreen() {
  const router = useRouter();
  const { isLoading, session, login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  if (isLoading) {
    return null;
  }
  if (session) {
    return <Redirect href="/" />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitError(null);
    try {
      await login(values);
      router.replace('/');
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Unable to sign in. Please try again.');
      }
    }
  };

  return (
    <Screen scroll={false} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Badge icon="shield-check">Secure field access</Badge>
        <Text variant="headlineLarge" style={styles.title}>
          Khanan Drishti
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign in to your coal-mine safety workspace.
        </Text>
      </View>
      <Card>
        <View style={styles.cardContent}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email or username"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={Boolean(errors.username)}
              />
            )}
          />
          <HelperText type="error" visible={Boolean(errors.username)}>
            {errors.username?.message}
          </HelperText>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={Boolean(errors.password)}
              />
            )}
          />
          <HelperText type="error" visible={Boolean(errors.password)}>
            {errors.password?.message}
          </HelperText>
          <HelperText type="error" visible={Boolean(submitError)}>
            {submitError}
          </HelperText>
          <Button
            loading={isSubmitting}
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}>
            Sign in
          </Button>
          <Text variant="bodySmall" style={styles.demoHint}>
            Demo accounts are documented for local testing.
          </Text>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  header: {
    gap: Spacing.two,
  },
  title: {
    color: Colors.light.text,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.light.textSecondary,
  },
  cardContent: {
    gap: Spacing.one,
  },
  demoHint: {
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
