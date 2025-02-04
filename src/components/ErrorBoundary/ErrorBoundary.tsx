import * as React from 'react';
import { Component, PropsWithChildren, ReactNode } from 'react';

export type ErrorBoundaryProps = PropsWithChildren<{
  fallback: ReactNode;
}>;

type ErrorBoundaryState = {
  isError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      isError: false,
    };
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.isError) return this.props.fallback;

    return this.props.children;
  }
}

export default ErrorBoundary;
