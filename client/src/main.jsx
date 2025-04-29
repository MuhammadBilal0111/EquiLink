import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux"
import store from "./store/index.js"
import './index.css'
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"


createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster />
  </StrictMode>
  </BrowserRouter>
)
