import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useSettings } from '../contexts/SettingsContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, BookOpen, Hash, SortAsc, Moon, Sun, Plus, Minus, RotateCcw } from 'lucide-react'

const HymnsList = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useSettings()
  
  const [hymns, setHymns] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredHymns, setFilteredHymns] = useState([])

  useEffect(() => {
    loadHymns()
  }, [])

  useEffect(() => {
    filterHymns()
  }, [hymns, searchTerm])

  const loadHymns = () => {
    const savedHymns = localStorage.getItem('hymns')
    if (savedHymns) {
      setHymns(JSON.parse(savedHymns))
    }
  }

  const filterHymns = () => {
    if (!searchTerm) {
      setFilteredHymns(hymns)
    } else {
      const filtered = hymns.filter(hymn =>
        hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hymn.number.toString().includes(searchTerm)
      )
      setFilteredHymns(filtered)
    }
  }

  const getHymnsByNumber = () => {
    return [...filteredHymns].sort((a, b) => a.number - b.number)
  }

  const getHymnsByAlphabet = () => {
    return [...filteredHymns].sort((a, b) => 
      a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })
    )
  }

  const HymnCard = ({ hymn }) => (
    <Card 
      className="group hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-primary/50"
      onClick={() => navigate(`/hino/${hymn.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="text-xs font-mono">
                #{hymn.number}
              </Badge>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                {hymn.title}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {hymn.lyrics.split('\n')[0]}...
            </p>
          </div>
          <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-2 flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background container-responsive py-6">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto container-responsive py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Início
              </Button>
              <h1 className="text-xl font-bold">Sumário de Hinos</h1>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Controles de fonte */}
              <div className="flex items-center gap-1 border rounded-md p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseFontSize}
                  className="h-8 w-8 p-0 touch-target sm:h-9 sm:w-9"
                  title="Diminuir fonte"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFontSize}
                  className="h-8 w-8 p-0 touch-target sm:h-9 sm:w-9"
                  title="Fonte padrão"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseFontSize}
                  className="h-8 w-8 p-0 touch-target sm:h-9 sm:w-9"
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
                className="h-8 w-8 p-0 touch-target sm:h-9 sm:w-9"
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
      <main className="max-w-6xl mx-auto container-responsive py-6">
        {/* Barra de pesquisa */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Pesquisar por título ou número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span>Total: {hymns.length} hinos</span>
          {searchTerm && (
            <span>Encontrados: {filteredHymns.length} hinos</span>
          )}
        </div>

        {/* Tabs para organização */}
        <Tabs defaultValue="numeric" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="numeric" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Por Número
            </TabsTrigger>
            <TabsTrigger value="alphabetic" className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              Alfabética
            </TabsTrigger>
          </TabsList>

          {/* Lista por número */}
          <TabsContent value="numeric" className="mt-6">
            {getHymnsByNumber().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getHymnsByNumber().map((hymn) => (
                  <HymnCard key={hymn.id} hymn={hymn} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm ? 'Nenhum hino encontrado' : 'Nenhum hino cadastrado'}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm 
                      ? 'Tente pesquisar com outros termos.'
                      : 'Os hinos aparecerão aqui quando forem cadastrados pelo administrador.'
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Lista alfabética */}
          <TabsContent value="alphabetic" className="mt-6">
            {getHymnsByAlphabet().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getHymnsByAlphabet().map((hymn) => (
                  <HymnCard key={hymn.id} hymn={hymn} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm ? 'Nenhum hino encontrado' : 'Nenhum hino cadastrado'}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm 
                      ? 'Tente pesquisar com outros termos.'
                      : 'Os hinos aparecerão aqui quando forem cadastrados pelo administrador.'
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default HymnsList

