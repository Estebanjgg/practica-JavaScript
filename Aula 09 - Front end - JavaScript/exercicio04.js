// Exercício 04 - JavaScript
// Aula 09 - Front end - JavaScript
// Eventos - Interação com o usuário

// === EVENTOS POR ATRIBUTOS HTML ===

// Função para evento de clique simples
function eventoClick() {
    console.log('🖱️ Evento CLICK disparado!');
    alert('Botão clicado! Verifique o console para mais detalhes.');
    
    // Adicionar informação visual
    const resultado = document.getElementById('resultado-click');
    resultado.innerHTML = '✅ Clique registrado às ' + new Date().toLocaleTimeString();
    resultado.style.color = '#28a745';
}

// Função para evento de duplo clique
function eventoDuploClick() {
    console.log('🖱️ Evento DOUBLE CLICK disparado!');
    
    const resultado = document.getElementById('resultado-dblclick');
    resultado.innerHTML = '🎯 Duplo clique detectado!';
    resultado.style.color = '#007bff';
    resultado.style.fontWeight = 'bold';
}

// Função para evento de mudança (change)
function eventoMudanca(elemento) {
    console.log('🔄 Evento CHANGE disparado!');
    console.log('Valor selecionado:', elemento.value);
    
    const resultado = document.getElementById('resultado-change');
    resultado.innerHTML = `📝 Opção selecionada: ${elemento.value}`;
    resultado.style.color = '#6f42c1';
}

// Função para evento de foco
function eventoFoco(elemento) {
    console.log('🎯 Evento FOCUS disparado!');
    console.log('Campo focado:', elemento.placeholder);
    
    elemento.style.backgroundColor = '#e3f2fd';
    elemento.style.borderColor = '#2196f3';
    
    const resultado = document.getElementById('resultado-focus');
    resultado.innerHTML = '🎯 Campo em foco: ' + elemento.placeholder;
    resultado.style.color = '#2196f3';
}

// Função para evento de perda de foco
function eventoBlur(elemento) {
    console.log('👋 Evento BLUR disparado!');
    
    elemento.style.backgroundColor = '';
    elemento.style.borderColor = '';
    
    const resultado = document.getElementById('resultado-focus');
    resultado.innerHTML = '👋 Campo perdeu o foco';
    resultado.style.color = '#666';
}

// Função para evento de tecla pressionada
function eventoKeyUp(elemento, event) {
    console.log('⌨️ Evento KEYUP disparado!');
    console.log('Tecla pressionada:', event.key);
    console.log('Valor atual:', elemento.value);
    
    const resultado = document.getElementById('resultado-keyup');
    resultado.innerHTML = `⌨️ Última tecla: "${event.key}" | Texto: "${elemento.value}"`;
    resultado.style.color = '#fd7e14';
    
    // Contador de caracteres
    const contador = document.getElementById('contador-chars');
    contador.innerHTML = `Caracteres digitados: ${elemento.value.length}`;
}

// === EVENT LISTENERS ===

// Função para inicializar event listeners
function inicializarEventListeners() {
    console.log('🚀 Inicializando Event Listeners...');
    
    // Event listener para botão com addEventListener
    const botaoListener = document.getElementById('botao-listener');
    if (botaoListener) {
        botaoListener.addEventListener('click', function(event) {
            console.log('🎧 Event Listener CLICK ativado!');
            console.log('Target:', event.target);
            console.log('Tipo do evento:', event.type);
            
            const resultado = document.getElementById('resultado-listener');
            resultado.innerHTML = '🎧 Event Listener executado com sucesso!';
            resultado.style.color = '#dc3545';
            
            // Animação visual
            event.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Event listener para hover (mouseenter e mouseleave)
    const areaHover = document.getElementById('area-hover');
    if (areaHover) {
        areaHover.addEventListener('mouseenter', function(event) {
            console.log('🖱️ Mouse ENTER na área!');
            event.target.style.backgroundColor = '#f8f9fa';
            event.target.style.borderColor = '#28a745';
            
            const resultado = document.getElementById('resultado-hover');
            resultado.innerHTML = '🖱️ Mouse sobre a área!';
            resultado.style.color = '#28a745';
        });
        
        areaHover.addEventListener('mouseleave', function(event) {
            console.log('🖱️ Mouse LEAVE da área!');
            event.target.style.backgroundColor = '';
            event.target.style.borderColor = '#dee2e6';
            
            const resultado = document.getElementById('resultado-hover');
            resultado.innerHTML = '👋 Mouse saiu da área';
            resultado.style.color = '#6c757d';
        });
    }
    
    // Event listener para formulário
    const formulario = document.getElementById('formulario-exemplo');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir envio padrão
            console.log('📋 Evento SUBMIT do formulário!');
            
            const nome = document.getElementById('input-nome').value;
            const email = document.getElementById('input-email').value;
            
            const resultado = document.getElementById('resultado-form');
            resultado.innerHTML = `📋 Formulário enviado!<br>Nome: ${nome}<br>Email: ${email}`;
            resultado.style.color = '#17a2b8';
            
            console.log('Dados do formulário:', { nome, email });
        });
    }
    
    // Event listener para teclas especiais
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            console.log('🚪 Tecla ESC pressionada!');
            limparResultados();
        }
        
        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            console.log('🧹 Atalho Ctrl+L - Limpando console!');
            console.clear();
        }
    });
    
    console.log('✅ Event Listeners inicializados com sucesso!');
}

// === FUNÇÕES AUXILIARES ===

// Função para limpar todos os resultados
function limparResultados() {
    console.log('🧹 Limpando todos os resultados...');
    
    const elementos = [
        'resultado-click',
        'resultado-dblclick', 
        'resultado-change',
        'resultado-focus',
        'resultado-keyup',
        'resultado-listener',
        'resultado-hover',
        'resultado-form',
        'contador-chars'
    ];
    
    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.innerHTML = '';
            elemento.style.color = '';
        }
    });
    
    // Limpar campos de input
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    inputs.forEach(input => {
        input.value = '';
        input.style.backgroundColor = '';
        input.style.borderColor = '';
    });
    
    // Reset select
    const select = document.getElementById('select-opcoes');
    if (select) {
        select.selectedIndex = 0;
    }
    
    console.log('✅ Resultados limpos!');
}

// Função para demonstrar diferentes tipos de eventos
function demonstrarEventos() {
    console.clear();
    console.log('🎭 DEMONSTRAÇÃO DE EVENTOS JAVASCRIPT');
    
    
    console.log('📚 Tipos de eventos implementados:');
    console.log('• click - Clique simples');
    console.log('• dblclick - Duplo clique');
    console.log('• change - Mudança de valor');
    console.log('• focus/blur - Foco e perda de foco');
    console.log('• keyup - Tecla liberada');
    console.log('• mouseenter/mouseleave - Hover');
    console.log('• submit - Envio de formulário');
    console.log('• keydown - Teclas especiais (ESC, Ctrl+L)\n');
    
    console.log('🎯 Interaja com os elementos da página para ver os eventos em ação!');
    console.log('💡 Dica: Pressione ESC para limpar resultados ou Ctrl+L para limpar console');
}

// === INICIALIZAÇÃO ===

// Aguardar carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado completamente!');
    inicializarEventListeners();
    demonstrarEventos();
});

// Função para executar exemplo
function executarExemplo() {
    demonstrarEventos();
    
    // Simular alguns eventos programaticamente
    setTimeout(() => {
        console.log('\n🤖 Simulando eventos programaticamente...');
        
        // Simular clique
        const botao = document.getElementById('botao-click');
        if (botao) {
            botao.click();
        }
        
        // Simular mudança no select
        setTimeout(() => {
            const select = document.getElementById('select-opcoes');
            if (select) {
                select.selectedIndex = 2;
                select.dispatchEvent(new Event('change'));
            }
        }, 1000);
        
        // Simular digitação
        setTimeout(() => {
            const input = document.getElementById('input-texto');
            if (input) {
                input.focus();
                input.value = 'Exemplo de texto';
                input.dispatchEvent(new KeyboardEvent('keyup', { key: 'o' }));
            }
        }, 2000);
        
    }, 500);
}