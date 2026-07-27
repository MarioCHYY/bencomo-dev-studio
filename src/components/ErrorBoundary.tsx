import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", color: "red", backgroundColor: "black", minHeight: "100vh", fontFamily: "sans-serif" }}>
          <h1>Oops! A runtime error occurred.</h1>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>{this.state.error?.toString()}</pre>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "20px", fontSize: "12px", color: "#ffa" }}>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
