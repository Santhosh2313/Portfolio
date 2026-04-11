document.addEventListener('DOMContentLoaded', () => {

    /* 1. Basic Scroll Reveal Animation */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    setTimeout(() => document.getElementById('hero').classList.add('active'), 100);

    /* =========================================================
       NEXT-LEVEL UI EXPERIENCES
    ========================================================= */

    /* A. Spotlight Cursor Follower */
    const spotlight = document.getElementById('cursor-spotlight');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let spotX = mouseX;
    let spotY = mouseY;
    
    // Smooth trailing interpolation
    function animateCursor() {
        spotX += (mouseX - spotX) * 0.15;
        spotY += (mouseY - spotY) * 0.15;
        spotlight.style.transform = `translate(${spotX - 300}px, ${spotY - 300}px)`;
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    /* Universal Mouse Move Event */
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /* B. 3D Tilt Project Cards (Wrapped in function for dynamic content) */
    function bindTiltCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                card.classList.add('active-tilt');
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Math for tilting
                const tiltX = ((y - centerY) / centerY) * -10; // max tilt 10deg
                const tiltY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('active-tilt');
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none'; // Snappy track on enter
            });
        });
    }

    /* GitHub API Fetch */
    async function fetchGitHubRepos() {
        const container = document.getElementById('projects-container');
        try {
            const response = await fetch('https://api.github.com/users/santhosh2313/repos?sort=updated&per_page=6');
            if (!response.ok) throw new Error('Network response was not ok');
            const repos = await response.json();
            
            container.innerHTML = ''; // Clear loading text
            
            if (repos.length === 0) {
                container.innerHTML = '<p style="color: var(--text-dim);">No repositories found yet.</p>';
                return;
            }

            repos.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card reveal active'; // Reveal immediately since it loaded asynchronously
                
                // Use primary language as a tag
                const tagHtml = repo.language ? `<span class="project-tag">${repo.language}</span>` : '';
                const desc = repo.description || 'No description provided.';
                
                card.innerHTML = `
                    <div class="project-img-wrap">
                        <img src="assets/project_mockup.png" alt="${repo.name}">
                    </div>
                    <h3>${repo.name}</h3>
                    <div style="margin: 1rem 0;">${tagHtml}</div>
                    <p style="color: var(--text-dim); margin-bottom: 1.5rem;">${desc}</p>
                    <a href="${repo.html_url}" style="color: var(--accent-1); text-decoration: none; font-weight: bold;" target="_blank">View GitHub Repo &rarr;</a>
                `;
                container.appendChild(card);
            });
            
            // Bind the physical tilt effects to the newly created cards
            bindTiltCards();
            
        } catch (error) {
            console.error('Error fetching repos:', error);
            container.innerHTML = '<p style="color: #ef4444;">Failed to load repositories from GitHub. Please check your username or API limits.</p>';
        }
    }
    
    // Execute GitHub fetch on load
    fetchGitHubRepos();

    /* C. Magnetic Buttons */
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.height;
            const w = rect.width;
            const x = e.clientX - rect.left - w / 2;
            const y = e.clientY - rect.top - h / 2;

            // Pull multiplier
            const pullX = x * 0.4;
            const pullY = y * 0.4;

            btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

});
