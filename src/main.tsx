import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/config'
import { LanguageProvider } from './providers/LanguageProvider'
import { AuthProvider } from './providers/AuthProvider'
import { installMockApi } from './mocks/browser'

// Serve all `/api/*` requests from the in-browser mock so the app works the
// same in local dev and in the deployed static build (no backend required).
installMockApi()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
)
