// ═══════════════════════════════════════════════════
// ═══ Info Craft Land - Application Logic ═══
// ═══════════════════════════════════════════════════

// ═══ Splash Screen Logic ═══
(function() {
    var bar = document.getElementById('splashProgress');
    var pct = document.getElementById('splashPercent');
    var splash = document.getElementById('splashScreen');
    var progress = 0;
    var steps = [8, 18, 30, 42, 55, 65, 75, 85, 92, 97, 100];
    var i = 0;

    function tick() {
        if (i >= steps.length) {
            bar.style.width = '100%';
            pct.textContent = '100%';
            setTimeout(function() {
                splash.classList.add('fade-out');
                setTimeout(function() { splash.style.display = 'none'; }, 500);
            }, 300);
            return;
        }
        progress = steps[i];
        bar.style.width = progress + '%';
        pct.textContent = progress + '%';
        i++;
        var delay = 150 + Math.random() * 250;
        setTimeout(tick, delay);
    }

    var logoImg = splash.querySelector('.splash-logo');
    if (logoImg.complete) {
        setTimeout(tick, 200);
    } else {
        logoImg.onload = function() { setTimeout(tick, 200); };
        logoImg.onerror = function() { setTimeout(tick, 200); };
    }
})();

// ═══ Main Application ═══
var currentData = null;

var proxyFunctions = [
    function(u){ return 'https://corsproxy.io/?' + encodeURIComponent(u); },
    function(u){ return 'https://api.allorigins.win/get?url=' + encodeURIComponent(u); },
    function(u){ return 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(u); },
];

var deviceIds = [
    '4e93e5106b39e1902e24d1ba2f17c709',
    'a1b2c3d4e5f6789012345678abcdef01',
    'f1e2d3c4b5a697808675645374839201',
];

function formatNumber(n){ return n.toLocaleString('en-US'); }

function formatTime(s){
    var m = Math.floor(s/60);
    var sc = s%60;
    if(m >= 60){ var h = Math.floor(m/60); var mi = m%60; return h + ' ساعة' + (mi > 0 ? ' و ' + mi + ' دقيقة' : ''); }
    return m + ' دقيقة' + (sc > 0 ? ' و ' + sc + ' ثانية' : '');
}

function extractUid(url){ var m = url.match(/_(\d{8,12})_/); return m ? m[1] : 'غير معروف'; }

function formatTeamCount(c){
    return {1:'فردي',2:'ثنائي (2V2)',3:'ثلاثي (3V3)',4:'سكواد (4V4)',5:'ضد 5',6:'ضد 6'}[c] || c + ' فرق';
}

function getModeName(tid, gid, config){
    var tk = config.mode_template_id_key_map[String(tid)];
    if(tk) return config.translations[tk] || tk;
    if(gid !== undefined){ var gk = config.game_mode_id_key_map[String(gid)]; if(gk) return config.translations[gk] || gk; }
    return 'وضع مخصص';
}

// Toggle Section
function toggleSection(id){
    var body = document.getElementById('body-' + id);
    var chev = document.getElementById('chev-' + id);
    if(body.classList.contains('open')){
        body.classList.remove('open');
        if(chev) chev.classList.remove('open');
    } else {
        body.classList.add('open');
        if(chev) chev.classList.add('open');
    }
}

// Show Toast
function showToast(msg){
    var toast = document.getElementById('dlToast');
    document.getElementById('dlToastText').textContent = msg;
    toast.classList.add('show');
    setTimeout(function(){ toast.classList.remove('show'); }, 2500);
}

// Single fetch attempt
async function fetchMapData(proxyFn, devId, mapCode, abortSignal){
    var garenaUrl = 'https://mapshare.freefiremobile.com/api/info?lang=ar&region=ME&map_code=%23' + mapCode + '&device_id=' + devId;
    var proxyUrl = proxyFn(garenaUrl);
    var resp = await fetch(proxyUrl, { signal: abortSignal });
    if(!resp.ok) throw new Error('HTTP ' + resp.status);
    var data;
    if(proxyUrl.indexOf('allorigins') !== -1){
        var json = await resp.json();
        data = JSON.parse(json.contents);
    } else {
        data = await resp.json();
    }
    if(data.code === 0 && data.data){
        return { success: true, data: data.data };
    } else {
        return { success: false, msg: data.msg || 'الكود غير صحيح أو الخريطة غير موجودة' };
    }
}

// Main Analyze function
function analyzeMap(){
    return async function(){
        var input = document.getElementById('mapInput').value.trim();
        if(!input){ showError('يرجى إدخال كود الخريطة'); return; }
        if(input.startsWith('#')) input = input.substring(1);

        var btn = document.getElementById('btnAnalyze');
        var btnText = document.getElementById('btnText');
        btn.disabled = true;
        btnText.innerHTML = '<div class="spinner"></div>';
        document.getElementById('errorBox').classList.add('hidden');
        document.getElementById('results').classList.add('hidden');
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('loadingBox').classList.remove('hidden');

        var attempts = [];
        for(var pi = 0; pi < proxyFunctions.length; pi++){
            for(var di = 0; di < deviceIds.length; di++){
                var ctrl = new AbortController();
                var timer = setTimeout(function(c){ return function(){ c.abort(); }; }(ctrl), 8000);
                attempts.push({
                    promise: fetchMapData(proxyFunctions[pi], deviceIds[di], input, ctrl.signal),
                    ctrl: ctrl, timer: timer
                });
            }
        }

        var done = false;
        var errorMsg = '';

        var allPromises = attempts.map(function(att, idx){
            return (async function(a, i){
                try {
                    var result = await a.promise;
                    clearTimeout(a.timer);
                    if(done) return null;
                    done = true;
                    attempts.forEach(function(b, j){ if(j !== i){ b.ctrl.abort(); clearTimeout(b.timer); } });
                    return result;
                } catch(e){
                    clearTimeout(a.timer);
                    return null;
                }
            })(att, idx);
        });

        var foundResult = null;
        var results = await Promise.allSettled(allPromises);

        for(var ri = 0; ri < results.length; ri++){
            if(results[ri].status === 'fulfilled' && results[ri].value && results[ri].value.success){
                foundResult = results[ri].value;
                break;
            }
            if(results[ri].status === 'fulfilled' && results[ri].value && !results[ri].value.success){
                errorMsg = results[ri].value.msg;
            }
        }

        document.getElementById('loadingBox').classList.add('hidden');
        btn.disabled = false;
        btnText.textContent = 'تحليل البيانات';

        if(foundResult){
            currentData = foundResult.data;
            renderData(foundResult.data);
        } else if(errorMsg){
            showError(errorMsg);
        } else {
            showError('فشل الاتصال بالسيرفر بعد عدة محاولات. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.');
        }
    };
}

// Show Error
function showError(msg){
    document.getElementById('errorMsg').textContent = msg;
    document.getElementById('errorBox').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
}

// Download Image
function downloadImage(){
    if(!currentData) return;
    var imgUrl = currentData.workshop_code_info.map_cover_url;
    if(!imgUrl) return;
    var fileName = (currentData.workshop_code_info.workshop_name || 'map') + '.jpg';

    showToast('جاري تحميل الصورة...');

    var proxyUrls = proxyFunctions.map(function(fn){ return fn(imgUrl); });
    var aborted = false;

    var tryProxy = function(pUrl){
        return new Promise(function(resolve, reject){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', pUrl, true);
            xhr.responseType = 'blob';
            xhr.timeout = 15000;
            xhr.onload = function(){
                if(xhr.status === 200 && xhr.response && xhr.response.size > 0){
                    resolve(xhr.response);
                } else {
                    reject(new Error('bad response'));
                }
            };
            xhr.onerror = function(){ reject(new Error('xhr error')); };
            xhr.ontimeout = function(){ reject(new Error('timeout')); };
            xhr.send();
        });
    };

    Promise.any(proxyUrls.map(function(u){ return tryProxy(u); }))
    .then(function(blob){
        if(aborted) return;
        aborted = true;
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showToast('تم تحميل الصورة بنجاح');
    })
    .catch(function(){
        if(aborted) return;
        try {
            var a = document.createElement('a');
            a.href = imgUrl;
            a.download = fileName;
            a.target = '_blank';
            a.rel = 'noopener';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('تم فتح الصورة - احفظها يدوياً');
        } catch(e){
            showToast('حدث خطأ في تحميل الصورة');
        }
    });
}

// Render Data
function renderData(data){
    var info = data.workshop_code_info;
    var config = data.game_config;

    document.getElementById('results').classList.remove('hidden');
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('errorBox').classList.add('hidden');

    // Hero
    document.getElementById('heroImg').src = info.map_cover_url;
    document.getElementById('heroTitle').textContent = info.workshop_name;
    document.getElementById('heroAuthor').textContent = 'بواسطة: ' + info.author_name;
    document.getElementById('badgeCode').textContent = '#' + info.short_workshop_code;
    if(info.state === 1) document.getElementById('badgeActive').classList.remove('hidden');
    else document.getElementById('badgeActive').classList.add('hidden');

    // Actions
    document.getElementById('actionsBar').innerHTML = '<button class="btn-action btn-green" onclick="downloadImage()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>تحميل الصورة</span></button>';

    // Stats
    document.getElementById('statsGrid').innerHTML =
        '<div class="stat-card stat-red"><div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg><span class="stat-label">إعجاب</span></div><div class="stat-value">' + formatNumber(info.like_count) + '</div></div>' +
        '<div class="stat-card stat-blue"><div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg><span class="stat-label">مشترك</span></div><div class="stat-value">' + formatNumber(info.subscribe_count) + '</div></div>' +
        '<div class="stat-card stat-amber"><div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span class="stat-label">مدة اللعب</span></div><div class="stat-value">' + formatTime(info.min_est_play_time) + '</div></div>' +
        '<div class="stat-card stat-purple"><div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg><span class="stat-label">UID المصمم</span></div><div class="stat-value" style="font-size:0.9rem;direction:ltr;text-align:right">' + extractUid(info.map_cover_url) + '</div></div>';

    // Details
    var rows = [
        ['اسم الخريطة', info.workshop_name],
        ['اسم المصمم', info.author_name],
        ['كود الخريطة المختصر', '#' + info.short_workshop_code, true],
        ['كود الخريطة الكامل', info.workshop_code, true],
        ['الوصف', info.workshop_desc || 'لا يوجد وصف'],
        ['عدد الجولات', String(info.round_count)],
        ['رقم الخريطة', String(info.map_id)],
        ['حالة الخريطة', info.state === 1 ? 'نشطة' : 'غير نشطة'],
    ];
    if(info.sub_desc) rows.push(['وصف إضافي', info.sub_desc]);
    document.getElementById('detailsContent').innerHTML = rows.map(function(r){
        return '<div class="info-row"><span class="info-label">' + r[0] + '</span><span class="info-value' + (r[2] ? ' mono' : '') + '">' + r[1] + '</span></div>';
    }).join('');

    // Game Details
    var modeName = getModeName(info.mode_template_id, info.game_mode, config);
    var gameRows = [
        ['نوع الفريق', formatTeamCount(info.team_count)],
        ['وضع اللعبة', modeName],
        ['رقم القالب', String(info.mode_template_id)],
        ['معرف وضع اللعبة', String(info.game_mode)],
        ['نوع المجموعة', info.group_mode === 1 ? 'جماعي' : 'فردي'],
        ['المنطقة', data.region + ' (' + data.region_lang + ')'],
        ['اللغة', data.lang === 'ar' ? 'العربية' : data.lang],
        ['وقت اللعب', formatTime(info.min_est_play_time)],
    ];
    document.getElementById('gameContent').innerHTML = gameRows.map(function(r){
        return '<div class="info-row"><span class="info-label">' + r[0] + '</span><span class="info-value">' + r[1] + '</span></div>';
    }).join('');

    // Open first sections
    toggleSection('details');
    toggleSection('game');
}

// Enter key
document.getElementById('mapInput').addEventListener('keydown', function(e){
    if(e.key === 'Enter') analyzeMap()();
});
