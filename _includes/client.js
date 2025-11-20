document.addEventListener('DOMContentLoaded', () => {
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
            msg.textContent = 'Erreur lors du chargement des données.';
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
            msg.textContent = 'Les données ne sont pas encore chargées.';
            return;
        }

        const level = levelSelect.value;
        const num = numInput.value.trim();

        if (!num) {
            msg.textContent = 'Veuillez entrer un numéro.';
            return;
        }

        // Construct key (e.g., E001)
        // Ensure num is 3 digits
        const formattedNum = num.padStart(3, '0');
        const key = `${level}${formattedNum}`;

        const solution = solutions[key];

        if (!solution) {
            msg.textContent = `Solution non trouvée pour ${key}`;
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
