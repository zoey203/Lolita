import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { WardrobeProvider } from './hooks/WardrobeContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <WardrobeProvider>
        <App />
      </WardrobeProvider>
    </HashRouter>
  </StrictMode>,
)
