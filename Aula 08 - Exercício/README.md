# 🏗️ Exercício 03 - JavaScript

**Estruturas de Dados e Objetos**

## 🎯 Objetivo

Este exercício evolui dos anteriores implementando **estruturas de dados organizadas** através de **função construtora**, permitindo **quantidade arbitrária de registros** com confirmação entre cadastros, e **separando todas as comparações em funções específicas**.

## 📁 Arquivos do Projeto

- `exercicio03.js` - Lógica principal com função construtora e comparações
- `index.html` - Interface web moderna e responsiva
- `README.md` - Documentação completa do projeto

## 🚀 Como Executar

### 💻 Interface Web (Recomendado)

1. Abra o arquivo `index.html` no navegador
2. Clique em "Iniciar Exercício" para começar
3. Abra o Console do navegador (F12 → Console)
4. Siga as instruções nos prompts
5. Visualize os resultados no console

### 🖥️ Console Direto

1. Abra o arquivo `exercicio03.js` em um editor
2. Descomente a linha `iniciarExercicio03();` no final
3. Execute o arquivo em um ambiente JavaScript

## 🏗️ Função Construtora Pessoa

### Estrutura do Objeto

```javascript
function Pessoa(nome, sobrenome, idade, email, cidade, profissao, corPreferida, altura) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.nomeCompleto = `${nome} ${sobrenome}`;
    this.idade = parseInt(idade) || 0;
    this.email = email;
    this.cidade = cidade;
    this.profissao = profissao;
    this.corPreferida = corPreferida?.toLowerCase();
    this.altura = parseInt(altura) || 0;
  
    // Métodos do objeto
    this.exibirInfo = function() { ... };
    this.isValida = function() { ... };
}
```

### Exemplo de Uso

```javascript
// Criar nova pessoa usando o construtor
const pessoa1 = new Pessoa('João', 'Silva', 25, 'joao@email.com', 'São Paulo', 'desenvolvedor', 'azul', 175);

// Verificar se os dados são válidos
if (pessoa1.isValida()) {
    pessoa1.exibirInfo(); // Exibe informações formatadas
}
```

## 🔄 Quantidade Arbitrária de Registros

### Fluxo de Cadastro

1. **Início**: Usuário inicia o cadastro
2. **Coleta**: Sistema solicita dados da pessoa
3. **Validação**: Verifica se dados obrigatórios foram preenchidos
4. **Confirmação**: Pergunta se deseja cadastrar mais uma pessoa
5. **Repetição**: Continua até o usuário escolher parar
6. **Mínimo**: Garante pelo menos 2 pessoas para comparações

### Validações Implementadas

- ✅ Nome e sobrenome obrigatórios
- ✅ Idade deve ser um número válido
- ✅ Mínimo de 2 pessoas para comparações
- ✅ Opção de tentar novamente em caso de erro
- ✅ Cancelamento seguro do processo

## ⚙️ Funções de Comparação Separadas

### 1. 👴👶 Comparações de Idade

- **Função**: `compararIdades(pessoas)`
- **Funcionalidades**:
  - Identifica pessoa mais velha e mais nova
  - Comparações par a par entre todas as pessoas
  - Mensagens personalizadas para cada comparação

### 2. 🎨 Comparações de Cores Preferidas

- **Função**: `compararCoresPreferidas(pessoas)`
- **Funcionalidades**:
  - Agrupa pessoas por cor preferida
  - Identifica cores em comum
  - Destaca preferências únicas

### 3. 📏 Comparações de Altura

- **Função**: `compararAlturas(pessoas)`
- **Funcionalidades**:
  - Encontra pessoa mais alta e mais baixa
  - Calcula diferenças de altura entre pessoas
  - Identifica alturas iguais

### 4. 🏙️ Comparações de Cidades

- **Função**: `compararCidades(pessoas)`
- **Funcionalidades**:
  - Agrupa pessoas por cidade
  - Identifica quem mora na mesma cidade
  - Lista cidades únicas

### 5. 💼 Comparações de Profissões

- **Função**: `compararProfissoes(pessoas)`
- **Funcionalidades**:
  - Agrupa pessoas por profissão
  - Identifica profissões em comum
  - Destaca profissões únicas

### 6. 📊 Estatísticas Gerais

- **Função**: `gerarEstatisticas(pessoas)`
- **Funcionalidades**:
  - Calcula idade média do grupo
  - Calcula altura média do grupo
  - Determina faixas etárias e de altura
  - Conta total de pessoas cadastradas
  - Registra data/hora do processamento

## 📊 Dados Coletados

Cada pessoa cadastrada possui os seguintes campos:

| Campo            | Tipo   | Obrigatório | Descrição                                |
| ---------------- | ------ | ------------ | ------------------------------------------ |
| `nome`         | String | ✅           | Primeiro nome da pessoa                    |
| `sobrenome`    | String | ✅           | Sobrenome da pessoa                        |
| `nomeCompleto` | String | Auto         | Nome + Sobrenome (gerado automaticamente)  |
| `idade`        | Number | ✅           | Idade em anos                              |
| `email`        | String | ❌           | Endereço de email                         |
| `cidade`       | String | ❌           | Cidade onde mora                           |
| `profissao`    | String | ❌           | Profissão atual                           |
| `corPreferida` | String | ❌           | Cor favorita (convertida para minúsculas) |
| `altura`       | Number | ❌           | Altura em centímetros                     |

## 🖥️ Exemplo de Saída Completa

```
🚀 EXERCÍCIO 03 - ESTRUTURAS DE DADOS E OBJETOS
Professor Lucas Fernandes
Modelo de objeto constructor + Quantidade arbitrária

=== CADASTRANDO PESSOA 1 ===
✅ Pessoa 1 cadastrada com sucesso!
👤 João Silva - 25 anos - São Paulo

🤔 Deseja cadastrar mais uma pessoa? (sim/não): sim

=== CADASTRANDO PESSOA 2 ===
✅ Pessoa 2 cadastrada com sucesso!
👤 Maria Santos - 30 anos - Rio de Janeiro

🤔 Deseja cadastrar mais uma pessoa? (sim/não): não

🎉 Cadastro finalizado! Total de pessoas: 2

=== DADOS DE TODAS AS PESSOAS CADASTRADAS ===

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

=== TABELA RESUMO ===
┌─────────┬──────────────┬───────┬─────────────────┬───────────┬───────────────┬─────────────┐
│ (index) │     Nome     │ Idade │     Cidade      │ Profissão │ Cor Preferida │ Altura (cm) │
├─────────┼──────────────┼───────┼─────────────────┼───────────┼───────────────┼─────────────┤
│    0    │ 'João Silva' │  25   │   'São Paulo'   │'desenvolvedor'│    'azul'     │     175     │
│    1    │'Maria Santos'│  30   │'Rio de Janeiro' │ 'designer'│    'verde'    │     165     │
└─────────┴──────────────┴───────┴─────────────────┴───────────┴───────────────┴─────────────┘

🔍 INICIANDO ANÁLISES E COMPARAÇÕES...
Aguarde enquanto processamos todos os dados...

=== 👴👶 COMPARAÇÕES DE IDADE ===
👴 Pessoa mais velha: Maria Santos com 30 anos
👶 Pessoa mais nova: João Silva com 25 anos
📊 Maria é mais velho(a) que João (30 vs 25 anos)

=== 🎨 COMPARAÇÕES DE CORES PREFERIDAS ===
🎨 João é o(a) único(a) que prefere a cor azul
🎨 Maria é o(a) único(a) que prefere a cor verde

=== 📏 COMPARAÇÕES DE ALTURA ===
📏 Pessoa mais alta: João Silva com 175 cm
📏 Pessoa mais baixa: Maria Santos com 165 cm
📏 João é 10 cm mais alto(a) que Maria

=== 🏙️ COMPARAÇÕES DE CIDADES ===
🏙️ João mora em são paulo
🏙️ Maria mora em rio de janeiro

=== 💼 COMPARAÇÕES DE PROFISSÕES ===
💼 João trabalha como desenvolvedor
💼 Maria trabalha como designer

=== 📊 ESTATÍSTICAS GERAIS ===
📊 Idade média do grupo: 27.5 anos
📊 Faixa etária: 25 - 30 anos
📊 Altura média do grupo: 170.0 cm
📊 Faixa de altura: 165 - 175 cm
📊 Total de pessoas cadastradas: 2
📊 Dados processados em: 15/12/2024 14:30:25

✅ Todas as comparações foram concluídas!

🎉 EXERCÍCIO 03 CONCLUÍDO COM SUCESSO!
✨ 2 pessoas foram cadastradas e analisadas!
```

## 🧠 Conceitos Aprendidos

### 🏗️ Programação Orientada a Objetos

- **Função Construtora**: Criação de objetos padronizados
- **Métodos de Instância**: Funções específicas de cada objeto
- **Encapsulamento**: Organização de dados e comportamentos
- **Instanciação**: Uso do operador `new` para criar objetos

### 📊 Estruturas de Dados

- **Arrays de Objetos**: Coleções organizadas de dados
- **Agrupamento**: Organização de dados por características
- **Mapeamento**: Transformação de dados para diferentes formatos
- **Filtragem**: Seleção de dados baseada em critérios

### ⚙️ Modularização

- **Separação de Responsabilidades**: Cada função tem um propósito específico
- **Reutilização de Código**: Funções podem ser chamadas múltiplas vezes
- **Manutenibilidade**: Código organizado e fácil de modificar
- **Testabilidade**: Funções isoladas são mais fáceis de testar

### 🔄 Controle de Fluxo Avançado

- **Loops Dinâmicos**: Quantidade de iterações determinada pelo usuário
- **Validação Condicional**: Verificações múltiplas de dados
- **Tratamento de Erros**: Recuperação de situações inesperadas
- **Confirmações Interativas**: Decisões do usuário durante execução

## ✨ Funcionalidades Avançadas

### 🛡️ Validação e Tratamento de Erros

- Verificação de dados obrigatórios
- Conversão segura de tipos de dados
- Opções de recuperação em caso de erro
- Mensagens informativas para o usuário

### 🎨 Interface Amigável

- Design moderno e responsivo
- Instruções claras e objetivas
- Feedback visual durante o processo
- Compatibilidade com dispositivos móveis

### 📊 Análises Estatísticas

- Cálculos de médias e extremos
- Agrupamentos por características
- Comparações detalhadas par a par
- Relatórios formatados e organizados

## 🔄 Melhorias Implementadas

### Em relação ao Exercício 02:

1. **✅ Função Construtora**: Substituição de objetos literais por instâncias de classe
2. **✅ Métodos de Objeto**: Adição de comportamentos específicos aos objetos
3. **✅ Cadastro Dinâmico**: Quantidade arbitrária com confirmação entre registros
4. **✅ Modularização**: Separação completa das funções de comparação
5. **✅ Validação Aprimorada**: Verificações mais robustas e recuperação de erros
6. **✅ Interface Melhorada**: Design mais moderno e instruções mais claras

## 🚀 Possíveis Melhorias Futuras

### 🔧 Técnicas

- Implementar classes ES6 em vez de função construtora
- Adicionar persistência de dados (localStorage)
- Criar sistema de edição de registros
- Implementar importação/exportação de dados

### 📊 Funcionalidades

- Gráficos visuais das comparações
- Filtros e ordenação de dados
- Busca por características específicas
- Relatórios em PDF ou Excel

### 🎨 Interface

- Formulário web em vez de prompts
- Visualização em tempo real dos dados
- Temas personalizáveis
- Modo escuro/claro

## 📚 Recursos Utilizados

### 🛠️ Tecnologias

- **JavaScript ES6+**: Funções construtoras, arrow functions, template literals
- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Flexbox, Grid, gradientes, animações
- **Console API**: Métodos avançados de logging

### 📖 Conceitos

- **Programação Orientada a Objetos**
- **Algoritmos de Comparação**
- **Estruturas de Dados**
- **Validação de Entrada**
- **Design Responsivo**

---

**🎓 Exercício desenvolvido para aprendizado de JavaScript avançado**
**📅 Aula 08 - Estruturas de Dados e Objetos**
