import { Component, ErrorInfo, ReactNode } from "react";
import { isChunkError, reloadOnce } from "@/lib/chunkReload";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  reloading: boolean;
}

/**
 * Last line of defense. If the error is a stale chunk after a deploy, the page reloads itself
 * once and the visitor never sees anything. Otherwise: a calm screen in the site's palette with
 * a button to reload, never a stack trace.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, reloading: false };

  public static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, reloading: isChunkError(error) };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    if (isChunkError(error) && !reloadOnce()) this.setState({ reloading: false });
  }

  public render() {
    if (!this.state.hasError) return this.props.children;
    // while the reload happens, just the background (no flash of an error)
    if (this.state.reloading) return <div style={{ minHeight: "100vh", background: "#0B0B0D" }} />;

    let es = true;
    try {
      es = localStorage.getItem("lang") !== "en";
    } catch {
      es = true;
    }
    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          background: "#0B0B0D",
          color: "#F2F0EA",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 20,
          padding: "40px max(24px, 8vw)",
          fontFamily: '"Plus Jakarta Sans Variable", system-ui, sans-serif',
        }}
      >
        <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(242,240,234,0.45)" }}>
          Mario Bencomo
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.05, maxWidth: 720 }}>
          {es ? "Algo no cargó bien." : "Something didn't load right."}{" "}
          <span style={{ color: "rgba(242,240,234,0.4)" }}>{es ? "Recarga y listo." : "Reload and you're set."}</span>
        </h1>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            marginTop: 8,
            border: 0,
            borderRadius: 999,
            padding: "14px 26px",
            background: "#F2F0EA",
            color: "#0B0B0D",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {es ? "Recargar la página" : "Reload the page"}
        </button>
      </div>
    );
  }
}

export default ErrorBoundary;
