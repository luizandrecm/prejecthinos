import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider')
  }
  return context
}

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('medium')

  // Tamanhos de fonte disponíveis
  const fontSizes = {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '20px',
    xxlarge: '24px'
  }

  useEffect(() => {
    // Verificar se há um tamanho de fonte salvo no localStorage
    const savedFontSize = localStorage.getItem('fontSize')
    if (savedFontSize && fontSizes[savedFontSize]) {
      setFontSize(savedFontSize)
    }
  }, [])

  useEffect(() => {
    // Aplicar o tamanho da fonte ao documento
    document.documentElement.style.fontSize = fontSizes[fontSize]
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  const increaseFontSize = () => {
    const sizes = Object.keys(fontSizes)
    const currentIndex = sizes.indexOf(fontSize)
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1])
    }
  }

  const decreaseFontSize = () => {
    const sizes = Object.keys(fontSizes)
    const currentIndex = sizes.indexOf(fontSize)
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1])
    }
  }

  const resetFontSize = () => {
    setFontSize('medium')
  }

  const value = {
    fontSize,
    fontSizes,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

