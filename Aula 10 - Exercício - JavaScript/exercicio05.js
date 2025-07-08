// Exercício 05 - JavaScript
// Aula 10 - Exercício - JavaScript
// Formulários HTML - Substituindo prompt por interface web

// Array para armazenar todas as pessoas cadastradas
let pessoasCadastradas = [];
let contadorPessoas = 0;

// Função construtora para criar objetos Pessoa
function Pessoa(nome, sobrenome, idade, email, cidade, profissao, corPreferida, altura) {
    this.id = ++contadorPessoas;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.nomeCompleto = `${nome} ${sobrenome}`;
    this.idade = parseInt(idade) || 0;
    this.email = email;
    this.cidade = cidade;
    this.profissao = profissao;
    this.corPreferida = corPreferida?.toLowerCase();
    this.altura = parseInt(altura) || 0;
    
    // Método para validar dados obrigatórios
    this.isValida = function() {
        return this.nome && this.sobrenome && this.idade > 0;
    };
}

// === FUNÇÕES DE MANIPULAÇÃO DO DOM ===

// Função para inicializar a aplicação
function inicializarAplicacao() {
    console.log('🚀 Inicializando Exercício 05 - Formulários HTML');
    
    // Configurar event listener para o formulário
    const formulario = document.getElementById('formulario-pessoa');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir recarregamento da página
            adicionarPessoa();
        });
    }
    
    // Configurar botão de limpar
    const botaoLimpar = document.getElementById('btn-limpar');
    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', limparTudo);
    }
    
    // Configurar botão de exemplo
    const botaoExemplo = document.getElementById('btn-exemplo');
    if (botaoExemplo) {
        botaoExemplo.addEventListener('click', carregarExemplo);
    }
    
    atualizarInterface();
}

// Função para adicionar uma nova pessoa
function adicionarPessoa() {
    console.log('📝 Adicionando nova pessoa...');
    
    // Obter dados do formulário
    const nome = document.getElementById('input-nome').value.trim();
    const sobrenome = document.getElementById('input-sobrenome').value.trim();
    const idade = document.getElementById('input-idade').value;
    const email = document.getElementById('input-email').value.trim();
    const cidade = document.getElementById('input-cidade').value.trim();
    const profissao = document.getElementById('input-profissao').value.trim();
    const corPreferida = document.getElementById('input-cor').value.trim();
    const altura = document.getElementById('input-altura').value;
    
    // Validar dados obrigatórios
    if (!nome || !sobrenome || !idade) {
        exibirMensagem('❌ Nome, sobrenome e idade são obrigatórios!', 'error');
        return;
    }
    
    // Criar nova pessoa
    const novaPessoa = new Pessoa(nome, sobrenome, idade, email, cidade, profissao, corPreferida, altura);
    
    if (novaPessoa.isValida()) {
        pessoasCadastradas.push(novaPessoa);
        console.log('✅ Pessoa adicionada:', novaPessoa);
        
        // Limpar formulário
        document.getElementById('formulario-pessoa').reset();
        
        // Atualizar interface
        atualizarInterface();
        
        exibirMensagem(`✅ ${novaPessoa.nomeCompleto} foi adicionado(a) com sucesso!`, 'success');
    } else {
        exibirMensagem('❌ Dados inválidos. Verifique os campos obrigatórios.', 'error');
    }
}

// Função para atualizar toda a interface
function atualizarInterface() {
    atualizarListaPessoas();
    atualizarComparacoes();
    atualizarEstatisticas();
}

// Função para exibir lista de pessoas cadastradas
function atualizarListaPessoas() {
    const container = document.getElementById('lista-pessoas');
    if (!container) return;
    
    if (pessoasCadastradas.length === 0) {
        container.innerHTML = '<p class="text-muted">Nenhuma pessoa cadastrada ainda.</p>';
        return;
    }
    
    let html = '<h4>👥 Pessoas Cadastradas</h4>';
    html += '<div class="row">';
    
    pessoasCadastradas.forEach((pessoa, index) => {
        html += `
            <div class="col-md-6 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">${pessoa.nomeCompleto}</h6>
                        <p class="card-text small">
                            <strong>Idade:</strong> ${pessoa.idade} anos<br>
                            <strong>Email:</strong> ${pessoa.email || 'Não informado'}<br>
                            <strong>Cidade:</strong> ${pessoa.cidade || 'Não informada'}<br>
                            <strong>Profissão:</strong> ${pessoa.profissao || 'Não informada'}<br>
                            <strong>Cor Preferida:</strong> ${pessoa.corPreferida || 'Não informada'}<br>
                            <strong>Altura:</strong> ${pessoa.altura || 'Não informada'} cm
                        </p>
                        <button class="btn btn-sm btn-outline-danger" onclick="removerPessoa(${index})">
                            🗑️ Remover
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Função para atualizar comparações
function atualizarComparacoes() {
    const container = document.getElementById('comparacoes');
    if (!container) return;
    
    if (pessoasCadastradas.length < 2) {
        container.innerHTML = '<p class="text-muted">É necessário pelo menos 2 pessoas para fazer comparações.</p>';
        return;
    }
    
    let html = '<h4>🔍 Comparações e Análises</h4>';
    
    // Comparações de idade
    html += gerarComparacoesIdade();
    
    // Comparações de cores
    html += gerarComparacoesCores();
    
    // Comparações de altura
    html += gerarComparacoesAltura();
    
    // Comparações de cidades
    html += gerarComparacoesCidades();
    
    // Comparações de profissões
    html += gerarComparacoesProfissoes();
    
    container.innerHTML = html;
}

// Função para gerar comparações de idade
function gerarComparacoesIdade() {
    const maisVelha = pessoasCadastradas.reduce((prev, current) => 
        (prev.idade > current.idade) ? prev : current
    );
    
    const maisNova = pessoasCadastradas.reduce((prev, current) => 
        (prev.idade < current.idade) ? prev : current
    );
    
    let html = `
        <div class="card mb-3">
            <div class="card-header bg-primary text-white">
                <h6 class="mb-0">👴👶 Comparações de Idade</h6>
            </div>
            <div class="card-body">
                <p><strong>👴 Mais velha:</strong> ${maisVelha.nomeCompleto} com ${maisVelha.idade} anos</p>
                <p><strong>👶 Mais nova:</strong> ${maisNova.nomeCompleto} com ${maisNova.idade} anos</p>
                <hr>
                <h6>Comparações detalhadas:</h6>
                <ul class="list-unstyled">
    `;
    
    for (let i = 0; i < pessoasCadastradas.length; i++) {
        for (let j = i + 1; j < pessoasCadastradas.length; j++) {
            const pessoa1 = pessoasCadastradas[i];
            const pessoa2 = pessoasCadastradas[j];
            
            if (pessoa1.idade > pessoa2.idade) {
                html += `<li>📊 ${pessoa1.nome} é mais velho(a) que ${pessoa2.nome} (${pessoa1.idade} vs ${pessoa2.idade} anos)</li>`;
            } else if (pessoa1.idade < pessoa2.idade) {
                html += `<li>📊 ${pessoa2.nome} é mais velho(a) que ${pessoa1.nome} (${pessoa2.idade} vs ${pessoa1.idade} anos)</li>`;
            } else {
                html += `<li>📊 ${pessoa1.nome} e ${pessoa2.nome} têm a mesma idade (${pessoa1.idade} anos)</li>`;
            }
        }
    }
    
    html += '</ul></div></div>';
    return html;
}

// Função para gerar comparações de cores
function gerarComparacoesCores() {
    const coresPorPessoa = {};
    
    pessoasCadastradas.forEach(pessoa => {
        if (pessoa.corPreferida) {
            if (!coresPorPessoa[pessoa.corPreferida]) {
                coresPorPessoa[pessoa.corPreferida] = [];
            }
            coresPorPessoa[pessoa.corPreferida].push(pessoa.nome);
        }
    });
    
    let html = `
        <div class="card mb-3">
            <div class="card-header bg-success text-white">
                <h6 class="mb-0">🎨 Comparações de Cores Preferidas</h6>
            </div>
            <div class="card-body">
                <ul class="list-unstyled">
    `;
    
    Object.keys(coresPorPessoa).forEach(cor => {
        const pessoasComEssaCor = coresPorPessoa[cor];
        if (pessoasComEssaCor.length > 1) {
            html += `<li>🎨 ${pessoasComEssaCor.join(' e ')} têm a mesma cor preferida: <strong>${cor}</strong></li>`;
        } else {
            html += `<li>🎨 ${pessoasComEssaCor[0]} é o(a) único(a) que prefere a cor <strong>${cor}</strong></li>`;
        }
    });
    
    html += '</ul></div></div>';
    return html;
}

// Função para gerar comparações de altura
function gerarComparacoesAltura() {
    const pessoasComAltura = pessoasCadastradas.filter(p => p.altura > 0);
    
    if (pessoasComAltura.length < 2) {
        return `
            <div class="card mb-3">
                <div class="card-header bg-warning text-dark">
                    <h6 class="mb-0">📏 Comparações de Altura</h6>
                </div>
                <div class="card-body">
                    <p class="text-muted">Dados de altura insuficientes para comparação.</p>
                </div>
            </div>
        `;
    }
    
    const maisAlta = pessoasComAltura.reduce((prev, current) => 
        (prev.altura > current.altura) ? prev : current
    );
    
    const maisBaixa = pessoasComAltura.reduce((prev, current) => 
        (prev.altura < current.altura) ? prev : current
    );
    
    let html = `
        <div class="card mb-3">
            <div class="card-header bg-warning text-dark">
                <h6 class="mb-0">📏 Comparações de Altura</h6>
            </div>
            <div class="card-body">
                <p><strong>📏 Mais alta:</strong> ${maisAlta.nomeCompleto} com ${maisAlta.altura} cm</p>
                <p><strong>📏 Mais baixa:</strong> ${maisBaixa.nomeCompleto} com ${maisBaixa.altura} cm</p>
                <hr>
                <h6>Comparações detalhadas:</h6>
                <ul class="list-unstyled">
    `;
    
    for (let i = 0; i < pessoasComAltura.length; i++) {
        for (let j = i + 1; j < pessoasComAltura.length; j++) {
            const pessoa1 = pessoasComAltura[i];
            const pessoa2 = pessoasComAltura[j];
            const diferenca = Math.abs(pessoa1.altura - pessoa2.altura);
            
            if (pessoa1.altura > pessoa2.altura) {
                html += `<li>📏 ${pessoa1.nome} é ${diferenca} cm mais alto(a) que ${pessoa2.nome}</li>`;
            } else if (pessoa1.altura < pessoa2.altura) {
                html += `<li>📏 ${pessoa2.nome} é ${diferenca} cm mais alto(a) que ${pessoa1.nome}</li>`;
            } else {
                html += `<li>📏 ${pessoa1.nome} e ${pessoa2.nome} têm a mesma altura (${pessoa1.altura} cm)</li>`;
            }
        }
    }
    
    html += '</ul></div></div>';
    return html;
}

// Função para gerar comparações de cidades
function gerarComparacoesCidades() {
    const cidadesPorPessoa = {};
    
    pessoasCadastradas.forEach(pessoa => {
        if (pessoa.cidade) {
            const cidadeLower = pessoa.cidade.toLowerCase();
            if (!cidadesPorPessoa[cidadeLower]) {
                cidadesPorPessoa[cidadeLower] = [];
            }
            cidadesPorPessoa[cidadeLower].push(pessoa.nome);
        }
    });
    
    let html = `
        <div class="card mb-3">
            <div class="card-header bg-info text-white">
                <h6 class="mb-0">🏙️ Comparações de Cidades</h6>
            </div>
            <div class="card-body">
                <ul class="list-unstyled">
    `;
    
    Object.keys(cidadesPorPessoa).forEach(cidade => {
        const pessoasDessaCidade = cidadesPorPessoa[cidade];
        if (pessoasDessaCidade.length > 1) {
            html += `<li>🏙️ ${pessoasDessaCidade.join(' e ')} moram na mesma cidade: <strong>${cidade}</strong></li>`;
        } else {
            html += `<li>🏙️ ${pessoasDessaCidade[0]} mora em <strong>${cidade}</strong></li>`;
        }
    });
    
    html += '</ul></div></div>';
    return html;
}

// Função para gerar comparações de profissões
function gerarComparacoesProfissoes() {
    const profissoesPorPessoa = {};
    
    pessoasCadastradas.forEach(pessoa => {
        if (pessoa.profissao) {
            const profissaoLower = pessoa.profissao.toLowerCase();
            if (!profissoesPorPessoa[profissaoLower]) {
                profissoesPorPessoa[profissaoLower] = [];
            }
            profissoesPorPessoa[profissaoLower].push(pessoa.nome);
        }
    });
    
    let html = `
        <div class="card mb-3">
            <div class="card-header bg-secondary text-white">
                <h6 class="mb-0">💼 Comparações de Profissões</h6>
            </div>
            <div class="card-body">
                <ul class="list-unstyled">
    `;
    
    Object.keys(profissoesPorPessoa).forEach(profissao => {
        const pessoasComEssaProfissao = profissoesPorPessoa[profissao];
        if (pessoasComEssaProfissao.length > 1) {
            html += `<li>💼 ${pessoasComEssaProfissao.join(' e ')} têm a mesma profissão: <strong>${profissao}</strong></li>`;
        } else {
            html += `<li>💼 ${pessoasComEssaProfissao[0]} trabalha como <strong>${profissao}</strong></li>`;
        }
    });
    
    html += '</ul></div></div>';
    return html;
}

// Função para atualizar estatísticas gerais
function atualizarEstatisticas() {
    const container = document.getElementById('estatisticas');
    if (!container) return;
    
    if (pessoasCadastradas.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const totalPessoas = pessoasCadastradas.length;
    const idadeMedia = pessoasCadastradas.reduce((sum, p) => sum + p.idade, 0) / totalPessoas;
    const alturaMedia = pessoasCadastradas.filter(p => p.altura > 0).reduce((sum, p) => sum + p.altura, 0) / pessoasCadastradas.filter(p => p.altura > 0).length || 0;
    
    let html = `
        <div class="card">
            <div class="card-header bg-dark text-white">
                <h6 class="mb-0">📊 Estatísticas Gerais</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="text-center">
                            <h4 class="text-primary">${totalPessoas}</h4>
                            <small>Pessoas Cadastradas</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h4 class="text-success">${idadeMedia.toFixed(1)}</h4>
                            <small>Idade Média</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h4 class="text-warning">${alturaMedia.toFixed(0)}</h4>
                            <small>Altura Média (cm)</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center">
                            <h4 class="text-info">${new Set(pessoasCadastradas.map(p => p.cidade?.toLowerCase())).size}</h4>
                            <small>Cidades Diferentes</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// === FUNÇÕES AUXILIARES ===

// Função para remover uma pessoa
function removerPessoa(index) {
    if (index >= 0 && index < pessoasCadastradas.length) {
        const pessoaRemovida = pessoasCadastradas.splice(index, 1)[0];
        console.log('🗑️ Pessoa removida:', pessoaRemovida);
        
        atualizarInterface();
        exibirMensagem(`🗑️ ${pessoaRemovida.nomeCompleto} foi removido(a).`, 'info');
    }
}

// Função para limpar tudo
function limparTudo() {
    if (pessoasCadastradas.length === 0) {
        exibirMensagem('ℹ️ Não há dados para limpar.', 'info');
        return;
    }
    
    if (confirm('Tem certeza que deseja remover todas as pessoas cadastradas?')) {
        pessoasCadastradas = [];
        contadorPessoas = 0;
        
        atualizarInterface();
        exibirMensagem('🧹 Todos os dados foram removidos.', 'info');
        
        console.log('🧹 Dados limpos');
    }
}

// Função para carregar exemplo com dados fictícios
function carregarExemplo() {
    const exemplos = [
        new Pessoa('João', 'Silva', 25, 'joao.silva@email.com', 'São Paulo', 'Desenvolvedor', 'azul', 175),
        new Pessoa('Maria', 'Santos', 30, 'maria.santos@email.com', 'Rio de Janeiro', 'Designer', 'verde', 165),
        new Pessoa('Pedro', 'Oliveira', 25, 'pedro.oliveira@email.com', 'São Paulo', 'Desenvolvedor', 'azul', 180),
        new Pessoa('Ana', 'Costa', 28, 'ana.costa@email.com', 'Belo Horizonte', 'Professora', 'rosa', 170)
    ];
    
    pessoasCadastradas = [...exemplos];
    contadorPessoas = exemplos.length;
    
    atualizarInterface();
    exibirMensagem('📋 Dados de exemplo carregados com sucesso!', 'success');
    
    console.log('📋 Exemplo carregado:', pessoasCadastradas);
}

// Função para exibir mensagens para o usuário
function exibirMensagem(mensagem, tipo = 'info') {
    const container = document.getElementById('mensagens');
    if (!container) return;
    
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    }[tipo] || 'alert-info';
    
    const alertHtml = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    container.innerHTML = alertHtml;
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        const alert = container.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

// === INICIALIZAÇÃO ===

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM carregado - Inicializando aplicação...');
    inicializarAplicacao();
});

// Função para demonstração no console (opcional)
function demonstrarFuncionalidades() {
    console.clear();
    console.log('🎭 EXERCÍCIO 05 - FORMULÁRIOS HTML');
    console.log('Substituindo prompt por interface web\n');
    
    console.log('📚 Funcionalidades implementadas:');
    console.log('• Formulário HTML para entrada de dados');
    console.log('• Validação de campos obrigatórios');
    console.log('• Exibição de pessoas cadastradas');
    console.log('• Comparações dinâmicas (idade, cores, altura, cidades, profissões)');
    console.log('• Estatísticas gerais');
    console.log('• Remoção individual de pessoas');
    console.log('• Limpeza geral de dados');
    console.log('• Carregamento de dados de exemplo');
    console.log('• Interface responsiva e moderna\n');
    
    console.log('🎯 Preencha o formulário e veja as comparações atualizarem automaticamente!');
    console.log('💡 Dica: Use o botão "Carregar Exemplo" para testar rapidamente');
}

// Executar demonstração
// demonstrarFuncionalidades();