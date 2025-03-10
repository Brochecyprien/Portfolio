document.addEventListener("DOMContentLoaded", function () {
    // Défilement fluide
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
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
    revealSections(); // Pour les sections visibles dès le départ

    // Chargement automatique des projets GitHub
    fetch("https://api.github.com/users/ton-profil/repos")
        .then(response => response.json())
        .then(data => {
            let projectsContainer = document.getElementById("github-projects");
            if (projectsContainer) {
                data.forEach(repo => {
                    let projectDiv = document.createElement("div");
                    projectDiv.classList.add("project");
                    projectDiv.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>${repo.description ? repo.description : "Pas de description."}</p>
                        <a href="${repo.html_url}" target="_blank">Voir le projet</a>
                    `;
                    projectsContainer.appendChild(projectDiv);
                });
            }
        })
        .catch(error => console.error("Erreur lors du chargement des projets GitHub :", error));

    // Mode sombre
    const toggleDarkMode = document.createElement("button");
    toggleDarkMode.textContent = "Mode Sombre";
    toggleDarkMode.classList.add("dark-mode-toggle");
    document.body.appendChild(toggleDarkMode);

    toggleDarkMode.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Menu Burger
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.querySelector(".nav-list");
    
    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active");
    });
});
