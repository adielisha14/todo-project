
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import  ChatProvider  from "./context/chatProvider.tsx"

import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <BrowserRouter basename='/chat'>
          <ChatProvider>

              <App />

            </ChatProvider>
        </BrowserRouter>
  </StrictMode>,
)
