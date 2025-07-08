// ===== EXEMPLOS DE USO - EXERCÍCIO 06 ===== //
// Aula 13 - Exercício JavaScript - API Pokémon
// Exemplos práticos e demonstrações de funcionalidades

/* 
   Este arquivo contém exemplos de como usar as funcionalidades
   da aplicação e demonstra conceitos avançados de JavaScript
*/

// Função auxiliar para exibir resultados na interface
function exibirResultadoAvancado(titulo, conteudo, tipo = 'info') {
    const containerResultados = document.getElementById('resultados-avancados');
    const conteudoResultados = document.getElementById('conteudo-resultados-avancados');
    
    if (containerResultados && conteudoResultados) {
        containerResultados.style.display = 'block';
        
        const timestamp = new Date().toLocaleTimeString();
        const novoResultado = document.createElement('div');
        novoResultado.className = `border-start border-${tipo === 'success' ? 'success' : tipo === 'warning' ? 'warning' : 'info'} border-3 ps-3 mb-3`;
        novoResultado.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="text-${tipo === 'success' ? 'success' : tipo === 'warning' ? 'warning' : 'info'} mb-1">
                        <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
                        ${titulo}
                    </h6>
                    <small class="text-muted">${timestamp}</small>
                </div>
                <button class="btn btn-sm btn-outline-secondary" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mt-2">${conteudo}</div>
        `;
        
        conteudoResultados.insertBefore(novoResultado, conteudoResultados.firstChild);
        
        // Scroll suave para a área de resultados
        containerResultados.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Também exibir no console para debug
    console.log(`[${titulo}]`, conteudo);
}

// === EXEMPLOS DE BUSCA PROGRAMÁTICA ===

/**
 * Exemplo 1: Buscar múltiplos Pokémon em sequência
 * Demonstra: async/await, loops, tratamento de erros
 */
async function exemploMultiplasBuscas() {
    const titulo = '🔍 Múltiplas Buscas Sequenciais';
    exibirResultadoAvancado(titulo, 'Iniciando busca sequencial de múltiplos Pokémon...', 'info');
    
    const pokemonList = ['pikachu', 'charizard', 'blastoise', 'venusaur'];
    const resultados = [];
    
    for (const pokemon of pokemonList) {
        try {
            exibirResultadoAvancado('Buscando', `Procurando por: <strong>${pokemon}</strong>`, 'info');
            
            // Simular busca (usando a função da aplicação)
            const input = document.getElementById('input-pokemon');
            if (input) {
                input.value = pokemon;
                await buscarPokemon();
                
                // Aguardar 2 segundos entre buscas
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                if (pokemonAtual) {
                    resultados.push(pokemonAtual);
                }
            }
        } catch (error) {
            exibirResultadoAvancado('Erro', `Falha ao buscar ${pokemon}: ${error.message}`, 'warning');
        }
    }
    
    const conteudoFinal = `
        <strong>Buscas concluídas com sucesso!</strong><br>
        <div class="mt-2">
            ${resultados.map(p => `<span class="badge bg-success me-1">${p.nome}</span>`).join('')}
        </div>
        <small class="text-muted">Total: ${resultados.length} Pokémon encontrados</small>
    `;
    
    exibirResultadoAvancado('✅ Resultado Final', conteudoFinal, 'success');
    return resultados;
}

/**
 * Exemplo 2: Buscar Pokémon por tipo específico
 * Demonstra: requisições à API, filtragem de dados
 */
async function exemploFiltrarPorTipo(tipo = 'electric') {
    console.log(`⚡ Exemplo: Filtrando Pokémon do tipo ${tipo}`);
    
    try {
        // Buscar informações do tipo
        const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
        const tipoData = await response.json();
        
        // Pegar os primeiros 10 Pokémon deste tipo
        const pokemonDoTipo = tipoData.pokemon.slice(0, 10);
        
        console.log(`Encontrados ${pokemonDoTipo.length} Pokémon do tipo ${tipo}:`);
        
        pokemonDoTipo.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry.pokemon.name}`);
        });
        
        return pokemonDoTipo;
        
    } catch (error) {
        console.error('Erro ao buscar por tipo:', error);
    }
}

/**
 * Exemplo 3: Análise estatística de Pokémon
 * Demonstra: manipulação de arrays, cálculos matemáticos
 */
function exemploAnaliseEstatisticas(pokemon) {
    if (!pokemon || !pokemon.stats) {
        exibirResultadoAvancado('Erro', 'Pokémon inválido para análise', 'warning');
        return null;
    }
    
    const titulo = `📊 Análise Estatística - ${pokemon.nome}`;
    exibirResultadoAvancado(titulo, 'Calculando estatísticas...', 'info');
    
    const stats = pokemon.stats;
    const valores = stats.map(stat => stat.valor);
    
    const analise = {
        total: valores.reduce((sum, val) => sum + val, 0),
        media: valores.reduce((sum, val) => sum + val, 0) / valores.length,
        maximo: Math.max(...valores),
        minimo: Math.min(...valores),
        estatMaisAlta: stats.find(stat => stat.valor === Math.max(...valores)),
        estatMaisBaixa: stats.find(stat => stat.valor === Math.min(...valores))
    };
    
    const analiseHtml = `
        <div class="row">
            <div class="col-md-6">
                <div class="card border-success mb-2">
                    <div class="card-body p-2">
                        <h6 class="text-success mb-2"><i class="fas fa-chart-line me-2"></i>Estatísticas Gerais</h6>
                        <div class="d-flex justify-content-between">
                            <span>Total:</span>
                            <strong class="text-primary">${analise.total}</strong>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Média:</span>
                            <strong class="text-info">${analise.media.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-warning mb-2">
                    <div class="card-body p-2">
                        <h6 class="text-warning mb-2"><i class="fas fa-trophy me-2"></i>Extremos</h6>
                        <div class="d-flex justify-content-between">
                            <span>Máximo:</span>
                            <span><strong class="text-success">${analise.maximo}</strong> <small>(${analise.estatMaisAlta.nome})</small></span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Mínimo:</span>
                            <span><strong class="text-danger">${analise.minimo}</strong> <small>(${analise.estatMaisBaixa.nome})</small></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <h6>📊 Distribuição das Estatísticas:</h6>
            ${stats.map(stat => {
                const porcentagem = ((stat.valor / analise.total) * 100).toFixed(1);
                return `
                    <div class="mb-1">
                        <div class="d-flex justify-content-between">
                            <span class="text-capitalize">${stat.nome}:</span>
                            <span><strong>${stat.valor}</strong> (${porcentagem}%)</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-info" style="width: ${(stat.valor / analise.maximo) * 100}%"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    exibirResultadoAvancado('📈 Resultados da Análise', analiseHtml, 'success');
    
    return analise;
}

// === EXEMPLOS DE MANIPULAÇÃO DE FAVORITOS ===

/**
 * Exemplo 4: Exportar favoritos como JSON
 * Demonstra: localStorage, JSON, download de arquivos
 */
function exemploExportarFavoritos() {
    const titulo = '💾 Exportar Favoritos';
    exibirResultadoAvancado(titulo, 'Verificando favoritos salvos...', 'info');
    
    try {
        if (favoritos.length === 0) {
            exibirResultadoAvancado('📭 Nenhum Favorito', 'Não há Pokémon favoritos para exportar. Adicione alguns favoritos primeiro!', 'warning');
            return null;
        }
        
        const favoritosData = {
            exportadoEm: new Date().toISOString(),
            versao: '1.0',
            total: favoritos.length,
            pokemon: favoritos
        };
        
        const jsonString = JSON.stringify(favoritosData, null, 2);
        
        // Criar blob e download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `pokemon-favoritos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        // Mostrar preview dos dados exportados
        const favoritosHtml = `
            <div class="alert alert-success">
                <i class="fas fa-download me-2"></i>
                <strong>Arquivo baixado com sucesso!</strong>
            </div>
            <div class="card border-info">
                <div class="card-header bg-info bg-opacity-10">
                    <h6 class="mb-0"><i class="fas fa-file-export me-2"></i>Dados Exportados</h6>
                </div>
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-sm-4"><strong>Total de Favoritos:</strong></div>
                        <div class="col-sm-8"><span class="badge bg-primary">${favoritos.length}</span></div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-sm-4"><strong>Data de Exportação:</strong></div>
                        <div class="col-sm-8"><small class="text-muted">${new Date(favoritosData.exportadoEm).toLocaleString()}</small></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4"><strong>Pokémon Favoritos:</strong></div>
                        <div class="col-sm-8">
                            ${favoritos.map(fav => `<span class="badge bg-secondary me-1 mb-1 text-capitalize">${fav.nome || fav}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <small class="text-muted">
                    <i class="fas fa-info-circle me-1"></i>
                    O arquivo JSON foi salvo na pasta de Downloads do seu navegador.
                </small>
            </div>
        `;
        
        exibirResultadoAvancado('✅ Exportação Concluída', favoritosHtml, 'success');
        
        console.log('✅ Favoritos exportados com sucesso!');
        
        return favoritosData;
        
    } catch (error) {
        console.error('❌ Erro ao exportar favoritos:', error);
        exibirResultadoAvancado('❌ Erro na Exportação', `Falha ao exportar favoritos: ${error.message}`, 'warning');
    }
}

/**
 * Exemplo 5: Importar favoritos de arquivo JSON
 * Demonstra: FileReader API, validação de dados
 */
function exemploImportarFavoritos(arquivo) {
    console.log('📂 Exemplo: Importando favoritos');
    
    const reader = new FileReader();
    
    reader.onload = function(event) {
        try {
            const dados = JSON.parse(event.target.result);
            
            // Validar estrutura dos dados
            if (dados.pokemon && Array.isArray(dados.pokemon)) {
                // Mesclar com favoritos existentes
                dados.pokemon.forEach(pokemon => {
                    if (!favoritos.some(fav => fav.id === pokemon.id)) {
                        favoritos.push(pokemon);
                    }
                });
                
                salvarFavoritos();
                atualizarInterface();
                
                console.log(`✅ ${dados.pokemon.length} favoritos importados!`);
                exibirMensagem(`📂 ${dados.pokemon.length} favoritos importados com sucesso!`, 'success');
                
            } else {
                throw new Error('Formato de arquivo inválido');
            }
            
        } catch (error) {
            console.error('❌ Erro ao importar:', error);
            exibirMensagem('❌ Erro ao importar favoritos. Verifique o formato do arquivo.', 'error');
        }
    };
    
    reader.readAsText(arquivo);
}

// === EXEMPLOS DE INTERFACE AVANÇADA ===

/**
 * Exemplo 6: Modo comparação entre Pokémon
 * Demonstra: manipulação complexa do DOM, visualização de dados
 */
async function exemploModoComparacao(pokemon1Name = 'pikachu', pokemon2Name = 'raichu') {
    const titulo = '⚖️ Modo Comparação';
    exibirResultadoAvancado(titulo, 'Iniciando comparação entre Pokémon...', 'info');
    
    exibirResultadoAvancado('🔍 Comparando', `<strong>${pokemon1Name}</strong> vs <strong>${pokemon2Name}</strong>`, 'info');
    
    try {
        const [response1, response2] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1Name}`),
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2Name}`)
        ]);
        
        const [data1, data2] = await Promise.all([
            response1.json(),
            response2.json()
        ]);
        
        const comparacao = {
            pokemon1: {
                nome: data1.name,
                altura: data1.height,
                peso: data1.weight,
                hp: data1.stats[0].base_stat,
                ataque: data1.stats[1].base_stat,
                defesa: data1.stats[2].base_stat,
                velocidade: data1.stats[5].base_stat,
                sprite: data1.sprites.front_default
            },
            pokemon2: {
                nome: data2.name,
                altura: data2.height,
                peso: data2.weight,
                hp: data2.stats[0].base_stat,
                ataque: data2.stats[1].base_stat,
                defesa: data2.stats[2].base_stat,
                velocidade: data2.stats[5].base_stat,
                sprite: data2.sprites.front_default
            }
        };
        
        // Função para determinar o vencedor de cada categoria
        const getVencedor = (stat1, stat2) => {
            if (stat1 > stat2) return 'pokemon1';
            if (stat2 > stat1) return 'pokemon2';
            return 'empate';
        };
        
        const vencedores = {
            altura: getVencedor(comparacao.pokemon1.altura, comparacao.pokemon2.altura),
            peso: getVencedor(comparacao.pokemon1.peso, comparacao.pokemon2.peso),
            hp: getVencedor(comparacao.pokemon1.hp, comparacao.pokemon2.hp),
            ataque: getVencedor(comparacao.pokemon1.ataque, comparacao.pokemon2.ataque),
            defesa: getVencedor(comparacao.pokemon1.defesa, comparacao.pokemon2.defesa),
            velocidade: getVencedor(comparacao.pokemon1.velocidade, comparacao.pokemon2.velocidade)
        };
        
        const comparacaoHtml = `
            <div class="row">
                <div class="col-md-5">
                    <div class="card border-danger">
                        <div class="card-header bg-danger bg-opacity-10 text-center">
                            <img src="${comparacao.pokemon1.sprite}" alt="${comparacao.pokemon1.nome}" class="img-fluid" style="max-height: 80px;">
                            <h5 class="text-capitalize mt-2 mb-0">${comparacao.pokemon1.nome}</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Altura:</span>
                                <span class="${vencedores.altura === 'pokemon1' ? 'fw-bold text-success' : ''}">${comparacao.pokemon1.altura}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Peso:</span>
                                <span class="${vencedores.peso === 'pokemon1' ? 'fw-bold text-success' : ''}">${comparacao.pokemon1.peso}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>HP:</span>
                                <span class="${vencedores.hp === 'pokemon1' ? 'fw-bold text-success' : ''}">${comparacao.pokemon1.hp}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Ataque:</span>
                                <span class="${vencedores.ataque === 'pokemon1' ? 'fw-bold text-success' : ''}">${comparacao.pokemon1.ataque}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Defesa:</span>
                                <span class="${vencedores.defesa === 'pokemon1' ? 'fw-bold text-success' : ''}">${comparacao.pokemon1.defesa}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Velocidade:</span>
                                <span class="${vencedores.velocidade === 'pokemon1' ? 'fw-bold text-success' : ''}">${comparacao.pokemon1.velocidade}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 d-flex align-items-center justify-content-center">
                    <div class="text-center">
                        <h2 class="text-muted">VS</h2>
                        <div class="mt-3">
                            <i class="fas fa-balance-scale fa-2x text-warning"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="card border-primary">
                        <div class="card-header bg-primary bg-opacity-10 text-center">
                            <img src="${comparacao.pokemon2.sprite}" alt="${comparacao.pokemon2.nome}" class="img-fluid" style="max-height: 80px;">
                            <h5 class="text-capitalize mt-2 mb-0">${comparacao.pokemon2.nome}</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Altura:</span>
                                <span class="${vencedores.altura === 'pokemon2' ? 'fw-bold text-success' : ''}">${comparacao.pokemon2.altura}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Peso:</span>
                                <span class="${vencedores.peso === 'pokemon2' ? 'fw-bold text-success' : ''}">${comparacao.pokemon2.peso}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>HP:</span>
                                <span class="${vencedores.hp === 'pokemon2' ? 'fw-bold text-success' : ''}">${comparacao.pokemon2.hp}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Ataque:</span>
                                <span class="${vencedores.ataque === 'pokemon2' ? 'fw-bold text-success' : ''}">${comparacao.pokemon2.ataque}</span>
                            </div>
                            <div class="mb-2 d-flex justify-content-between">
                                <span>Defesa:</span>
                                <span class="${vencedores.defesa === 'pokemon2' ? 'fw-bold text-success' : ''}">${comparacao.pokemon2.defesa}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Velocidade:</span>
                                <span class="${vencedores.velocidade === 'pokemon2' ? 'fw-bold text-success' : ''}">${comparacao.pokemon2.velocidade}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="card border-success">
                    <div class="card-header bg-success bg-opacity-10">
                        <h6 class="mb-0"><i class="fas fa-trophy me-2"></i>Resumo da Comparação</h6>
                    </div>
                    <div class="card-body">
                        <div class="row text-center">
                            ${Object.entries(vencedores).map(([categoria, vencedor]) => {
                                let badge = '';
                                let nome = '';
                                if (vencedor === 'pokemon1') {
                                    badge = 'bg-danger';
                                    nome = comparacao.pokemon1.nome;
                                } else if (vencedor === 'pokemon2') {
                                    badge = 'bg-primary';
                                    nome = comparacao.pokemon2.nome;
                                } else {
                                    badge = 'bg-secondary';
                                    nome = 'Empate';
                                }
                                return `
                                    <div class="col-md-2 mb-2">
                                        <div class="text-capitalize fw-bold">${categoria}</div>
                                        <span class="badge ${badge} text-capitalize">${nome}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        exibirResultadoAvancado('📊 Resultados da Comparação', comparacaoHtml, 'success');
        
        return comparacao;
        
    } catch (error) {
        exibirResultadoAvancado('❌ Erro na Comparação', `Falha ao comparar Pokémon: ${error.message}`, 'warning');
        return null;
    }
}

/**
 * Função auxiliar para exibir comparação na interface
 */
function exibirComparacaoNaInterface(comparacao) {
    const container = document.getElementById('resultado-pokemon');
    if (!container) return;
    
    const html = `
        <div class="card border-warning">
            <div class="card-header bg-warning text-dark">
                <h5 class="mb-0">⚔️ Comparação: ${comparacao.pokemon1} vs ${comparacao.pokemon2}</h5>
            </div>
            <div class="card-body">
                <div class="text-center mb-3">
                    <h6>🏆 Vencedor Geral: <strong>${comparacao.vencedor}</strong></h6>
                    <p>Total de Stats: ${comparacao.totalStats.pokemon1} vs ${comparacao.totalStats.pokemon2}</p>
                </div>
                
                <div class="row">
                    ${Object.entries(comparacao.estatisticas).map(([stat, dados]) => `
                        <div class="col-md-6 mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-capitalize">${stat}:</span>
                                <span class="badge ${dados.vencedor === comparacao.pokemon1 ? 'bg-success' : dados.vencedor === comparacao.pokemon2 ? 'bg-danger' : 'bg-secondary'}">
                                    ${dados.pokemon1} vs ${dados.pokemon2}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// === EXEMPLOS DE OTIMIZAÇÃO E PERFORMANCE ===

/**
 * Exemplo 7: Cache inteligente de requisições
 * Demonstra: Map para cache, otimização de performance
 */
class PokemonCache {
    constructor(maxSize = 50) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    get(key) {
        if (this.cache.has(key)) {
            // Mover para o final (LRU - Least Recently Used)
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            
            console.log(`📦 Cache HIT: ${key}`);
            return value;
        }
        
        console.log(`❌ Cache MISS: ${key}`);
        return null;
    }
    
    set(key, value) {
        // Remover item mais antigo se necessário
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
            console.log(`🗑️ Cache removido: ${firstKey}`);
        }
        
        this.cache.set(key, value);
        console.log(`💾 Cache salvo: ${key}`);
    }
    
    clear() {
        this.cache.clear();
        console.log('🧹 Cache limpo');
    }
    
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            keys: Array.from(this.cache.keys())
        };
    }
}

// Instância global do cache
const pokemonCache = new PokemonCache(30);

/**
 * Exemplo 8: Busca com cache
 * Demonstra: integração do cache com busca de API
 */
async function exemploBuscaComCache(termoBusca = 'charizard') {
    const titulo = '🗄️ Busca com Cache Avançado';
    exibirResultadoAvancado(titulo, `Iniciando busca por: <strong>${termoBusca}</strong>`, 'info');
    
    // Verificar cache primeiro
    const cached = pokemonCache.get(termoBusca.toLowerCase());
    if (cached) {
        exibirResultadoAvancado('💾 Cache Hit!', 'Dados encontrados no cache em memória', 'success');
        
        const cacheHtml = `
            <div class="alert alert-info">
                <i class="fas fa-memory me-2"></i>
                <strong>Dados do Cache em Memória</strong> - Acesso ultra-rápido!
            </div>
            <div class="row">
                <div class="col-md-4 text-center">
                    <img src="${cached.sprites.front_default}" alt="${cached.name}" class="img-fluid">
                    <h5 class="text-capitalize mt-2">${cached.name}</h5>
                    <span class="badge bg-primary">#${cached.id}</span>
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-sm-6">
                            <strong>Informações Básicas:</strong>
                            <ul class="list-unstyled mt-2">
                                <li><i class="fas fa-ruler-vertical me-2"></i>Altura: ${cached.height}</li>
                                <li><i class="fas fa-weight me-2"></i>Peso: ${cached.weight}</li>
                                <li><i class="fas fa-tags me-2"></i>Tipos: ${cached.types.map(type => `<span class="badge bg-secondary">${type.type.name}</span>`).join(' ')}</li>
                            </ul>
                        </div>
                        <div class="col-sm-6">
                            <strong>Estatísticas:</strong>
                            <div class="mt-2">
                                ${cached.stats.slice(0, 6).map(stat => `
                                    <div class="d-flex justify-content-between mb-1">
                                        <small class="text-capitalize">${stat.stat.name}:</small>
                                        <span class="badge bg-info">${stat.base_stat}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <small class="text-success">
                    <i class="fas fa-bolt me-1"></i>
                    Dados recuperados instantaneamente do cache em memória!
                </small>
            </div>
        `;
        
        exibirResultadoAvancado('📄 Dados Recuperados do Cache', cacheHtml, 'success');
        return cached;
    }
    
    exibirResultadoAvancado('🌐 Cache Miss', 'Buscando dados na API...', 'info');
    
    try {
        // Buscar na API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoBusca}`);
        
        if (!response.ok) {
            throw new Error(`Pokémon não encontrado: ${termoBusca}`);
        }
        
        const pokemon = await response.json();
        
        // Salvar no cache
        pokemonCache.set(termoBusca.toLowerCase(), pokemon);
        
        const apiHtml = `
            <div class="alert alert-success">
                <i class="fas fa-download me-2"></i>
                <strong>Dados obtidos da API</strong> e salvos no cache para futuras consultas
            </div>
            <div class="row">
                <div class="col-md-4 text-center">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid">
                    <h5 class="text-capitalize mt-2">${pokemon.name}</h5>
                    <span class="badge bg-primary">#${pokemon.id}</span>
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-sm-6">
                            <strong>Informações Básicas:</strong>
                            <ul class="list-unstyled mt-2">
                                <li><i class="fas fa-ruler-vertical me-2"></i>Altura: ${pokemon.height}</li>
                                <li><i class="fas fa-weight me-2"></i>Peso: ${pokemon.weight}</li>
                                <li><i class="fas fa-tags me-2"></i>Tipos: ${pokemon.types.map(type => `<span class="badge bg-secondary">${type.type.name}</span>`).join(' ')}</li>
                            </ul>
                        </div>
                        <div class="col-sm-6">
                            <strong>Estatísticas:</strong>
                            <div class="mt-2">
                                ${pokemon.stats.slice(0, 6).map(stat => `
                                    <div class="d-flex justify-content-between mb-1">
                                        <small class="text-capitalize">${stat.stat.name}:</small>
                                        <span class="badge bg-info">${stat.base_stat}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <div class="row">
                    <div class="col-sm-6">
                        <small class="text-muted">
                            <i class="fas fa-info-circle me-1"></i>
                            Dados salvos no cache em memória
                        </small>
                    </div>
                    <div class="col-sm-6 text-end">
                        <small class="text-success">
                            <i class="fas fa-memory me-1"></i>
                            Cache: ${pokemonCache.getStats().size}/${pokemonCache.getStats().maxSize}
                        </small>
                    </div>
                </div>
            </div>
        `;
        
        exibirResultadoAvancado('✅ Busca Concluída', apiHtml, 'success');
        
        return pokemon;
        
    } catch (error) {
        exibirResultadoAvancado('❌ Erro na Busca', `Falha ao buscar Pokémon: ${error.message}`, 'warning');
        throw error;
    }
}

// === EXEMPLOS DE VALIDAÇÃO E SEGURANÇA ===

/**
 * Exemplo 9: Validação robusta de entrada
 * Demonstra: regex, sanitização, validação
 */
function exemploValidacaoEntrada(input) {
    console.log(`🔒 Validando entrada: "${input}"`);
    
    // Remover espaços e converter para minúsculo
    const sanitized = input.trim().toLowerCase();
    
    // Validações
    const validacoes = {
        vazio: sanitized.length === 0,
        muitoLongo: sanitized.length > 50,
        caracteresInvalidos: !/^[a-z0-9-]+$/.test(sanitized),
        numeroValido: /^\d+$/.test(sanitized) && parseInt(sanitized) >= 1 && parseInt(sanitized) <= 1010,
        nomeValido: /^[a-z-]+$/.test(sanitized) && sanitized.length >= 2
    };
    
    const erros = [];
    
    if (validacoes.vazio) {
        erros.push('Campo não pode estar vazio');
    }
    
    if (validacoes.muitoLongo) {
        erros.push('Entrada muito longa (máximo 50 caracteres)');
    }
    
    if (validacoes.caracteresInvalidos) {
        erros.push('Apenas letras, números e hífens são permitidos');
    }
    
    if (!validacoes.numeroValido && !validacoes.nomeValido) {
        erros.push('Digite um nome válido ou número entre 1-1010');
    }
    
    const resultado = {
        valido: erros.length === 0,
        entrada: sanitized,
        erros: erros,
        tipo: validacoes.numeroValido ? 'numero' : 'nome'
    };
    
    console.log('✅ Resultado da validação:', resultado);
    
    return resultado;
}

// === EXEMPLOS DE DEMONSTRAÇÃO ===

/**
 * Função principal para executar todos os exemplos
 */
async function executarExemplosCompletos() {
    const titulo = '🚀 Executando Todos os Exemplos';
    exibirResultadoAvancado(titulo, 'Iniciando demonstração completa de todas as funcionalidades...', 'info');
    
    try {
        // Exemplo 1: Múltiplas buscas
        exibirResultadoAvancado('1️⃣ Etapa 1', 'Executando múltiplas buscas...', 'info');
        await exemploMultiplasBuscas();
        
        // Aguardar um pouco entre exemplos
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Exemplo 2: Análise estatística
        exibirResultadoAvancado('2️⃣ Etapa 2', 'Executando análise estatística...', 'info');
        if (typeof pokemonAtual !== 'undefined' && pokemonAtual) {
            exemploAnaliseEstatisticas(pokemonAtual);
        } else {
            exibirResultadoAvancado('⚠️ Aviso', 'Nenhum Pokémon atual para análise. Busque um Pokémon primeiro.', 'warning');
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Exemplo 3: Exportar favoritos
        exibirResultadoAvancado('3️⃣ Etapa 3', 'Executando exportação de favoritos...', 'info');
        exemploExportarFavoritos();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Exemplo 4: Debug do estado
        exibirResultadoAvancado('4️⃣ Etapa 4', 'Executando debug do estado...', 'info');
        debugEstadoAplicacao();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Exemplo 5: Busca com cache
        exibirResultadoAvancado('5️⃣ Etapa 5', 'Executando busca com cache...', 'info');
        await exemploBuscaComCache();
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Exemplo 6: Modo comparação
        exibirResultadoAvancado('6️⃣ Etapa 6', 'Executando modo comparação...', 'info');
        await exemploModoComparacao();
        
        const resumoHtml = `
            <div class="alert alert-success">
                <h5 class="alert-heading"><i class="fas fa-check-circle me-2"></i>Demonstração Completa Finalizada!</h5>
                <hr>
                <p class="mb-0">Todos os exemplos foram executados com sucesso:</p>
                <ul class="mt-2 mb-0">
                    <li>✅ Múltiplas buscas simultâneas</li>
                    <li>✅ Análise estatística comparativa</li>
                    <li>✅ Exportação de favoritos</li>
                    <li>✅ Debug do estado da aplicação</li>
                    <li>✅ Sistema de cache inteligente</li>
                    <li>✅ Modo comparação visual</li>
                </ul>
            </div>
            <div class="text-center mt-3">
                <i class="fas fa-trophy fa-3x text-warning"></i>
                <h4 class="mt-2 text-success">Parabéns! 🎉</h4>
                <p class="text-muted">Você explorou todas as funcionalidades avançadas da aplicação Pokémon!</p>
            </div>
        `;
        
        exibirResultadoAvancado('🎉 Demonstração Concluída', resumoHtml, 'success');
        
    } catch (error) {
        exibirResultadoAvancado('❌ Erro na Execução', `Falha durante a execução dos exemplos: ${error.message}`, 'warning');
    }
}

// === UTILITÁRIOS PARA DESENVOLVIMENTO ===

/**
 * Função para debug - mostra estado atual da aplicação
 */
function debugEstadoAplicacao() {
    const titulo = '🔧 Debug do Estado da Aplicação';
    exibirResultadoAvancado(titulo, 'Coletando informações do estado atual...', 'info');
    
    const estado = {
        favoritos: JSON.parse(localStorage.getItem('pokemon-favoritos') || '[]'),
        historico: JSON.parse(localStorage.getItem('pokemon-historico') || '[]'),
        cache: pokemonCache.getStats(),
        pokemonAtual: typeof pokemonAtual !== 'undefined' ? pokemonAtual : null,
        timestamp: new Date().toISOString()
    };
    
    // Verificar elementos DOM
    const elementos = {
        formulario: document.getElementById('formulario-pokemon'),
        input: document.getElementById('input-pokemon'),
        resultado: document.getElementById('resultado-pokemon'),
        favoritos: document.getElementById('lista-favoritos'),
        historico: document.getElementById('historico-pesquisas')
    };
    
    // Análise de uso do localStorage
    const storageUsage = {
        favoritos: JSON.stringify(estado.favoritos).length,
        historico: JSON.stringify(estado.historico).length,
        cache: JSON.stringify(estado.cache).length
    };
    
    const totalBytes = Object.values(storageUsage).reduce((sum, bytes) => sum + bytes, 0);
    
    const debugHtml = `
        <div class="row">
            <div class="col-md-6">
                <div class="card border-primary mb-3">
                    <div class="card-header bg-primary bg-opacity-10">
                        <h6 class="mb-0"><i class="fas fa-database me-2"></i>Dados Armazenados</h6>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <span><i class="fas fa-heart text-danger me-2"></i>Favoritos:</span>
                            <span class="badge bg-danger">${estado.favoritos.length}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span><i class="fas fa-history text-info me-2"></i>Histórico:</span>
                            <span class="badge bg-info">${estado.historico.length}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span><i class="fas fa-memory text-success me-2"></i>Cache:</span>
                            <span class="badge bg-success">${estado.cache.size}/${estado.cache.maxSize}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span><i class="fas fa-search text-warning me-2"></i>Pokémon Atual:</span>
                            <span class="badge bg-warning">${estado.pokemonAtual ? estado.pokemonAtual.nome : 'Nenhum'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-info mb-3">
                    <div class="card-header bg-info bg-opacity-10">
                        <h6 class="mb-0"><i class="fas fa-hdd me-2"></i>Uso do LocalStorage</h6>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <div class="d-flex justify-content-between">
                                <strong>Total:</strong>
                                <span class="badge bg-primary">${(totalBytes / 1024).toFixed(2)} KB</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="d-flex justify-content-between">
                                <span>Favoritos:</span>
                                <span>${(storageUsage.favoritos / 1024).toFixed(2)} KB</span>
                            </div>
                            <div class="progress" style="height: 6px;">
                                <div class="progress-bar bg-danger" style="width: ${totalBytes > 0 ? (storageUsage.favoritos / totalBytes) * 100 : 0}%"></div>
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="d-flex justify-content-between">
                                <span>Histórico:</span>
                                <span>${(storageUsage.historico / 1024).toFixed(2)} KB</span>
                            </div>
                            <div class="progress" style="height: 6px;">
                                <div class="progress-bar bg-info" style="width: ${totalBytes > 0 ? (storageUsage.historico / totalBytes) * 100 : 0}%"></div>
                            </div>
                        </div>
                        <div class="mb-2">
                            <div class="d-flex justify-content-between">
                                <span>Cache:</span>
                                <span>${(storageUsage.cache / 1024).toFixed(2)} KB</span>
                            </div>
                            <div class="progress" style="height: 6px;">
                                <div class="progress-bar bg-success" style="width: ${totalBytes > 0 ? (storageUsage.cache / totalBytes) * 100 : 0}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card border-secondary">
            <div class="card-header bg-secondary bg-opacity-10">
                <h6 class="mb-0"><i class="fas fa-cogs me-2"></i>Elementos DOM</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    ${Object.entries(elementos).map(([nome, elemento]) => `
                        <div class="col-md-6 mb-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-capitalize">${nome}:</span>
                                <span class="badge ${elemento ? 'bg-success' : 'bg-danger'}">
                                    <i class="fas fa-${elemento ? 'check' : 'times'} me-1"></i>
                                    ${elemento ? 'Encontrado' : 'Não encontrado'}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="card border-warning mt-3">
            <div class="card-header bg-warning bg-opacity-10">
                <h6 class="mb-0"><i class="fas fa-clock me-2"></i>Informações da Sessão</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6">
                        <strong>Timestamp:</strong><br>
                        <small class="text-muted">${new Date(estado.timestamp).toLocaleString()}</small>
                    </div>
                    <div class="col-sm-6">
                        <strong>Status:</strong><br>
                        <span class="badge bg-success"><i class="fas fa-check me-1"></i>Aplicação Ativa</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    exibirResultadoAvancado('📊 Estado Atual da Aplicação', debugHtml, 'success');
    
    // Também exibir no console para debug
    console.log('🔧 DEBUG - Estado da Aplicação');
    console.log('==============================');
    console.log('📊 Pokémon Atual:', estado.pokemonAtual?.nome || 'Nenhum');
    console.log('❤️ Favoritos:', estado.favoritos.length);
    console.log('🕒 Histórico:', estado.historico.length);
    console.log('📦 Cache:', estado.cache);
    
    return estado;
}

// === EXPORTAR FUNÇÕES PARA USO GLOBAL ===

// Tornar funções disponíveis globalmente para teste
if (typeof window !== 'undefined') {
    window.exemplosFuncoes = {
        exemploMultiplasBuscas,
        exemploFiltrarPorTipo,
        exemploAnaliseEstatisticas,
        exemploExportarFavoritos,
        exemploImportarFavoritos,
        exemploModoComparacao,
        exemploBuscaComCache,
        exemploValidacaoEntrada,
        executarExemplosCompletos,
        debugEstadoAplicacao,
        pokemonCache
    };
    
    console.log('🎯 Exemplos carregados! Use window.exemplosFuncoes para acessar.');
}

// === INICIALIZAÇÃO DOS EXEMPLOS ===

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Exemplos de uso carregados!');
    console.log('💡 Digite "executarExemplosCompletos()" no console para ver demonstrações.');
    console.log('🔧 Digite "debugEstadoAplicacao()" para verificar o estado da aplicação.');
});

/* 
   INSTRUÇÕES DE USO:
   
   1. Abra o console do navegador (F12)
   2. Execute: executarExemplosCompletos()
   3. Teste funções individuais:
      - exemploValidacaoEntrada('pikachu')
      - debugEstadoAplicacao()
      - pokemonCache.getStats()
   
   4. Para testar comparação:
      - Busque dois Pokémon primeiro
      - Execute: exemploModoComparacao(pokemon1, pokemon2)
   
   5. Para exportar favoritos:
      - Adicione alguns favoritos
      - Execute: exemploExportarFavoritos()
*/