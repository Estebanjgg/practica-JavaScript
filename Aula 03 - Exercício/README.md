# 📚 Exercício 01 - JavaScript
**Professor Lucas Fernandes**

## 🎯 Objetivo
Este exercício tem como objetivo praticar:
- Utilização da função `prompt()` para receber dados do usuário
- Exibição de informações no console do navegador
- Agrupamento de informações em objetos
- Uso da função `console.table()` para exibir dados em formato de tabela

## 📁 Arquivos do Projeto
- `exercicio01.js` - Código JavaScript principal com as funções do exercício
- `index.html` - Página web para executar o exercício
- `README.md` - Este arquivo com instruções

## 🚀 Como Executar

### Opção 1: Usando o arquivo HTML (Recomendado)
1. Abra o arquivo `index.html` em qualquer navegador web
2. Clique no botão "🚀 Iniciar Exercício"
3. Preencha os dados solicitados nos prompts
4. Abra o Console do navegador (pressione F12 e vá para a aba Console)
5. Observe os resultados exibidos

### Opção 2: Executando apenas o JavaScript
1. Abra o Console do navegador (F12 → Console)
2. Copie e cole o conteúdo do arquivo `exercicio01.js`
3. Execute o código

## 📋 Funcionalidades Implementadas

### ✅ Requisitos Básicos
- [x] Utilizar função `prompt()` para receber dados
- [x] Exibir informações no console
- [x] Coletar informações como nome, sobrenome, idade, etc.

### ✅ Atividade Opcional
- [x] Exibir dados agrupados como tabela usando `console.table()`
- [x] Agrupar informações em um objeto

### 🎁 Funcionalidades Extras
- [x] Interface web amigável
- [x] Validação básica de dados
- [x] Tratamento de erros
- [x] Exemplo com dados fictícios
- [x] Formatação de data e hora
- [x] Contagem de campos preenchidos

## 📊 Dados Coletados
O exercício coleta as seguintes informações:
- **Nome** (obrigatório)
- **Sobrenome** (obrigatório)
- **Idade** (convertida para número)
- **Email**
- **Cidade**
- **Profissão**

## 🖥️ Exemplo de Saída no Console
```
🚀 Iniciando coleta de dados do usuário...
=== COLETANDO DADOS DO USUÁRIO ===

=== DADOS COLETADOS ===
Nome completo: João Silva
Idade: 25 anos
Email: joao.silva@email.com
Cidade: São Paulo
Profissão: Desenvolvedor

=== DADOS EM FORMATO DE TABELA ===
┌─────────────┬──────────────────────────┐
│   (index)   │          Values          │
├─────────────┼──────────────────────────┤
│    nome     │          'João'          │
│  sobrenome  │         'Silva'          │
│    idade    │            25            │
│    email    │  'joao.silva@email.com' │
│   cidade    │       'São Paulo'        │
│  profissao  │     'Desenvolvedor'      │
└─────────────┴──────────────────────────┘

=== INFORMAÇÕES ADICIONAIS ===
Total de campos preenchidos: 6
Dados coletados em: 15/12/2024 14:30:25

✅ Exercício concluído com sucesso!
```

## 💡 Conceitos Aprendidos

### 1. Função `prompt()`
- Recebe dados do usuário através de uma caixa de diálogo
- Sempre retorna uma string
- Não é recomendado para páginas em produção
- Útil para exercícios e prototipagem

### 2. Console do Navegador
- `console.log()` - Exibe mensagens simples
- `console.table()` - Exibe objetos em formato de tabela
- `console.error()` - Exibe mensagens de erro
- `console.clear()` - Limpa o console

### 3. Objetos JavaScript
- Agrupamento de dados relacionados
- Acesso às propriedades com notação de ponto
- Úteis para organizar informações

### 4. Tratamento de Dados
- Conversão de strings para números com `parseInt()`
- Validação básica de dados
- Tratamento de erros com `try/catch`

## 🔧 Melhorias Possíveis
- Adicionar mais validações (email válido, idade mínima/máxima)
- Implementar armazenamento local dos dados
- Criar interface mais interativa sem usar `prompt()`
- Adicionar mais campos de informação
- Implementar exportação dos dados para arquivo

## 📚 Recursos Adicionais
- [MDN - prompt()](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/prompt)
- [MDN - Console](https://developer.mozilla.org/pt-BR/docs/Web/API/Console)
- [MDN - Objetos JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Working_with_Objects)

---
**Desenvolvido para fins educacionais - Curso de JavaScript**