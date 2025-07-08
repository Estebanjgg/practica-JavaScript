// Exercício 03 - JavaScript
// Agrupar dados em estruturas - Objeto modelo e quantidade variável

// Função construtora para criar objetos Pessoa
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
    
    // Método para exibir informações da pessoa
    this.exibirInfo = function() {
        console.log(`👤 ${this.nomeCompleto} - ${this.idade} anos - ${this.cidade}`);
    };
    
    // Método para validar dados obrigatórios
    this.isValida = function() {
        return this.nome && this.sobrenome && this.idade > 0;
    };
}

// Função para coletar dados de uma pessoa
function coletarDadosPessoa(numeroPessoa) {
    console.log(`\n=== CADASTRANDO PESSOA ${numeroPessoa} ===`);
    
    const nome = prompt(`Digite o nome da pessoa ${numeroPessoa}:`);
    const sobrenome = prompt(`Digite o sobrenome da pessoa ${numeroPessoa}:`);
    const idade = prompt(`Digite a idade da pessoa ${numeroPessoa}:`);
    const email = prompt(`Digite o email da pessoa ${numeroPessoa}:`);
    const cidade = prompt(`Digite a cidade da pessoa ${numeroPessoa}:`);
    const profissao = prompt(`Digite a profissão da pessoa ${numeroPessoa}:`);
    const corPreferida = prompt(`Digite a cor preferida da pessoa ${numeroPessoa}:`);
    const altura = prompt(`Digite a altura da pessoa ${numeroPessoa} (em cm):`);
    
    // Criar nova instância usando o construtor
    const pessoa = new Pessoa(nome, sobrenome, idade, email, cidade, profissao, corPreferida, altura);
    
    if (pessoa.isValida()) {
        console.log(`✅ Pessoa ${numeroPessoa} cadastrada com sucesso!`);
        pessoa.exibirInfo();
        return pessoa;
    } else {
        console.log(`❌ Dados inválidos para a pessoa ${numeroPessoa}. Nome, sobrenome e idade são obrigatórios!`);
        return null;
    }
}

// Função para coletar dados de quantidade arbitrária de pessoas
function coletarTodasPessoas() {
    const pessoas = [];
    let numeroPessoa = 1;
    let continuarCadastro = true;
    
    console.log('🚀 INICIANDO CADASTRO DE PESSOAS');
    console.log('Você pode cadastrar quantas pessoas desejar!');
    
    while (continuarCadastro) {
        const pessoa = coletarDadosPessoa(numeroPessoa);
        
        if (pessoa) {
            pessoas.push(pessoa);
            numeroPessoa++;
            
            // Perguntar se deseja adicionar mais uma pessoa
            if (pessoas.length >= 2) {
                const resposta = prompt(`\n🤔 Deseja cadastrar mais uma pessoa? (sim/não):`);
                continuarCadastro = resposta?.toLowerCase() === 'sim' || resposta?.toLowerCase() === 's';
            } else {
                console.log('\n📝 É necessário pelo menos 2 pessoas para fazer comparações.');
                const resposta = prompt('Deseja cadastrar mais uma pessoa? (sim/não):');
                continuarCadastro = resposta?.toLowerCase() === 'sim' || resposta?.toLowerCase() === 's';
                
                if (!continuarCadastro && pessoas.length < 2) {
                    console.log('⚠️ Cadastro cancelado. É necessário pelo menos 2 pessoas.');
                    return [];
                }
            }
        } else {
            // Se os dados foram inválidos, perguntar se quer tentar novamente
            const tentarNovamente = prompt('Deseja tentar cadastrar esta pessoa novamente? (sim/não):');
            if (tentarNovamente?.toLowerCase() !== 'sim' && tentarNovamente?.toLowerCase() !== 's') {
                if (pessoas.length < 2) {
                    console.log('⚠️ Cadastro cancelado. É necessário pelo menos 2 pessoas.');
                    return [];
                }
                continuarCadastro = false;
            }
        }
    }
    
    console.log(`\n🎉 Cadastro finalizado! Total de pessoas: ${pessoas.length}`);
    return pessoas;
}

// Função para exibir dados de todas as pessoas
function exibirTodasPessoas(pessoas) {
    console.log('\n=== DADOS DE TODAS AS PESSOAS CADASTRADAS ===');
    
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

// === FUNÇÕES DE COMPARAÇÃO SEPARADAS ===

// Função para comparações de idade
function compararIdades(pessoas) {
    console.log('\n=== 👴👶 COMPARAÇÕES DE IDADE ===');
    
    // Encontrar extremos
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

// Função para comparações de cores preferidas
function compararCoresPreferidas(pessoas) {
    console.log('\n=== 🎨 COMPARAÇÕES DE CORES PREFERIDAS ===');
    
    const coresPorPessoa = {};
    
    pessoas.forEach(pessoa => {
        if (pessoa.corPreferida) {
            if (!coresPorPessoa[pessoa.corPreferida]) {
                coresPorPessoa[pessoa.corPreferida] = [];
            }
            coresPorPessoa[pessoa.corPreferida].push(pessoa.nome);
        }
    });
    
    Object.keys(coresPorPessoa).forEach(cor => {
        const pessoasComEssaCor = coresPorPessoa[cor];
        if (pessoasComEssaCor.length > 1) {
            console.log(`🎨 ${pessoasComEssaCor.join(' e ')} têm a mesma cor preferida: ${cor}`);
        } else {
            console.log(`🎨 ${pessoasComEssaCor[0]} é o(a) único(a) que prefere a cor ${cor}`);
        }
    });
}

// Função para comparações de altura
function compararAlturas(pessoas) {
    console.log('\n=== 📏 COMPARAÇÕES DE ALTURA ===');
    
    const maisAlta = pessoas.reduce((prev, current) => 
        (prev.altura > current.altura) ? prev : current
    );
    
    const maisBaixa = pessoas.reduce((prev, current) => 
        (prev.altura < current.altura) ? prev : current
    );
    
    console.log(`📏 Pessoa mais alta: ${maisAlta.nomeCompleto} com ${maisAlta.altura} cm`);
    console.log(`📏 Pessoa mais baixa: ${maisBaixa.nomeCompleto} com ${maisBaixa.altura} cm`);
    
    // Comparações par a par
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

// Função para comparações de cidades
function compararCidades(pessoas) {
    console.log('\n=== 🏙️ COMPARAÇÕES DE CIDADES ===');
    
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

// Função para comparações de profissões
function compararProfissoes(pessoas) {
    console.log('\n=== 💼 COMPARAÇÕES DE PROFISSÕES ===');
    
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
    console.log('\n=== 📊 ESTATÍSTICAS GERAIS ===');
    
    const idades = pessoas.map(p => p.idade).filter(idade => idade > 0);
    const alturas = pessoas.map(p => p.altura).filter(altura => altura > 0);
    
    if (idades.length > 0) {
        const idadeMedia = idades.reduce((sum, idade) => sum + idade, 0) / idades.length;
        const idadeMin = Math.min(...idades);
        const idadeMax = Math.max(...idades);
        console.log(`📊 Idade média do grupo: ${idadeMedia.toFixed(1)} anos`);
        console.log(`📊 Faixa etária: ${idadeMin} - ${idadeMax} anos`);
    }
    
    if (alturas.length > 0) {
        const alturaMedia = alturas.reduce((sum, altura) => sum + altura, 0) / alturas.length;
        const alturaMin = Math.min(...alturas);
        const alturaMax = Math.max(...alturas);
        console.log(`📊 Altura média do grupo: ${alturaMedia.toFixed(1)} cm`);
        console.log(`📊 Faixa de altura: ${alturaMin} - ${alturaMax} cm`);
    }
    
    console.log(`📊 Total de pessoas cadastradas: ${pessoas.length}`);
    console.log(`📊 Dados processados em: ${new Date().toLocaleString('pt-BR')}`);
}

// Função para executar todas as comparações
function executarTodasComparacoes(pessoas) {
    console.log('\n🔍 INICIANDO ANÁLISES E COMPARAÇÕES...');
    console.log('Aguarde enquanto processamos todos os dados...');
    
    // Chamar todas as funções de comparação
    compararIdades(pessoas);
    compararCoresPreferidas(pessoas);
    compararAlturas(pessoas);
    compararCidades(pessoas);
    compararProfissoes(pessoas);
    gerarEstatisticas(pessoas);
    
    console.log('\n✅ Todas as comparações foram concluídas!');
}

// Função principal do exercício
function iniciarExercicio03() {
    console.clear();
    console.log('🚀 EXERCÍCIO 03 - ESTRUTURAS DE DADOS E OBJETOS');
    console.log('Professor Lucas Fernandes');
    console.log('Modelo de objeto constructor + Quantidade arbitrária\n');
    
    try {
        // Coletar dados de pessoas (quantidade arbitrária)
        const pessoas = coletarTodasPessoas();
        
        if (pessoas.length >= 2) {
            // Exibir dados coletados
            exibirTodasPessoas(pessoas);
            
            // Executar todas as comparações (funções separadas)
            executarTodasComparacoes(pessoas);
            
            console.log('\n🎉 EXERCÍCIO 03 CONCLUÍDO COM SUCESSO!');
            console.log(`✨ ${pessoas.length} pessoas foram cadastradas e analisadas!`);
        } else {
            console.log('❌ Exercício cancelado. É necessário pelo menos 2 pessoas para comparações.');
        }
    } catch (error) {
        console.error('❌ Erro durante a execução:', error.message);
    }
}

// Função de exemplo com dados fictícios
function exemploComDadosFicticios() {
    console.clear();
    console.log('👁️ EXEMPLO COM DADOS FICTÍCIOS\n');
    
    // Criar pessoas usando o construtor
    const pessoasExemplo = [
        new Pessoa('João', 'Silva', 25, 'joao.silva@email.com', 'São Paulo', 'desenvolvedor', 'azul', 175),
        new Pessoa('Maria', 'Santos', 30, 'maria.santos@email.com', 'Rio de Janeiro', 'designer', 'verde', 165),
        new Pessoa('Pedro', 'Oliveira', 25, 'pedro.oliveira@email.com', 'São Paulo', 'desenvolvedor', 'azul', 180),
        new Pessoa('Ana', 'Costa', 28, 'ana.costa@email.com', 'Belo Horizonte', 'professora', 'rosa', 170)
    ];
    
    console.log('🏗️ Objetos criados usando função construtora:');
    pessoasExemplo.forEach((pessoa, index) => {
        console.log(`Pessoa ${index + 1}: new Pessoa('${pessoa.nome}', '${pessoa.sobrenome}', ${pessoa.idade}, '${pessoa.email}', '${pessoa.cidade}', '${pessoa.profissao}', '${pessoa.corPreferida}', ${pessoa.altura})`);
    });
    
    exibirTodasPessoas(pessoasExemplo);
    executarTodasComparacoes(pessoasExemplo);
}

// Executar o exercício
// iniciarExercicio03();

// Para testar com dados fictícios, descomente a linha abaixo:
// exemploComDadosFicticios();