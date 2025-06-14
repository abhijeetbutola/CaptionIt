import React from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-[rgba(255,255,255,0.2)] backdrop-blur-md border border-white/20 rounded-lg text-red-600">
          <h2 className="font-bold mb-2">Something went wrong.</h2>
          <pre className="whitespace-pre-wrap">{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
