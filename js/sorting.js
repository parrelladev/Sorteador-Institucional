// sorting.js

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function sortNames(groupedData, numIngressos) {
    const results = {};
    Object.keys(groupedData).forEach(directorate => {
        const names = groupedData[directorate];
        const shuffled = shuffleArray(names.slice()); 
        results[directorate] = shuffled.slice(0, numIngressos);
    });
    return results;
}