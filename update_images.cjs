const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.js');
const velvetDirPath = path.join(__dirname, 'public', 'img', 'velvet');

const files = fs.readdirSync(velvetDirPath).filter(f => f.endsWith('.jpeg'));

let content = fs.readFileSync(mockDataPath, 'utf-8');

let imageIndex = 0;
content = content.replace(/image:\s*['"][^'"]+['"]/g, (match) => {
    if (imageIndex < files.length) {
        const newImage = `/img/velvet/${files[imageIndex]}`;
        imageIndex++;
        return `image: '${newImage}'`;
    }
    return match; // fallback if not enough images
});

fs.writeFileSync(mockDataPath, content, 'utf-8');
console.log(`Updated ${imageIndex} image paths in mockData.js`);
