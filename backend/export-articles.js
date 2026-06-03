const fs = require('fs');
const { articlesData } = require('../src/data/articlesData.js');

console.log('Exporting articles...');
console.log(`Found ${articlesData.length} articles`);

fs.writeFileSync('./articles-backup.json', JSON.stringify(articlesData, null, 2));
console.log('✅ articles-backup.json created!');