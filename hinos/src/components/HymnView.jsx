import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useSettings } from '../contexts/SettingsContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, BookOpen, Moon, Sun, Plus, Minus, RotateCcw, Info } from 'lucide-react'

const HymnView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useSettings()
  
  const [hymn, setHymn] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHymn()
  }, [id])

  const loadHymn = () => {
    const savedHymns = localStorage.getItem('hymns')
    if (savedHymns) {
      const hymns = JSON.parse(savedHymns)
      const foundHymn = hymns.find(h => h.id === parseInt(id))
      setHymn(foundHymn)
    }
    setLoading(false)
  }

  const formatLyrics = (lyrics) => {
    return lyrics.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < lyrics.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-8 w-8 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando hino...</p>
        </div>
      </div>
    )
  }

  if (!hymn) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/hinos')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Sumário
            </Button>
          </div>
        </header>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Hino não encontrado</h2>
              <p className="text-muted-foreground mb-4">
                O hino que você está procurando não existe ou foi removido.
              </p>
              <Button onClick={() => navigate('/hinos')}>
                Voltar ao Sumário
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/hinos')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Sumário
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono">
                  #{hymn.number}
                </Badge>
                <h1 className="text-lg font-semibold truncate max-w-md">
                  {hymn.title}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Controles de fonte */}
              <div className="flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseFontSize}
                  className="h-8 w-8 p-0"
                  title="Diminuir fonte"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFontSize}
                  className="h-8 w-8 p-0"
                  title="Fonte padrão"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseFontSize}
                  className="h-8 w-8 p-0"
                  title="Aumentar fonte"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Toggle de tema */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="h-8 w-8 p-0"
                title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Badge variant="outline" className="text-lg px-3 py-1 font-mono">
                Hino #{hymn.number}
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold text-center">
              {hymn.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Letra do hino */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed text-center">
                {formatLyrics(hymn.lyrics)}
              </div>
            </div>

            {/* Notas adicionais */}
            {hymn.notes && (
              <>
                <Separator />
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Informações Adicionais</h3>
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {hymn.notes}
                  </div>
                </div>
              </>
            )}

            {/* Informações do hino */}
            <Separator />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>
                Adicionado em: {new Date(hymn.createdAt).toLocaleDateString('pt-BR')}
              </span>
              {hymn.updatedAt !== hymn.createdAt && (
                <span>
                  Atualizado em: {new Date(hymn.updatedAt).toLocaleDateString('pt-BR')}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navegação entre hinos */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/hinos')}
            className="flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Ver Todos os Hinos
          </Button>
        </div>
      </main>
    </div>
  )
}

export default HymnView

