// Configurações da API do GitHub (carregadas do config.js)
// Fallback para caso o config.js não esteja disponível
const GITHUB_CONFIG = window.CONFIG?.github || {
    username: 'Estebanjgg',
    apiUrl: 'https://api.github.com',
    perPage: 6,
    showForks: false,
    sortBy: 'updated',
    order: 'desc'
};

// Estado da aplicação
const appState = {
    formData: {},
    repositories: [],
    isLoading: false,
    errors: []
};

// Utilitários de validação
const validators = {
    // Validar se o campo não está vazio
    required: (value) => {
        return value && value.trim().length > 0;
    },
    
    // Validar email
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    
    // Validar telefone (formato brasileiro)
    phone: (value) => {
        if (!value) return true; // Campo opcional
        const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
        return phoneRegex.test(value.replace(/\D/g, ''));
    },
    
    // Validar nome (mínimo 2 palavras)
    fullName: (value) => {
        if (!value) return false;
        const words = value.trim().split(' ').filter(word => word.length > 0);
        return words.length >= 2 && words.every(word => word.length >= 2);
    },
    
    // Validar mensagem (mínimo 10 caracteres)
    message: (value) => {
        return value && value.trim().length >= 10;
    }
};

// Mensagens de erro personalizadas (carregadas do config.js)
const errorMessages = window.ERROR_MESSAGES?.validation || {
    nome: {
        required: 'Nome completo é obrigatório',
        fullName: 'Por favor, informe nome e sobrenome (mínimo 2 palavras)'
    },
    email: {
        required: 'Email é obrigatório',
        email: 'Por favor, informe um email válido (ex: usuario@exemplo.com)'
    },
    telefone: {
        phone: 'Por favor, informe um telefone válido (ex: (11) 99999-9999)'
    },
    assunto: {
        required: 'Por favor, selecione um assunto'
    },
    mensagem: {
        required: 'Mensagem é obrigatória',
        message: 'A mensagem deve ter pelo menos 10 caracteres'
    },
    termos: {
        required: 'Você deve concordar com os termos para continuar'
    }
};

// Classe para gerenciar validação do formulário
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.isValid = false;
        this.init();
    }
    
    init() {
        if (!this.form) {
            console.error('Formulário não encontrado');
            return;
        }
        
        this.setupFields();
        this.attachEventListeners();
    }
    
    setupFields() {
        // Configurar campos com suas regras de validação
        this.fields = {
            nome: {
                element: this.form.querySelector('#nome'),
                rules: ['required', 'fullName'],
                realTime: true
            },
            email: {
                element: this.form.querySelector('#email'),
                rules: ['required', 'email'],
                realTime: true
            },
            telefone: {
                element: this.form.querySelector('#telefone'),
                rules: ['phone'],
                realTime: true
            },
            assunto: {
                element: this.form.querySelector('#assunto'),
                rules: ['required'],
                realTime: false
            },
            mensagem: {
                element: this.form.querySelector('#mensagem'),
                rules: ['required', 'message'],
                realTime: true
            },
            termos: {
                element: this.form.querySelector('#termos'),
                rules: ['required'],
                realTime: false
            }
        };
    }
    
    attachEventListeners() {
        // Event listener para submit do formulário
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Event listeners para validação em tempo real
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field.element) {
                // Validação em tempo real para campos específicos
                if (field.realTime) {
                    field.element.addEventListener('blur', () => {
                        this.validateField(fieldName);
                    });
                    
                    field.element.addEventListener('input', () => {
                        // Remover estado de erro enquanto digita
                        this.clearFieldError(fieldName);
                    });
                }
                
                // Validação para todos os campos no change
                field.element.addEventListener('change', () => {
                    this.validateField(fieldName);
                });
            }
        });
        
        // Event listener para botão limpar
        const btnLimpar = document.getElementById('btn-limpar');
        if (btnLimpar) {
            btnLimpar.addEventListener('click', () => {
                this.clearForm();
            });
        }
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        if (!field || !field.element) return true;
        
        const value = field.element.type === 'checkbox' ? field.element.checked : field.element.value;
        let isValid = true;
        let errorMessage = '';
        
        // Executar todas as regras de validação
        for (const rule of field.rules) {
            if (rule === 'required') {
                if (field.element.type === 'checkbox') {
                    if (!value) {
                        isValid = false;
                        errorMessage = errorMessages[fieldName]?.required || 'Campo obrigatório';
                        break;
                    }
                } else {
                    if (!validators.required(value)) {
                        isValid = false;
                        errorMessage = errorMessages[fieldName]?.required || 'Campo obrigatório';
                        break;
                    }
                }
            } else if (validators[rule]) {
                if (!validators[rule](value)) {
                    isValid = false;
                    errorMessage = errorMessages[fieldName]?.[rule] || 'Valor inválido';
                    break;
                }
            }
        }
        
        // Aplicar estado visual
        this.setFieldState(fieldName, isValid, errorMessage);
        
        return isValid;
    }
    
    setFieldState(fieldName, isValid, errorMessage = '') {
        const field = this.fields[fieldName];
        if (!field || !field.element) return;
        
        const element = field.element;
        const feedbackElement = element.parentNode.querySelector('.invalid-feedback');
        
        // Remover classes anteriores
        element.classList.remove('is-valid', 'is-invalid');
        
        if (isValid) {
            element.classList.add('is-valid');
            if (feedbackElement) {
                feedbackElement.style.display = 'none';
            }
        } else {
            element.classList.add('is-invalid');
            if (feedbackElement) {
                feedbackElement.textContent = errorMessage;
                feedbackElement.style.display = 'block';
            }
        }
    }
    
    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (!field || !field.element) return;
        
        field.element.classList.remove('is-invalid');
        const feedbackElement = field.element.parentNode.querySelector('.invalid-feedback');
        if (feedbackElement) {
            feedbackElement.style.display = 'none';
        }
    }
    
    validateForm() {
        let isFormValid = true;
        const errors = [];
        
        // Validar todos os campos
        Object.keys(this.fields).forEach(fieldName => {
            const isFieldValid = this.validateField(fieldName);
            if (!isFieldValid) {
                isFormValid = false;
                errors.push(fieldName);
            }
        });
        
        this.isValid = isFormValid;
        appState.errors = errors;
        
        return isFormValid;
    }
    
    getFormData() {
        const data = {};
        
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field.element) {
                if (field.element.type === 'checkbox') {
                    data[fieldName] = field.element.checked;
                } else {
                    data[fieldName] = field.element.value.trim();
                }
            }
        });
        
        return data;
    }
    
    clearForm() {
        // Limpar todos os campos
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field.element) {
                if (field.element.type === 'checkbox') {
                    field.element.checked = false;
                } else {
                    field.element.value = '';
                }
                
                // Remover estados de validação
                field.element.classList.remove('is-valid', 'is-invalid');
                const feedbackElement = field.element.parentNode.querySelector('.invalid-feedback');
                if (feedbackElement) {
                    feedbackElement.style.display = 'none';
                }
            }
        });
        
        // Esconder mensagem de sucesso
        const successMessage = document.getElementById('mensagem-sucesso');
        if (successMessage) {
            successMessage.classList.add('d-none');
        }
        
        console.log('✅ Formulário limpo com sucesso');
    }
    
    async handleSubmit() {
        console.log('📝 Iniciando validação do formulário...');
        
        // Validar formulário
        if (!this.validateForm()) {
            console.log('❌ Formulário inválido:', appState.errors);
            this.showValidationErrors();
            return;
        }
        
        // Obter dados do formulário
        const formData = this.getFormData();
        appState.formData = formData;
        
        console.log('✅ Formulário válido! Dados:', formData);
        
        // Simular envio (aqui você integraria com um backend real)
        await this.simulateFormSubmission(formData);
    }
    
    showValidationErrors() {
        // Focar no primeiro campo com erro
        const firstErrorField = appState.errors[0];
        if (firstErrorField && this.fields[firstErrorField]?.element) {
            this.fields[firstErrorField].element.focus();
            
            // Scroll suave até o campo
            this.fields[firstErrorField].element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
        
        // Mostrar toast com erro geral
        this.showToast('Por favor, corrija os erros no formulário antes de enviar.', 'error');
    }
    
    async simulateFormSubmission(data) {
        const btnEnviar = document.getElementById('btn-enviar');
        const originalText = btnEnviar.innerHTML;
        
        try {
            // Mostrar loading
            btnEnviar.disabled = true;
            btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            
            // Simular delay usando configurações
            const config = window.CONFIG?.form?.simulation || { delay: 2000, successRate: 0.9 };
            await new Promise(resolve => setTimeout(resolve, config.delay));
            
            // Simular sucesso baseado na taxa de sucesso configurada
            const success = Math.random() < config.successRate;
            
            if (success) {
                this.showSuccessMessage(data);
                this.clearForm();
                console.log('✅ Mensagem enviada com sucesso!');
            } else {
                throw new Error('Erro simulado no servidor');
            }
            
        } catch (error) {
            console.error('❌ Erro ao enviar formulário:', error);
            this.showToast('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            // Restaurar botão
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = originalText;
        }
    }
    
    showSuccessMessage(data) {
        const successMessage = document.getElementById('mensagem-sucesso');
        if (successMessage) {
            successMessage.classList.remove('d-none');
            
            // Scroll até a mensagem
            successMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Auto-hide após 5 segundos
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 5000);
        }
        
        this.showToast('Mensagem enviada com sucesso!', 'success');
    }
    
    showToast(message, type = 'info') {
        const toastConfig = window.CONFIG?.ui?.toasts || { 
            position: 'top-right', 
            autoHide: true, 
            delay: 4000 
        };
        
        // Criar toast dinâmico
        const toastContainer = document.createElement('div');
        const positionStyle = toastConfig.position === 'top-right' ? 'top: 20px; right: 20px;' : 
                             toastConfig.position === 'top-left' ? 'top: 20px; left: 20px;' :
                             toastConfig.position === 'bottom-right' ? 'bottom: 20px; right: 20px;' :
                             'bottom: 20px; left: 20px;';
        
        toastContainer.style.cssText = `
            position: fixed;
            ${positionStyle}
            z-index: 9999;
            max-width: 350px;
        `;
        
        const toastClass = type === 'success' ? 'alert-success' : type === 'error' ? 'alert-danger' : 'alert-info';
        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle';
        
        toastContainer.innerHTML = `
            <div class="alert ${toastClass} alert-dismissible fade show" role="alert">
                <i class="fas fa-${icon} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.appendChild(toastContainer);
        
        // Auto-remove usando configuração
        if (toastConfig.autoHide) {
            setTimeout(() => {
                if (toastContainer.parentNode) {
                    toastContainer.remove();
                }
            }, toastConfig.delay);
        }
    }
}

// Classe para gerenciar integração com GitHub API
class GitHubAPI {
    constructor(username) {
        this.username = username;
        this.baseUrl = GITHUB_CONFIG.apiUrl;
    }
    
    async fetchRepositories() {
        try {
            console.log(`🔍 Buscando repositórios do usuário: ${this.username}`);
            
            const response = await fetch(
                `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=${GITHUB_CONFIG.perPage}&type=public`
            );
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
            }
            
            const repositories = await response.json();
            
            // Filtrar e processar repositórios
            const processedRepos = repositories
                .filter(repo => !repo.fork) // Excluir forks
                .map(repo => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || 'Sem descrição disponível',
                    html_url: repo.html_url,
                    language: repo.language,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updated_at: repo.updated_at,
                    topics: repo.topics || [],
                    homepage: repo.homepage
                }));
            
            console.log(`✅ ${processedRepos.length} repositórios carregados`);
            return processedRepos;
            
        } catch (error) {
            console.error('❌ Erro ao buscar repositórios:', error);
            throw error;
        }
    }
    
    async fetchUserProfile() {
        try {
            const response = await fetch(`${this.baseUrl}/users/${this.username}`);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            const profile = await response.json();
            console.log('✅ Perfil do usuário carregado:', profile.name || profile.login);
            
            return {
                name: profile.name || profile.login,
                bio: profile.bio,
                avatar_url: profile.avatar_url,
                public_repos: profile.public_repos,
                followers: profile.followers,
                following: profile.following,
                location: profile.location,
                blog: profile.blog,
                company: profile.company
            };
            
        } catch (error) {
            console.error('❌ Erro ao buscar perfil:', error);
            throw error;
        }
    }
}

// Classe para renderizar projetos
class ProjectRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.loadingElement = document.getElementById('loading-projetos');
        this.errorElement = document.getElementById('error-projetos');
    }
    
    showLoading() {
        if (this.loadingElement) this.loadingElement.classList.remove('d-none');
        if (this.container) this.container.classList.add('d-none');
        if (this.errorElement) this.errorElement.classList.add('d-none');
    }
    
    showError(message) {
        if (this.loadingElement) this.loadingElement.classList.add('d-none');
        if (this.container) this.container.classList.add('d-none');
        if (this.errorElement) {
            this.errorElement.classList.remove('d-none');
            const errorMessageElement = this.errorElement.querySelector('#error-message');
            if (errorMessageElement) {
                errorMessageElement.textContent = message;
            }
        }
    }
    
    showProjects(repositories) {
        if (this.loadingElement) this.loadingElement.classList.add('d-none');
        if (this.errorElement) this.errorElement.classList.add('d-none');
        if (this.container) {
            this.container.classList.remove('d-none');
            this.renderProjects(repositories);
        }
    }
    
    renderProjects(repositories) {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        repositories.forEach((repo, index) => {
            const projectCard = this.createProjectCard(repo, index);
            this.container.appendChild(projectCard);
        });
    }
    
    createProjectCard(repo, index) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        col.style.animationDelay = `${index * 0.1}s`;
        
        const languageColor = this.getLanguageColor(repo.language);
        const updatedDate = new Date(repo.updated_at).toLocaleDateString('pt-BR');
        
        col.innerHTML = `
            <div class="projeto-card card h-100">
                <div class="projeto-header">
                    <div class="d-flex justify-content-between align-items-start">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-folder-open me-2"></i>
                            ${repo.name}
                        </h5>
                        ${repo.language ? `
                            <span class="badge" style="background-color: ${languageColor}; color: white;">
                                ${repo.language}
                            </span>
                        ` : ''}
                    </div>
                    
                    <div class="projeto-stats">
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <span>${repo.stars}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-code-branch"></i>
                            <span>${repo.forks}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-calendar"></i>
                            <span>${updatedDate}</span>
                        </div>
                    </div>
                </div>
                
                <div class="projeto-body card-body">
                    <p class="projeto-description">${repo.description}</p>
                    
                    ${repo.topics.length > 0 ? `
                        <div class="projeto-topics">
                            ${repo.topics.map(topic => 
                                `<span class="topic-badge">${topic}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="projeto-actions">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="fab fa-github me-1"></i>Ver Código
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-external-link-alt me-1"></i>Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        return col;
    }
    
    getLanguageColor(language) {
        return window.ConfigUtils?.getLanguageColor(language) || 
               window.CONFIG?.ui?.languageColors?.[language] || 
               '#6c757d';
    }
}

// Función para cargar el avatar de GitHub
async function loadGitHubAvatar(githubAPI) {
    try {
        const avatarImg = document.getElementById('github-avatar');
        const avatarSpinner = document.getElementById('avatar-spinner');
        const fallbackIcon = document.getElementById('fallback-icon');
        
        if (!avatarImg) return;
        
        // Mostrar spinner de carga
        if (avatarSpinner) avatarSpinner.classList.remove('d-none');
        if (fallbackIcon) fallbackIcon.classList.add('d-none');
        
        // Obtener perfil del usuario
        const userProfile = await githubAPI.fetchUserProfile();
        
        if (userProfile && userProfile.avatar_url) {
            // Configurar la imagen del avatar
            avatarImg.src = userProfile.avatar_url;
            avatarImg.alt = `Avatar de ${userProfile.name || userProfile.login}`;
            avatarImg.title = `${userProfile.name || userProfile.login} - ${userProfile.bio || 'Desarrollador'}`;
            
            // Mostrar imagen cuando se cargue
            avatarImg.onload = () => {
                if (avatarSpinner) avatarSpinner.classList.add('d-none');
                avatarImg.classList.remove('d-none');
                console.log('✅ Avatar de GitHub cargado exitosamente');
            };
            
            // Manejar error de carga de imagen
            avatarImg.onerror = () => {
                if (avatarSpinner) avatarSpinner.classList.add('d-none');
                if (fallbackIcon) fallbackIcon.classList.remove('d-none');
                console.warn('⚠️ Error al cargar avatar, usando icono por defecto');
            };
            
        } else {
            throw new Error('Avatar URL no disponible');
        }
        
    } catch (error) {
        console.warn('⚠️ Error al cargar avatar de GitHub:', error.message);
        
        // Mostrar icono por defecto en caso de error
        const avatarImg = document.getElementById('github-avatar');
        const avatarSpinner = document.getElementById('avatar-spinner');
        const fallbackIcon = document.getElementById('fallback-icon');
        
        if (avatarImg) avatarImg.classList.add('d-none');
        if (avatarSpinner) avatarSpinner.classList.add('d-none');
        if (fallbackIcon) fallbackIcon.classList.remove('d-none');
    }
}

// Função principal de inicialização
async function initializeApp() {
    console.log('🚀 Inicializando aplicação...');
    
    try {
        // Inicializar validador do formulário
        const formValidator = new FormValidator('formulario-contato');
        console.log('✅ Validador de formulário inicializado');
        
        // Inicializar GitHub API e renderizador
        const githubAPI = new GitHubAPI(GITHUB_CONFIG.username);
        const projectRenderer = new ProjectRenderer('projetos-container');
        
        // Carregar avatar de GitHub
        await loadGitHubAvatar(githubAPI);
        
        // Carregar projetos do GitHub
        await loadGitHubProjects(githubAPI, projectRenderer);
        
        // Configurar navegação suave
        setupSmoothNavigation();
        
        console.log('✅ Aplicação inicializada com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro ao inicializar aplicação:', error);
    }
}

// Função para carregar projetos do GitHub
async function loadGitHubProjects(githubAPI, projectRenderer) {
    try {
        projectRenderer.showLoading();
        
        const repositories = await githubAPI.fetchRepositories();
        appState.repositories = repositories;
        
        if (repositories.length === 0) {
            projectRenderer.showError('Nenhum repositório público encontrado.');
        } else {
            projectRenderer.showProjects(repositories);
        }
        
    } catch (error) {
        const errorMessage = error.message.includes('404') 
            ? 'Usuário não encontrado no GitHub.' 
            : 'Erro ao carregar repositórios. Verifique sua conexão.';
            
        projectRenderer.showError(errorMessage);
    }
}

// Configurar navegação suave
function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Event listeners para quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeApp);

// Exportar para uso global (para debugging)
window.appState = appState;
window.validators = validators;

// Log de inicialização
console.log('📋 Script carregado - Projeto JavaScript Portfolio');
console.log('👨‍💻 Desenvolvido por: Esteban Jose Gonzalez Gomez');
console.log('🔗 GitHub: https://github.com/Estebanjgg');
console.log('📚 Funcionalidades: Validação de formulário + Integração GitHub API');