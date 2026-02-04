document.addEventListener('DOMContentLoaded', () => {
    // Internationalization (i18n)
    const TRANSLATIONS = {
        fr: {
            title: "Solutions du livre 1 Sudoku",
            h1: "Phare Obscur Sudoku",
            label_level: "Difficulté :",
            opt_e: "Facile (E)",
            opt_m: "Moyen (M)",
            opt_h: "Difficile (H)",
            opt_l: "Légendaire (L)",
            label_num: "Numéro :",
            btn_show: "Afficher",
            link_download: "Télécharger les solutions (PDF)",
            copyright: "© 2025 Phare Obscur Éditions",
            // Dynamic messages
            err_loading: "Erreur lors du chargement des données.",
            err_not_loaded: "Les données ne sont pas encore chargées.",
            err_enter_num: "Veuillez entrer un numéro.",
            err_not_found: "Solution non trouvée pour",
            msg_solution_found: "Solution trouvée !"
        },
        en: {
            title: "Sudoku Book 1 Solutions",
            h1: "Phare Obscur Sudoku",
            label_level: "Difficulty:",
            opt_e: "Easy (E)",
            opt_m: "Medium (M)",
            opt_h: "Hard (H)",
            opt_l: "Legendary (L)",
            label_num: "Number:",
            btn_show: "Show",
            link_download: "Download solutions (PDF)",
            copyright: "© 2025 Phare Obscur Editions",
            // Dynamic messages
            err_loading: "Error loading data.",
            err_not_loaded: "Data not loaded yet.",
            err_enter_num: "Please enter a number.",
            err_not_found: "Solution not found for",
            msg_solution_found: "Solution found!"
        }
    };

    // Detect language: Default to French only if language starts with 'fr', else English
    const userLang = navigator.language || navigator.userLanguage;
    const currentLang = userLang.startsWith('fr') ? 'fr' : 'en';
    const t = TRANSLATIONS[currentLang];

    // Apply translations to static elements
    document.title = t.title;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    const goBtn = document.getElementById('go');
    const levelSelect = document.getElementById('level');
    const numInput = document.getElementById('num');
    const msg = document.getElementById('msg');
    const sudokuDiv = document.getElementById('sudoku');

    let solutions = null;

    // Fetch solutions data
    fetch('solutions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            solutions = data;
            console.log('Solutions loaded');
        })
        .catch(error => {
            console.error('Error loading solutions:', error);
            msg.textContent = t.err_loading;
        });

    // Add Enter key support
    [numInput, levelSelect].forEach(el => {
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                goBtn.click();
            }
        });
    });

    goBtn.addEventListener('click', () => {
        if (!solutions) {
            msg.textContent = t.err_not_loaded;
            sudokuDiv.classList.add('hidden');
            return;
        }

        const level = levelSelect.value;
        const num = numInput.value.trim();

        if (!num) {
            msg.textContent = t.err_enter_num;
            sudokuDiv.classList.add('hidden');
            return;
        }

        // Construct key (e.g., E001)
        // Ensure num is 3 digits
        const formattedNum = num.padStart(3, '0');
        const key = `${level}${formattedNum}`;

        const solution = solutions[key];

        if (!solution) {
            msg.textContent = `${t.err_not_found} ${key}`;
            sudokuDiv.classList.add('hidden');
            return;
        }

        msg.textContent = '';
        renderSudoku(solution);
    });

    function renderSudoku(data) {
        sudokuDiv.innerHTML = '';
        sudokuDiv.classList.remove('hidden');

        const table = document.createElement('table');

        for (let r = 1; r <= 9; r++) {
            const tr = document.createElement('tr');
            for (let c = 1; c <= 9; c++) {
                const td = document.createElement('td');
                td.textContent = data[`r${r}c${c}`];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        sudokuDiv.appendChild(table);
    }
});
