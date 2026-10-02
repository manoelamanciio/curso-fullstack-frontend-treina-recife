import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FormUsuario from './components/FormUsario.jsx'
import Dashboard from './components/Dashboard.jsx'
import Home from './components/Home.jsx'

createRoot(document.getElementById('root')).render(
    <Home />
)
