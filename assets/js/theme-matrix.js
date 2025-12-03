const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const cols = Math.floor(width / 20) + 1;
const ypos = Array(cols).fill(0);

function matrix() {
    ctx.fillStyle = 'rgba(30, 41, 59, 0.15)'; 
    ctx.fillRect(0, 0, width, height);

    ctx.font = '14pt monospace';
    
    ypos.forEach((y, ind) => {
        const text = Math.random() > 0.5 ? '1' : '0';
        const x = ind * 20;

        ctx.fillStyle = '#f97316'; // Amber Rengi
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
}
setInterval(matrix, 50);