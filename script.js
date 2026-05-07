// 1. Splash Screen Logic
(function() {
    const bar = document.getElementById('splashProgress');
    const pct = document.getElementById('splashPercent');
    const splash = document.getElementById('splashScreen');
    let progress = 0;
    const steps = [10, 30, 60, 90, 100];
    let i = 0;

    function tick() {
        if (i >= steps.length) {
            setTimeout(() => {
                splash.classList.add('fade-out');
                setTimeout(() => splash.style.display = 'none', 500);
            }, 300);
            return;
        }
        progress = steps[i++];
        bar.style.width = progress + '%';
        pct.textContent = progress + '%';
        setTimeout(tick, 200 + Math.random() * 300);
    }
    tick();
})();

// 2. Core App Logic
let currentData = null;

const proxies = [
    u => 'https://corsproxy.io/?' + encodeURIComponent(u),
    u => 'https://api.allorigins.win/get?url=' + encodeURIComponent(u)
];

const devIds = ['4e93e5106b39e1902e24d1ba2f17c709'];

async function startAnalysis() {
    let input = document.getElementById('mapInput').value.trim();
    if (!input) return alert('يرجى إدخال الكود');
    if (input.startsWith('#')) input = input.substring(1);

    const btn = document.getElementById('btnAnalyze');
    const btnText = document.getElementById('btnText');
    
    // UI Reset
    btn.disabled = true;
    btnText.innerHTML = '<div class="spinner"></div>';
    document.getElementById('errorBox').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('loadingBox').classList.remove('hidden');

    try {
        const mapData = await fetchMapInfo(input);
        renderData(mapData);
    } catch (err) {
        showError(err.message);
    } finally {
        btn.disabled = false;
        btnText.textContent = 'تحليل البيانات';
        document.getElementById('loadingBox').classList.add('hidden');
    }
}

async function fetchMapInfo(code) {
    const url = `https://mapshare.freefiremobile.com/api/info?lang=ar&region=ME&map_code=%23${code}&device_id=${devIds[0]}`;
    
    for (let proxy of proxies) {
        try {
            const resp = await fetch(proxy(url));
            let json = await resp.json();
            if (json.contents) json = JSON.parse(json.contents); // For AllOrigins
            
            if (json.code === 0) return json.data;
            throw new Error(json.msg || 'الكود غير صحيح');
        } catch (e) { continue; }
    }
    throw new Error('فشل الاتصال بالخادم');
}

function renderData(data) {
    currentData = data;
    const info = data.workshop_code_info;
    
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('heroImg').src = info.map_cover_url;
    document.getElementById('heroTitle').textContent = info.workshop_name;
    document.getElementById('heroAuthor').textContent = 'بواسطة: ' + info.author_name;
    document.getElementById('badgeCode').textContent = '#' + info.short_workshop_code;

    // Stats Grid
    document.getElementById('statsGrid').innerHTML = `
        <div class="stat-card">إعجاب: ${info.like_count}</div>
        <div class="stat-card">مشترك: ${info.subscribe_count}</div>
        <div class="stat-card">مدة اللعب: ${Math.floor(info.min_est_play_time/60)} دقيقة</div>
        <div class="stat-card">ID المصمم: ${info.map_cover_url.match(/_(\d+)_/)?.[1] || 'N/A'}</div>
    `;

    // Details Content
    document.getElementById('detailsContent').innerHTML = `
        <div class="info-row"><span>الاسم</span><span>${info.workshop_name}</span></div>
        <div class="info-row"><span>الكود الكامل</span><span>${info.workshop_code}</span></div>
        <div class="info-row"><span>عدد الجولات</span><span>${info.round_count}</span></div>
    `;

    document.getElementById('body-details').classList.add('open');
}

function toggleSection(id) {
    const body = document.getElementById('body-' + id);
    body.classList.toggle('open');
}

function showError(msg) {
    document.getElementById('errorMsg').textContent = msg;
    document.getElementById('errorBox').classList.remove('hidden');
}

document.getElementById('mapInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') startAnalysis();
});
