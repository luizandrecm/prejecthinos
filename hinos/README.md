# Hinos - App de Letras de Músicas

Um aplicativo web moderno para visualização e gerenciamento de letras de hinos, desenvolvido com React e Tailwind CSS.

## 🎵 Funcionalidades

### Para Usuários
- **Página Inicial**: Interface limpa com navegação intuitiva
- **Sumário de Hinos**: Lista organizada por número e ordem alfabética
- **Visualização de Hinos**: Exibição clara da letra com título e informações adicionais
- **Busca**: Pesquisa por título ou número do hino
- **Tema Personalizável**: Alternância entre modo claro e escuro
- **Fonte Ajustável**: 5 tamanhos de fonte diferentes para melhor legibilidade

### Para Administradores
- **Sistema de Login**: Acesso seguro com credenciais únicas
- **Gerenciamento de Hinos**: Adicionar, editar e excluir hinos
- **Interface Administrativa**: Painel completo para gestão do conteúdo

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones
- **React Router DOM** - Roteamento
- **Local Storage** - Persistência de dados

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Passos para executar localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/prejecthinos.git
cd prejecthinos/hinos
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
pnpm run dev
# ou
npm run dev
```

4. Acesse o aplicativo em `http://localhost:5173`

## 🔐 Acesso Administrativo

Para acessar o painel administrativo:

1. Navegue para `/admin/login`
2. Use as credenciais:
   - **Usuário**: `admin`
   - **Senha**: `Lacm@25611`

## 📱 Deploy

O projeto está configurado para deploy no Vercel. Para fazer o deploy:

1. Conecte seu repositório GitHub ao Vercel
2. Configure o diretório raiz como `hinos`
3. O Vercel detectará automaticamente as configurações do Vite

### Comandos de Build

```bash
# Build para produção
pnpm run build

# Preview do build
pnpm run preview
```

## 📁 Estrutura do Projeto

```
hinos/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes UI (shadcn/ui)
│   │   ├── Home.jsx       # Página inicial
│   │   ├── HymnsList.jsx  # Lista de hinos
│   │   ├── HymnView.jsx   # Visualização de hino
│   │   ├── Login.jsx      # Login administrativo
│   │   ├── AdminPanel.jsx # Painel administrativo
│   │   └── Settings.jsx   # Configurações
│   ├── contexts/          # Contextos React
│   │   ├── AuthContext.jsx     # Autenticação
│   │   ├── ThemeContext.jsx    # Tema
│   │   └── SettingsContext.jsx # Configurações
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos globais
│   └── main.jsx           # Ponto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Funcionalidades de UI/UX

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Transições e hover effects
- **Acessibilidade**: Componentes acessíveis com foco em usabilidade
- **Persistência**: Configurações salvas automaticamente no navegador
- **Busca Inteligente**: Pesquisa por título ou número
- **Organização**: Ordenação numérica e alfabética

## 🔧 Configuração

O aplicativo utiliza Local Storage para:
- Armazenar hinos cadastrados
- Salvar preferências de tema
- Manter configurações de fonte
- Gerenciar estado de autenticação

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através das issues do GitHub.

---

Desenvolvido com ❤️ para a comunidade de hinos.

