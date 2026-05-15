document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. CORE PHYSICS ENGINE (ANTIGRAVITY)
    ========================================================= */
    const antigravityElements = [];
    const MOUSE_REPEL_RADIUS = 250;
    const MOUSE_REPEL_FORCE = 0.15;
    const SPRING_STRENGTH = 0.05;
    const FRICTION = 0.9;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function initAntigravity() {
        const currentElements = document.querySelectorAll('.antigravity');
        currentElements.forEach((el) => {
            if (!antigravityElements.some(item => item.el === el)) {
                antigravityElements.push({
                    el: el,
                    x: 0, y: 0, vx: 0, vy: 0,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.3 + Math.random() * 0.7,
                    amplitude: 8 + Math.random() * 12
                });
            }
        });
    }

    function updatePhysics() {
        antigravityElements.forEach(item => {
            const time = Date.now() * 0.001;
            const bobX = Math.sin(time * item.speed + item.phase) * item.amplitude * 0.3;
            const bobY = Math.cos(time * item.speed * 0.8 + item.phase) * item.amplitude;

            const rect = item.el.getBoundingClientRect();
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;

            const dx = elCenterX - mouseX;
            const dy = elCenterY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_REPEL_RADIUS) {
                const force = Math.pow((MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS, 2);
                item.vx += (dx / dist) * force * 15;
                item.vy += (dy / dist) * force * 15;
            }

            const targetX = bobX;
            const targetY = bobY;

            item.vx += (targetX - item.x) * SPRING_STRENGTH;
            item.vy += (targetY - item.y) * SPRING_STRENGTH;

            item.vx *= FRICTION;
            item.vy *= FRICTION;
            item.x += item.vx;
            item.y += item.vy;

            item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        });

        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        requestAnimationFrame(updatePhysics);
    }

    /* =========================================================
       2. RADAR SCANNER ANIMATION
    ========================================================= */
    function initRadar() {
        const canvas = document.getElementById('radar-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let angle = 0;

        function resize() {
            if (!canvas.offsetWidth) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function draw() {
            if (!canvas.width) {
                resize();
                requestAnimationFrame(draw);
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY) * 0.8;

            // Circles
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
            ctx.lineWidth = 1;
            for (let i = 1; i <= 4; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Cross lines
            ctx.beginPath();
            ctx.moveTo(centerX - radius, centerY); ctx.lineTo(centerX + radius, centerY);
            ctx.moveTo(centerX, centerY - radius); ctx.lineTo(centerX, centerY + radius);
            ctx.stroke();

            // Sweep
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, -0.4, 0);
            ctx.lineTo(0, 0);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();

            angle += 0.02;
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();
    }

    /* =========================================================
       3. TYPING ANIMATION
    ========================================================= */
    function initTyping() {
        const element = document.getElementById('typing-element');
        if (!element) return;
        const roles = ["Cybersecurity Analyst", "Blue Team Enthusiast", "Web Security Researcher", "Problem Solver"];
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

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
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
       4. PARTICLE SYSTEM (SPACE DUST)
    ========================================================= */
    function initParticles() {
        const container = document.getElementById('particles');
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];
        const count = 80;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
            }
        }

        for (let i = 0; i < count; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize(); animate();
    }

    /* =========================================================
       5. PORTFOLIO LOGIC
    ========================================================= */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const spotlight = document.getElementById('cursor-spotlight');
    let spotX = mouseX, spotY = mouseY;
    function animateSpotlight() {
        spotX += (mouseX - spotX) * 0.1; spotY += (mouseY - spotY) * 0.1;
        spotlight.style.transform = `translate3d(${spotX - 300}px, ${spotY - 300}px, 0)`;
        requestAnimationFrame(animateSpotlight);
    }

    async function fetchGitHubRepos() {
        const container = document.getElementById('projects-container');
        try {
            const response = await fetch('https://api.github.com/users/santhosh2313/repos?sort=updated&per_page=6');
            const repos = await response.json();
            container.innerHTML = '';
            repos.filter(r => !['aurora', 'aurora-analytics'].includes(r.name.toLowerCase()))
                 .forEach((repo, index) => {
                const card = document.createElement('div');
                card.className = `project-card variant-${(index % 3) + 1} reveal active antigravity hud-border`;
                card.innerHTML = `
                    <div class="project-img-wrap">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" alt="${repo.name}">
                    </div>
                    <h3>${repo.name}</h3>
                    <p style="color: var(--text-dim); margin: 1rem 0;">${repo.description || 'Cybersecurity focused repository.'}</p>
                    <a href="${repo.html_url}" style="color: var(--accent-1); text-decoration: none; font-weight: bold;" target="_blank">View Project &rarr;</a>
                `;
                container.appendChild(card);
            });
            initAntigravity();
        } catch (error) { container.innerHTML = '<p style="color: var(--accent-3);">Failed to load repositories.</p>'; }
    }

    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    initAntigravity(); initParticles(); initRadar(); initTyping(); animateSpotlight(); updatePhysics(); fetchGitHubRepos();
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) hero.classList.add('active');
    }, 100);
});
