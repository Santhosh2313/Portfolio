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

    // Initialize antigravity elements
    function initAntigravity() {
        const currentElements = document.querySelectorAll('.antigravity');
        currentElements.forEach((el) => {
            // Check if already tracked
            if (!antigravityElements.some(item => item.el === el)) {
                antigravityElements.push({
                    el: el,
                    x: 0, y: 0,          // Current offset
                    vx: 0, vy: 0,        // Velocity
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.3 + Math.random() * 0.7,
                    amplitude: 8 + Math.random() * 12
                });
            }
        });
    }

    function updatePhysics() {
        antigravityElements.forEach(item => {
            // 1. Natural Bobbing (Zero-G drift)
            const time = Date.now() * 0.001;
            const bobX = Math.sin(time * item.speed + item.phase) * item.amplitude * 0.3;
            const bobY = Math.cos(time * item.speed * 0.8 + item.phase) * item.amplitude;

            // 2. Mouse Repulsion
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

            // 3. Spring back to origin (with bobbing offset)
            const targetX = bobX;
            const targetY = bobY;

            item.vx += (targetX - item.x) * SPRING_STRENGTH;
            item.vy += (targetY - item.y) * SPRING_STRENGTH;

            // 4. Apply Friction & Update position
            item.vx *= FRICTION;
            item.vy *= FRICTION;
            item.x += item.vx;
            item.y += item.vy;

            // 5. Apply Transform
            item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        });

        // Parallax Layers
        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
            const x = (mouseX - window.innerWidth / 2) * speed;
            const y = (mouseY - window.innerHeight / 2) * speed;
            layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        requestAnimationFrame(updatePhysics);
    }

    /* =========================================================
       2. PARTICLE SYSTEM (SPACE DUST)
    ========================================================= */
    function initParticles() {
        const container = document.getElementById('particles');
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let particles = [];
        const count = 100;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            draw() {
                ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < count; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }

    /* =========================================================
       3. EXISTING PORTFOLIO LOGIC (ENHANCED)
    ========================================================= */
    
    // Intersection Observer for Scroll Reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Spotlight Cursor
    const spotlight = document.getElementById('cursor-spotlight');
    let spotX = mouseX, spotY = mouseY;
    function animateSpotlight() {
        spotX += (mouseX - spotX) * 0.1;
        spotY += (mouseY - spotY) * 0.1;
        spotlight.style.transform = `translate3d(${spotX - 300}px, ${spotY - 300}px, 0)`;
        requestAnimationFrame(animateSpotlight);
    }

    // GitHub Fetch with dynamic Antigravity binding
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
                        <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800" alt="${repo.name}">
                    </div>
                    <h3>${repo.name}</h3>
                    <p style="color: var(--text-dim); margin: 1rem 0;">${repo.description || 'No description provided.'}</p>
                    <a href="${repo.html_url}" style="color: var(--accent-1); text-decoration: none; font-weight: bold;" target="_blank">Explore Project &rarr;</a>
                `;
                container.appendChild(card);
            });
            
            // Re-initialize antigravity to include new cards
            initAntigravity();
            
        } catch (error) {
            container.innerHTML = '<p style="color: var(--accent-3);">Offline mode: Projects could not be loaded.</p>';
        }
    }

    // Event Listeners
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Initialize Everything
    initAntigravity();
    initParticles();
    animateSpotlight();
    updatePhysics();
    fetchGitHubRepos();

    // Small delay to trigger hero reveal
    setTimeout(() => document.getElementById('hero').classList.add('active'), 100);
});
