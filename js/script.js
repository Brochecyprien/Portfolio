document.addEventListener("DOMContentLoaded", function () {
    // Défilement fluide
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animation des sections au scroll
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); 

    // Animation légère sur les cartes projets
    const projectCards = document.querySelectorAll(".projet-card");
    projectCards.forEach(card => {
        card.addEventListener("mouseenter", () => card.classList.add("hovered"));
        card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
    });

    // Chargement automatique des projets GitHub
    fetch("https://api.github.com/users/Brochecyprien/repos") // ← Ton pseudo GitHub ici
        .then(response => response.json())
        .then(data => {
            let projectsContainer = document.getElementById("github-projects");
            if (projectsContainer) {
                data.forEach(repo => {
                    let projectDiv = document.createElement("div");
                    projectDiv.classList.add("projet-card");
                    projectDiv.innerHTML = `
                        <img src="img/github-placeholder.png" alt="Projet GitHub">
                        <h3>${repo.name}</h3>
                        <p style="padding: 0 10px 10px;">${repo.description || "Aucune description."}</p>
                        <a href="${repo.html_url}" target="_blank" class="btn">Voir le projet</a>
                    `;
                    projectsContainer.appendChild(projectDiv);
                });
            }
        })
        .catch(error => console.error("Erreur lors du chargement des projets GitHub :", error));

    // Mode sombre / clair avec texte dynamique
    const toggleDarkMode = document.createElement("button");
    toggleDarkMode.classList.add("dark-mode-toggle");
    document.body.appendChild(toggleDarkMode);

    function updateToggleText() {
        toggleDarkMode.textContent = document.body.classList.contains("dark-mode")
            ? "Mode Clair ☀️"
            : "Mode Sombre 🌙";
    }

    updateToggleText();

    toggleDarkMode.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        updateToggleText();
    });

    // Menu Burger
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");

    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active");
    });

    // Animation pour la veille technologique
    const veilleCards = document.querySelectorAll(".veille-card");
    veilleCards.forEach(card => {
        card.addEventListener("mouseenter", () => card.classList.add("hovered"));
        card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
    });
});
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});
