// assets/js/theme-paper.js

const canvas = document.getElementById('zenCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class ZenCircle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 50 + 20;
        this.maxRadius = this.radius + Math.random() * 100;
        this.minRadius = this.radius;
        this.growth = Math.random() * 0.2 + 0.05; // Çok yavaş
        this.isGrowing = true;
        this.color = `rgba(192, 86, 33, ${Math.random() * 0.05})`; // Çok şeffaf kiremit rengi
    }

    update() {
        if (this.isGrowing) {
            this.radius += this.growth;
            if (this.radius > this.maxRadius) this.isGrowing = false;
        } else {
            this.radius -= this.growth;
            if (this.radius < this.minRadius) this.isGrowing = true;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        // İnce kenar çizgisi
        ctx.strokeStyle = 'rgba(0,0,0,0.02)';
        ctx.stroke();
    }
}

let circles = [];
for(let i=0; i<15; i++) circles.push(new ZenCircle());

function animate() {
    ctx.clearRect(0, 0, width, height);
    circles.forEach(c => {
        c.update();
        c.draw();
    });
    requestAnimationFrame(animate);
}
animate();