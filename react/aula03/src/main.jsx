import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FormUsuario from './components/FormUsario.jsx'

createRoot(document.getElementById('root')).render(
    <FormUsuario />
)
