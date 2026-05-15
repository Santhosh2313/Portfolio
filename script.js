document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. ANTIGRAVITY ENGINE
    ========================================================= */
    const antigravityElements = [];
    const MOUSE_REPEL_RADIUS = 200;
    const SPRING_STRENGTH = 0.05;
    const FRICTION = 0.9;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function initAntigravity() {
        const elements = document.querySelectorAll('.antigravity');
        elements.forEach((el) => {
            if (!antigravityElements.some(item => item.el === el)) {
                antigravityElements.push({
                    el: el,
                    x: 0, y: 0, vx: 0, vy: 0,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.2 + Math.random() * 0.4,
                    amplitude: 5 + Math.random() * 8
                });
            }
        });
    }

    function updatePhysics() {
        antigravityElements.forEach(item => {
            const time = Date.now() * 0.001;
            const bobY = Math.cos(time * item.speed + item.phase) * item.amplitude;

            const rect = item.el.getBoundingClientRect();
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;

            const dx = elCenterX - mouseX;
            const dy = elCenterY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_REPEL_RADIUS) {
                const force = Math.pow((MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS, 2);
                item.vx += (dx / dist) * force * 4; // Reduced from 8
                item.vy += (dy / dist) * force * 4;
            }

            const targetY = bobY;
            item.vx *= FRICTION;
            item.vy *= FRICTION;
            item.vy += (targetY - item.y) * SPRING_STRENGTH;
            item.vx += (0 - item.x) * SPRING_STRENGTH;

            // Containment
            const maxDisp = 50;
            item.x = Math.max(-maxDisp, Math.min(maxDisp, item.x + item.vx));
            item.y = Math.max(-maxDisp, Math.min(maxDisp, item.y + item.vy));

            item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        });
        requestAnimationFrame(updatePhysics);
    }

    /* =========================================================
       2. RADAR SCANNER
    ========================================================= */
    function initRadar() {
        const canvas = document.getElementById('radar-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let angle = 0;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY) * 1.5;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);

            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, -0.5, 0);
            ctx.lineTo(0, 0);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Leading line
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(radius, 0);
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.restore();
            angle += 0.01;
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();
    }

    /* =========================================================
       3. TYPING EFFECT
    ========================================================= */
    function initTyping() {
        const element = document.getElementById('typing-text');
        if (!element) return;
        const roles = ["Software Engineer", "Full Stack Developer", "Open Source Enthusiast", "UI/UX Specialist"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                element.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    /* =========================================================
       4. SCROLL REVEAL & NAVIGATION
    ========================================================= */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    function initScrollEffects() {
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        // Active Link Highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').substring(1) === current) {
                    a.classList.add('active');
                }
            });
        });
    }

    /* =========================================================
       5. GITHUB PROJECTS
    ========================================================= */
    async function fetchProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;
        try {
            const response = await fetch('https://api.github.com/users/Santhosh2313/repos?sort=updated&per_page=6');
            const repos = await response.json();
            container.innerHTML = '';
            
            const imageIds = [
                '1517694712202-14dd9538aa97',
                '1550751827-4bd374c3f58b',
                '1555066931-4365d14bab8c',
                '1587620962725-abab7fe55159',
                '1498050108023-c5249f4df085',
                '1518770660439-4636190af475'
            ];

            repos.forEach((repo, index) => {
                const card = document.createElement('div');
                card.className = 'project-card reveal';
                const imgId = imageIds[index % imageIds.length];
                card.innerHTML = `
                    <div class="project-image">
                        <img src="https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=600" alt="${repo.name}">
                    </div>
                    <div class="project-info">
                        <h3>${repo.name}</h3>
                        <div class="project-tags">
                            <span class="tag">${repo.language || 'Code'}</span>
                        </div>
                        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${repo.description || 'No description provided.'}</p>
                        <a href="${repo.html_url}" target="_blank" class="project-link" style="color: var(--primary); text-decoration: none; font-weight: 600;">Explore &rarr;</a>
                    </div>
                `;
                card.style.cursor = 'pointer';
                card.onclick = () => window.open(repo.html_url, '_blank');
                container.appendChild(card);
                revealObserver.observe(card); // Observe new card
            });
            initAntigravity();
        } catch (error) {
            container.innerHTML = '<p>Offline mode: Could not fetch GitHub projects.</p>';
        }
    }

    /* =========================================================
       6. PARTICLES & CURSOR
    ========================================================= */
    function initVisuals() {
        const spotlight = document.getElementById('cursor-spotlight');
        let spotX = mouseX, spotY = mouseY;
        
        function animateSpotlight() {
            spotX += (mouseX - spotX) * 0.1;
            spotY += (mouseY - spotY) * 0.1;
            if (spotlight) spotlight.style.transform = `translate3d(${spotX - 300}px, ${spotY - 300}px, 0)`;
            requestAnimationFrame(animateSpotlight);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        animateSpotlight();
    }

    // Initialize Everything
    initRadar();
    initTyping();
    initScrollEffects();
    initVisuals();
    initAntigravity();
    updatePhysics();
    fetchProjects();
});
