const fs = require('fs');
const path = 'c:\\protfolio\\my-portfolio\\src\\pages\\Clonecoding.css';
try {
    let content = fs.readFileSync(path, 'utf8');
    // Find the last index of '}' which closes the media query
    // The file effectively ends there before we appended garbage
    // But since encoding might be mixed, we search for the last '}'
    const lastBraceIndex = content.lastIndexOf('}');
    if (lastBraceIndex !== -1) {
        content = content.substring(0, lastBraceIndex + 1);
        content += `

/* Force Hide Scrollbars */
.clone-section::-webkit-scrollbar {
    display: none;
}

body {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

body::-webkit-scrollbar {
    display: none;
}
`;
        fs.writeFileSync(path, content, 'utf8');
        console.log('Successfully cleaned and updated CSS.');
    } else {
        console.log('Could not find closing brace.');
    }
} catch (e) {
    console.error('Error:', e);
}
