function sortNames() {
    const numVencedores = document.getElementById('numVencedores').value;
    const namesList = document.getElementById('namesList').value.trim().split('\n');
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = '';

    if (!numVencedores || numVencedores <= 0) {
        resultDiv.innerHTML = '<div class="alert alert-danger">Por favor, insira um número válido de vencedores.</div>';
        return;
    }

    if (namesList.length < numVencedores) {
        resultDiv.innerHTML = '<div class="alert alert-danger">Nomes insuficientes para o sorteio.</div>';
        return;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledNames = shuffleArray(namesList.slice());
    const winners = shuffledNames.slice(0, numVencedores);

    const sortedNames = { "": winners };
    displayResults(sortedNames);
}