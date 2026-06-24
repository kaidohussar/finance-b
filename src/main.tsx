import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/config'
import { LanguageProvider } from './providers/LanguageProvider'
import { AuthProvider } from './providers/AuthProvider'
import { installMockApi } from './mocks/browser'

// Start the Service Worker mock before rendering so the first `/api/*` requests
// are intercepted. Works the same in dev and the deployed static build.
installMockApi().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    </StrictMode>,
  )
})
