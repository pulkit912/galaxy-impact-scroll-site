const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, 'public', 'frames');

if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

for (let i = 1; i <= 60; i++) {
  const paddedIndex = String(i).padStart(4, '0');
  const filePath = path.join(framesDir, `frame_${paddedIndex}.svg`);
  
  // Create a colorful gradient reflecting the frame index
  const hue = Math.floor((i / 60) * 360);
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <rect width="100%" height="100%" fill="hsl(${hue}, 80%, 15%)" />
    <circle cx="960" cy="540" r="${100 + i * 8}" fill="hsl(${hue}, 80%, 40%)" />
    <text x="50%" y="70%" font-family="sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.6">CINEMATIC SCROLL</text>
    <text x="50%" y="50%" font-family="sans-serif" font-size="140" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">FRAME ${i}</text>
  </svg>`;

  fs.writeFileSync(filePath, svgContent);
}

console.log('Successfully generated 60 vibrant SVG frames.');
