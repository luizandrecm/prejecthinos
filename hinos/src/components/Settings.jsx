import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useSettings } from '../contexts/SettingsContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Moon, Sun, Plus, Minus, RotateCcw, Palette, Type, Monitor, Settings as SettingsIcon } from 'lucide-react'

const Settings = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme, setTheme } = useTheme()
  const { fontSize, fontSizes, increaseFontSize, decreaseFontSize, resetFontSize, setFontSize } = useSettings()

  const fontSizeLabels = {
    small: 'Pequena',
    medium: 'Média',
    large: 'Grande',
    xlarge: 'Muito Grande',
    xxlarge: 'Extra Grande'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Início
            </Button>
            <h1 className="text-xl font-bold">Configurações</h1>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Configurações de Tema */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Tema</CardTitle>
              </div>
              <CardDescription>
                Escolha entre o modo claro ou escuro para melhor conforto visual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Modo Claro */}
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    theme === 'light' 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setTheme('light')}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 p-3 bg-white border rounded-lg mx-auto w-fit">
                      <Sun className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold mb-1">Modo Claro</h3>
                    <p className="text-xs text-muted-foreground">
                      Fundo claro com texto escuro
                    </p>
                    {theme === 'light' && (
                      <Badge variant="default" className="mt-2 text-xs">
                        Ativo
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Modo Escuro */}
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    theme === 'dark' 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setTheme('dark')}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 p-3 bg-gray-900 border rounded-lg mx-auto w-fit">
                      <Moon className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="font-semibold mb-1">Modo Escuro</h3>
                    <p className="text-xs text-muted-foreground">
                      Fundo escuro com texto claro
                    </p>
                    {theme === 'dark' && (
                      <Badge variant="default" className="mt-2 text-xs">
                        Ativo
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Modo Sistema */}
                <Card 
                  className="cursor-pointer transition-all duration-200 hover:border-primary/50 opacity-50"
                  title="Em breve"
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 p-3 bg-gradient-to-r from-white to-gray-900 border rounded-lg mx-auto w-fit">
                      <Monitor className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Sistema</h3>
                    <p className="text-xs text-muted-foreground">
                      Seguir configuração do sistema
                    </p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Em breve
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Fonte */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                <CardTitle>Tamanho da Fonte</CardTitle>
              </div>
              <CardDescription>
                Ajuste o tamanho da fonte para melhor legibilidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Controles de fonte */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'small'}
                  className="flex items-center gap-2"
                >
                  <Minus className="h-4 w-4" />
                  Diminuir
                </Button>
                
                <div className="text-center">
                  <div className="text-lg font-semibold">
                    {fontSizeLabels[fontSize]}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {fontSizes[fontSize]}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={increaseFontSize}
                  disabled={fontSize === 'xxlarge'}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Aumentar
                </Button>
              </div>

              <Separator />

              {/* Seleção direta de tamanho */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(fontSizeLabels).map(([size, label]) => (
                  <Button
                    key={size}
                    variant={fontSize === size ? "default" : "outline"}
                    onClick={() => setFontSize(size)}
                    className="h-auto py-3 flex flex-col items-center gap-1"
                  >
                    <span className="text-xs">{label}</span>
                    <span className="text-xs text-muted-foreground">
                      {fontSizes[size]}
                    </span>
                  </Button>
                ))}
              </div>

              <Separator />

              {/* Botão de reset */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={resetFontSize}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restaurar Padrão
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Visualização</CardTitle>
              <CardDescription>
                Veja como as configurações afetam a aparência do texto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-bold mb-4">Exemplo de Hino</h3>
                <div className="space-y-2 text-foreground">
                  <p>Amazing Grace, how sweet the sound</p>
                  <p>That saved a wretch like me</p>
                  <p>I once was lost, but now am found</p>
                  <p>Was blind, but now I see</p>
                </div>
                <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                  <p>Tema atual: <strong>{theme === 'light' ? 'Claro' : 'Escuro'}</strong></p>
                  <p>Tamanho da fonte: <strong>{fontSizeLabels[fontSize]} ({fontSizes[fontSize]})</strong></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações */}
          <Card>
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              <p>
                As configurações são salvas automaticamente e aplicadas em todo o aplicativo.
              </p>
            </CardContent>
          </Card>

          {/* Acesso Administrativo - Discreto */}
          <div className="flex justify-center pt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/login')}
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <SettingsIcon className="h-3 w-3 mr-1" />
              Administração
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings

