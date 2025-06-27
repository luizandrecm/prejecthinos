import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useSettings } from '../contexts/SettingsContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Settings, Moon, Sun, Plus, Minus, RotateCcw } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize } = useSettings()

  return (
    <div className="min-h-screen bg-background">
      {/* Header com controles de tema e fonte */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto container-responsive py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Hinos</h1>
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
      <main className="max-w-4xl mx-auto container-responsive py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Bem-vindo ao App de Hinos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Acesse nossa coleção de hinos e letras de músicas. Navegue pelo sumário 
            para encontrar suas músicas favoritas ou ajuste as configurações conforme sua preferência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Card Hinos */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 card-responsive">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Hinos</CardTitle>
              <CardDescription>
                Acesse o sumário completo com todos os hinos disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                className="w-full" 
                onClick={() => navigate('/hinos')}
                size="lg"
              >
                Ver Sumário
              </Button>
            </CardContent>
          </Card>

          {/* Card Ajustes */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 card-responsive">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Ajustes</CardTitle>
              <CardDescription>
                Configure o tema e o tamanho da fonte do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/ajustes')}
                size="lg"
              >
                Configurações
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Seção de recursos */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Recursos do App</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-card border">
              <div className="mb-4 p-2 bg-primary/10 rounded-full w-fit mx-auto">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Sumário Organizado</h4>
              <p className="text-sm text-muted-foreground">
                Hinos organizados em ordem numérica e alfabética para fácil navegação
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-card border">
              <div className="mb-4 p-2 bg-primary/10 rounded-full w-fit mx-auto">
                {theme === 'light' ? (
                  <Moon className="h-6 w-6 text-primary" />
                ) : (
                  <Sun className="h-6 w-6 text-primary" />
                )}
              </div>
              <h4 className="font-semibold mb-2">Tema Personalizável</h4>
              <p className="text-sm text-muted-foreground">
                Alterne entre modo claro e escuro conforme sua preferência
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-card border">
              <div className="mb-4 p-2 bg-primary/10 rounded-full w-fit mx-auto">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Fonte Ajustável</h4>
              <p className="text-sm text-muted-foreground">
                Ajuste o tamanho da fonte para melhor legibilidade
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 App de Hinos. Desenvolvido com ❤️ para a comunidade.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home

