// assets/js/theme-neural.js

const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

// Ayarlar
const particleCount = 70; // Nöron sayısı
const connectionDistance = 160; // Bağlantı mesafesi
const moveSpeed = 0.4; // Hareket hızı

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Neuron {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * moveSpeed;
        this.vy = (Math.random() - 0.5) * moveSpeed;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Ekrandan çıkarsa geri döndür
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#8b5cf6'; // Nöron Moru
        ctx.fill();
    }
}

// Parçacıkları oluştur
for (let i = 0; i < particleCount; i++) {
    particles.push(new Neuron());
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        let p1 = particles[i];
        p1.update();
        p1.draw();

        // Bağlantıları Çiz
        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dx = p1.x - p2.x;
            let dy = p1.y - p2.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                // Opaklık mesafeye göre değişir (yakınsa daha net)
                let opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.4})`; // Synapse Mavisi Bağlar
                ctx.lineWidth = 0.8;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

animate();