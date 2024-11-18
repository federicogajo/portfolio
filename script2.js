document.addEventListener("DOMContentLoaded", () => {
    const mediaItems = document.querySelectorAll(".media-container > div[data-index]");
    const infoItems = document.querySelectorAll(".infoindex");
    const prjButtons = document.querySelectorAll(".spacing-prj");
    const scrollLinks = document.querySelectorAll(".prj-button");

    // Funzione per aggiornare la visibilità
    function updateVisibility() {
        let selectedIndex = null;
        let maxCoverage = 0;

        mediaItems.forEach(mediaItem => {
            const mediaIndex = mediaItem.getAttribute("data-index");
            const bounding = mediaItem.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const visibleTop = Math.max(0, bounding.top);
            const visibleBottom = Math.min(windowHeight, bounding.bottom);
            const coverage = (visibleBottom - visibleTop) / windowHeight;

            if (coverage > 0.5 && coverage > maxCoverage) {
                maxCoverage = coverage;
                selectedIndex = mediaIndex;
            }
        });

        // Aggiorna la visibilità di .infoindex in base al selectedIndex
        infoItems.forEach(infoItem => {
            if (infoItem.getAttribute("data-index") === selectedIndex) {
                infoItem.style.display = "block";
            } else {
                infoItem.style.display = "none";
            }
        });

        // Aggiungi la classe .active al prj-button associato a selectedIndex
        prjButtons.forEach(prjButton => {
            const prjIndex = prjButton.getAttribute("data-index");
            const buttons = prjButton.querySelectorAll(".prj-button");

            buttons.forEach(button => {
                if (prjIndex === selectedIndex) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            });
        });
    }

    // Scorri alla sezione cliccata
    scrollLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Evita la navigazione

            const index = link.getAttribute("data-index");
            const targetSection = document.querySelector(`.media-container > div[data-index="${index}"]`);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Inizializza la visibilità al caricamento della pagina
    updateVisibility();

    // Aggiunge il listener di scroll
    window.addEventListener("scroll", updateVisibility);

    // Gestione dei pulsanti di toggle e delle descrizioni
    const toggleButtons = document.querySelectorAll("#toggle-button");
    const infoToggles = document.querySelectorAll("#info-toggle");
    const descriptions = document.querySelectorAll("#description");

    toggleButtons.forEach((toggleButton, index) => {
        const description = descriptions[index];
        const infoToggle = infoToggles[index];

        toggleButton.addEventListener("click", function() {
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                infoToggle.textContent = "-";
            } else {
                description.style.display = "none";
                infoToggle.textContent = "+";
            }
        });
    });
});

// Funzione di scorrimento
function scrollToTop(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startY + distance * progress);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('.images').forEach(image => {
    image.addEventListener('click', function() {
        const isEnlarged = this.classList.contains('enlarged');
        document.querySelectorAll('.images').forEach(img => img.classList.remove('enlarged'));

        if (!isEnlarged) {
            this.classList.add('enlarged');

            // Calcola il centro dell'immagine rispetto alla finestra
            const rect = this.getBoundingClientRect();
            const imageCenter = rect.top + rect.height / 2 + window.scrollY;
            const viewportCenter = window.innerHeight / 2;
            const offset = imageCenter - viewportCenter;

            scrollToCenter(offset, 0.001); // Richiama la funzione con un offset centrato
        }
    });
});


function scrollToCenter(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        window.scrollTo(0, startY + distance * progress);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}





// Funzione per randomizzare e mostrare solo 4 elementi alla volta
function randomizeBoxes() {
    const container = document.querySelector('.random-field');
    const boxes = Array.from(container.children);
    
    // Nasconde tutti i box
    boxes.forEach(box => box.style.display = 'none');
    
    // Seleziona 4 box casuali e li mostra
    const randomBoxes = boxes.sort(() => Math.random() - 0.5).slice(0, 4);
    randomBoxes.forEach(box => box.style.display = 'block');
}

// Funzione per caricare video visibili (lazy loading)
function lazyLoadVideos(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            const source = video.querySelector('source');
            if (source && source.dataset.src) {
                source.src = source.dataset.src; // Imposta l'attributo src dal data-src
                video.load(); // Carica il video
            }
            observer.unobserve(video); // Smette di osservare dopo il caricamento
        }
    });
}

// Imposta l'osservatore per il lazy loading dei video
document.addEventListener('DOMContentLoaded', () => {
    randomizeBoxes(); // Mostra subito 4 box casuali al caricamento
    setInterval(randomizeBoxes, 3000);

    const lazyVideos = document.querySelectorAll('.lazy-video');
    const videoObserver = new IntersectionObserver(lazyLoadVideos, {
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.25
    });
    lazyVideos.forEach(video => videoObserver.observe(video));
});