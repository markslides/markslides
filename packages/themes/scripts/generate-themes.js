const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '../src/themes');
const outputDir = path.join(__dirname, '../src/generated');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read CSS files and convert them to TypeScript modules
const cssFiles = fs
    .readdirSync(themesDir)
    .filter((file) => file.endsWith('.css'));

cssFiles.forEach((file) => {
    const cssContent = fs.readFileSync(path.join(themesDir, file), 'utf8');
    const themeName = path.basename(file, '.css');

    const escapedCss = cssContent
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${');

    const tsContent = `// Auto-generated from ${file}
const ${themeName}Theme = \`${escapedCss}\`;

export default ${themeName}Theme;
`;

    fs.writeFileSync(path.join(outputDir, `${themeName}.ts`), tsContent);
});

console.log(`Generated ${cssFiles.length} theme files in ${outputDir}`);
