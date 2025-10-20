// ================================
// CONFIGURAÇÃO E DADOS
// ================================

// Dados dos projetos (30 projetos prontos para popular com imagens reais)
// CAMINHOS ADAPTADOS para /images/
const projetos = [
    { id: 1, titulo: 'Projeto 01', antes: 'images/antes1.jpg', depois: 'images/depois1.jpg' },
    { id: 2, titulo: 'Projeto 02', antes: 'images/antes2.jpg', depois: 'images/depois2.jpg' },
    { id: 3, titulo: 'Projeto 03', antes: 'images/antes3.jpg', depois: 'images/depois3.jpg' },
    { id: 4, titulo: 'Projeto 04', antes: 'images/antes4.jpg', depois: 'images/depois4.jpg' },
    { id: 5, titulo: 'Projeto 05', antes: 'images/antes5.jpg', depois: 'images/depois5.jpg' },
    { id: 6, titulo: 'Projeto 06', antes: 'images/antes6.jpg', depois: 'images/depois6.jpg' },
    { id: 7, titulo: 'Projeto 07', antes: 'images/antes7.jpg', depois: 'images/depois7.jpg' },
    { id: 8, titulo: 'Projeto 08', antes: 'images/antes8.jpg', depois: 'images/depois8.jpg' },
    { id: 9, titulo: 'Projeto 09', antes: 'images/antes9.jpg', depois: 'images/depois9.jpg' },
    { id: 10, titulo: 'Projeto 10', antes: 'images/antes10.jpg', depois: 'images/depois10.jpg' },
    { id: 11, titulo: 'Projeto 11', antes: 'images/antes11.jpg', depois: 'images/depois11.jpg' },
    { id: 12, titulo: 'Projeto 12', antes: 'images/antes12.jpg', depois: 'images/depois12.jpg' },
    { id: 13, titulo: 'Projeto 13', antes: 'images/antes13.jpg', depois: 'images/depois13.jpg' },
    { id: 14, titulo: 'Projeto 14', antes: 'images/antes14.jpg', depois: 'images/depois14.jpg' },
    { id: 15, titulo: 'Projeto 15', antes: 'images/antes15.jpg', depois: 'images/depois15.jpg' },
    { id: 16, titulo: 'Projeto 16', antes: 'images/antes16.jpg', depois: 'images/depois16.jpg' },
    { id: 17, titulo: 'Projeto 17', antes: 'images/antes17.jpg', depois: 'images/depois17.jpg' },
    { id: 18, titulo: 'Projeto 18', antes: 'images/antes18.jpg', depois: 'images/depois18.jpg' },
    { id: 19, titulo: 'Projeto 19', antes: 'images/antes19.jpg', depois: 'images/depois19.jpg' },
    { id: 20, titulo: 'Projeto 20', antes: 'images/antes20.jpg', depois: 'images/depois20.jpg' },
    { id: 21, titulo: 'Projeto 21', antes: 'images/antes21.jpg', depois: 'images/depois21.jpg' },
    { id: 22, titulo: 'Projeto 22', antes: 'images/antes22.jpg', depois: 'images/depois22.jpg' },
    { id: 23, titulo: 'Projeto 23', antes: 'images/antes23.jpg', depois: 'images/depois23.jpg' },
    { id: 24, titulo: 'Projeto 24', antes: 'images/antes24.jpg', depois: 'images/depois24.jpg' },
    { id: 25, titulo: 'Projeto 25', antes: 'images/antes25.jpg', depois: 'images/depois25.jpg' },
    { id: 26, titulo: 'Projeto 26', antes: 'images/antes26.jpg', depois: 'images/depois26.jpg' },
    { id: 27, titulo: 'Projeto 27', antes: 'images/antes27.jpg', depois: 'images/depois27.jpg' },
    { id: 28, titulo: 'Projeto 28', antes: 'images/antes28.jpg', depois: 'images/depois28.jpg' },
    { id: 29, titulo: 'Projeto 29', antes: 'images/antes29.jpg', depois: 'images/depois29.jpg' },
    { id: 30, titulo: 'Projeto 30', antes: 'images/antes30.jpg', depois: 'images/depois30.jpg' }
];

let currentProjectIndex = 0;
let currentView = 'depois'; // 'antes' ou 'depois'

// ================================
// INICIALIZAÇÃO
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initProjetos();
    initNavigation();
    initScrollEffects();
    initModal();
    initAOS();
    initLazyLoad();
});

// ================================
// RENDERIZAÇÃO DOS PROJETOS
// ================================
function initProjetos() {
    const grid = document.getElementById('projetosGrid');
    
    projetos.forEach((projeto, index) => {
        const card = createProjetoCard(projeto, index);
        grid.appendChild(card);
    });
}

function createProjetoCard(projeto, index) {
    const card = document.createElement('div');
    card.className = 'projeto-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.setAttribute('data-testid', `projeto-card-${projeto.id}`);
    
    card.innerHTML = `
        <div class="projeto-image-wrapper">
            <img 
                src="${projeto.depois}" 
                alt="${projeto.titulo}" 
                class="projeto-image"
                data-lazy="${projeto.depois}"
                loading="lazy"
            >
            <div class="projeto-badge">Depois</div>
        </div>
        <div class="projeto-info">
            <h3 class="projeto-title">${projeto.titulo}</h3>
        </div>
    `;
    
    // Adicionar evento de clique
    card.addEventListener('click', () => {
        openModal(index);
    });
    
    return card;
}

// ================================
// NAVEGAÇÃO
// ================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Menu mobile toggle
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Atualizar link ativo
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Highlight menu ao scrollar
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ================================
// SCROLL EFFECTS
// ================================
function initScrollEffects() {
    const scrollTop = document.getElementById('scrollTop');
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        // Botão voltar ao topo
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
        
        // Header com sombra ao scrollar
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.8)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        }
    });
    
    // Ação do botão voltar ao topo
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================
// MODAL
// ================================
function initModal() {
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const toggleBtn = document.getElementById('toggleBtn');
    const modalImage = document.getElementById('modalImage');
    
    // Fechar modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Navegação entre projetos
    modalPrev.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex - 1 + projetos.length) % projetos.length;
        updateModalContent();
    });
    
    modalNext.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex + 1) % projetos.length;
        updateModalContent();
    });
    
    // Toggle entre antes/depois
    toggleBtn.addEventListener('click', () => {
        currentView = currentView === 'antes' ? 'depois' : 'antes';
        updateModalContent();
        updateToggleButton();
    });
    
    // Teclas de navegação
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') modalPrev.click();
        if (e.key === 'ArrowRight') modalNext.click();
        if (e.key === ' ') {
            e.preventDefault();
            toggleBtn.click();
        }
    });
}

function openModal(index) {
    currentProjectIndex = index;
    currentView = 'depois';
    
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    updateModalContent();
    updateToggleButton();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModalContent() {
    const modalImage = document.getElementById('modalImage');
    const projeto = projetos[currentProjectIndex];
    
    // Efeito de transição suave
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        if (currentView === 'antes') {
            modalImage.src = projeto.antes;
            modalImage.alt = `${projeto.titulo} - Antes`;
        } else {
            modalImage.src = projeto.depois;
            modalImage.alt = `${projeto.titulo} - Depois`;
        }
        
        modalImage.style.opacity = '1';
    }, 150);
}

function updateToggleButton() {
    const options = document.querySelectorAll('.toggle-option');
    
    options.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.option === currentView) {
            option.classList.add('active');
        }
    });
}

// ================================
// ANIMAÇÕES AOS (Animate on Scroll)
// ================================
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observar todos os elementos com data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ================================
// LAZY LOAD DE IMAGENS
// ================================
function initLazyLoad() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-lazy');
                
                if (src) {
                    img.src = src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observar todas as imagens com data-lazy
    document.querySelectorAll('img[data-lazy]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// UTILITÁRIOS
// ================================

// Prevenir erro de imagem não encontrada (placeholder)
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%Crect fill="%231a1a1a" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" text-anchor="middle" x="200" y="150"%3EImagem em breve%3C/text%3E%3C/svg%3E';
    }
}, true);

// Log de inicialização
console.log('✅ Negão Adesivos - Site carregado com sucesso!');
console.log(`📸 ${projetos.length} projetos carregados`);
