import React from "react";

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error?: Error }
> {
  constructor(props:any){ super(props); this.state = {}; }
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: any) { console.error("ErrorBoundary caught:", error, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding:20, color:"#fff", background:"#0b0b0b"}}>
          <h2>⚠️ UI crashed</h2>
          <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.error.stack || this.state.error.message)}</pre>
        </div>
      );
    }
    return this.props.children as any;
  }
}
