# 🎮 Exercício 06 - API Pokémon

**Aula 13 - Exercício JavaScript**
**Tema:** Consulta de API pública com JavaScript

---

## 📋 Descrição do Projeto

Este exercício demonstra como criar uma aplicação web moderna que consome uma API pública (PokéAPI) utilizando JavaScript ES6+, HTML5 e CSS3. A aplicação permite buscar informações detalhadas sobre Pokémon, com interface responsiva e funcionalidades avançadas.

## 🎯 Objetivos de Aprendizagem

- ✅ **Coletar dados de formulário** - Capturar entrada do usuário
- ✅ **Consultar API pública** - Fazer requisições HTTP com fetch()
- ✅ **Exibir resultados** - Manipular DOM dinamicamente
- ✅ **Filtrar e processar dados** - Trabalhar com objetos JSON
- ✅ **Tratamento de erros** - Implementar try/catch e validações
- ✅ **Persistência local** - Usar localStorage para favoritos
- ✅ **Interface responsiva** - Design mobile-first

## 🚀 Funcionalidades Implementadas

### 🔍 **Busca Inteligente de Pokémon**

- Busca por nome (ex: "pikachu")
- Busca por número (ex: "25")
- **Autocompletado inteligente** com sugerições em tempo real
- Navegação por teclado (setas, Enter, Escape)
- Busca aleatória
- Validação de entrada
- Tratamento de erros

### 🤖 **Sistema de Autocompletado**

- Sugerições baseadas em Pokémon populares
- Integração com histórico de pesquisas
- Indicadores visuais para favoritos e histórico
- Busca dinâmica na API para casos específicos
- Interface responsiva e acessível

### 📊 **Exibição de Dados**

- Informações básicas (ID, nome, altura, peso)
- Tipos e habilidades
- Estatísticas com barras de progresso
- Sprites (normal e shiny)
- Descrição da espécie

### ❤️ **Sistema de Favoritos**

- Adicionar/remover favoritos
- Persistência com localStorage
- Lista visual de favoritos
- Acesso rápido aos favoritos
- Integração com autocompletado

### 🕒 **Histórico de Pesquisas**

- Últimas 10 pesquisas
- Acesso rápido ao histórico
- Interface visual intuitiva
- Integração com autocompletado

### 📱 **Interface Moderna**

- Design responsivo (mobile-first)
- Animações e transições suaves
- Gradientes e efeitos visuais
- Feedback visual para ações
- Loading states

## 🛠️ Tecnologias Utilizadas

### **Frontend**

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada com gradientes e animações
- **JavaScript ES6+** - Lógica da aplicação
- **Bootstrap 5** - Framework CSS responsivo
- **Font Awesome** - Ícones

### **API**

- **PokéAPI** - API pública gratuita
- **Fetch API** - Requisições HTTP
- **JSON** - Formato de dados

### **Armazenamento**

- **localStorage** - Persistência local

## 📁 Estrutura do Projeto

```
Aula 13 - Exercício - JavaScript/
├── index.html          # Página principal
├── exercicio06.js      # Lógica JavaScript principal
├── styles.css          # Estilos personalizados
├── exemplos-uso.js     # Exemplos avançados e demonstrações
└── README.md          # Documentação completa
```

## 🔧 Como Executar

### **Método 1: Servidor Local (Recomendado)**

```bash
# Navegue até a pasta do projeto
cd "c:\Users\Emily\Documents\practica-JavaScript\Aula 13 - Exercício - JavaScript"

# Inicie um servidor local (Python)
python -m http.server 8000

# Ou com Node.js (se tiver npx instalado)
npx serve .

# Acesse no navegador
http://localhost:8000
```

### **Método 2: Abrir Diretamente**

1. Navegue até a pasta do projeto
2. Clique duas vezes em `index.html`
3. O arquivo abrirá no navegador padrão

### **Usando Exemplos Avançados**

O arquivo `exemplos-uso.js` contém demonstrações avançadas que podem ser executadas no console do navegador:

```javascript
// Abra o Console do Navegador (F12) e execute:

// Executar todos os exemplos
executarExemplosCompletos();

// Buscar múltiplos Pokémon
exemploMultiplasBuscas();

// Análise estatística
exemploAnaliseEstatisticas();

// Exportar favoritos
exemploExportarFavoritos();

// Debug da aplicação
debugEstadoAplicacao();
```

## 📖 Como Usar

### **1. Buscar Pokémon com Autocompletado**

- Digite pelo menos 2 caracteres no campo de busca
- Veja sugerições aparecerem automaticamente
- Use as setas ↑↓ para navegar pelas sugerências
- Pressione Enter para selecionar ou clique na sugerição
- Use Escape para fechar as sugerências
- Clique em "Buscar" ou pressione Enter para busca manual
- Use "Aleatório" para descobrir novos Pokémon

### **2. Recursos do Autocompletado**

- 🔍 Ícone de busca para sugerências normais
- 🕒 Ícone de histórico para pesquisas anteriores
- ❤️ Ícone de coração para Pokémon favoritos
- Sugerências inteligentes baseadas em popularidade

### **3. Visualizar Informações**

- Veja dados completos do Pokémon encontrado
- Alterne entre sprites normal e shiny
- Analise as estatísticas com barras visuais

### **4. Gerenciar Favoritos**

- Clique no coração para adicionar/remover favoritos
- Acesse a lista de favoritos na lateral
- Clique em um favorito para buscá-lo novamente

### **5. Histórico**

- Veja suas últimas pesquisas
- Clique em qualquer item do histórico para repetir a busca

## 🎨 Exemplos de Busca

| Tipo    | Exemplo       | Descrição          |
| ------- | ------------- | -------------------- |
| Nome    | `pikachu`   | Pokémon mais famoso |
| Nome    | `charizard` | Pokémon dragão     |
| Número | `25`        | Pikachu por ID       |
| Número | `150`       | Mewtwo               |
| Nome    | `mew`       | Pokémon lendário   |
| Nome    | `lucario`   | Pokémon lutador     |

## 🔍 Detalhes Técnicos

### **Estrutura do JavaScript**

#### **📄 exercicio06.js - Arquivo Principal**

```javascript
// Principais funções implementadas:

// 🔍 Busca e API
buscarPokemon()           // Função principal de busca
buscarPokemonAleatorio()  // Busca aleatória
processarDadosPokemon()   // Processa dados da API

// 🤖 Autocompletado
handleAutoComplete()      // Gerencia autocompletado
buscarSugestoes()         // Busca sugerências
exibirSugestoes()         // Exibe dropdown de sugerências
handleKeyNavigation()     // Navegação por teclado

// 📊 Interface
exibirResultadoPokemon()  // Exibe dados na tela
atualizarInterface()      // Atualiza toda interface
exibirMensagem()          // Sistema de notificações

// ❤️ Favoritos
adicionarAosFavoritos()   // Gerencia favoritos
salvarFavoritos()         // Persiste no localStorage
carregarFavoritos()       // Carrega do localStorage

// 🕒 Histórico
adicionarAoHistorico()    // Adiciona ao histórico
atualizarHistorico()      // Atualiza interface do histórico
```

#### **📄 exemplos-uso.js - Exemplos Avançados**

```javascript
// Exemplos e demonstrações avançadas:

// 🔍 Busca Programática
exemploMultiplasBuscas()     // Buscar vários Pokémon em sequência
exemploFiltrarPorTipo()      // Filtrar por tipo específico
exemploBuscaComCache()       // Sistema de cache inteligente

// 📊 Análise de Dados
exemploAnaliseEstatisticas() // Análise estatística completa
exemploModoComparacao()      // Comparar dois Pokémon

// 💾 Gestão de Dados
exemploExportarFavoritos()   // Exportar favoritos como JSON
exemploImportarFavoritos()   // Importar favoritos de arquivo

// 🔧 Utilitários
exemploValidacaoEntrada()    // Validação robusta de entrada
debugEstadoAplicacao()       // Debug e diagnóstico
executarExemplosCompletos()  // Executar todas as demonstrações

// 📦 Classes Avançadas
PokemonCache                 // Sistema de cache LRU
```

### **Fluxo de Dados**

1. **Entrada do Usuário** → Formulário HTML
2. **Validação** → JavaScript
3. **Requisição API** → fetch() para PokéAPI
4. **Processamento** → Transformação dos dados JSON
5. **Exibição** → Manipulação do DOM
6. **Persistência** → localStorage para favoritos

### **Tratamento de Erros**

```javascript
try {
    // Requisição à API
    const response = await fetch(url);
  
    if (!response.ok) {
        throw new Error('Pokémon não encontrado');
    }
  
    // Processar dados...
} catch (error) {
    // Exibir erro para o usuário
    exibirMensagem(`Erro: ${error.message}`, 'error');
}
```

## 🎯 Conceitos JavaScript Demonstrados

### **ES6+ Features**

- ✅ `async/await` - Programação assíncrona
- ✅ `fetch()` - Requisições HTTP
- ✅ `const/let` - Declaração de variáveis
- ✅ Arrow functions - Sintaxe moderna
- ✅ Template literals - Strings interpoladas
- ✅ Destructuring - Desestruturação de objetos
- ✅ Array methods - map(), filter(), find()

### **DOM Manipulation**

- ✅ `document.getElementById()` - Seleção de elementos
- ✅ `addEventListener()` - Event listeners
- ✅ `innerHTML` - Manipulação de conteúdo
- ✅ `classList` - Manipulação de classes CSS

### **APIs Web**

- ✅ `localStorage` - Armazenamento local
- ✅ `JSON.parse/stringify` - Serialização
- ✅ `setTimeout` - Timers

## 🌐 Sobre a PokéAPI

**URL Base:** `https://pokeapi.co/api/v2/`

### **Endpoints Utilizados**

- `GET /pokemon/{id ou nome}` - Dados do Pokémon
- `GET /pokemon-species/{id}` - Informações da espécie

### **Exemplo de Resposta**

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    {
      "type": {
        "name": "electric"
      }
    }
  ],
  "sprites": {
    "front_default": "https://...",
    "front_shiny": "https://..."
  }
}
```

## 📱 Responsividade

### **Breakpoints**

- 📱 **Mobile:** < 576px
- 📱 **Tablet:** 576px - 768px
- 💻 **Desktop:** > 768px

### **Adaptações Mobile**

- Layout em coluna única
- Botões maiores para touch
- Texto otimizado para telas pequenas
- Navegação simplificada

## 🎨 Design System

### **Cores Principais**

```css
--primary-color: #3b82f6;    /* Azul principal */
--success-color: #10b981;    /* Verde sucesso */
--warning-color: #f59e0b;    /* Amarelo aviso */
--danger-color: #ef4444;     /* Vermelho erro */
```

### **Gradientes**

```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

## 🔧 Possíveis Melhorias

### **Funcionalidades Futuras**

- 🔍 Busca avançada com filtros
- 📊 Comparação entre Pokémon
- 🎮 Sistema de batalha simples
- 📱 PWA (Progressive Web App)
- 🌙 Modo escuro
- 🔊 Efeitos sonoros
- 📈 Gráficos de estatísticas

### **Otimizações Técnicas**

- ⚡ Cache de requisições
- 🔄 Paginação de resultados
- 📦 Lazy loading de imagens
- 🗜️ Compressão de dados
- 🔐 Service Worker para offline

## 📚 Recursos de Aprendizagem

### **Documentação Oficial**

- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)

### **Conceitos Relacionados**

- REST APIs
- JSON e AJAX
- Programação assíncrona
- Manipulação do DOM
- CSS Grid e Flexbox
- Responsive Design

## 🎓 Exercícios Propostos

### **Nível Básico**

1. Adicione mais campos de informação do Pokémon
2. Implemente busca por tipo de Pokémon
3. Crie um botão para limpar favoritos

### **Nível Intermediário**

1. Adicione paginação para múltiplos resultados
2. Implemente sistema de avaliação (estrelas)
3. Crie filtros por geração de Pokémon

### **Nível Avançado**

1. Implemente cache inteligente de requisições
2. Adicione modo offline com Service Worker
3. Crie sistema de comparação entre Pokémon

## 🐛 Solução de Problemas

### **Erro de CORS**

- **Problema:** Erro de CORS ao acessar a API
- **Solução:** Use um servidor local (não abra o arquivo diretamente)

### **Pokémon não encontrado**

- **Problema:** API retorna 404
- **Solução:** Verifique a grafia do nome ou use números válidos (1-1010)

### **Favoritos não salvam**

- **Problema:** localStorage não funciona
- **Solução:** Verifique se está usando HTTPS ou servidor local

## 👨‍🏫 Notas do Professor

Este exercício demonstra conceitos fundamentais do desenvolvimento web moderno:

1. **Separação de responsabilidades** - HTML (estrutura), CSS (apresentação), JS (comportamento)
2. **Programação assíncrona** - Essencial para APIs
3. **Experiência do usuário** - Feedback visual e tratamento de erros
4. **Persistência de dados** - localStorage para dados locais
5. **Design responsivo** - Adaptação a diferentes dispositivos

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte do curso de JavaScript.

**Dados fornecidos pela [PokéAPI](https://pokeapi.co/) - Uma API RESTful gratuita para Pokémon**

---

**Desenvolvido com ❤️ para aprendizagem de JavaScript
 Aula 13**
