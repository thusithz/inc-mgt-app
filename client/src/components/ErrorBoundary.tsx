/* eslint-disable import/no-cycle */
import React, { Component, ErrorInfo, ReactNode } from 'react';

import ErrorLayout from './ErrorLayout';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Call service endpoint for log the errors
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;

    if (hasError) {
      return <ErrorLayout />;
    }

    const { children } = this.props;

    return children;
  }
}

export default ErrorBoundary;
