import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type Props = PropsWithChildren;
type State = { error: Error | null };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (__DEV__) {
      console.error('Unhandled application error', error, info.componentStack);
    }
  }

  render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <View style={styles.container}>
        <Text variant="headlineSmall">Something went wrong</Text>
        <Text variant="bodyMedium">
          Please try again. If this continues, contact your site supervisor.
        </Text>
        <Button mode="contained" onPress={() => this.setState({ error: null })}>
          Try again
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
});
