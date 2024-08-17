// grouping.js

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