import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div
      style={{
        display: "flex",
        padding: "3rem",
        justifyContent: "center",
        alignItems: "left",
        flexDirection: "column",
        width: "70%",
        height: "100vh",
      }}
      role="alert"
    >
      <h1>Something went wrong:</h1>
      <p style={{ color: "red" }}>{error.message}</p>
      <button style={{ width: "fit-content" }} className="button" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}






