# 🚀 Projeto JavaScript - Portfólio com Validação e GitHub API

**Professor:** Lucas Fernandes
**Disciplina:** Front-End JavaScript
**Desenvolvedor:** Esteban Jose Gonzalez Gomez
**GitHub:** [Estebanjgg](https://github.com/Estebanjgg)

## 📋 Descrição do Projeto

Este projeto é um portfólio pessoal desenvolvido em JavaScript puro que demonstra:

- ✅ **Validação completa de formulário de contato**
- 🔗 **Integração com API do GitHub**
- 🎨 **Design responsivo e moderno**
- 🛡️ **Validação em tempo real**
- 📱 **Interface mobile-friendly**

## 🎯 Objetivos Principais

### 1. Validação de Dados

- ✅ Só permitir envio após preenchimento correto
- ✅ Validação de email, telefone e outros campos
- ✅ Exibição clara de erros
- ✅ Feedback visual em tempo real

### 2. Integração GitHub API

- 🔗 Carregamento dinâmico de repositórios
- 📊 Exibição de estatísticas (stars, forks)
- 🏷️ Visualização de linguagens e topics
- 🔄 Tratamento de erros de API

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com Flexbox/Grid
- **JavaScript ES6+** - Lógica da aplicação
- **Bootstrap 5** - Framework CSS responsivo
- **Font Awesome** - Ícones
- **GitHub API** - Integração com repositórios

## 📁 Estrutura do Projeto

```
Projeto - Front-End - JavaScript/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## 🚀 Como Executar

1. **Clone ou baixe o projeto**
2. **Abra o arquivo `index.html` em um navegador**
3. **Ou use um servidor local:**
   ```bash
   # Com Python
   python -m http.server 8000

   # Com Node.js (http-server)
   npx http-server

   # Com PHP
   php -S localhost:8000
   ```

## 📝 Funcionalidades de Validação

### Campos Obrigatórios

- **Nome Completo**: Mínimo 2 palavras
- **Email**: Formato válido (usuario@exemplo.com)
- **Assunto**: Seleção obrigatória
- **Mensagem**: Mínimo 10 caracteres
- **Termos**: Concordância obrigatória

### Campos Opcionais

- **Telefone**: Validação de formato brasileiro
- **Empresa**: Campo livre

### Tipos de Validação

#### 1. Validação em Tempo Real

```javascript
// Exemplo de validação de email
email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}
```

#### 2. Validação de Nome Completo

```javascript
fullName: (value) => {
    const words = value.trim().split(' ').filter(word => word.length > 0);
    return words.length >= 2 && words.every(word => word.length >= 2);
}
```

#### 3. Validação de Telefone

```javascript
phone: (value) => {
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    return phoneRegex.test(value.replace(/\D/g, ''));
}
```

## 🔗 Integração GitHub API

### Configuração

```javascript
const GITHUB_CONFIG = {
    username: 'Estebanjgg',
    apiUrl: 'https://api.github.com',
    perPage: 6
};
```

### Endpoints Utilizados

- `GET /users/{username}/repos` - Lista repositórios
- `GET /users/{username}` - Perfil do usuário

### Dados Exibidos

- 📁 Nome do repositório
- 📝 Descrição
- ⭐ Número de stars
- 🔀 Número de forks
- 💻 Linguagem principal
- 🏷️ Topics/tags
- 📅 Data de atualização
- 🔗 Links para código e demo

## 🎨 Características do Design

### Responsividade

- 📱 Mobile First
- 💻 Desktop otimizado
- 📐 Breakpoints Bootstrap

### Animações

- ✨ Fade in/out
- 🔄 Loading spinners
- 🎯 Hover effects
- 📜 Smooth scrolling

### Cores e Tipografia

- 🎨 Gradientes modernos
- 🔤 Fonte Segoe UI
- 🌈 Paleta harmoniosa
- 🔍 Alto contraste

## 🧪 Exemplos de Uso

### 1. Validação de Email Inválido

```
Input: "email_invalido"
Output: "Por favor, informe um email válido (ex: usuario@exemplo.com)"
Estado: Campo marcado como inválido (borda vermelha)
```

### 2. Nome Incompleto

```
Input: "João"
Output: "Por favor, informe nome e sobrenome (mínimo 2 palavras)"
Estado: Campo marcado como inválido
```

### 3. Mensagem Muito Curta

```
Input: "Oi"
Output: "A mensagem deve ter pelo menos 10 caracteres"
Estado: Campo marcado como inválido
```

### 4. Formulário Válido

```
Todos os campos preenchidos corretamente
Output: "Mensagem enviada com sucesso!"
Estado: Formulário limpo, toast de sucesso
```

## 🔧 Classes JavaScript Principais

### FormValidator

```javascript
class FormValidator {
    constructor(formId)     // Inicializa validador
    validateField(name)     // Valida campo específico
    validateForm()          // Valida formulário completo
    handleSubmit()          // Processa envio
    clearForm()             // Limpa formulário
}
```

### GitHubAPI

```javascript
class GitHubAPI {
    fetchRepositories()     // Busca repositórios
    fetchUserProfile()      // Busca perfil do usuário
}
```

### ProjectRenderer

```javascript
class ProjectRenderer {
    showLoading()           // Exibe loading
    showError(message)      // Exibe erro
    showProjects(repos)     // Renderiza projetos
    createProjectCard(repo) // Cria card de projeto
}
```

## 🛡️ Tratamento de Erros

### Validação de Formulário

- ❌ Campos obrigatórios não preenchidos
- ❌ Formato de email inválido
- ❌ Telefone em formato incorreto
- ❌ Nome incompleto
- ❌ Mensagem muito curta
- ❌ Termos não aceitos

### API GitHub

- 🔌 Erro de conexão
- 👤 Usuário não encontrado (404)
- ⏱️ Timeout de requisição
- 🚫 Rate limit excedido
- 📡 Erro de servidor (500)

## 📊 Estados da Aplicação

```javascript
const appState = {
    formData: {},           // Dados do formulário
    repositories: [],       // Repositórios carregados
    isLoading: false,       // Estado de carregamento
    errors: []              // Lista de erros
};
```

## 🎯 Funcionalidades Avançadas

### 1. Validação em Tempo Real

- ✅ Feedback imediato ao digitar
- ✅ Remoção de erros durante edição
- ✅ Estados visuais claros

### 2. UX Melhorada

- 🎯 Foco automático em campos com erro
- 📜 Scroll suave até erros
- 🔔 Toasts informativos
- ⏱️ Auto-hide de mensagens

### 3. Acessibilidade

- ♿ ARIA labels
- ⌨️ Navegação por teclado
- 🔍 Alto contraste
- 📱 Responsividade completa

## 🧪 Como Testar

### Teste de Validação

1. **Deixe campos obrigatórios vazios**
2. **Digite email inválido** (ex: "email")
3. **Digite nome incompleto** (ex: "João")
4. **Digite mensagem curta** (ex: "Oi")
5. **Não marque os termos**
6. **Tente enviar** - deve mostrar erros

### Teste de API

1. **Verifique se repositórios carregam**
2. **Teste com internet desconectada**
3. **Modifique username para usuário inexistente**

## 📈 Melhorias Futuras

- 🔐 Integração com backend real
- 📧 Envio de email via API
- 🌙 Modo escuro
- 🌍 Internacionalização
- 📊 Analytics de formulário
- 🔄 Cache de repositórios
- 🎨 Mais animações
- 📱 PWA (Progressive Web App)

## 🤝 Contribuição

Este é um projeto acadêmico, mas sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é para fins educacionais.

## 👨‍💻 Desenvolvedor

**Esteban Jose Gonzalez Gomez**

- 🔗 GitHub: [Estebanjgg](https://github.com/Estebanjgg)
- 💼 Engenheiro de Software @ Neon
- 🎓 Estudante de Engenharia de Software

---

**Desenvolvido com ❤️ e JavaScript puro**

*Projeto Final - Disciplina Front-End JavaScript*
*Professor Lucas Fernandes*
