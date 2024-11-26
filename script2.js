
// Funzione per caricare Lozad.js
function loadLozad(callback) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/lozad";
    script.onload = callback;
    script.onerror = () => console.error("Errore nel caricamento di Lozad.js.");
    document.head.appendChild(script);
}

// Inizializza Lozad.js
loadLozad(() => {
    const observer = lozad('.lozad', {
        loaded: (el) => {
            console.log(`${el.tagName} caricato`);
            if (el.tagName === 'VIDEO') {
                el.play(); // Avvia il video se necessario
            }
        }
    });
    observer.observe();
});




document.addEventListener("DOMContentLoaded", function() {
    const randomField = document.querySelector('.random-field');
    const randomBoxes = Array.from(randomField.querySelectorAll('.random-box'));

    // Funzione per selezionare casualmente 4 div
    function selectRandomBoxes() {
        // Nascondi tutti i div inizialmente
        randomBoxes.forEach(box => box.style.display = 'none');

        // Seleziona 4 div casuali
        const selectedBoxes = [];
        while (selectedBoxes.length < 4) {
            const randomIndex = Math.floor(Math.random() * randomBoxes.length);
            const selectedBox = randomBoxes[randomIndex];

            // Aggiungi il div solo se non è già stato selezionato
            if (!selectedBoxes.includes(selectedBox)) {
                selectedBoxes.push(selectedBox);
            }
        }

        // Mostra i div selezionati
        selectedBoxes.forEach(box => box.style.display = 'block');
    }

    // Esegui la selezione iniziale
    selectRandomBoxes();

    // Cambia la selezione ogni 4 secondi (4000 millisecondi)
    setInterval(selectRandomBoxes, 5000);
});