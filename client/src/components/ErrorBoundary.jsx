// client/src/components/ErrorBoundary.jsx
import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-bg px-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-brand-divider">
            <h1 className="font-serif text-3xl font-bold text-brand-dark mb-4">
              Something went wrong
            </h1>
            <p className="text-brand-light font-sans mb-6">
              An unexpected error occurred while displaying this page. We're working on getting it resolved.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="px-6 py-2.5 bg-brand-accent text-white rounded font-sans text-sm font-semibold hover:bg-brand-dark transition-colors"
              >
                Reload Page
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-2.5 border border-brand-dark text-brand-dark rounded font-sans text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
