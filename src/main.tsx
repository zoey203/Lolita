import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WardrobeProvider } from './hooks/WardrobeContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/Lolita">
      <WardrobeProvider>
        <App />
      </WardrobeProvider>
    </BrowserRouter>
  </StrictMode>,
)
