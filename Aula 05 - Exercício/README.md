# 📊 Exercício 02 - JavaScript

## 🎯 Objetivo

Este exercício expande o anterior para trabalhar com **múltiplas pessoas**, implementando:

- Coleta de dados de várias pessoas
- Comparações automáticas entre os dados
- Mensagens personalizadas de comparação
- Análises estatísticas dos dados coletados

## 📁 Arquivos do Projeto

- `exercicio02.js` - Código JavaScript principal com todas as funcionalidades
- `index.html` - Interface web moderna para executar o exercício
- `README.md` - Este arquivo com documentação completa

## 🚀 Como Executar

### Opção 1: Interface Web (Recomendado)

1. Abra o arquivo `index.html` em qualquer navegador
2. Clique em "🚀 Iniciar Exercício"
3. Informe quantas pessoas deseja cadastrar (mínimo 2)
4. Preencha os dados de cada pessoa
5. Abra o Console (F12 → Console) para ver os resultados

### Opção 2: Console do Navegador

1. Abra o Console (F12 → Console)
2. Copie e cole o código do `exercicio02.js`
3. Execute `iniciarExercicio02()`

## 📊 Dados Coletados por Pessoa

- **Nome** (obrigatório)
- **Sobrenome** (obrigatório)
- **Idade** (convertida para número)
- **Email**
- **Cidade**
- **Profissão**
- **Cor Preferida**
- **Altura** (em centímetros)

## 🔍 Tipos de Comparações Realizadas

### 1. 👴👶 Comparações de Idade

- Identifica a pessoa mais velha e mais nova
- Compara idades par a par
- Gera mensagens como: "João é mais velho que Maria (25 vs 22 anos)"
- Identifica pessoas com a mesma idade

### 2. 🎨 Comparações de Cores Preferidas

- Agrupa pessoas por cor preferida
- Identifica cores em comum
- Mensagens como: "João e Maria têm a mesma cor preferida: azul"
- Destaca cores únicas

### 3. 📏 Comparações de Altura

- Encontra a pessoa mais alta e mais baixa
- Calcula diferenças de altura entre pessoas
- Mensagens como: "Pedro é 10 cm mais alto que Ana"
- Identifica pessoas com a mesma altura

### 4. 🏙️ Comparações de Cidades

- Agrupa pessoas por cidade
- Identifica quem mora na mesma cidade
- Mensagens como: "João e Maria moram na mesma cidade: São Paulo"

### 5. 💼 Comparações de Profissões

- Agrupa pessoas por profissão
- Identifica profissões em comum
- Mensagens como: "Ana e Carlos trabalham como desenvolvedor"

### 6. 📈 Estatísticas Gerais

- Calcula idade média do grupo
- Calcula altura média do grupo
- Conta total de pessoas cadastradas
- Registra data/hora da coleta

## 🖥️ Exemplo de Saída Completa

```
🚀 EXERCÍCIO 02 - COMPARAÇÃO DE DADOS
Professor Lucas Fernandes

=== COLETANDO DADOS DA PESSOA 1 ===
=== COLETANDO DADOS DA PESSOA 2 ===
=== COLETANDO DADOS DA PESSOA 3 ===

=== DADOS DE TODAS AS PESSOAS ===

--- Pessoa 1 ---
Nome completo: João Silva
Idade: 25 anos
Email: joao.silva@email.com
Cidade: São Paulo
Profissão: desenvolvedor
Cor preferida: azul
Altura: 175 cm

--- Pessoa 2 ---
Nome completo: Maria Santos
Idade: 30 anos
Email: maria.santos@email.com
Cidade: Rio de Janeiro
Profissão: designer
Cor preferida: verde
Altura: 165 cm

--- Pessoa 3 ---
Nome completo: Pedro Oliveira
Idade: 25 anos
Email: pedro.oliveira@email.com
Cidade: São Paulo
Profissão: desenvolvedor
Cor preferida: azul
Altura: 180 cm

=== TABELA RESUMO ===
┌─────────┬──────────────────┬───────┬──────────────┬─────────────┬───────────────┬──────────────┐
│ (index) │      Nome        │ Idade │    Cidade    │  Profissão  │ Cor Preferida │ Altura (cm) │
├─────────┼──────────────────┼───────┼──────────────┼─────────────┼───────────────┼──────────────┤
│    0    │   'João Silva'   │  25   │ 'São Paulo'  │'desenvolvedor'│    'azul'     │     175      │
│    1    │  'Maria Santos'  │  30   │'Rio de Janeiro'│  'designer' │    'verde'    │     165      │
│    2    │ 'Pedro Oliveira' │  25   │ 'São Paulo'  │'desenvolvedor'│    'azul'     │     180      │
└─────────┴──────────────────┴───────┴──────────────┴─────────────┴───────────────┴──────────────┘

🔍 INICIANDO ANÁLISES E COMPARAÇÕES...

=== COMPARAÇÕES DE IDADE ===
👴 Pessoa mais velha: Maria Santos com 30 anos
👶 Pessoa mais nova: João Silva com 25 anos
📊 Maria é mais velho(a) que João (30 vs 25 anos)
📊 Maria é mais velho(a) que Pedro (30 vs 25 anos)
📊 João e Pedro têm a mesma idade (25 anos)

=== COMPARAÇÕES DE CORES PREFERIDAS ===
🎨 João e Pedro têm a mesma cor preferida: azul
🎨 Maria é o(a) único(a) que prefere a cor verde

=== COMPARAÇÕES DE ALTURA ===
📏 Pessoa mais alta: Pedro Oliveira com 180 cm
📏 Pessoa mais baixa: Maria Santos com 165 cm
📏 Pedro é 5 cm mais alto(a) que João
📏 Pedro é 15 cm mais alto(a) que Maria
📏 João é 10 cm mais alto(a) que Maria

=== COMPARAÇÕES DE CIDADES ===
🏙️ João e Pedro moram na mesma cidade: são paulo
🏙️ Maria mora em rio de janeiro

=== COMPARAÇÕES DE PROFISSÕES ===
💼 João e Pedro trabalham como desenvolvedor
💼 Maria trabalha como designer

=== ESTATÍSTICAS GERAIS ===
📊 Idade média do grupo: 26.7 anos
📊 Altura média do grupo: 173.3 cm
📊 Total de pessoas cadastradas: 3
📊 Dados coletados em: 15/12/2024 15:45:30

✅ Exercício 02 concluído com sucesso!
🎉 Todas as comparações foram realizadas!
```

## 💡 Conceitos Aprendidos

### 1. Estruturas de Dados

- **Arrays**: Para armazenar múltiplas pessoas
- **Objetos**: Para organizar dados de cada pessoa
- **Loops**: Para iterar sobre os dados

### 2. Algoritmos de Comparação

- **Comparação par a par**: Compara cada pessoa com todas as outras
- **Agrupamento**: Agrupa pessoas por características similares
- **Busca de extremos**: Encontra máximos e mínimos

### 3. Manipulação de Strings

- **toLowerCase()**: Para comparações case-insensitive
- **Template literals**: Para mensagens dinâmicas
- **Concatenação**: Para formar nomes completos

### 4. Funções Matemáticas

- **Math.abs()**: Para calcular diferenças absolutas
- **reduce()**: Para encontrar máximos/mínimos e calcular médias
- **parseInt()**: Para converter strings em números

### 5. Métodos de Array

- **forEach()**: Para iterar sobre arrays
- **map()**: Para transformar dados
- **filter()**: Para filtrar dados válidos
- **reduce()**: Para agregações

## 🔧 Funcionalidades Avançadas

### ✅ Validação de Dados

- Verifica campos obrigatórios (nome e sobrenome)
- Converte tipos de dados automaticamente
- Trata valores inválidos com valores padrão

### ✅ Tratamento de Erros

- Try/catch para capturar erros
- Mensagens de erro informativas
- Recuperação graceful de erros

### ✅ Interface Amigável

- Design moderno e responsivo
- Botões interativos
- Instruções claras
- Feedback visual

### ✅ Flexibilidade

- Número variável de pessoas
- Campos opcionais
- Exemplo com dados fictícios
- Execução modular

## 🎨 Exemplos de Mensagens Personalizadas

### Comparações de Idade:

- "João é mais velho que Maria (25 vs 22 anos)"
- "Ana e Carlos têm a mesma idade (28 anos)"
- "Pedro é o mais novo do grupo com 20 anos"

### Comparações de Características:

- "Maria e João têm a mesma cor preferida: azul"
- "Carlos é 15 cm mais alto que Ana"
- "Pedro e Lucas moram na mesma cidade: São Paulo"
- "Ana e Maria trabalham como designer"

## 🚀 Melhorias Possíveis

- Adicionar mais campos de dados (hobby, estado civil, etc.)
- Implementar comparações mais complexas
- Criar gráficos visuais das comparações
- Adicionar exportação de relatórios
- Implementar busca e filtros
- Adicionar validações mais robustas

## 📚 Recursos Utilizados

- [MDN - Arrays](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN - Objects](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN - Loops](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN - String Methods](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String)

---

**Desenvolvido para fins educacionais - Curso de JavaScript**
**Exercício que demonstra comparações de dados e análise de múltiplas entradas**
