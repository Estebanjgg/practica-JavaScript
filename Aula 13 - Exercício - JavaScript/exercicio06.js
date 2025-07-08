// Exercício 06 - JavaScript
// Aula 13 - Exercício - JavaScript
// Consultar API pública - Pokémon API

// === VARIÁVEIS GLOBAIS ===
let pokemonAtual = null;
let historicoPesquisas = [];
let favoritos = [];
let pokemonSugeridos = [];
let timeoutAutoComplete = null;

// Lista de Pokémon populares para autocompletado rápido
const pokemonPopulares = [
    'pikachu', 'charizard', 'blastoise', 'venusaur', 'alakazam', 'machamp',
    'gengar', 'dragonite', 'mewtwo', 'mew', 'typhlosion', 'feraligatr',
    'meganium', 'espeon', 'umbreon', 'lugia', 'ho-oh', 'celebi',
    'blaziken', 'swampert', 'sceptile', 'gardevoir', 'aggron', 'rayquaza',
    'kyogre', 'groudon', 'dialga', 'palkia', 'giratina', 'arceus',
    'lucario', 'garchomp', 'rotom', 'darkrai', 'reshiram', 'zekrom',
    'kyurem', 'greninja', 'talonflame', 'sylveon', 'goodra', 'noivern',
    'decidueye', 'incineroar', 'primarina', 'lycanroc', 'mimikyu', 'toxapex',
    'corviknight', 'dragapult', 'grimmsnarl', 'toxapex', 'ferrothorn'
];

// === INICIALIZAÇÃO ===
function inicializarAplicacao() {
    console.log('🚀 Inicializando Exercício 06 - API Pokémon');
    
    // Configurar event listener para o formulário
    const formulario = document.getElementById('formulario-pokemon');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            buscarPokemon();
        });
    }
    
    // Configurar autocompletado
    const inputPokemon = document.getElementById('input-pokemon');
    if (inputPokemon) {
        inputPokemon.addEventListener('input', handleAutoComplete);
        inputPokemon.addEventListener('keydown', handleKeyNavigation);
        inputPokemon.addEventListener('blur', function() {
            // Delay para permitir clique nas sugestões
            setTimeout(() => ocultarSugestoes(), 200);
        });
        
        inputPokemon.addEventListener('focus', function() {
            const termo = this.value.trim().toLowerCase();
            if (termo.length >= 2) {
                buscarSugestoes(termo);
            }
        });
    }
    
    // Configurar botão de busca aleatória
    const botaoAleatorio = document.getElementById('btn-aleatorio');
    if (botaoAleatorio) {
        botaoAleatorio.addEventListener('click', buscarPokemonAleatorio);
    }
    
    // Configurar botão de limpar
    const botaoLimpar = document.getElementById('btn-limpar');
    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', limparResultados);
    }
    
    // Carregar favoritos do localStorage
    carregarFavoritos();
    
    // Atualizar interface inicial
    atualizarInterface();
    
    demonstrarFuncionalidades();
}

// === FUNÇÕES DE AUTOCOMPLETADO ===

// Função para lidar com autocompletado
function handleAutoComplete(event) {
    const termo = event.target.value.trim().toLowerCase();
    
    // Limpar timeout anterior
    if (timeoutAutoComplete) {
        clearTimeout(timeoutAutoComplete);
    }
    
    if (termo.length < 2) {
        ocultarSugestoes();
        return;
    }
    
    // Delay para evitar muitas requisições
    timeoutAutoComplete = setTimeout(() => {
        buscarSugestoes(termo);
    }, 300);
}

// Função para buscar sugestões
function buscarSugestoes(termo) {
    // Filtrar Pokémon populares primeiro
    const sugestoesLocais = pokemonPopulares.filter(pokemon => 
        pokemon.toLowerCase().includes(termo)
    ).slice(0, 8);
    
    // Adicionar do histórico
    const sugestoesHistorico = historicoPesquisas
        .filter(p => p.nome.toLowerCase().includes(termo))
        .map(p => p.nome)
        .slice(0, 3);
    
    // Combinar e remover duplicatas
    const todasSugestoes = [...new Set([...sugestoesLocais, ...sugestoesHistorico])];
    
    if (todasSugestoes.length > 0) {
        exibirSugestoes(todasSugestoes.slice(0, 8));
    } else {
        // Se não há sugestões locais, buscar na API
        buscarSugestoesAPI(termo);
    }
}

// Função para buscar sugestões na API (para casos específicos)
async function buscarSugestoesAPI(termo) {
    try {
        // Buscar lista de Pokémon da API (limitado)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        const data = await response.json();
        
        const sugestoes = data.results
            .filter(pokemon => pokemon.name.includes(termo))
            .map(pokemon => pokemon.name)
            .slice(0, 6);
        
        if (sugestoes.length > 0) {
            exibirSugestoes(sugestoes);
        } else {
            ocultarSugestoes();
        }
    } catch (error) {
        console.log('Erro ao buscar sugestões da API:', error);
        ocultarSugestoes();
    }
}

// Função para exibir sugestões
function exibirSugestoes(sugestoes) {
    let container = document.getElementById('sugestoes-container');
    
    if (!container) {
        container = criarContainerSugestoes();
    }
    
    if (sugestoes.length === 0) {
        ocultarSugestoes();
        return;
    }
    
    const html = sugestoes.map((sugestao, index) => `
        <div class="sugestao-item" data-index="${index}" onclick="selecionarSugestao('${sugestao}')">
            <i class="fas fa-search me-2 text-muted"></i>
            <span class="text-capitalize">${sugestao}</span>
            ${historicoPesquisas.some(p => p.nome === sugestao) ? '<i class="fas fa-history ms-auto text-info"></i>' : ''}
            ${favoritos.some(f => f.nome === sugestao) ? '<i class="fas fa-heart ms-1 text-danger"></i>' : ''}
        </div>
    `).join('');
    
    container.innerHTML = html;
    container.style.display = 'block';
    
    pokemonSugeridos = sugestoes;
}

// Função para criar container de sugestões
function criarContainerSugestoes() {
    const inputGroup = document.querySelector('.input-group');
    const container = document.createElement('div');
    
    container.id = 'sugestoes-container';
    container.className = 'sugestoes-dropdown';
    container.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e2e8f0;
        border-top: none;
        border-radius: 0 0 0.75rem 0.75rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
        display: none;
    `;
    
    inputGroup.style.position = 'relative';
    inputGroup.appendChild(container);
    
    return container;
}

// Função para ocultar sugestões
function ocultarSugestoes() {
    const container = document.getElementById('sugestoes-container');
    if (container) {
        container.style.display = 'none';
    }
    pokemonSugeridos = [];
    indiceSelecionado = -1;
}

// Função para selecionar sugestão
function selecionarSugestao(pokemon) {
    const input = document.getElementById('input-pokemon');
    if (input) {
        input.value = pokemon;
        ocultarSugestoes();
        input.focus();
        
        // Buscar automaticamente
        buscarPokemon();
    }
}

// Função para navegação com teclado
let indiceSelecionado = -1;

function handleKeyNavigation(event) {
    const container = document.getElementById('sugestoes-container');
    
    if (!container || container.style.display === 'none') {
        return;
    }
    
    const itens = container.querySelectorAll('.sugestao-item');
    
    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            indiceSelecionado = Math.min(indiceSelecionado + 1, itens.length - 1);
            atualizarSelecaoVisual(itens);
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            indiceSelecionado = Math.max(indiceSelecionado - 1, -1);
            atualizarSelecaoVisual(itens);
            break;
            
        case 'Enter':
            if (indiceSelecionado >= 0 && indiceSelecionado < pokemonSugeridos.length) {
                event.preventDefault();
                selecionarSugestao(pokemonSugeridos[indiceSelecionado]);
            }
            break;
            
        case 'Escape':
            ocultarSugestoes();
            indiceSelecionado = -1;
            break;
    }
}

// Função para atualizar seleção visual
function atualizarSelecaoVisual(itens) {
    itens.forEach((item, index) => {
        if (index === indiceSelecionado) {
            item.classList.add('selecionado');
        } else {
            item.classList.remove('selecionado');
        }
    });
}

// === FUNÇÕES DE API ===

// Função principal para buscar Pokémon
async function buscarPokemon() {
    const input = document.getElementById('input-pokemon');
    const termoBusca = input.value.trim().toLowerCase();
    
    if (!termoBusca) {
        exibirMensagem('❌ Por favor, digite o nome ou número do Pokémon!', 'error');
        return;
    }
    
    exibirCarregamento(true);
    
    try {
        console.log(`🔍 Buscando Pokémon: ${termoBusca}`);
        
        // Fazer requisição para a API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoBusca}`);
        
        if (!response.ok) {
            throw new Error(`Pokémon não encontrado: ${termoBusca}`);
        }
        
        const pokemon = await response.json();
        
        // Buscar informações adicionais da espécie
        const especieResponse = await fetch(pokemon.species.url);
        const especie = await especieResponse.json();
        
        // Processar dados do Pokémon
        pokemonAtual = processarDadosPokemon(pokemon, especie);
        
        // Adicionar ao histórico
        adicionarAoHistorico(pokemonAtual);
        
        // Exibir resultados
        exibirResultadoPokemon(pokemonAtual);
        
        // Limpar campo de busca
        input.value = '';
        
        exibirMensagem(`✅ Pokémon ${pokemonAtual.nome} encontrado com sucesso!`, 'success');
        
        console.log('✅ Pokémon carregado:', pokemonAtual);
        
    } catch (error) {
        console.error('❌ Erro ao buscar Pokémon:', error);
        exibirMensagem(`❌ Erro: ${error.message}`, 'error');
        limparResultadoPokemon();
    } finally {
        exibirCarregamento(false);
    }
}

// Função para buscar Pokémon aleatório
async function buscarPokemonAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 1010) + 1; // Pokémon 1-1010
    
    const input = document.getElementById('input-pokemon');
    input.value = numeroAleatorio.toString();
    
    await buscarPokemon();
}

// Função para processar dados do Pokémon
function processarDadosPokemon(pokemon, especie) {
    // Encontrar descrição em português
    const descricaoPortugues = especie.flavor_text_entries.find(
        entry => entry.language.name === 'en'
    );
    
    return {
        id: pokemon.id,
        nome: pokemon.name,
        altura: pokemon.height / 10, // Converter para metros
        peso: pokemon.weight / 10, // Converter para kg
        tipos: pokemon.types.map(type => type.type.name),
        habilidades: pokemon.abilities.map(ability => ability.ability.name),
        stats: pokemon.stats.map(stat => ({
            nome: stat.stat.name,
            valor: stat.base_stat
        })),
        sprites: {
            frente: pokemon.sprites.front_default,
            costas: pokemon.sprites.back_default,
            frenteShiny: pokemon.sprites.front_shiny,
            costasShiny: pokemon.sprites.back_shiny
        },
        descricao: descricaoPortugues ? descricaoPortugues.flavor_text.replace(/\f/g, ' ') : 'Descrição não disponível',
        experienciaBase: pokemon.base_experience,
        categoria: especie.genera.find(genus => genus.language.name === 'en')?.genus || 'Desconhecida'
    };
}

// === FUNÇÕES DE EXIBIÇÃO ===

// Função para exibir resultado do Pokémon
function exibirResultadoPokemon(pokemon) {
    const container = document.getElementById('resultado-pokemon');
    if (!container) return;
    
    const tiposHtml = pokemon.tipos.map(tipo => 
        `<span class="badge bg-secondary me-1">${tipo}</span>`
    ).join('');
    
    const habilidadesHtml = pokemon.habilidades.map(habilidade => 
        `<span class="badge bg-info me-1">${habilidade}</span>`
    ).join('');
    
    const statsHtml = pokemon.stats.map(stat => `
        <div class="col-6 mb-2">
            <div class="d-flex justify-content-between">
                <span class="text-capitalize">${stat.nome}:</span>
                <strong>${stat.valor}</strong>
            </div>
            <div class="progress" style="height: 8px;">
                <div class="progress-bar" style="width: ${(stat.valor / 255) * 100}%"></div>
            </div>
        </div>
    `).join('');
    
    const html = `
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                    🔍 Pokémon Encontrado: ${pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1)}
                    <button class="btn btn-sm btn-outline-light float-end" onclick="adicionarAosFavoritos(${pokemon.id})">
                        ${favoritos.some(fav => fav.id === pokemon.id) ? '❤️' : '🤍'} Favorito
                    </button>
                </h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4 text-center">
                        <img src="${pokemon.sprites.frente}" alt="${pokemon.nome}" class="img-fluid mb-2" style="max-width: 150px;">
                        <div class="btn-group" role="group">
                            <button class="btn btn-sm btn-outline-primary" onclick="alternarSprite('normal')">
                                Normal
                            </button>
                            <button class="btn btn-sm btn-outline-warning" onclick="alternarSprite('shiny')">
                                Shiny
                            </button>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <h6>📋 Informações Básicas</h6>
                        <div class="row mb-3">
                            <div class="col-6">
                                <strong>ID:</strong> #${pokemon.id.toString().padStart(3, '0')}
                            </div>
                            <div class="col-6">
                                <strong>Categoria:</strong> ${pokemon.categoria}
                            </div>
                            <div class="col-6">
                                <strong>Altura:</strong> ${pokemon.altura} m
                            </div>
                            <div class="col-6">
                                <strong>Peso:</strong> ${pokemon.peso} kg
                            </div>
                            <div class="col-6">
                                <strong>Experiência Base:</strong> ${pokemon.experienciaBase}
                            </div>
                        </div>
                        
                        <h6>🏷️ Tipos</h6>
                        <div class="mb-3">${tiposHtml}</div>
                        
                        <h6>⚡ Habilidades</h6>
                        <div class="mb-3">${habilidadesHtml}</div>
                        
                        <h6>📖 Descrição</h6>
                        <p class="text-muted">${pokemon.descricao}</p>
                    </div>
                </div>
                
                <hr>
                
                <h6>📊 Estatísticas Base</h6>
                <div class="row">
                    ${statsHtml}
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    container.scrollIntoView({ behavior: 'smooth' });
}

// Função para alternar sprite (normal/shiny)
function alternarSprite(tipo) {
    if (!pokemonAtual) return;
    
    const img = document.querySelector('#resultado-pokemon img');
    if (!img) return;
    
    if (tipo === 'shiny') {
        img.src = pokemonAtual.sprites.frenteShiny;
        img.alt = `${pokemonAtual.nome} (Shiny)`;
    } else {
        img.src = pokemonAtual.sprites.frente;
        img.alt = pokemonAtual.nome;
    }
}

// === FUNÇÕES DE FAVORITOS ===

// Função para adicionar/remover dos favoritos
function adicionarAosFavoritos(pokemonId) {
    if (!pokemonAtual || pokemonAtual.id !== pokemonId) return;
    
    const index = favoritos.findIndex(fav => fav.id === pokemonId);
    
    if (index === -1) {
        // Adicionar aos favoritos
        favoritos.push({
            id: pokemonAtual.id,
            nome: pokemonAtual.nome,
            sprite: pokemonAtual.sprites.frente,
            tipos: pokemonAtual.tipos
        });
        exibirMensagem(`❤️ ${pokemonAtual.nome} adicionado aos favoritos!`, 'success');
    } else {
        // Remover dos favoritos
        favoritos.splice(index, 1);
        exibirMensagem(`💔 ${pokemonAtual.nome} removido dos favoritos!`, 'info');
    }
    
    salvarFavoritos();
    atualizarInterface();
    
    // Atualizar botão de favorito
    if (pokemonAtual) {
        exibirResultadoPokemon(pokemonAtual);
    }
}

// Função para salvar favoritos no localStorage
function salvarFavoritos() {
    try {
        localStorage.setItem('pokemon-favoritos', JSON.stringify(favoritos));
        console.log('💾 Favoritos salvos:', favoritos.length);
    } catch (error) {
        console.error('❌ Erro ao salvar favoritos:', error);
    }
}

// Função para carregar favoritos do localStorage
function carregarFavoritos() {
    try {
        const favoritosSalvos = localStorage.getItem('pokemon-favoritos');
        if (favoritosSalvos) {
            favoritos = JSON.parse(favoritosSalvos);
            console.log('📂 Favoritos carregados:', favoritos.length);
        }
    } catch (error) {
        console.error('❌ Erro ao carregar favoritos:', error);
        favoritos = [];
    }
}

// === FUNÇÕES DE HISTÓRICO ===

// Função para adicionar ao histórico
function adicionarAoHistorico(pokemon) {
    // Evitar duplicatas
    const index = historicoPesquisas.findIndex(p => p.id === pokemon.id);
    if (index !== -1) {
        historicoPesquisas.splice(index, 1);
    }
    
    // Adicionar no início
    historicoPesquisas.unshift({
        id: pokemon.id,
        nome: pokemon.nome,
        sprite: pokemon.sprites.frente,
        timestamp: new Date().toLocaleString('pt-BR')
    });
    
    // Manter apenas os últimos 10
    if (historicoPesquisas.length > 10) {
        historicoPesquisas = historicoPesquisas.slice(0, 10);
    }
    
    atualizarInterface();
}

// === FUNÇÕES DE INTERFACE ===

// Função para atualizar toda a interface
function atualizarInterface() {
    atualizarHistorico();
    atualizarFavoritos();
    atualizarEstatisticas();
}

// Função para atualizar histórico
function atualizarHistorico() {
    const container = document.getElementById('historico-pesquisas');
    if (!container) return;
    
    if (historicoPesquisas.length === 0) {
        container.innerHTML = '<p class="text-muted">Nenhuma pesquisa realizada ainda.</p>';
        return;
    }
    
    let html = '<h6>🕒 Histórico de Pesquisas</h6><div class="row">';
    
    historicoPesquisas.forEach(pokemon => {
        html += `
            <div class="col-6 col-md-4 col-lg-3 mb-2">
                <div class="card card-sm" style="cursor: pointer;" onclick="buscarPokemonPorId(${pokemon.id})">
                    <div class="card-body text-center p-2">
                        <img src="${pokemon.sprite}" alt="${pokemon.nome}" style="width: 40px; height: 40px;">
                        <div class="small text-capitalize">${pokemon.nome}</div>
                        <div class="text-muted" style="font-size: 0.7rem;">${pokemon.timestamp}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Função para atualizar favoritos
function atualizarFavoritos() {
    const container = document.getElementById('lista-favoritos');
    if (!container) return;
    
    if (favoritos.length === 0) {
        container.innerHTML = '<p class="text-muted">Nenhum Pokémon favoritado ainda.</p>';
        return;
    }
    
    let html = '<h6>❤️ Pokémon Favoritos</h6><div class="row">';
    
    favoritos.forEach(pokemon => {
        const tiposHtml = pokemon.tipos.map(tipo => 
            `<span class="badge bg-secondary" style="font-size: 0.6rem;">${tipo}</span>`
        ).join(' ');
        
        html += `
            <div class="col-6 col-md-4 col-lg-3 mb-2">
                <div class="card card-sm" style="cursor: pointer;" onclick="buscarPokemonPorId(${pokemon.id})">
                    <div class="card-body text-center p-2">
                        <img src="${pokemon.sprite}" alt="${pokemon.nome}" style="width: 50px; height: 50px;">
                        <div class="small text-capitalize">${pokemon.nome}</div>
                        <div>${tiposHtml}</div>
                        <button class="btn btn-sm btn-outline-danger mt-1" onclick="event.stopPropagation(); removerFavorito(${pokemon.id})">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Função para atualizar estatísticas
function atualizarEstatisticas() {
    const container = document.getElementById('estatisticas');
    if (!container) return;
    
    const html = `
        <div class="row text-center">
            <div class="col-4">
                <div class="card bg-primary text-white">
                    <div class="card-body p-2">
                        <h6 class="mb-0">${historicoPesquisas.length}</h6>
                        <small>Pesquisas</small>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card bg-success text-white">
                    <div class="card-body p-2">
                        <h6 class="mb-0">${favoritos.length}</h6>
                        <small>Favoritos</small>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card bg-info text-white">
                    <div class="card-body p-2">
                        <h6 class="mb-0">${pokemonAtual ? '1' : '0'}</h6>
                        <small>Atual</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// === FUNÇÕES AUXILIARES ===

// Função para buscar Pokémon por ID (do histórico/favoritos)
async function buscarPokemonPorId(id) {
    const input = document.getElementById('input-pokemon');
    input.value = id.toString();
    await buscarPokemon();
}

// Função para remover favorito
function removerFavorito(pokemonId) {
    const index = favoritos.findIndex(fav => fav.id === pokemonId);
    if (index !== -1) {
        const pokemon = favoritos[index];
        favoritos.splice(index, 1);
        salvarFavoritos();
        atualizarInterface();
        exibirMensagem(`💔 ${pokemon.nome} removido dos favoritos!`, 'info');
    }
}

// Função para exibir carregamento
function exibirCarregamento(mostrar) {
    const loader = document.getElementById('loading');
    if (loader) {
        loader.style.display = mostrar ? 'block' : 'none';
    }
}

// Função para limpar resultado do Pokémon
function limparResultadoPokemon() {
    const container = document.getElementById('resultado-pokemon');
    if (container) {
        container.innerHTML = '';
    }
    pokemonAtual = null;
    atualizarInterface();
}

// Função para limpar todos os resultados
function limparResultados() {
    limparResultadoPokemon();
    
    const input = document.getElementById('input-pokemon');
    if (input) {
        input.value = '';
    }
    
    exibirMensagem('🧹 Resultados limpos!', 'info');
}

// Função para exibir mensagens
function exibirMensagem(mensagem, tipo = 'info') {
    const container = document.getElementById('mensagens');
    if (!container) {
        console.log(mensagem);
        return;
    }
    
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'info': 'alert-info',
        'warning': 'alert-warning'
    }[tipo] || 'alert-info';
    
    const html = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        const alert = container.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

// Função para demonstrar funcionalidades
function demonstrarFuncionalidades() {
    console.clear();
    console.log('🎮 EXERCÍCIO 06 - API POKÉMON');
    console.log('Consulta de API pública com interface moderna\n');
    
    console.log('📚 Funcionalidades implementadas:');
    console.log('• 🔍 Busca de Pokémon por nome ou número');
    console.log('• 🎲 Busca aleatória de Pokémon');
    console.log('• ❤️ Sistema de favoritos com localStorage');
    console.log('• 🕒 Histórico de pesquisas');
    console.log('• 📊 Exibição completa de estatísticas');
    console.log('• 🖼️ Visualização de sprites (normal e shiny)');
    console.log('• 📱 Interface responsiva e moderna');
    console.log('• ⚡ Tratamento de erros e validação');
    console.log('• 💾 Persistência de dados local\n');
    
    console.log('🎯 Digite o nome ou número de um Pokémon para começar!');
    console.log('💡 Dica: Experimente "pikachu", "charizard" ou "25"');
    console.log('🎲 Use o botão "Aleatório" para descobrir novos Pokémon!');
}

// === INICIALIZAÇÃO ===

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarAplicacao);

// Executar demonstração
// demonstrarFuncionalidades();