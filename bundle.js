const fs = require('fs')
const parse = require('csv-parse/sync').parse

// Lire et exporter directement l'objet (au require-time) afin que les templates
// puissent l'injecter correctement côté client.
module.exports = (() => {
  const file = fs.readFileSync('./_data/solutions.csv', 'utf8')

  const rows = parse(file, {
    delimiter: ',',
    columns: false, // <-- pas d’en-tête interprété
    skip_empty_lines: true,
  })

  // On saute la première ligne (header)
  const dataRows = rows.slice(1)

  const out = {}

  dataRows.forEach(cols => {
    // On ignore toute ligne trop courte (par mesure de sécurité)
    if (!cols || cols.length < 84) return

    const key = cols[1]?.trim() // Colonne 2 = nom (ex: E009)
    if (!key) return

    const obj = {}

    let i = 3 // Les 81 valeurs commencent à la colonne 4
    for (let r = 1; r <= 9; r++) {
      for (let c = 1; c <= 9; c++) {
        obj[`r${r}c${c}`] = cols[i]
        i++
      }
    }

    out[key] = obj
  })

  return out
})()
