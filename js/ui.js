// ui.js

function displayError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

function displayResults(sortedNames) {
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
        mainContainer.style.display = 'none';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('suspense');

    resultDiv.innerHTML = '<h2 style="color: #f6b72f; padding: 40px 0px 40px; 0px;">🎲 Misturando os nomes...</h2>';

    setTimeout(() => {
        resultDiv.innerHTML = '<h2 style="color: #3498DB; padding: 40px 0px 40px; 0px;">📦 Agitando a caixinha...</h2>';
    }, 2000);

    setTimeout(() => {
        resultDiv.innerHTML = '<h2 style="padding: 40px 0px 40px; 0px;">🤞 Aí vem o resultado...</h2>';
    }, 4000);

    setTimeout(() => {
        resultDiv.classList.remove('suspense');
        resultDiv.innerHTML = '<h2>🍀 Resultado do Sorteio:</h2>';
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
