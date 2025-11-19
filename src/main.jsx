import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-white/70">Please try a hard refresh. If it persists, use the System Test page below and share the error shown in your browser console.</p>
            <pre className="mt-4 bg-white/10 border border-white/20 p-3 rounded-lg overflow-auto whitespace-pre-wrap break-words text-sm">{String(this.state.error)}</pre>
            <a href="/test" className="inline-block mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg">Open System Test</a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function Root() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

const rootEl = document.getElementById('root')
if (!rootEl) {
  const warn = document.createElement('div')
  warn.innerText = 'Root container not found.'
  document.body.appendChild(warn)
} else {
  ReactDOM.createRoot(rootEl).render(<Root />)
}
