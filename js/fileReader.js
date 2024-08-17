// fileReader.js

function processFile() {
    const numIngressos = document.getElementById('numIngressos').value;
    const fileUpload = document.getElementById('fileUpload').files[0];
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = '';

    if (!fileUpload) {
        displayError('Por favor, selecione um arquivo .xlsx.');
        return;
    }

    if (!numIngressos || numIngressos <= 0) {
        displayError('Por favor, insira um número válido de ingressos.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        console.log('Dados JSON:', jsonData);

        if (!validateColumns(jsonData)) {
            displayError('Arquivo inválido. Certifique-se de que todas as colunas obrigatórias estão presentes.');
            return;
        }

        const groupedData = groupByDirectorate(jsonData);
        console.log('Dados Agrupados:', groupedData);

        const sortedNames = sortNames(groupedData, numIngressos);
        console.log('Nomes Ordenados:', sortedNames);

        displayResults(sortedNames);
    };

    reader.readAsArrayBuffer(fileUpload);
}