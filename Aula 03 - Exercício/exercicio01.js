// Exercício 01 - JavaScript
// Professor Lucas Fernandes
// Receber dados e exibir no console

// Função para obter dados do usuário usando prompt
function obterDadosUsuario() {
    console.log('=== COLETANDO DADOS DO USUÁRIO ===');
    
    // Solicitar informações do usuário
    const nome = prompt('Digite seu nome:');
    const sobrenome = prompt('Digite seu sobrenome:');
    const idade = prompt('Digite sua idade:');
    const email = prompt('Digite seu email:');
    const cidade = prompt('Digite sua cidade:');
    const profissao = prompt('Digite sua profissão:');
    
    // Criar objeto com os dados coletados
    const dadosUsuario = {
        nome: nome,
        sobrenome: sobrenome,
        idade: parseInt(idade) || 0, // Converter para número
        email: email,
        cidade: cidade,
        profissao: profissao
    };
    
    return dadosUsuario;
}

// Função para exibir dados no console
function exibirDados(dados) {
    console.log('\n=== DADOS COLETADOS ===');
    
    // Exibir informações individuais
    console.log('Nome completo:', dados.nome + ' ' + dados.sobrenome);
    console.log('Idade:', dados.idade + ' anos');
    console.log('Email:', dados.email);
    console.log('Cidade:', dados.cidade);
    console.log('Profissão:', dados.profissao);
    
    console.log('\n=== DADOS EM FORMATO DE TABELA ===');
    // Atividade opcional: Exibir dados agrupados como tabela
    console.table(dados);
    
    // Informações adicionais
    console.log('\n=== INFORMAÇÕES ADICIONAIS ===');
    console.log('Total de campos preenchidos:', Object.keys(dados).length);
    console.log('Dados coletados em:', new Date().toLocaleString('pt-BR'));
}

// Executar o programa
console.log('🚀 Iniciando coleta de dados do usuário...');

try {
    // Obter dados do usuário
    const dadosColetados = obterDadosUsuario();
    
    // Verificar se os dados foram coletados
    if (dadosColetados.nome && dadosColetados.sobrenome) {
        // Exibir os dados
        exibirDados(dadosColetados);
        
        console.log('\n✅ Exercício concluído com sucesso!');
    } else {
        console.log('❌ Erro: Nome e sobrenome são obrigatórios!');
    }
} catch (error) {
    console.error('❌ Erro durante a execução:', error.message);
}

// Exemplo de uso alternativo com dados fictícios (para teste)
function exemploComDadosFicticios() {
    console.log('\n=== EXEMPLO COM DADOS FICTÍCIOS ===');
    
    const dadosExemplo = {
        nome: 'João',
        sobrenome: 'Silva',
        idade: 25,
        email: 'joao.silva@email.com',
        cidade: 'São Paulo',
        profissao: 'Desenvolvedor'
    };
    
    console.table(dadosExemplo);
}


// exemploComDadosFicticios();