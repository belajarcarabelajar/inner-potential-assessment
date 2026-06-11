import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("Critical Error: Missing VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY} 
        afterSignOutUrl="/"
        appearance={{
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
        }}
      >
        <App />
      </ClerkProvider>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
        <div className="max-w-md p-6 bg-surface border border-destructive/20 rounded-2xl shadow-premium">
          <h1 className="text-2xl font-bold text-destructive mb-2">Konfigurasi Gagal</h1>
          <p className="text-muted-foreground">Aplikasi tidak dikonfigurasi dengan benar. Kunci Clerk Publishable tidak ditemukan.</p>
        </div>
      </div>
    )}
  </StrictMode>,
)
