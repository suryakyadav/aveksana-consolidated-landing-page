import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light-gray-blue text-center p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
                <p className="text-brand-dark-grey mb-6">We encountered an unexpected error. Please refresh the page or try again later.</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-brand-medium-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-teal transition-colors"
                >
                    Refresh Page
                </button>
            </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;