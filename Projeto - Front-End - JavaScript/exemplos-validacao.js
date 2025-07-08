/**
 * EXEMPLOS DE VALIDAÇÃO - PROJETO JAVASCRIPT
 * 
 * Este arquivo contém exemplos práticos de como testar
 * as funcionalidades de validação do formulário.
 * 
 * Para usar: Abra o console do navegador (F12) e execute os exemplos
 */

// ========================================
// EXEMPLOS DE VALIDAÇÃO DE FORMULÁRIO
// ========================================

/**
 * Exemplo 1: Testar validação de email
 */
function exemploValidacaoEmail() {
    console.log('🧪 Testando validação de email...');
    
    const emailsParaTestar = [
        'email@valido.com',      // ✅ Válido
        'usuario@exemplo.com.br', // ✅ Válido
        'test@test.co',          // ✅ Válido
        'email_invalido',        // ❌ Inválido
        '@exemplo.com',          // ❌ Inválido
        'email@',                // ❌ Inválido
        'email.com',             // ❌ Inválido
        '',                      // ❌ Vazio
    ];
    
    emailsParaTestar.forEach(email => {
        const isValid = validators.email(email);
        console.log(`Email: "${email}" - ${isValid ? '✅ Válido' : '❌ Inválido'}`);
    });
}

/**
 * Exemplo 2: Testar validação de nome completo
 */
function exemploValidacaoNome() {
    console.log('🧪 Testando validação de nome completo...');
    
    const nomesParaTestar = [
        'João Silva',            // ✅ Válido
        'Maria Santos Oliveira', // ✅ Válido
        'Ana Paula',             // ✅ Válido
        'João',                  // ❌ Inválido (só um nome)
        'A B',                   // ❌ Inválido (nomes muito curtos)
        '',                      // ❌ Vazio
        '   ',                   // ❌ Só espaços
    ];
    
    nomesParaTestar.forEach(nome => {
        const isValid = validators.fullName(nome);
        console.log(`Nome: "${nome}" - ${isValid ? '✅ Válido' : '❌ Inválido'}`);
    });
}

/**
 * Exemplo 3: Testar validação de telefone
 */
function exemploValidacaoTelefone() {
    console.log('🧪 Testando validação de telefone...');
    
    const telefonesParaTestar = [
        '(11) 99999-9999',       // ✅ Válido
        '11 99999-9999',         // ✅ Válido
        '11999999999',           // ✅ Válido
        '(11) 9999-9999',        // ✅ Válido (8 dígitos)
        '11 9999-9999',          // ✅ Válido
        '',                      // ✅ Válido (campo opcional)
        '123',                   // ❌ Inválido
        'abc',                   // ❌ Inválido
        '(11) 999',              // ❌ Inválido
    ];
    
    telefonesParaTestar.forEach(telefone => {
        const isValid = validators.phone(telefone);
        console.log(`Telefone: "${telefone}" - ${isValid ? '✅ Válido' : '❌ Inválido'}`);
    });
}

/**
 * Exemplo 4: Testar validação de mensagem
 */
function exemploValidacaoMensagem() {
    console.log('🧪 Testando validação de mensagem...');
    
    const mensagensParaTestar = [
        'Esta é uma mensagem válida com mais de 10 caracteres', // ✅ Válido
        'Olá, tudo bem?',        // ✅ Válido
        'Mensagem ok',           // ✅ Válido
        'Curta',                 // ❌ Inválido (menos de 10 chars)
        'Oi',                    // ❌ Inválido
        '',                      // ❌ Vazio
        '   ',                   // ❌ Só espaços
    ];
    
    mensagensParaTestar.forEach(mensagem => {
        const isValid = validators.message(mensagem);
        console.log(`Mensagem: "${mensagem}" - ${isValid ? '✅ Válido' : '❌ Inválido'}`);
    });
}

/**
 * Exemplo 5: Simular preenchimento automático do formulário
 */
function preencherFormularioTeste(dadosValidos = true) {
    console.log(`🤖 Preenchendo formulário com dados ${dadosValidos ? 'válidos' : 'inválidos'}...`);
    
    const dados = dadosValidos ? {
        nome: 'João Silva Santos',
        email: 'joao.silva@exemplo.com',
        telefone: '(11) 99999-9999',
        empresa: 'Empresa Exemplo Ltda',
        assunto: 'freelance',
        mensagem: 'Olá! Gostaria de conversar sobre um projeto interessante que tenho em mente.',
        termos: true
    } : {
        nome: 'João',                    // ❌ Nome incompleto
        email: 'email_invalido',         // ❌ Email inválido
        telefone: '123',                 // ❌ Telefone inválido
        empresa: '',
        assunto: '',                     // ❌ Assunto não selecionado
        mensagem: 'Oi',                  // ❌ Mensagem muito curta
        termos: false                    // ❌ Termos não aceitos
    };
    
    // Preencher campos
    Object.keys(dados).forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            if (elemento.type === 'checkbox') {
                elemento.checked = dados[campo];
            } else {
                elemento.value = dados[campo];
            }
            
            // Disparar evento para ativar validação
            elemento.dispatchEvent(new Event('input', { bubbles: true }));
            elemento.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    
    console.log('✅ Formulário preenchido!');
}

/**
 * Exemplo 6: Testar estado da aplicação
 */
function verificarEstadoAplicacao() {
    console.log('📊 Estado atual da aplicação:');
    console.log('- Dados do formulário:', appState.formData);
    console.log('- Repositórios carregados:', appState.repositories.length);
    console.log('- Está carregando:', appState.isLoading);
    console.log('- Erros:', appState.errors);
    
    // Verificar se elementos existem
    const elementos = {
        'Formulário': document.getElementById('formulario-contato'),
        'Container de projetos': document.getElementById('projetos-container'),
        'Loading': document.getElementById('loading-projetos'),
        'Mensagem de erro': document.getElementById('error-projetos'),
        'Mensagem de sucesso': document.getElementById('mensagem-sucesso')
    };
    
    console.log('🔍 Elementos DOM:');
    Object.keys(elementos).forEach(nome => {
        const existe = elementos[nome] !== null;
        console.log(`- ${nome}: ${existe ? '✅ Encontrado' : '❌ Não encontrado'}`);
    });
}

/**
 * Exemplo 7: Simular erro na API do GitHub
 */
function simularErroGitHub() {
    console.log('🔧 Simulando erro na API do GitHub...');
    
    // Salvar configuração original
    const originalUsername = GITHUB_CONFIG.username;
    
    // Alterar para usuário inexistente
    GITHUB_CONFIG.username = 'usuario_que_nao_existe_12345';
    
    // Tentar carregar projetos
    const githubAPI = new GitHubAPI(GITHUB_CONFIG.username);
    const projectRenderer = new ProjectRenderer('projetos-container');
    
    githubAPI.fetchRepositories()
        .then(repos => {
            console.log('🤔 Inesperado: repositórios encontrados:', repos);
        })
        .catch(error => {
            console.log('✅ Erro capturado corretamente:', error.message);
            projectRenderer.showError('Usuário não encontrado (simulação)');
        })
        .finally(() => {
            // Restaurar configuração original
            GITHUB_CONFIG.username = originalUsername;
            console.log('🔄 Configuração restaurada');
        });
}

/**
 * Exemplo 8: Demonstrar todas as validações
 */
function demonstrarTodasValidacoes() {
    console.log('🎯 DEMONSTRAÇÃO COMPLETA DE VALIDAÇÕES');
    console.log('=====================================');
    
    exemploValidacaoEmail();
    console.log('');
    
    exemploValidacaoNome();
    console.log('');
    
    exemploValidacaoTelefone();
    console.log('');
    
    exemploValidacaoMensagem();
    console.log('');
    
    verificarEstadoAplicacao();
}

/**
 * Exemplo 9: Teste de performance
 */
function testePerformanceValidacao() {
    console.log('⚡ Testando performance das validações...');
    
    const iterations = 10000;
    const testEmail = 'usuario@exemplo.com';
    
    console.time('Validação de Email');
    for (let i = 0; i < iterations; i++) {
        validators.email(testEmail);
    }
    console.timeEnd('Validação de Email');
    
    const testName = 'João Silva Santos';
    console.time('Validação de Nome');
    for (let i = 0; i < iterations; i++) {
        validators.fullName(testName);
    }
    console.timeEnd('Validação de Nome');
    
    console.log(`✅ ${iterations} validações executadas`);
}

/**
 * Exemplo 10: Utilitários para debugging
 */
const debugUtils = {
    // Limpar todos os estados de validação
    limparValidacoes() {
        const campos = document.querySelectorAll('.form-control, .form-select, .form-check-input');
        campos.forEach(campo => {
            campo.classList.remove('is-valid', 'is-invalid');
        });
        
        const feedbacks = document.querySelectorAll('.invalid-feedback');
        feedbacks.forEach(feedback => {
            feedback.style.display = 'none';
        });
        
        console.log('🧹 Estados de validação limpos');
    },
    
    // Mostrar todos os validadores disponíveis
    listarValidadores() {
        console.log('📋 Validadores disponíveis:');
        Object.keys(validators).forEach(validator => {
            console.log(`- ${validator}`);
        });
    },
    
    // Contar repositórios por linguagem
    analisarRepositorios() {
        if (appState.repositories.length === 0) {
            console.log('❌ Nenhum repositório carregado');
            return;
        }
        
        const linguagens = {};
        appState.repositories.forEach(repo => {
            const lang = repo.language || 'Não especificado';
            linguagens[lang] = (linguagens[lang] || 0) + 1;
        });
        
        console.log('📊 Repositórios por linguagem:');
        Object.keys(linguagens)
            .sort((a, b) => linguagens[b] - linguagens[a])
            .forEach(lang => {
                console.log(`- ${lang}: ${linguagens[lang]}`);
            });
    }
};

// ========================================
// INSTRUÇÕES DE USO
// ========================================

console.log('🎓 EXEMPLOS DE VALIDAÇÃO CARREGADOS!');
console.log('=====================================');
console.log('Para testar as funcionalidades, execute no console:');
console.log('');
console.log('📧 exemploValidacaoEmail()           - Testa validação de emails');
console.log('👤 exemploValidacaoNome()            - Testa validação de nomes');
console.log('📱 exemploValidacaoTelefone()         - Testa validação de telefones');
console.log('💬 exemploValidacaoMensagem()         - Testa validação de mensagens');
console.log('🤖 preencherFormularioTeste(true)    - Preenche com dados válidos');
console.log('🤖 preencherFormularioTeste(false)   - Preenche com dados inválidos');
console.log('📊 verificarEstadoAplicacao()        - Mostra estado da aplicação');
console.log('🔧 simularErroGitHub()               - Simula erro na API');
console.log('🎯 demonstrarTodasValidacoes()       - Executa todos os testes');
console.log('⚡ testePerformanceValidacao()       - Testa performance');
console.log('');
console.log('🛠️  Utilitários de debug:');
console.log('🧹 debugUtils.limparValidacoes()     - Limpa estados de validação');
console.log('📋 debugUtils.listarValidadores()    - Lista validadores disponíveis');
console.log('📊 debugUtils.analisarRepositorios() - Analisa repositórios carregados');
console.log('');
console.log('💡 Dica: Abra as ferramentas de desenvolvedor (F12) para ver os resultados!');

// Exportar para uso global
window.exemploValidacaoEmail = exemploValidacaoEmail;
window.exemploValidacaoNome = exemploValidacaoNome;
window.exemploValidacaoTelefone = exemploValidacaoTelefone;
window.exemploValidacaoMensagem = exemploValidacaoMensagem;
window.preencherFormularioTeste = preencherFormularioTeste;
window.verificarEstadoAplicacao = verificarEstadoAplicacao;
window.simularErroGitHub = simularErroGitHub;
window.demonstrarTodasValidacoes = demonstrarTodasValidacoes;
window.testePerformanceValidacao = testePerformanceValidacao;
window.debugUtils = debugUtils;