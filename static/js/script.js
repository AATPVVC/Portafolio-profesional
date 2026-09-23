console.log("Hola...")
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. CURSOR PERSONALIZADO Y REACTIVO
       ========================================== */
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
        });

        // Efecto hover sobre elementos interactivos
        const interactives = document.querySelectorAll('a, button, .portfolio-card, input, textarea');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
                follower.style.borderColor = 'var(--text-color)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.borderColor = 'var(--accent-color)';
            });
        });
    }

    /* ==========================================
       2. NAVEGACIÓN DINÁMICA Y SCROLL
       ========================================== */
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progressBar');
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Header shadow al scroll
        if (scrollY > 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }

        // Barra de progreso de lectura
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';

        // Botón volver arriba
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Resaltado dinámico del menú al hacer scroll
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active-link');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active-link');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Menú Hamburguesa Móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* ==========================================
       3. CAMBIO DE TEMA (DARK / LIGHT MODE)
       ========================================== */
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    });

    /* ==========================================
       4. MOSTRAR / OCULTAR INFORMACIÓN
       ========================================== */
    const toggleInfoBtn = document.getElementById('toggleInfoBtn');
    const moreInfo = document.getElementById('moreInfo');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');

    toggleInfoBtn.addEventListener('click', () => {
        moreInfo.classList.toggle('hidden');
        if (moreInfo.classList.contains('hidden')) {
            btnText.textContent = 'Mostrar más información';
            btnIcon.className = 'fa-solid fa-chevron-down';
        } else {
            btnText.textContent = 'Ocultar información';
            btnIcon.className = 'fa-solid fa-chevron-up';
        }
    });

    /* ==========================================
       5. CAMBIO DE CONTENIDO POR PESTAÑAS (TABS)
       ========================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    /* ==========================================
       6. FILTROS DE PROYECTOS (GALERÍA)
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* ==========================================
       7. MODAL / VENTANA EMERGENTE
       ========================================== */
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');
    const modalOkBtn = document.getElementById('modalOkBtn');
    const openModalBtns = document.querySelectorAll('.open-modal');

    const openModal = (title, desc) => {
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            openModal(title, desc);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOkBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    /* ==========================================
       8. CONTADORES ANIMADOS
       ========================================== */
    const counters = document.querySelectorAll('.counter-number');
    let countersTriggered = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    /* ==========================================
       9. EFECTOS SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Iniciar contadores al llegar a la sección
                if (!countersTriggered && entry.target.classList.contains('counter-card')) {
                    countersTriggered = true;
                    startCounters();
                }
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       10. FORMULARIO INTERACTIVO CON VALIDACIÓN
       ========================================== */
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Validar Nombre
        if (!name.value.trim()) {
            name.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            name.parentElement.classList.remove('invalid');
        }

        // Validar Correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            email.parentElement.classList.remove('invalid');
        }

        // Validar Mensaje
        if (!message.value.trim()) {
            message.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            message.parentElement.classList.remove('invalid');
        }

        if (isValid) {
            openModal('¡Mensaje Enviado!', 'Gracias por ponerte en contacto. Te responderé lo antes posible.');
            contactForm.reset();
        }
    });
});

