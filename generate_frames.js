const fs = require('fs');
const path = require('path');

const base64WebP = 'UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoBAAEAAAAMJaQAA3AA/v89WAAAAA==';
const buffer = Buffer.from(base64WebP, 'base64');
const framesDir = path.join(__dirname, 'public', 'frames');

if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

for (let i = 1; i <= 60; i++) {
  const paddedIndex = String(i).padStart(4, '0');
  const filePath = path.join(framesDir, `frame_${paddedIndex}.webp`);
  fs.writeFileSync(filePath, buffer);
}

console.log('Successfully generated 60 placeholder frames.');
