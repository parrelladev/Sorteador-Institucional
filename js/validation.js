// validation.js

function normalizeColumnName(name) {
    return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function validateColumns(data) {
    const requiredColumns = ["carimbo de data/hora", "nome", "diretoria", "setor", "telefone"];
    const dataColumns = Object.keys(data[0]).map(normalizeColumnName);
    return requiredColumns.every(column => dataColumns.includes(column));
}