# Exercício 04 - Eventos JavaScript

## 🎯 Objetivo
Aprender e praticar o uso de **eventos em JavaScript**, explorando diferentes tipos de eventos, métodos de atribuição e interação assíncrona com o usuário.

## 📚 Conceitos Abordados
- **Eventos JavaScript**
- **Tipos de eventos** (click, change, focus, keyup, etc.)
- **Atribuição no HTML** (onclick, onchange, etc.)
- **Event Listeners** (addEventListener)
- **Programação assíncrona**
- **Interação com o DOM**
- **Event Target e Event Object**

## 📁 Arquivos do Projeto
- `exercicio04.js` - Lógica principal com funções de eventos
- `index.html` - Interface interativa com exemplos práticos
- `README.md` - Documentação do exercício

## 🚀 Como Executar

### Opção 1: Interface Web (Recomendado)
1. Abra o arquivo `index.html` no navegador
2. Interaja com os diferentes elementos da página
3. Abra o Console do Navegador (F12) para ver os logs detalhados
4. Use os botões de controle para executar exemplos

### Opção 2: Console do Navegador
1. Abra o Console do Navegador (F12)
2. Carregue o arquivo `exercicio04.js`
3. Execute as funções individualmente

## 🎭 Tipos de Eventos Implementados

### 1. **Eventos por Atributos HTML**
```html
<!-- Exemplo de evento click -->
<button onclick="eventoClick()">Clique Aqui</button>

<!-- Exemplo de evento change -->
<select onchange="eventoMudanca(this)">
    <option value="javascript">JavaScript</option>
</select>

<!-- Exemplo de eventos focus/blur -->
<input onfocus="eventoFoco(this)" onblur="eventoBlur(this)">

<!-- Exemplo de evento keyup -->
<input onkeyup="eventoKeyUp(this, event)">
```

### 2. **Event Listeners (addEventListener)**
```javascript
// Event listener para click
botao.addEventListener('click', function(event) {
    console.log('Botão clicado!');
    console.log('Target:', event.target);
});

// Event listeners para hover
elemento.addEventListener('mouseenter', function(event) {
    // Mouse entra no elemento
});

elemento.addEventListener('mouseleave', function(event) {
    // Mouse sai do elemento
});
```

## 🎯 Eventos Disponíveis

| Evento | Descrição | Exemplo de Uso |
|--------|-----------|----------------|
| **click** | Clique simples do mouse | Botões, links |
| **dblclick** | Duplo clique do mouse | Ações especiais |
| **change** | Mudança de valor | Select, input |
| **focus** | Elemento recebe foco | Campos de formulário |
| **blur** | Elemento perde foco | Validação de campos |
| **keyup** | Tecla é liberada | Digitação em tempo real |
| **mouseenter** | Mouse entra no elemento | Efeitos hover |
| **mouseleave** | Mouse sai do elemento | Efeitos hover |
| **submit** | Envio de formulário | Validação de dados |
| **keydown** | Tecla é pressionada | Atalhos de teclado |

## 🔧 Funcionalidades Implementadas

### 1. **Eventos de Clique**
- Clique simples com feedback visual
- Duplo clique com animações
- Event listeners com transformações CSS

### 2. **Eventos de Formulário**
- Mudança em elementos select
- Foco e perda de foco em inputs
- Digitação com contador de caracteres
- Envio de formulário com preventDefault

### 3. **Eventos de Mouse**
- Hover com mudanças visuais
- Efeitos de entrada e saída

### 4. **Eventos de Teclado**
- Captura de teclas especiais (ESC, Ctrl+L)
- Digitação em tempo real
- Atalhos personalizados

### 5. **Funcionalidades Auxiliares**
- Limpeza de resultados
- Demonstração automática
- Simulação programática de eventos

## 📊 Exemplo de Saída no Console

```
🎭 DEMONSTRAÇÃO DE EVENTOS JAVASCRIPT
Professor Lucas Fernandes

📚 Tipos de eventos implementados:
• click - Clique simples
• dblclick - Duplo clique
• change - Mudança de valor
• focus/blur - Foco e perda de foco
• keyup - Tecla liberada
• mouseenter/mouseleave - Hover
• submit - Envio de formulário
• keydown - Teclas especiais (ESC, Ctrl+L)

🎯 Interaja com os elementos da página para ver os eventos em ação!
💡 Dica: Pressione ESC para limpar resultados ou Ctrl+L para limpar console

📄 DOM carregado completamente!
🚀 Inicializando Event Listeners...
✅ Event Listeners inicializados com sucesso!

🖱️ Evento CLICK disparado!
🔄 Evento CHANGE disparado!
Valor selecionado: javascript
🎯 Evento FOCUS disparado!
Campo focado: Digite aqui...
⌨️ Evento KEYUP disparado!
Tecla pressionada: a
Valor atual: a
```

## 🧠 Conceitos Aprendidos

### 1. **Programação Assíncrona**
- JavaScript trabalha de forma assíncrona
- Eventos podem ser disparados a qualquer momento
- Respostas são associadas aos eventos

### 2. **Event Object**
- Objeto que contém informações sobre o evento
- Propriedades: `target`, `type`, `key`, etc.
- Métodos: `preventDefault()`, `stopPropagation()`

### 3. **Event Target**
- Elemento que disparou o evento
- Acessível através de `event.target`
- Permite manipulação dinâmica

### 4. **DOM Manipulation**
- Alteração de estilos via JavaScript
- Modificação de conteúdo HTML
- Adição/remoção de classes CSS

### 5. **Event Bubbling**
- Eventos "sobem" na hierarquia do DOM
- Podem ser capturados em elementos pais
- Controle com `stopPropagation()`

## 🎨 Funcionalidades Avançadas

### 1. **Validação de Dados**
- Verificação de campos obrigatórios
- Feedback visual em tempo real
- Prevenção de envio inválido

### 2. **Interface Responsiva**
- Design adaptável a diferentes telas
- Efeitos visuais suaves
- Feedback imediato ao usuário

### 3. **Atalhos de Teclado**
- ESC para limpar resultados
- Ctrl+L para limpar console
- Captura de teclas especiais

### 4. **Simulação Programática**
- Disparo automático de eventos
- Demonstração sem interação manual
- Testes automatizados

## ⌨️ Atalhos Disponíveis

| Atalho | Ação |
|--------|------|
| **ESC** | Limpar todos os resultados |
| **Ctrl + L** | Limpar console do navegador |

## 🔄 Melhorias Implementadas

### Comparado aos Exercícios Anteriores:
1. **Interface Gráfica Completa** - Saída do console para interface web
2. **Interatividade Real** - Eventos reais do usuário
3. **Feedback Visual** - Animações e mudanças visuais
4. **Programação Assíncrona** - Resposta a eventos em tempo real
5. **Validação Dinâmica** - Verificação instantânea de dados
6. **Design Responsivo** - Adaptação a diferentes dispositivos

## 🚀 Possíveis Melhorias Futuras

1. **Mais Tipos de Eventos**
   - Eventos de scroll
   - Eventos de redimensionamento
   - Eventos de drag and drop

2. **Validação Avançada**
   - Expressões regulares
   - Validação de CPF/CNPJ
   - Máscaras de input

3. **Animações CSS**
   - Transições suaves
   - Keyframes personalizados
   - Efeitos 3D

4. **Local Storage**
   - Persistência de dados
   - Histórico de interações
   - Configurações do usuário

5. **APIs Externas**
   - Integração com APIs REST
   - Validação de CEP
   - Geolocalização

## 📖 Recursos Utilizados

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Lógica e eventos
- **DOM API** - Manipulação de elementos
- **Event API** - Gerenciamento de eventos
- **Form API** - Validação de formulários

## 👨‍🏫 Professor
**Lucas Fernandes**  
Aula 09 - Front end - JavaScript  
Tema: Eventos

---

### 💡 Dica Importante
**Abra sempre o Console do Navegador (F12) para acompanhar os logs detalhados e entender melhor o funcionamento dos eventos!**