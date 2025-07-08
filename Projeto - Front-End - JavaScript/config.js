/**
 * CONFIGURAÇÕES DO PROJETO JAVASCRIPT
 * 
 * Este arquivo contém todas as configurações centralizadas
 * do projeto para facilitar manutenção e personalização.
 */

// ========================================
// CONFIGURAÇÕES GERAIS
// ========================================

const CONFIG = {
    // Informações do desenvolvedor
    developer: {
        name: 'Esteban Jose Gonzalez Gomez',
        github: 'Estebanjgg',
        email: 'contato@exemplo.com',
        linkedin: '#',
        twitter: '#'
    },
    
    // Configurações do GitHub
    github: {
        username: 'Estebanjgg',
        apiUrl: 'https://api.github.com',
        perPage: 6,
        showForks: false,
        sortBy: 'updated', // updated, created, pushed, full_name
        order: 'desc'      // asc, desc
    },
    
    // Configurações do formulário
    form: {
        // Validação
        validation: {
            realTimeValidation: true,
            showSuccessStates: true,
            focusOnError: true,
            scrollToError: true
        },
        
        // Mensagens de sucesso
        successMessages: {
            default: 'Mensagem enviada com sucesso!',
            autoHide: true,
            autoHideDelay: 5000
        },
        
        // Simulação de envio
        simulation: {
            enabled: true,
            delay: 2000,
            successRate: 0.9 // 90% de sucesso
        }
    },
    
    // Configurações de UI
    ui: {
        // Animações
        animations: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
        },
        
        // Toasts
        toasts: {
            position: 'top-right',
            autoHide: true,
            delay: 4000
        },
        
        // Loading
        loading: {
            showSpinner: true,
            showText: true,
            text: 'Carregando...'
        },
        
        // Cores por linguagem de programação
        languageColors: {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'C#': '#239120',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'HTML': '#e34c26',
            'CSS': '#1572B6',
            'Vue': '#4FC08D',
            'React': '#61DAFB',
            'Angular': '#DD0031',
            'Node.js': '#339933',
            'Express': '#000000',
            'MongoDB': '#47A248',
            'MySQL': '#4479A1',
            'PostgreSQL': '#336791',
            'Docker': '#2496ED',
            'Kubernetes': '#326CE5'
        }
    },
    
    // Configurações de performance
    performance: {
        // Cache
        cache: {
            enabled: true,
            duration: 300000, // 5 minutos
            maxSize: 50
        },
        
        // Debounce para validação
        debounce: {
            enabled: true,
            delay: 300
        }
    },
    
    // Configurações de acessibilidade
    accessibility: {
        highContrast: false,
        reducedMotion: false,
        screenReader: true
    },
    
    // Configurações de desenvolvimento
    development: {
        debug: true,
        verbose: true,
        showPerformanceMetrics: false
    }
};

// ========================================
// MENSAGENS DE ERRO PERSONALIZADAS
// ========================================

const ERROR_MESSAGES = {
    // Validação de formulário
    validation: {
        nome: {
            required: 'Nome completo é obrigatório',
            fullName: 'Por favor, informe nome e sobrenome (mínimo 2 palavras)',
            minLength: 'Nome deve ter pelo menos 2 caracteres',
            maxLength: 'Nome não pode exceder 100 caracteres'
        },
        email: {
            required: 'Email é obrigatório',
            email: 'Por favor, informe um email válido (ex: usuario@exemplo.com)',
            maxLength: 'Email não pode exceder 255 caracteres'
        },
        telefone: {
            phone: 'Por favor, informe um telefone válido (ex: (11) 99999-9999)',
            minLength: 'Telefone deve ter pelo menos 10 dígitos'
        },
        empresa: {
            maxLength: 'Nome da empresa não pode exceder 100 caracteres'
        },
        assunto: {
            required: 'Por favor, selecione um assunto'
        },
        mensagem: {
            required: 'Mensagem é obrigatória',
            message: 'A mensagem deve ter pelo menos 10 caracteres',
            maxLength: 'Mensagem não pode exceder 1000 caracteres'
        },
        termos: {
            required: 'Você deve concordar com os termos para continuar'
        }
    },
    
    // Erros de API
    api: {
        github: {
            userNotFound: 'Usuário não encontrado no GitHub',
            networkError: 'Erro de conexão. Verifique sua internet',
            rateLimit: 'Limite de requisições excedido. Tente novamente em alguns minutos',
            serverError: 'Erro interno do servidor GitHub',
            timeout: 'Tempo limite de requisição excedido',
            noRepositories: 'Nenhum repositório público encontrado'
        },
        
        form: {
            submitError: 'Erro ao enviar formulário. Tente novamente',
            validationError: 'Por favor, corrija os erros no formulário',
            networkError: 'Erro de conexão. Verifique sua internet'
        }
    },
    
    // Erros gerais
    general: {
        unknownError: 'Erro desconhecido. Tente novamente',
        notSupported: 'Funcionalidade não suportada neste navegador',
        permissionDenied: 'Permissão negada'
    }
};

// ========================================
// MENSAGENS DE SUCESSO
// ========================================

const SUCCESS_MESSAGES = {
    form: {
        submitted: 'Mensagem enviada com sucesso!',
        validated: 'Formulário validado com sucesso',
        cleared: 'Formulário limpo'
    },
    
    api: {
        repositoriesLoaded: 'Repositórios carregados com sucesso',
        profileLoaded: 'Perfil carregado com sucesso'
    }
};

// ========================================
// CONFIGURAÇÕES DE TEMA
// ========================================

const THEME = {
    colors: {
        primary: '#0d6efd',
        secondary: '#6c757d',
        success: '#198754',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#0dcaf0',
        light: '#f8f9fa',
        dark: '#212529'
    },
    
    gradients: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        card: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    },
    
    shadows: {
        sm: '0 2px 4px rgba(0,0,0,0.1)',
        md: '0 4px 8px rgba(0,0,0,0.1)',
        lg: '0 8px 16px rgba(0,0,0,0.1)',
        xl: '0 16px 32px rgba(0,0,0,0.1)'
    },
    
    borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem'
    }
};

// ========================================
// UTILITÁRIOS DE CONFIGURAÇÃO
// ========================================

const ConfigUtils = {
    // Obter configuração por caminho (ex: 'github.username')
    get(path) {
        return path.split('.').reduce((obj, key) => obj && obj[key], CONFIG);
    },
    
    // Definir configuração por caminho
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => obj[key] = obj[key] || {}, CONFIG);
        target[lastKey] = value;
    },
    
    // Verificar se está em modo de desenvolvimento
    isDevelopment() {
        return CONFIG.development.debug;
    },
    
    // Obter cor da linguagem
    getLanguageColor(language) {
        return CONFIG.ui.languageColors[language] || '#6c757d';
    },
    
    // Verificar se animações estão habilitadas
    areAnimationsEnabled() {
        return CONFIG.ui.animations.enabled && !CONFIG.accessibility.reducedMotion;
    },
    
    // Obter configurações de validação
    getValidationConfig() {
        return CONFIG.form.validation;
    },
    
    // Obter configurações do GitHub
    getGitHubConfig() {
        return CONFIG.github;
    },
    
    // Aplicar tema escuro
    applyDarkTheme() {
        document.body.classList.add('dark-theme');
        CONFIG.accessibility.highContrast = true;
    },
    
    // Aplicar tema claro
    applyLightTheme() {
        document.body.classList.remove('dark-theme');
        CONFIG.accessibility.highContrast = false;
    },
    
    // Detectar preferências do sistema
    detectSystemPreferences() {
        // Detectar modo escuro
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.applyDarkTheme();
        }
        
        // Detectar preferência por movimento reduzido
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            CONFIG.accessibility.reducedMotion = true;
            CONFIG.ui.animations.enabled = false;
        }
    },
    
    // Salvar configurações no localStorage
    save() {
        try {
            localStorage.setItem('portfolio-config', JSON.stringify(CONFIG));
            console.log('✅ Configurações salvas');
        } catch (error) {
            console.warn('⚠️ Erro ao salvar configurações:', error);
        }
    },
    
    // Carregar configurações do localStorage
    load() {
        try {
            const saved = localStorage.getItem('portfolio-config');
            if (saved) {
                const savedConfig = JSON.parse(saved);
                Object.assign(CONFIG, savedConfig);
                console.log('✅ Configurações carregadas');
            }
        } catch (error) {
            console.warn('⚠️ Erro ao carregar configurações:', error);
        }
    },
    
    // Reset para configurações padrão
    reset() {
        localStorage.removeItem('portfolio-config');
        location.reload();
    }
};

// ========================================
// INICIALIZAÇÃO
// ========================================

// Carregar configurações salvas
ConfigUtils.load();

// Detectar preferências do sistema
ConfigUtils.detectSystemPreferences();

// Exportar para uso global
window.CONFIG = CONFIG;
window.ERROR_MESSAGES = ERROR_MESSAGES;
window.SUCCESS_MESSAGES = SUCCESS_MESSAGES;
window.THEME = THEME;
window.ConfigUtils = ConfigUtils;

// Log de inicialização
if (CONFIG.development.debug) {
    console.log('⚙️ Configurações carregadas:', CONFIG);
    console.log('🎨 Tema aplicado:', THEME);
    console.log('📝 Mensagens configuradas');
}

// Aplicar configurações CSS customizadas
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color: ${THEME.colors.primary};
            --secondary-color: ${THEME.colors.secondary};
            --success-color: ${THEME.colors.success};
            --danger-color: ${THEME.colors.danger};
            --warning-color: ${THEME.colors.warning};
            --info-color: ${THEME.colors.info};
            --light-color: ${THEME.colors.light};
            --dark-color: ${THEME.colors.dark};
            
            --primary-gradient: ${THEME.gradients.primary};
            --hero-gradient: ${THEME.gradients.hero};
            --card-gradient: ${THEME.gradients.card};
            
            --shadow-sm: ${THEME.shadows.sm};
            --shadow-md: ${THEME.shadows.md};
            --shadow-lg: ${THEME.shadows.lg};
            --shadow-xl: ${THEME.shadows.xl};
            
            --border-radius-sm: ${THEME.borderRadius.sm};
            --border-radius-md: ${THEME.borderRadius.md};
            --border-radius-lg: ${THEME.borderRadius.lg};
            --border-radius-xl: ${THEME.borderRadius.xl};
            
            --animation-duration: ${CONFIG.ui.animations.duration}ms;
            --animation-easing: ${CONFIG.ui.animations.easing};
        }
        
        ${CONFIG.accessibility.reducedMotion ? `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        ` : ''}
    `;
    
    document.head.appendChild(style);
}