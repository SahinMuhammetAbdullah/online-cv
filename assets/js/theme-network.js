const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
const particleCount = 60;
const connectionDistance = 140;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Açık Mavi Noktalar (Koyu zemin için)
        ctx.fillStyle = 'rgba(147, 197, 253, 0.6)'; 
        ctx.fill();
    }
}
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p1, index) => {
        p1.update();
        p1.draw();
        for (let i = index + 1; i < particles.length; i++) {
            const p2 = particles[i];
            const dx = p1.x - p2.x; const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
                // Açık Mavi Çizgiler (Koyu zemin için)
                ctx.strokeStyle = `rgba(147, 197, 253, ${0.3 * (1 - dist / connectionDistance)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}
animate();