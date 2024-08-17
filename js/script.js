// Função principal para processar o arquivo enviado e gerar os resultados do sorteio.
function processFile() {
    // Obtém o número de ingressos especificado pelo usuário.
    const numIngressos = document.getElementById('numIngressos').value;
    
    // Obtém o arquivo .xlsx enviado pelo usuário.
    const fileUpload = document.getElementById('fileUpload').files[0];
    
    // Obtém a referência ao elemento HTML onde os resultados serão exibidos.
    const resultDiv = document.getElementById('result');
    
    // Limpa o conteúdo anterior dos resultados.
    resultDiv.innerHTML = '';

    // Verifica se um arquivo foi selecionado.
    if (!fileUpload) {
        resultDiv.innerHTML = '<div class="alert alert-danger">Por favor, selecione um arquivo .xlsx.</div>';
        return; // Sai da função se não houver arquivo.
    }

    // Verifica se o número de ingressos é válido (maior que 0).
    if (!numIngressos || numIngressos <= 0) {
        resultDiv.innerHTML = '<div class="alert alert-danger">Por favor, insira um número válido de ingressos.</div>';
        return; // Sai da função se o número de ingressos for inválido.
    }

    // Cria um novo objeto FileReader para ler o conteúdo do arquivo.
    const reader = new FileReader();
    
    // Define o que fazer quando a leitura do arquivo for concluída.
    reader.onload = function (event) {
        // Converte o resultado do FileReader em um array de bytes.
        const data = new Uint8Array(event.target.result);
        
        // Lê o conteúdo do arquivo .xlsx usando a biblioteca XLSX.
        const workbook = XLSX.read(data, { type: 'array' });

        // Obtém o nome da primeira aba da planilha.
        const sheetName = workbook.SheetNames[0];
        
        // Obtém a primeira aba da planilha.
        const sheet = workbook.Sheets[sheetName];
        
        // Converte a aba da planilha para um formato JSON.
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        // Exibe os dados JSON no console para depuração.
        console.log('Dados JSON:', jsonData);

        // Valida se todas as colunas obrigatórias estão presentes.
        if (!validateColumns(jsonData)) {
            resultDiv.innerHTML = '<div class="alert alert-danger">Arquivo inválido. Certifique-se de que todas as colunas obrigatórias estão presentes.</div>';
            return; // Sai da função se a validação falhar.
        }

        // Agrupa os dados por diretoria.
        const groupedData = groupByDirectorate(jsonData);
        
        // Exibe os dados agrupados no console para depuração.
        console.log('Dados Agrupados:', groupedData);

        // Ordena e seleciona os nomes para o sorteio.
        const sortedNames = sortNames(groupedData, numIngressos);
        
        // Exibe os nomes ordenados no console para depuração.
        console.log('Nomes Ordenados:', sortedNames);

        // Exibe os resultados do sorteio na página.
        displayResults(sortedNames);
    };

    // Lê o arquivo como um array de bytes.
    reader.readAsArrayBuffer(fileUpload);
}

// Normaliza o nome da coluna, removendo espaços extras e convertendo para minúsculas.
function normalizeColumnName(name) {
    return name.trim().toLowerCase().replace(/\s+/g, " ");
}

// Valida se as colunas obrigatórias estão presentes nos dados JSON.
function validateColumns(data) {
    const requiredColumns = ["carimbo de data/hora", "nome", "diretoria", "setor", "telefone"];
    const dataColumns = Object.keys(data[0]).map(normalizeColumnName);
    return requiredColumns.every(column => dataColumns.includes(column));
}

// Agrupa os dados por diretoria.
function groupByDirectorate(data) {
    return data.reduce((acc, row) => {
        const directorate = row["Diretoria"];
        const name = row["Nome"];
        if (!acc[directorate]) {
            acc[directorate] = [];
        }
        acc[directorate].push(name);
        return acc;
    }, {});
}

// Função de embaralhamento Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}

// Ordena os nomes e seleciona aleatoriamente um número de ingressos por diretoria.
function sortNames(groupedData, numIngressos) {
    const results = {};
    Object.keys(groupedData).forEach(directorate => {
        const names = groupedData[directorate];
        const shuffled = shuffleArray(names.slice()); // Passa uma cópia para não alterar o original
        results[directorate] = shuffled.slice(0, numIngressos);
    });
    return results;
}

function displayResults(sortedNames) {
    // Oculta o elemento principal
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
        mainContainer.style.display = 'none';
    }

    // Exibe a primeira mensagem de suspense
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('suspense');

    resultDiv.innerHTML = '<h2 style="color: #f6b72f; padding: 40px 0px 40px; 0px;">🎲 Misturando os nomes...</h2>';

    // Segunda mensagem após 1 segundo
    setTimeout(() => {
        resultDiv.innerHTML = '<h2 style="color: #3498DB; padding: 40px 0px 40px; 0px;">📦 Agitando a caixinha...</h2>';
    }, 1000);

    // Terceira mensagem após 2 segundos
    setTimeout(() => {
        resultDiv.innerHTML = '<h2 style="padding: 40px 0px 40px; 0px;">🤞 Aí vem o resultado...</h2>';
    }, 2000);

    // Exibe os resultados após 3 segundos
    setTimeout(() => {
        resultDiv.classList.remove('suspense');
        resultDiv.innerHTML = '<h2>🍀 Vencedores do Sorteio:</h2>';
        Object.keys(sortedNames).forEach(directorate => {
            resultDiv.innerHTML += `<h5>${directorate}</h5>`;
            const ul = document.createElement('ul');
            sortedNames[directorate].forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                ul.appendChild(li);
            });
            resultDiv.appendChild(ul);
        });
    }, 5000);
}


// Recarregar Página
document.getElementById('reloadImage').addEventListener('click', function() {
    location.reload();
});
