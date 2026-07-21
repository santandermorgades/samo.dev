// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.menu-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--color3)';
        }
    });
});

// Level bars animate when visible
const levelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.level-fill');
            fills.forEach(fill => {
                const w = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => { fill.style.width = w; }, 100);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => levelObserver.observe(el));

// =========================================
// HAMBURGER MENU (mobile) - MEJORADO
// =========================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const menuNav = document.getElementById('menuNav');
const mobileOverlay = document.getElementById('mobileOverlay');

function closeMobileMenu() {
    if (!hamburgerBtn || !menuNav || !mobileOverlay) return;
    
    hamburgerBtn.classList.remove('active');
    menuNav.classList.remove('open');
    mobileOverlay.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
    if (!hamburgerBtn || !menuNav || !mobileOverlay) return;
    
    const isOpen = menuNav.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
}

// Eventos principales
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
}

// Cerrar al hacer clic en enlaces
document.querySelectorAll('.menu-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Cerrar con tecla Escape (mejora importante)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Cerrar al redimensionar a desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// =========================================
// LANGUAGE SWITCHER
// =========================================
const translations = {
    es: {
        banner_whatsapp: "Contactar por WhatsApp",
        nav_inicio: "Inicio",
        nav_sobre: "Sobre mí",
        nav_habilidades: "Habilidades",
        nav_experiencia: "Experiencia",
        nav_proyectos: "Proyectos",
        nav_contacto: "Contacto",
        hero_badge: "Disponible para proyectos",
        hero_greeting: "Hola!, Soy",
        hero_role: "Desarrollador Full-Stack",
        hero_text: "Con dominio de herramientas digitales y una sólida formación en programación, mantenimiento y gestión de proyectos digitales.",
        btn_ver_proyectos: "Ver Proyectos",
        btn_contactarme: "Contactarme",
        stat_proyectos: "Proyectos",
        stat_anios: "Años exp.",
        stat_tecnologias: "Tecnologías",
        tag_sobre: "Sobre mí",
        sobre_titulo: "Desarrollador apasionado por el código",
        sobre_p1: "Graduado como Técnico Superior en Desarrollo de Aplicaciones Web en el Instituto Superior de Telecomunicaciones y Tecnologías de Información y Comunicación de OYALA (INSTTIC), tras completar el Bachillerato en el Colegio Adventista de Bata. Cuento con dominio de herramientas digitales y una sólida formación en programación, mantenimiento y gestión de proyectos digitales.",
        sobre_p2: "Soy una persona organizada, con gran capacidad de aprendizaje y facilidad de adaptación a nuevos retos. Mi objetivo es crecer profesionalmente en el ámbito informático, aportando compromiso, ética laboral y pensamiento analítico al desarrollo tecnológico de mi entorno.",
        sobre_li1: "Desarrollo Front-End & Back-End",
        sobre_li2: "Diseño y gestión de bases de datos",
        sobre_li3: "Diseño UX/UI",
        sobre_li4: "Ofimática avanzada (Word, Excel, PowerPoint)",
        tag_stack: "Stack Tecnológico",
        habilidades_titulo: "Mis Habilidades",
        habilidades_desc: "Tecnologías y herramientas con las que trabajo para crear soluciones digitales completas.",
        skill_html_desc: "Maquetación semántica, accesibilidad y estructuras web modernas.",
        skill_css_desc: "Diseño responsivo, animaciones, Flexbox, Grid y preprocesadores.",
        skill_js_desc: "Manipulación del DOM, eventos e interactividad en el navegador.",
        skill_java_desc: "Programación orientada a objetos y lógica de backend.",
        skill_php_desc: "Backend, POO, integración con bases de datos MySQL.",
        skill_sql_desc: "Modelado de datos, consultas complejas, relaciones y optimización.",
        skill_git_desc: "Control de versiones, ramas, pull requests y flujo de trabajo.",
        tools_titulo: "Otras herramientas y tecnologías",
        idiomas_titulo: "Idiomas",
        nivel_avanzado: "Avanzado",
        nivel_basico_en: "Básico",
        nivel_basico_fr: "Básico",
        tag_trayectoria: "Trayectoria",
        experiencia_titulo: "Experiencia",
        experiencia_desc: "Mi recorrido profesional y académico en el mundo del desarrollo.",
        tl1_title: "Grado uno en Informática de Gestión",
        tl1_company: "Universidad Nacional de Guinea Ecuatorial",
        tl1_desc: "Carrera universitaria en la Universidad Nacional de Guinea Ecuatorial, para seguir aprendiendo nuevas áreas de la tecnología.",
        tl2_title: "Técnico Superior en Desarrollo de Aplicaciones Web",
        tl2_company: "INSTTIC – Instituto Superior de Telecomunicaciones y Tecnologías de Información y Comunicación de OYALA",
        tl2_desc: "Formación especializada en desarrollo de aplicaciones web: proyectos prácticos de frontend y backend, bases de datos relacionales y despliegue de aplicaciones.",
        tl3_title: "Desarrollador / Investigador",
        tl3_company: "Trabajo de fin de carrera",
        tl3_desc: "Diseño y desarrollo de un prototipo funcional de un sistema centralizado capaz de interconectar múltiples clínicas registradas, optimizando el flujo de datos y el acceso a la información compartida.",
        tl4_title: "Formación Complementaria en Desarrollo Web",
        tl4_company: "Ministerio de Transportes, Telecomunicaciones y Sistemas de Inteligencia Artificial, PNUD y otras organizaciones",
        tl4_desc: "Fortalecimiento de competencias técnicas en el área de Desarrollo de Aplicaciones Web; adquisición de metodologías actuales y estándares internacionales en el desarrollo tecnológico.",
        tl5_title: "Bachillerato",
        tl5_company: "Colegio Adventista de Bata",
        tl5_desc: "Formación secundaria previa al inicio de mis estudios técnicos en desarrollo de aplicaciones web.",
        tag_portfolio: "Portfolio",
        proyectos_titulo: "Mis Proyectos",
        proyectos_desc: "Algunos de los proyectos que he desarrollado recientemente.",
        proj1_label: "Trabajo de Fin de Carrera",
        proj1_title: "Sistema Centralizado de Interconexión de Clínicas",
        proj1_desc: "Prototipo funcional de un sistema centralizado capaz de interconectar múltiples clínicas registradas, optimizando el flujo de datos y el acceso a la información compartida.",
        proj2_title: "Panel de Gestión Empresarial",
        proj2_desc: "Dashboard administrativo con estadísticas en tiempo real, gestión de usuarios, reportes descargables y control de permisos.",
        proj3_title: "Red Social Minimalista",
        proj3_desc: "Plataforma social con publicaciones, sistema de seguidores, likes, comentarios y mensajería privada en tiempo real.",
        proj4_title: "App de Gestión de Citas",
        proj4_desc: "Sistema de reservas online para negocios, con calendario interactivo, notificaciones por email y gestión multi-empleado.",
        proj5_title: "Plataforma de Restaurantes",
        proj5_desc: "Directorio web con filtros avanzados, valoraciones de usuarios, sistema de reservas y panel de gestión para propietarios.",
        proj6_title: "Plataforma Educativa",
        proj6_desc: "LMS con cursos en video, tests interactivos, seguimiento de progreso y sistema de certificados descargables.",
        link_codigo: "Código",
        tag_contacto: "Contacto",
        contacto_titulo: "Trabajemos Juntos",
        contacto_desc: "¿Tienes un proyecto en mente? Estaré encantado de escucharte.",
        contacto_hablemos: "¡Hablemos!",
        contacto_p: "Estoy disponible para proyectos freelance, oportunidades laborales o simplemente para charlar sobre tecnología. No dudes en contactarme.",
        label_email: "Email",
        label_whatsapp: "WhatsApp",
        label_ubicacion: "Ubicación",
        valor_ubicacion: "Malabo, Guinea Ecuatorial",
        footer_hecho: "Desarrollado con",
        footer_cafe: "y mucho café ☕"
    },
    en: {
        banner_whatsapp: "Contact via WhatsApp",
        nav_inicio: "Home",
        nav_sobre: "About Me",
        nav_habilidades: "Skills",
        nav_experiencia: "Experience",
        nav_proyectos: "Projects",
        nav_contacto: "Contact",
        hero_badge: "Available for projects",
        hero_greeting: "Hi!, I'm",
        hero_role: "Full-Stack Developer",
        hero_text: "Skilled with digital tools and a solid background in programming, maintenance, and digital project management.",
        btn_ver_proyectos: "View Projects",
        btn_contactarme: "Contact Me",
        stat_proyectos: "Projects",
        stat_anios: "Years exp.",
        stat_tecnologias: "Technologies",
        tag_sobre: "About Me",
        sobre_titulo: "A developer passionate about code",
        sobre_p1: "Graduated as a Senior Technician in Web Application Development from the Higher Institute of Telecommunications and Information and Communication Technologies of OYALA (INSTTIC), after completing high school at Colegio Adventista de Bata. I have a strong command of digital tools and solid training in programming, maintenance, and digital project management.",
        sobre_p2: "I'm an organized person with a great capacity for learning and adapting easily to new challenges. My goal is to grow professionally in the IT field, bringing commitment, work ethic, and analytical thinking to the technological development of my community.",
        sobre_li1: "Front-End & Back-End Development",
        sobre_li2: "Database design and management",
        sobre_li3: "UX/UI Design",
        sobre_li4: "Advanced office tools (Word, Excel, PowerPoint)",
        tag_stack: "Tech Stack",
        habilidades_titulo: "My Skills",
        habilidades_desc: "Technologies and tools I use to build complete digital solutions.",
        skill_html_desc: "Semantic markup, accessibility, and modern web structures.",
        skill_css_desc: "Responsive design, animations, Flexbox, Grid, and preprocessors.",
        skill_js_desc: "DOM manipulation, events, and browser interactivity.",
        skill_java_desc: "Object-oriented programming and backend logic.",
        skill_php_desc: "Backend development, OOP, and MySQL database integration.",
        skill_sql_desc: "Data modeling, complex queries, relationships, and optimization.",
        skill_git_desc: "Version control, branching, pull requests, and workflow.",
        tools_titulo: "Other tools and technologies",
        idiomas_titulo: "Languages",
        nivel_avanzado: "Advanced",
        nivel_basico_en: "Basic",
        nivel_basico_fr: "Basic",
        tag_trayectoria: "Journey",
        experiencia_titulo: "Experience",
        experiencia_desc: "My professional and academic path in the world of development.",
        tl1_title: "Bachelor's Degree in Management Informatics",
        tl1_company: "National University of Equatorial Guinea",
        tl1_desc: "University degree at the National University of Equatorial Guinea, to keep learning new areas of technology.",
        tl2_title: "Senior Technician in Web Application Development",
        tl2_company: "INSTTIC – Higher Institute of Telecommunications and Information and Communication Technologies of OYALA",
        tl2_desc: "Specialized training in web application development: practical frontend and backend projects, relational databases, and application deployment.",
        tl3_title: "Developer / Researcher",
        tl3_company: "Capstone project",
        tl3_desc: "Design and development of a functional prototype of a centralized system capable of interconnecting multiple registered clinics, optimizing data flow and access to shared information.",
        tl4_title: "Complementary Web Development Training",
        tl4_company: "Ministry of Transport, Telecommunications and Artificial Intelligence Systems, UNDP, and other organizations",
        tl4_desc: "Strengthening of technical skills in Web Application Development; acquisition of current methodologies and international standards in technology development.",
        tl5_title: "High School Diploma",
        tl5_company: "Colegio Adventista de Bata",
        tl5_desc: "Secondary education prior to starting my technical studies in web application development.",
        tag_portfolio: "Portfolio",
        proyectos_titulo: "My Projects",
        proyectos_desc: "Some of the projects I've recently developed.",
        proj1_label: "Capstone Project",
        proj1_title: "Centralized Clinic Interconnection System",
        proj1_desc: "Functional prototype of a centralized system capable of interconnecting multiple registered clinics, optimizing data flow and access to shared information.",
        proj2_title: "Business Management Dashboard",
        proj2_desc: "Admin dashboard with real-time statistics, user management, downloadable reports, and permission control.",
        proj3_title: "Minimalist Social Network",
        proj3_desc: "Social platform with posts, follower system, likes, comments, and real-time private messaging.",
        proj4_title: "Appointment Management App",
        proj4_desc: "Online booking system for businesses, with an interactive calendar, email notifications, and multi-employee management.",
        proj5_title: "Restaurant Platform",
        proj5_desc: "Web directory with advanced filters, user ratings, reservation system, and management panel for owners.",
        proj6_title: "Educational Platform",
        proj6_desc: "LMS with video courses, interactive tests, progress tracking, and a downloadable certificate system.",
        link_codigo: "Code",
        tag_contacto: "Contact",
        contacto_titulo: "Let's Work Together",
        contacto_desc: "Have a project in mind? I'd love to hear about it.",
        contacto_hablemos: "Let's Talk!",
        contacto_p: "I'm available for freelance projects, job opportunities, or just to chat about technology. Feel free to reach out.",
        label_email: "Email",
        label_whatsapp: "WhatsApp",
        label_ubicacion: "Location",
        valor_ubicacion: "Malabo, Equatorial Guinea",
        footer_hecho: "Built with",
        footer_cafe: "and lots of coffee ☕"
    },
    fr: {
        banner_whatsapp: "Contacter par WhatsApp",
        nav_inicio: "Accueil",
        nav_sobre: "À propos",
        nav_habilidades: "Compétences",
        nav_experiencia: "Expérience",
        nav_proyectos: "Projets",
        nav_contacto: "Contact",
        hero_badge: "Disponible pour des projets",
        hero_greeting: "Salut!, Je suis",
        hero_role: "Développeur Full-Stack",
        hero_text: "Maîtrise des outils numériques et solide formation en programmation, maintenance et gestion de projets numériques.",
        btn_ver_proyectos: "Voir les Projets",
        btn_contactarme: "Me Contacter",
        stat_proyectos: "Projets",
        stat_anios: "Ans d'exp.",
        stat_tecnologias: "Technologies",
        tag_sobre: "À propos",
        sobre_titulo: "Développeur passionné par le code",
        sobre_p1: "Diplômé Technicien Supérieur en Développement d'Applications Web à l'Institut Supérieur des Télécommunications et des Technologies de l'Information et de la Communication d'OYALA (INSTTIC), après avoir terminé le baccalauréat au Colegio Adventista de Bata. Je maîtrise les outils numériques et j'ai une solide formation en programmation, maintenance et gestion de projets numériques.",
        sobre_p2: "Je suis une personne organisée, avec une grande capacité d'apprentissage et une facilité d'adaptation aux nouveaux défis. Mon objectif est d'évoluer professionnellement dans le domaine informatique, en apportant engagement, éthique de travail et esprit d'analyse au développement technologique de mon environnement.",
        sobre_li1: "Développement Front-End & Back-End",
        sobre_li2: "Conception et gestion de bases de données",
        sobre_li3: "Design UX/UI",
        sobre_li4: "Bureautique avancée (Word, Excel, PowerPoint)",
        tag_stack: "Stack Technique",
        habilidades_titulo: "Mes Compétences",
        habilidades_desc: "Technologies et outils que j'utilise pour créer des solutions numériques complètes.",
        skill_html_desc: "Balisage sémantique, accessibilité et structures web modernes.",
        skill_css_desc: "Design responsive, animations, Flexbox, Grid et préprocesseurs.",
        skill_js_desc: "Manipulation du DOM, événements et interactivité dans le navigateur.",
        skill_java_desc: "Programmation orientée objet et logique backend.",
        skill_php_desc: "Backend, POO, intégration avec des bases de données MySQL.",
        skill_sql_desc: "Modélisation de données, requêtes complexes, relations et optimisation.",
        skill_git_desc: "Contrôle de version, branches, pull requests et flux de travail.",
        tools_titulo: "Autres outils et technologies",
        idiomas_titulo: "Langues",
        nivel_avanzado: "Avancé",
        nivel_basico_en: "Basique",
        nivel_basico_fr: "Basique",
        tag_trayectoria: "Parcours",
        experiencia_titulo: "Expérience",
        experiencia_desc: "Mon parcours professionnel et académique dans le monde du développement.",
        tl1_title: "Licence en Informatique de Gestion",
        tl1_company: "Université Nationale de Guinée Équatoriale",
        tl1_desc: "Cursus universitaire à l'Université Nationale de Guinée Équatoriale, pour continuer à apprendre de nouveaux domaines technologiques.",
        tl2_title: "Technicien Supérieur en Développement d'Applications Web",
        tl2_company: "INSTTIC – Institut Supérieur des Télécommunications et des Technologies de l'Information et de la Communication d'OYALA",
        tl2_desc: "Formation spécialisée en développement d'applications web : projets pratiques frontend et backend, bases de données relationnelles et déploiement d'applications.",
        tl3_title: "Développeur / Chercheur",
        tl3_company: "Projet de fin d'études",
        tl3_desc: "Conception et développement d'un prototype fonctionnel d'un système centralisé capable d'interconnecter plusieurs cliniques enregistrées, en optimisant le flux de données et l'accès à l'information partagée.",
        tl4_title: "Formation Complémentaire en Développement Web",
        tl4_company: "Ministère des Transports, des Télécommunications et des Systèmes d'Intelligence Artificielle, le PNUD et d'autres organisations",
        tl4_desc: "Renforcement des compétences techniques en Développement d'Applications Web ; acquisition de méthodologies actuelles et de normes internationales dans le développement technologique.",
        tl5_title: "Baccalauréat",
        tl5_company: "Colegio Adventista de Bata",
        tl5_desc: "Formation secondaire avant le début de mes études techniques en développement d'applications web.",
        tag_portfolio: "Portfolio",
        proyectos_titulo: "Mes Projets",
        proyectos_desc: "Quelques-uns des projets que j'ai récemment développés.",
        proj1_label: "Projet de Fin d'Études",
        proj1_title: "Système Centralisé d'Interconnexion de Cliniques",
        proj1_desc: "Prototype fonctionnel d'un système centralisé capable d'interconnecter plusieurs cliniques enregistrées, en optimisant le flux de données et l'accès à l'information partagée.",
        proj2_title: "Tableau de Bord de Gestion d'Entreprise",
        proj2_desc: "Tableau de bord administratif avec statistiques en temps réel, gestion des utilisateurs, rapports téléchargeables et contrôle des autorisations.",
        proj3_title: "Réseau Social Minimaliste",
        proj3_desc: "Plateforme sociale avec publications, système d'abonnés, likes, commentaires et messagerie privée en temps réel.",
        proj4_title: "Application de Gestion de Rendez-vous",
        proj4_desc: "Système de réservation en ligne pour entreprises, avec calendrier interactif, notifications par email et gestion multi-employés.",
        proj5_title: "Plateforme de Restaurants",
        proj5_desc: "Annuaire web avec filtres avancés, avis des utilisateurs, système de réservation et panneau de gestion pour les propriétaires.",
        proj6_title: "Plateforme Éducative",
        proj6_desc: "LMS avec cours vidéo, tests interactifs, suivi de progression et système de certificats téléchargeables.",
        link_codigo: "Code",
        tag_contacto: "Contact",
        contacto_titulo: "Travaillons Ensemble",
        contacto_desc: "Vous avez un projet en tête ? Je serais ravi de vous écouter.",
        contacto_hablemos: "Parlons-en !",
        contacto_p: "Je suis disponible pour des projets freelance, des opportunités professionnelles ou simplement pour discuter de technologie. N'hésitez pas à me contacter.",
        label_email: "Email",
        label_whatsapp: "WhatsApp",
        label_ubicacion: "Emplacement",
        valor_ubicacion: "Malabo, Guinée Équatoriale",
        footer_hecho: "Développé avec",
        footer_cafe: "et beaucoup de café ☕"
    }
};

const langBtn = document.getElementById('langBtn');
const langSwitcher = document.getElementById('langSwitcher');
const langDropdown = document.getElementById('langDropdown');
const currentLangLabel = document.getElementById('currentLang');
const langOptions = document.querySelectorAll('.lang-option');

function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    document.documentElement.setAttribute('lang', lang);
    currentLangLabel.textContent = lang.toUpperCase();

    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    try {
        localStorage.setItem('samo_lang', lang);
    } catch (e) {
        // localStorage not available, ignore
    }
}

function toggleLangDropdown() {
    const isOpen = langSwitcher.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(isOpen));
}

if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLangDropdown();
    });
}

langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        applyLanguage(lang);
        langSwitcher.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
    });
});

// Close language dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (langSwitcher && !langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('open');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
    }
});

// Restore saved language preference (defaults to Spanish)
(function initLanguage() {
    let saved = 'es';
    try {
        saved = localStorage.getItem('samo_lang') || 'es';
    } catch (e) {
        saved = 'es';
    }
    applyLanguage(saved);
})();
