/* Language Switcher Logic */
let currentLang = 'tr';

function toggleLang() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    
    // Basit metinleri değiştir (data-tr / data-en öznitelikleri)
    document.querySelectorAll('.lang-text').forEach(el => {
        if(el.getAttribute('data-' + currentLang)) {
            el.textContent = el.getAttribute('data-' + currentLang);
        }
    });

    // Liste bloklarını değiştir (lang-block-tr / lang-block-en sınıfları)
    if (currentLang === 'en') {
        document.querySelectorAll('.lang-block-tr').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-block-en').forEach(el => el.style.display = 'block');
    } else {
        document.querySelectorAll('.lang-block-tr').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.lang-block-en').forEach(el => el.style.display = 'none');
    }
}

/* PDF Download Logic */
function downloadPDF() {
    // İd'si cvContent olan alanı seç
    const element = document.getElementById('cvContent');
    const controls = document.querySelector('.controls');
    
    // Butonları gizle
    if(controls) controls.style.display = 'none';
    
    // PDF çıktısında arka plan sorunlarını önlemek için temizle
    const originalBg = document.body.style.background;
    document.body.style.background = 'none';

    const opt = {
        margin: 0,
        filename: 'CV_Export.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        // İşlem bitince her şeyi eski haline getir
        if(controls) controls.style.display = 'flex';
        document.body.style.background = originalBg;
    });
}