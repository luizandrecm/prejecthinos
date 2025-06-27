import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Componentes das páginas
import Home from './components/Home'
import HymnsList from './components/HymnsList'
import HymnView from './components/HymnView'
import Login from './components/Login'
import AdminPanel from './components/AdminPanel'
import Settings from './components/Settings'

// Context para tema e configurações
import { ThemeProvider } from './contexts/ThemeContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hinos" element={<HymnsList />} />
                <Route path="/hino/:id" element={<HymnView />} />
                <Route path="/ajustes" element={<Settings />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}

export default App

