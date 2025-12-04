// assets/js/theme-neon.js

const canvas = document.getElementById('genesisCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Yıldız/Hız Çizgisi Sınıfı
class WarpLine {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = (Math.random() - 0.5) * width; // Merkezden rastgele X
        this.y = (Math.random() - 0.5) * height; // Merkezden rastgele Y
        this.z = Math.random() * width; // Derinlik (Uzaklık)
        this.pz = this.z; // Önceki Z konumu (çizgi çizmek için)
        this.speed = Math.random() * 10 + 5; // Hız
        // Renkler: Camgöbeği, Pembe veya Sarı
        const colors = ['#00ffff', '#ff00ff', '#ffff00'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.pz = this.z; // Mevcut konumu kaydet
        this.z -= this.speed; // Bize doğru yaklaştır

        // Eğer ekranın arkasına geçerse sıfırla
        if (this.z < 1) {
            this.reset();
            this.z = width;
            this.pz = this.z;
        }
    }

    draw() {
        // Perspektif dönüşümü (3D -> 2D)
        // sx, sy: Ekran koordinatları
        const sx = (this.x / this.z) * (width / 2) + width / 2;
        const sy = (this.y / this.z) * (height / 2) + height / 2;

        // psx, psy: Önceki ekran koordinatları (çizginin kuyruğu)
        const psx = (this.x / this.pz) * (width / 2) + width / 2;
        const psy = (this.y / this.pz) * (height / 2) + height / 2;

        // Uzaklığa göre kalınlık ve opaklık ayarı
        const thickness = (1 - this.z / width) * 2;
        const opacity = (1 - this.z / width);

        ctx.beginPath();
        ctx.moveTo(psx, psy);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = thickness;
        ctx.globalAlpha = opacity;
        ctx.stroke();
        ctx.globalAlpha = 1; // Opaklığı sıfırla
    }
}

// Çizgileri oluştur
const lines = [];
for (let i = 0; i < 200; i++) {
    lines.push(new WarpLine());
}

// Animasyon döngüsü
function animate() {
    // Hafif bir iz bırakmak için tam temizleme yerine yarı saydam siyahla doldur
    ctx.fillStyle = 'rgba(5, 5, 8, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Hızlanma efekti için merkezi biraz daha aydınlat (isteğe bağlı)
    // ctx.globalCompositeOperation = 'lighter';

    lines.forEach(line => {
        line.update();
        line.draw();
    });
    requestAnimationFrame(animate);
}

animate();