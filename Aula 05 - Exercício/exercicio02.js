// Exercício 02 - JavaScript
// Professor Lucas Fernandes
// Executar operações - Receber dados de mais de uma pessoa

// Função para obter dados de uma pessoa usando prompt
function obterDadosPessoa(numeroPessoa) {
    console.log(`\n=== COLETANDO DADOS DA PESSOA ${numeroPessoa} ===`);
    
    const nome = prompt(`Digite o nome da pessoa ${numeroPessoa}:`);
    const sobrenome = prompt(`Digite o sobrenome da pessoa ${numeroPessoa}:`);
    const idade = prompt(`Digite a idade da pessoa ${numeroPessoa}:`);
    const email = prompt(`Digite o email da pessoa ${numeroPessoa}:`);
    const cidade = prompt(`Digite a cidade da pessoa ${numeroPessoa}:`);
    const profissao = prompt(`Digite a profissão da pessoa ${numeroPessoa}:`);
    const corPreferida = prompt(`Digite a cor preferida da pessoa ${numeroPessoa}:`);
    const altura = prompt(`Digite a altura da pessoa ${numeroPessoa} (em cm):`);
    
    return {
        numero: numeroPessoa,
        nome: nome,
        sobrenome: sobrenome,
        nomeCompleto: `${nome} ${sobrenome}`,
        idade: parseInt(idade) || 0,
        email: email,
        cidade: cidade,
        profissao: profissao,
        corPreferida: corPreferida?.toLowerCase(),
        altura: parseInt(altura) || 0
    };
}

// Função para coletar dados de múltiplas pessoas
function coletarDadosMultiplasPessoas() {
    const quantidadePessoas = parseInt(prompt('Quantas pessoas você deseja cadastrar? (mínimo 2):')) || 2;
    
    if (quantidadePessoas < 2) {
        alert('É necessário cadastrar pelo menos 2 pessoas para fazer comparações!');
        return coletarDadosMultiplasPessoas();
    }
    
    const pessoas = [];
    
    for (let i = 1; i <= quantidadePessoas; i++) {
        const pessoa = obterDadosPessoa(i);
        if (pessoa.nome && pessoa.sobrenome) {
            pessoas.push(pessoa);
        } else {
            console.log(`❌ Dados incompletos para a pessoa ${i}. Nome e sobrenome são obrigatórios!`);
            i--; // Repetir a coleta para esta pessoa
        }
    }
    
    return pessoas;
}

// Função para exibir dados de todas as pessoas
function exibirDadosTodasPessoas(pessoas) {
    console.log('\n=== DADOS DE TODAS AS PESSOAS ===');
    
    pessoas.forEach((pessoa, index) => {
        console.log(`\n--- Pessoa ${index + 1} ---`);
        console.log(`Nome completo: ${pessoa.nomeCompleto}`);
        console.log(`Idade: ${pessoa.idade} anos`);
        console.log(`Email: ${pessoa.email}`);
        console.log(`Cidade: ${pessoa.cidade}`);
        console.log(`Profissão: ${pessoa.profissao}`);
        console.log(`Cor preferida: ${pessoa.corPreferida}`);
        console.log(`Altura: ${pessoa.altura} cm`);
    });
    
    console.log('\n=== TABELA RESUMO ===');
    console.table(pessoas.map(p => ({
        Nome: p.nomeCompleto,
        Idade: p.idade,
        Cidade: p.cidade,
        Profissão: p.profissao,
        'Cor Preferida': p.corPreferida,
        'Altura (cm)': p.altura
    })));
}

// Função para comparar idades
function compararIdades(pessoas) {
    console.log('\n=== COMPARAÇÕES DE IDADE ===');
    
    // Encontrar a pessoa mais velha e mais nova
    const maisVelha = pessoas.reduce((prev, current) => 
        (prev.idade > current.idade) ? prev : current
    );
    
    const maisNova = pessoas.reduce((prev, current) => 
        (prev.idade < current.idade) ? prev : current
    );
    
    console.log(`👴 Pessoa mais velha: ${maisVelha.nomeCompleto} com ${maisVelha.idade} anos`);
    console.log(`👶 Pessoa mais nova: ${maisNova.nomeCompleto} com ${maisNova.idade} anos`);
    
    // Comparações par a par
    for (let i = 0; i < pessoas.length; i++) {
        for (let j = i + 1; j < pessoas.length; j++) {
            const pessoa1 = pessoas[i];
            const pessoa2 = pessoas[j];
            
            if (pessoa1.idade > pessoa2.idade) {
                console.log(`📊 ${pessoa1.nome} é mais velho(a) que ${pessoa2.nome} (${pessoa1.idade} vs ${pessoa2.idade} anos)`);
            } else if (pessoa1.idade < pessoa2.idade) {
                console.log(`📊 ${pessoa2.nome} é mais velho(a) que ${pessoa1.nome} (${pessoa2.idade} vs ${pessoa1.idade} anos)`);
            } else {
                console.log(`📊 ${pessoa1.nome} e ${pessoa2.nome} têm a mesma idade (${pessoa1.idade} anos)`);
            }
        }
    }
}

// Função para comparar cores preferidas
function compararCoresPreferidas(pessoas) {
    console.log('\n=== COMPARAÇÕES DE CORES PREFERIDAS ===');
    
    // Agrupar pessoas por cor preferida
    const coresPorPessoa = {};
    
    pessoas.forEach(pessoa => {
        if (pessoa.corPreferida) {
            if (!coresPorPessoa[pessoa.corPreferida]) {
                coresPorPessoa[pessoa.corPreferida] = [];
            }
            coresPorPessoa[pessoa.corPreferida].push(pessoa.nome);
        }
    });
    
    // Exibir cores em comum
    Object.keys(coresPorPessoa).forEach(cor => {
        const pessoasComEssaCor = coresPorPessoa[cor];
        if (pessoasComEssaCor.length > 1) {
            console.log(`🎨 ${pessoasComEssaCor.join(' e ')} têm a mesma cor preferida: ${cor}`);
        } else {
            console.log(`🎨 ${pessoasComEssaCor[0]} é o(a) único(a) que prefere a cor ${cor}`);
        }
    });
}

// Função para comparar alturas
function compararAlturas(pessoas) {
    console.log('\n=== COMPARAÇÕES DE ALTURA ===');
    
    const maisAlta = pessoas.reduce((prev, current) => 
        (prev.altura > current.altura) ? prev : current
    );
    
    const maisBaixa = pessoas.reduce((prev, current) => 
        (prev.altura < current.altura) ? prev : current
    );
    
    console.log(`📏 Pessoa mais alta: ${maisAlta.nomeCompleto} com ${maisAlta.altura} cm`);
    console.log(`📏 Pessoa mais baixa: ${maisBaixa.nomeCompleto} com ${maisBaixa.altura} cm`);
    
    // Comparações de altura par a par
    for (let i = 0; i < pessoas.length; i++) {
        for (let j = i + 1; j < pessoas.length; j++) {
            const pessoa1 = pessoas[i];
            const pessoa2 = pessoas[j];
            
            const diferenca = Math.abs(pessoa1.altura - pessoa2.altura);
            
            if (pessoa1.altura > pessoa2.altura) {
                console.log(`📏 ${pessoa1.nome} é ${diferenca} cm mais alto(a) que ${pessoa2.nome}`);
            } else if (pessoa1.altura < pessoa2.altura) {
                console.log(`📏 ${pessoa2.nome} é ${diferenca} cm mais alto(a) que ${pessoa1.nome}`);
            } else {
                console.log(`📏 ${pessoa1.nome} e ${pessoa2.nome} têm a mesma altura (${pessoa1.altura} cm)`);
            }
        }
    }
}

// Função para comparar cidades
function compararCidades(pessoas) {
    console.log('\n=== COMPARAÇÕES DE CIDADES ===');
    
    const cidadesPorPessoa = {};
    
    pessoas.forEach(pessoa => {
        if (pessoa.cidade) {
            const cidadeLower = pessoa.cidade.toLowerCase();
            if (!cidadesPorPessoa[cidadeLower]) {
                cidadesPorPessoa[cidadeLower] = [];
            }
            cidadesPorPessoa[cidadeLower].push(pessoa.nome);
        }
    });
    
    Object.keys(cidadesPorPessoa).forEach(cidade => {
        const pessoasDessaCidade = cidadesPorPessoa[cidade];
        if (pessoasDessaCidade.length > 1) {
            console.log(`🏙️ ${pessoasDessaCidade.join(' e ')} moram na mesma cidade: ${cidade}`);
        } else {
            console.log(`🏙️ ${pessoasDessaCidade[0]} mora em ${cidade}`);
        }
    });
}

// Função para comparar profissões
function compararProfissoes(pessoas) {
    console.log('\n=== COMPARAÇÕES DE PROFISSÕES ===');
    
    const profissoesPorPessoa = {};
    
    pessoas.forEach(pessoa => {
        if (pessoa.profissao) {
            const profissaoLower = pessoa.profissao.toLowerCase();
            if (!profissoesPorPessoa[profissaoLower]) {
                profissoesPorPessoa[profissaoLower] = [];
            }
            profissoesPorPessoa[profissaoLower].push(pessoa.nome);
        }
    });
    
    Object.keys(profissoesPorPessoa).forEach(profissao => {
        const pessoasComEssaProfissao = profissoesPorPessoa[profissao];
        if (pessoasComEssaProfissao.length > 1) {
            console.log(`💼 ${pessoasComEssaProfissao.join(' e ')} trabalham como ${profissao}`);
        } else {
            console.log(`💼 ${pessoasComEssaProfissao[0]} trabalha como ${profissao}`);
        }
    });
}

// Função para gerar estatísticas gerais
function gerarEstatisticas(pessoas) {
    console.log('\n=== ESTATÍSTICAS GERAIS ===');
    
    const idades = pessoas.map(p => p.idade).filter(idade => idade > 0);
    const alturas = pessoas.map(p => p.altura).filter(altura => altura > 0);
    
    if (idades.length > 0) {
        const idadeMedia = idades.reduce((sum, idade) => sum + idade, 0) / idades.length;
        console.log(`📊 Idade média do grupo: ${idadeMedia.toFixed(1)} anos`);
    }
    
    if (alturas.length > 0) {
        const alturaMedia = alturas.reduce((sum, altura) => sum + altura, 0) / alturas.length;
        console.log(`📊 Altura média do grupo: ${alturaMedia.toFixed(1)} cm`);
    }
    
    console.log(`📊 Total de pessoas cadastradas: ${pessoas.length}`);
    console.log(`📊 Dados coletados em: ${new Date().toLocaleString('pt-BR')}`);
}

// Função principal para executar todas as comparações
function executarComparacoes(pessoas) {
    console.log('\n🔍 INICIANDO ANÁLISES E COMPARAÇÕES...');
    
    compararIdades(pessoas);
    compararCoresPreferidas(pessoas);
    compararAlturas(pessoas);
    compararCidades(pessoas);
    compararProfissoes(pessoas);
    gerarEstatisticas(pessoas);
}

// Programa principal
function iniciarExercicio02() {
    console.clear();
    console.log('🚀 EXERCÍCIO 02 - COMPARAÇÃO DE DADOS');
    console.log('Professor Lucas Fernandes\n');
    
    try {
        // Coletar dados de múltiplas pessoas
        const pessoas = coletarDadosMultiplasPessoas();
        
        if (pessoas.length >= 2) {
            // Exibir dados coletados
            exibirDadosTodasPessoas(pessoas);
            
            // Executar comparações
            executarComparacoes(pessoas);
            
            console.log('\n✅ Exercício 02 concluído com sucesso!');
            console.log('🎉 Todas as comparações foram realizadas!');
        } else {
            console.log('❌ Erro: É necessário pelo menos 2 pessoas para fazer comparações!');
        }
    } catch (error) {
        console.error('❌ Erro durante a execução:', error.message);
    }
}
// iniciarExercicio02();

// Exemplo com dados fictícios para demonstração
function exemploComDadosFicticios() {
    console.clear();
    console.log('👁️ EXEMPLO COM DADOS FICTÍCIOS\n');
    
    const pessoasExemplo = [
        {
            numero: 1,
            nome: 'João',
            sobrenome: 'Silva',
            nomeCompleto: 'João Silva',
            idade: 25,
            email: 'joao.silva@email.com',
            cidade: 'São Paulo',
            profissao: 'desenvolvedor',
            corPreferida: 'azul',
            altura: 175
        },
        {
            numero: 2,
            nome: 'Maria',
            sobrenome: 'Santos',
            nomeCompleto: 'Maria Santos',
            idade: 30,
            email: 'maria.santos@email.com',
            cidade: 'Rio de Janeiro',
            profissao: 'designer',
            corPreferida: 'verde',
            altura: 165
        },
        {
            numero: 3,
            nome: 'Pedro',
            sobrenome: 'Oliveira',
            nomeCompleto: 'Pedro Oliveira',
            idade: 25,
            email: 'pedro.oliveira@email.com',
            cidade: 'São Paulo',
            profissao: 'desenvolvedor',
            corPreferida: 'azul',
            altura: 180
        }
    ];
    
    exibirDadosTodasPessoas(pessoasExemplo);
    executarComparacoes(pessoasExemplo);
}


// exemploComDadosFicticios();