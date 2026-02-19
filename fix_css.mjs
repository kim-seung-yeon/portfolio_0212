import { readFileSync, writeFileSync } from 'fs';

const path = 'c:\\protfolio\\my-portfolio\\src\\pages\\Clonecoding.css';
try {
    let content = readFileSync(path, 'utf8');
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
        writeFileSync(path, content, 'utf8');
        console.log('Successfully cleaned and updated CSS via ESM.');
    } else {
        console.log('Closing brace not found.');
    }
} catch (e) {
    console.error(e);
}
