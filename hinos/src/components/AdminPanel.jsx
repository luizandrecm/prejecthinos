import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LogOut, Plus, Edit, Trash2, Home } from 'lucide-react'

const AdminPanel = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  
  const [hymns, setHymns] = useState([])
  const [isAddingHymn, setIsAddingHymn] = useState(false)
  const [editingHymn, setEditingHymn] = useState(null)
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    lyrics: '',
    notes: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
      return
    }
    loadHymns()
  }, [isAuthenticated, navigate])

  const loadHymns = () => {
    const savedHymns = localStorage.getItem('hymns')
    if (savedHymns) {
      setHymns(JSON.parse(savedHymns))
    }
  }

  const saveHymns = (newHymns) => {
    localStorage.setItem('hymns', JSON.stringify(newHymns))
    setHymns(newHymns)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.number || !formData.title || !formData.lyrics) {
      setMessage('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    const newHymn = {
      id: editingHymn ? editingHymn.id : Date.now(),
      number: parseInt(formData.number),
      title: formData.title.trim(),
      lyrics: formData.lyrics.trim(),
      notes: formData.notes.trim(),
      createdAt: editingHymn ? editingHymn.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    let updatedHymns
    if (editingHymn) {
      updatedHymns = hymns.map(hymn => 
        hymn.id === editingHymn.id ? newHymn : hymn
      )
      setMessage('Hino atualizado com sucesso!')
    } else {
      // Verificar se o número já existe
      if (hymns.some(hymn => hymn.number === newHymn.number)) {
        setMessage('Já existe um hino com este número.')
        return
      }
      updatedHymns = [...hymns, newHymn]
      setMessage('Hino adicionado com sucesso!')
    }

    saveHymns(updatedHymns)
    resetForm()
    setTimeout(() => setMessage(''), 3000)
  }

  const handleEdit = (hymn) => {
    setEditingHymn(hymn)
    setFormData({
      number: hymn.number.toString(),
      title: hymn.title,
      lyrics: hymn.lyrics,
      notes: hymn.notes
    })
    setIsAddingHymn(true)
  }

  const handleDelete = (hymnId) => {
    if (window.confirm('Tem certeza que deseja excluir este hino?')) {
      const updatedHymns = hymns.filter(hymn => hymn.id !== hymnId)
      saveHymns(updatedHymns)
      setMessage('Hino excluído com sucesso!')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const resetForm = () => {
    setFormData({
      number: '',
      title: '',
      lyrics: '',
      notes: ''
    })
    setIsAddingHymn(false)
    setEditingHymn(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Início
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        {message && (
          <Alert className="mb-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista de Hinos</TabsTrigger>
            <TabsTrigger value="add">
              {editingHymn ? 'Editar Hino' : 'Adicionar Hino'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Hinos Cadastrados ({hymns.length})
              </h2>
              <Button
                onClick={() => {
                  resetForm()
                  setIsAddingHymn(true)
                }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Novo Hino
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Data de Criação</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hymns
                      .sort((a, b) => a.number - b.number)
                      .map((hymn) => (
                        <TableRow key={hymn.id}>
                          <TableCell className="font-medium">
                            {hymn.number}
                          </TableCell>
                          <TableCell>{hymn.title}</TableCell>
                          <TableCell>
                            {new Date(hymn.createdAt).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(hymn)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(hymn.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {hymns.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum hino cadastrado ainda.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingHymn ? 'Editar Hino' : 'Adicionar Novo Hino'}
                </CardTitle>
                <CardDescription>
                  Preencha as informações do hino abaixo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">ls-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        type="number"
                        value={formData.number}
                        onChange={(e) => setFormData({...formData, number: e.target.value})}
                        placeholder="Ex: 1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Ex: Amazing Grace"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lyrics">Letra *</Label>
                    <Textarea
                      id="lyrics"
                      value={formData.lyrics}
                      onChange={(e) => setFormData({...formData, lyrics: e.target.value})}
                      placeholder="Digite a letra completa do hino..."
                      className="min-h-[200px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas Adicionais</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Informações sobre o autor, contexto histórico, etc."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingHymn ? 'Atualizar Hino' : 'Adicionar Hino'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminPanel

