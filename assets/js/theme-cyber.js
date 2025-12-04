// assets/js/theme-cyber.js

function createAnimatedBackground() {
    const bg = document.getElementById('animatedBg');
    if (!bg) return; // Hata önleme

    // Temizle (tekrar çağrılırsa üst üste binmesin)
    bg.innerHTML = '';

    // Parçacıklar (Particles)
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        bg.appendChild(particle);
    }

    // Izgara Çizgileri (Grid Lines)
    for (let i = 0; i < 10; i++) {
        const hLine = document.createElement('div');
        hLine.className = 'grid-line horizontal';
        hLine.style.top = (i * 10) + '%';
        bg.appendChild(hLine);

        const vLine = document.createElement('div');
        vLine.className = 'grid-line vertical';
        vLine.style.left = (i * 10) + '%';
        bg.appendChild(vLine);
    }

    // Kayan Kod Metinleri (Code Rain)
    const codeSnippets = [
        'function() { return true; }',
        'const data = await fetch();',
        'if (condition) { execute(); }',
        'import React from "react";',
        'npm install package',
        'git commit -m "update"',
        'system.init(cyber_mode);',
        'x = neural_net.predict(data);'
    ];

    for (let i = 0; i < 8; i++) {
        const code = document.createElement('div');
        code.className = 'code-text';
        code.textContent = codeSnippets[i];
        code.style.top = (Math.random() * 80 + 10) + '%'; // Rastgele yükseklik
        code.style.animationDelay = (i * 1.5) + 's';
        bg.appendChild(code);
    }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', createAnimatedBackground);