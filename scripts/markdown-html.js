        function convertMarkdown() {
    // 1. Element abrufen und Wert sichern
    const inputElement = document.getElementById('markdown-input');
    if (!inputElement) return "";
    
    let markdown = inputElement.value;

    // 2. Zeilenweise Verarbeitung für Block-Elemente (Überschriften & Quotes)
    let lines = markdown.split('\n');
    let processedLines = lines.map(line => {
        if (line.startsWith('### ')) {
            return `===H3===${line.slice(4)}===/H3===`;
        }
        if (line.startsWith('## ')) {
            return `===H2===${line.slice(3)}===/H2===`;
        }
        if (line.startsWith('# ')) {
            return `===H1===${line.slice(2)}===/H1===`;
        }
        if (line.startsWith('> ')) {
            return `===BQ===${line.slice(2)}===/BQ===`;
        }
        return line;
    });
    
    let html = processedLines.join('');

    // 3. Inline-Elemente konvertieren (Nicht-gierige RegEx mit .*? oder [^*]+)
    // Bilder: ![alt](src)
    html = html.replace(/!\[([^\]]*)]\(([^)]*)\)/g, '<img alt="$1" src="$2">');
    
    // Links: [text](url)
    html = html.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Fett (Bold): **text** oder __text__ (Verwendung von .*? erlaubt Verschachtelung)
    html = html.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([\s\S]*?)__/g, '<strong>$1</strong>');

    // Kursiv (Italic): *text* oder _text_
    html = html.replace(/\*([\s\S]*?)\*/g, '<em>$1</em>');
    html = html.replace(/_([\s\S]*?)_/g, '<em>$1</em>');

    // 4. Temporäre Block-Platzhalter in HTML-Tags umwandeln
    html = html.replace(/===H3===/g, '<h3>').replace(/===\/H3===/g, '</h3>');
    html = html.replace(/===H2===/g, '<h2>').replace(/===\/H2===/g, '</h2>');
    html = html.replace(/===H1===/g, '<h1>').replace(/===\/H1===/g, '</h1>');
    html = html.replace(/===BQ===/g, '<blockquote>').replace(/===\/BQ===/g, '</blockquote>');

    // 5. DOM-Elemente aktualisieren
    const htmlOutput = document.getElementById('html-output');
    const preview = document.getElementById('preview');

    if (htmlOutput) {
        // textContent stellt sicher, dass der HTML-Code als ROHTEXT angezeigt wird
        htmlOutput.textContent = html; 
    }
    if (preview) {
        // innerHTML rendert die echten HTML-Elemente für die Vorschau
        preview.innerHTML = html;
    }

    return html;
}

// 6. Event-Listener für automatische Tests binden
const inputArea = document.getElementById('markdown-input');
if (inputArea) {
    inputArea.addEventListener('input', convertMarkdown);
    inputArea.addEventListener('keyup', convertMarkdown);
    inputArea.addEventListener('change', convertMarkdown);
}
