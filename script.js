window.addEventListener("load", function () {
    console.log(`${new Date().toISOString()} , view , entire page`);
});

document.addEventListener("click", function (event) {
    let type = event.target.tagName.toLowerCase();
    let objectType = "unknown";
    if (type === "img") objectType = "image";
    else if (type === "p" || type === "h1" || type === "h2") objectType = "text";
    else if (type === "a") objectType = "link";
    else if (type === "button") objectType = "button";
    else if (type === "textarea") objectType = "text-area";
    console.log(`${new Date().toISOString()} , click , ${objectType}`);
});

function analyzeText() {
    const text = document.getElementById('textInput').value;
    const output = document.getElementById('output');

    const pronouns = ['he', 'she', 'it', 'they', 'we', 'i', 'you', 'him', 'her', 'them', 'us'];
    const prepositions = ['on', 'at', 'by', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after'];
    const articles = ['a', 'an'];

    const tokens = text.toLowerCase().split(/\s+/);

    let stats = {
        letters: (text.match(/[a-zA-Z]/g) || []).length,
        words: tokens.length,
        spaces: (text.match(/ /g) || []).length,
        newlines: (text.match(/\n/g) || []).length,
        special: (text.match(/[^a-zA-Z0-9\s]/g) || []).length,
        pronouns: {},
        prepositions: {},
        articles: {}
    };

    tokens.forEach(word => {
        if (pronouns.includes(word)) stats.pronouns[word] = (stats.pronouns[word] || 0) + 1;
        if (prepositions.includes(word)) stats.prepositions[word] = (stats.prepositions[word] || 0) + 1;
        if (articles.includes(word)) stats.articles[word] = (stats.articles[word] || 0) + 1;
    });

    output.textContent = JSON.stringify(stats, null, 2);
}
