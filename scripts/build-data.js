const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/sync').parse;

const inputPath = path.join(__dirname, '../_data/solutions.csv');
const outputPath = path.join(__dirname, '../solutions.json');

try {
    console.log(`Reading ${inputPath}...`);
    const file = fs.readFileSync(inputPath, 'utf8');

    console.log('Parsing CSV...');
    const rows = parse(file, {
        delimiter: ',',
        columns: false,
        skip_empty_lines: true,
    });

    // Skip header
    const dataRows = rows.slice(1);
    const out = {};

    dataRows.forEach(cols => {
        if (!cols || cols.length < 84) return;

        const key = cols[1]?.trim();
        if (!key) return;

        const obj = {};
        let i = 3;
        for (let r = 1; r <= 9; r++) {
            for (let c = 1; c <= 9; c++) {
                obj[`r${r}c${c}`] = cols[i];
                i++;
            }
        }

        out[key] = obj;
    });

    console.log(`Writing ${Object.keys(out).length} solutions to ${outputPath}...`);
    fs.writeFileSync(outputPath, JSON.stringify(out, null, 2));
    console.log('Done.');

} catch (err) {
    console.error('Error building data:', err);
    process.exit(1);
}
