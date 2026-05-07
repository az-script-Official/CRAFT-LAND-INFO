// الإعدادات والروابط الأساسية
const proxies = [
    url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    url => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
];

const mapInput = document.getElementById('mapInput');
const btnAnalyze = document.getElementById('btnAnalyze');
const resultsDiv = document.getElementById('results');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');

// وظيفة جلب البيانات
async function fetchMapData(mapCode) {
    const devId = '4e93e5106b39e1902e24d1ba2f17c709';
    const garenaUrl = `https://mapshare.freefiremobile.com/api/info?lang=ar&region=ME&map_code=%23${mapCode}&device_id=${devId}`;
    
    // محاولة استخدام أول بروكسي متاح
    try {
        const response = await fetch(proxies[0](garenaUrl));
        const json = await response.json();
        return json.data;
    } catch (err) {
        throw new Error("فشل في جلب البيانات من السيرفر");
    }
}

// عرض البيانات في الواجهة
function renderResults(data) {
    const info = data.workshop_code_info;
    
    document.getElementById('heroImg').src = info.map_cover_url;
    document.getElementById('heroTitle').textContent = info.workshop_name;
    document.getElementById('heroAuthor').textContent = `المصمم: ${info.author_name}`;
    document.getElementById('badgeCode').textContent = `#${info.short_workshop_code}`;

    // تعبئة الإحصائيات
    document.getElementById('statsGrid').innerHTML = `
        <div class="stat-card"><div>إعجاب</div><strong>${info.like_count}</strong></div>
        <div class="stat-card"><div>مشترك</div><strong>${info.subscribe_count}</strong></div>
        <div class="stat-card"><div>الجولات</div><strong>${info.round_count}</strong></div>
    `;

    // تعبئة التفاصيل
    document.getElementById('detailsContent').innerHTML = `
        <div class="info-row"><span>كود الخريطة:</span><span>${info.workshop_code}</span></div>
        <div class="info-row"><span>الوصف:</span><span>${info.workshop_desc || 'لا يوجد'}</span></div>
    `;

    resultsDiv.classList.remove('hidden');
}

// زر التحليل
btnAnalyze.addEventListener('click', async () => {
    const code = mapInput.value.trim().replace('#', '');
    if (!code) return alert("أدخل الكود أولاً");

    loadingBox.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    errorBox.classList.add('hidden');

    try {
        const data = await fetchMapData(code);
        if (data) {
            renderResults({ workshop_code_info: data.workshop_code_info });
        } else {
            throw new Error("الكود غير صحيح");
        }
    } catch (err) {
        errorBox.classList.remove('hidden');
        document.getElementById('errorMsg').textContent = err.message;
    } finally {
        loadingBox.classList.add('hidden');
    }
});
