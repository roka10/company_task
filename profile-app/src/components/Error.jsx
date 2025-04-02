import React, { useState, useEffect } from "react";

const Error = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (event) => {
      setHasError(true);
      setError(event.error || "Unknown error");
      console.error("Error caught by ErrorBoundary:", event.error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>We're sorry, but there was an error loading this page.</p>
        <button onClick={() => setHasError(false)} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return children;
};

export default Error;
