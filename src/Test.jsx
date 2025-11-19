import { useEffect, useState } from 'react'

export default function Test() {
  const [status, setStatus] = useState({ loading: true, data: null, error: null })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${baseUrl}/test`)
        const json = await res.json()
        setStatus({ loading: false, data: json, error: null })
      } catch (e) {
        setStatus({ loading: false, data: null, error: 'Could not reach backend' })
      }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">System Test</h1>
        <p className="text-white/70 mb-6">Verifies the API is reachable and database connectivity.</p>
        {status.loading && <div>Checking backend...</div>}
        {status.error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-100 p-4 rounded-lg">
            {status.error}
          </div>
        )}
        {status.data && (
          <div className="bg-white/10 border border-white/20 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(status.data, null, 2)}</pre>
          </div>
        )}
        <a href="/" className="inline-block mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg">Back to site</a>
      </div>
    </div>
  )
}
