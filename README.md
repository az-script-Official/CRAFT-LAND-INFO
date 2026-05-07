markdown
<div align="center">
  <img src="image/icon.jpg" alt="CRAFT-LAND-INFO Logo" width="150" height="150" style="border-radius: 24px;">

  <h1>CRAFT-LAND-INFO</h1>

  <p><strong>An open-source website that provides information about the Craftland Free Fire maps</strong></p>

  <p>
    <a href="https://az-script-official.github.io/CRAFT-LAND-INFO/">
      <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=github&logoColor=white" alt="Live Demo">
    </a>
    <a href="https://github.com/az-script-Official/CRAFT-LAND-INFO">
      <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
    <a href="https://youtube.com/@azcraftland">
      <img src="https://img.shields.io/badge/YouTube-AZ%20Craftland-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube">
    </a>
    <a href="https://t.me/AZSCRIPTX">
      <img src="https://img.shields.io/badge/Telegram-AZ%20Script-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram">
    </a>
  </p>

  <img src="https://img.shields.io/badge/Language-HTML%20%7C%20CSS%20%7C%20JavaScript-orange" alt="Languages">
  <img src="https://img.shields.io/badge/Theme-Dark%20Mode-1a1a2e" alt="Dark Theme">
  <img src="https://img.shields.io/badge/Responsive-Mobile%20%26%20Desktop-blue" alt="Responsive">
  <img src="https://img.shields.io/badge/API-Garena%20Free%20Fire-success" alt="API">
</div>

---

## About The Website

**CRAFT-LAND-INFO** is a free and open-source web tool designed specifically for **Free Fire Craftland** players and map creators. It allows anyone to quickly retrieve detailed information about any Craftland map by simply entering its 6-character map code. The website connects directly to the official Garena Free Fire API to fetch real-time data about maps, including creator details, game mode configurations, player statistics, and more.

The website features a sleek dark-themed interface with smooth animations and a professional design that makes browsing map information an enjoyable experience. Whether you are a player looking to discover new maps or a creator wanting to check your map's statistics, CRAFT-LAND-INFO provides all the data you need in one place.

## Features

- **Map Analysis** - Enter any 6-character map code (e.g., `9A75B1`) to instantly retrieve comprehensive information about the map, including its name, creator, description, and full configuration details.

- **Detailed Statistics** - View key statistics for each map at a glance, including total likes, subscriber count, estimated play time, and the map creator's UID — all displayed in beautifully styled stat cards.

- **Map Cover Download** - Download the map cover image directly from the website with a single click. The download system uses multiple proxy servers to ensure reliability.

- **Map & Game Details** - Explore in-depth information divided into two collapsible sections:
  - **Map Information**: Full map name, creator name, short and full map codes, description, round count, map ID, and activity status.
  - **Game Details**: Team type (Solo, Duo, Trio, Squad), game mode name, template ID, group mode, region, language, and play time duration.

- **Smart Proxy System** - The website uses multiple CORS proxy servers and device IDs to ensure stable and reliable connections to the Garena API, with automatic fallback if one proxy fails.

- **Splash Screen** - A polished loading screen with an animated logo and progress bar that appears while the website resources are loading.

- **Dark Theme Design** - A modern dark-themed UI with gradient accents, glowing effects, and smooth hover animations that create an immersive gaming-oriented experience.

- **Fully Responsive** - The website is fully responsive and works perfectly on all screen sizes, from mobile phones to large desktop monitors.

- **Error Handling** - Comprehensive error handling with user-friendly error messages and a retry button, ensuring a smooth experience even when connection issues occur.

- **Bilingual Support** - The interface is primarily in Arabic, matching the MENA region target audience, with LTR support where needed (e.g., map codes and technical IDs).

## Project Structure

The project has a simple and clean structure with no build tools or dependencies required:

| File / Folder | Description |
|---|---|
| `index.html` | The main and only HTML file that contains the entire website — including all styles (CSS), structure (HTML), and logic (JavaScript) in a single file for easy deployment and hosting. |
| `image/icon.jpg` | The website logo/icon used in the header, splash screen, and empty state. Also used as the browser favicon. |
| `image/youtube.png` | The YouTube social media icon displayed in the footer links section. |
| `image/github.png` | The GitHub social media icon displayed in the footer links section. |
| `image/telegram.png` | The Telegram social media icon displayed in the footer links section. |
| `README.md` | This file — the project documentation containing information about the website, its features, structure, and setup instructions. |

## Try The Live Demo

You can try the website right now by clicking the link below:

<a href="https://az-script-official.github.io/CRAFT-LAND-INFO/">
  <img src="https://img.shields.io/badge/Click%20Here%20to%20Try%20the%20Website-Visit%20Live%20Demo-brightgreen?style=for-the-badge&logo=link&logoColor=white" alt="Live Demo">
</a>

> **Live URL:** https://az-script-official.github.io/CRAFT-LAND-INFO/

## Important: Hosting Requirements

> ⚠️ **This website MUST be hosted on a web server (e.g., GitHub Pages, Netlify, Vercel, or any static hosting service). It will NOT work if you simply open the `index.html` file directly on your computer.**
>
> The reason is that the website uses `fetch()` API calls to retrieve map data from the Garena Free Fire servers. Modern web browsers block these types of cross-origin requests (CORS) when running from a local file (`file://` protocol) for security reasons. When the website is hosted on a proper web server (`https://` or `http://`), these restrictions are handled through the proxy system built into the code, allowing everything to work correctly.

### How to Deploy

1. **Fork or download** this repository to your GitHub account.
2. Go to **Settings > Pages** in your repository.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Click **Save** and wait a few minutes for the site to be published.
5. Your website will be available at: `https://yourusername.github.io/CRAFT-LAND-INFO/`

Alternatively, you can host it on **Netlify** or **Vercel** by simply connecting your GitHub repository — no configuration needed.

## Social Links

<p align="center">
  <a href="https://youtube.com/@azcraftland">
    <img src="image/youtube.png" alt="YouTube" width="40" height="40" style="border-radius: 8px;">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/az-script-Official">
    <img src="image/github.png" alt="GitHub" width="40" height="40" style="border-radius: 8px;">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://t.me/AZSCRIPTX">
    <img src="image/telegram.png" alt="Telegram" width="40" height="40" style="border-radius: 8px;">
  </a>
</p>

<p align="center">
  <strong>Made with ❤️ by AZ Script</strong>
</p>

---
---

<div align="center">

# CRAFT-LAND-INFO

<p><strong>موقع مفتوح المصدر يوفر معلومات عن خرائط كرافت لاند فري فاير</strong></p>

</div>

## عن الموقع

**CRAFT-LAND-INFO** هو أداة ويب مجانية ومفتوحة المصدر مصممة خصيصاً للاعبي ومبدعي خرائط **فري فاير كرافت لاند**. يتيح الموقع لأي شخص استرجاع معلومات تفصيلية عن أي خريطة كرافت لاند ببساطة عن طريق إدخال كود الخريطة المكوّن من 6 أحرف. يتصل الموقع مباشرة بواجهة برمجة التطبيقات الرسمية الخاصة بـ Garena لجلب البيانات الحية عن الخرائط، بما في ذلك تفاصيل المبدع وإعدادات وضع اللعبة وإحصائيات اللاعبين والمزيد.

يتميز الموقع بواجهة أنيقة ذات طابع داكن مع رسوم متحركة سلسة وتصميم احترافي يجعل تصفح معلومات الخرائط تجربة ممتعة. سواء كنت لاعباً تبحث عن اكتشاف خرائط جديدة أو مبدعاً تريد التحقق من إحصائيات خريطتك، فإن CRAFT-LAND-INFO يوفر لك كل البيانات التي تحتاجها في مكان واحد.

## المميزات

- **تحليل الخرائط** - أدخل أي كود خريطة مكوّن من 6 أحرف (مثال: `9A75B1`) لاسترجاع معلومات شاملة عن الخريطة فوراً، بما في ذلك اسمها ومبدعها ووصفها وجميع تفاصيل الإعدادات.

- **إحصائيات مفصلة** - عرض الإحصائيات الرئيسية لكل خريطة بنظرة واحدة، بما في ذلك عدد الإعجابات وعدد المشتركين ومدة اللعب المقدّرة ومعرّف المبدع — كل ذلك معروض في بطاقات إحصائية مصممة بشكل جميل.

- **تحميل صورة الخريطة** - حمّل صورة غلاف الخريطة مباشرة من الموقع بنقرة واحدة. يستخدم نظام التحميل عدة خوادم وسيطة لضمان الموثوقية.

- **تفاصيل الخريطة واللعبة** - استكشف معلومات معمقة مقسمة إلى قسمين قابلين للطي:
  - **معلومات الخريطة**: الاسم الكامل، اسم المبدع، الكود المختصر والكامل، الوصف، عدد الجولات، رقم الخريطة، وحالة النشاط.
  - **تفاصيل اللعب**: نوع الفريق (فردي، ثنائي، ثلاثي، سكواد)، اسم وضع اللعبة، رقم القالب، نوع المجموعة، المنطقة، اللغة، ومدة اللعب.

- **نظام وسيط ذكي** - يستخدم الموقع عدة خوادم CORS وسيطة ومعرّفات أجهزة متعددة لضمان اتصال مستقر وموثوق بواجهة Garena، مع الانتقال التلقائي إلى خادم بديل في حال فشل أحدها.

- **شاشة تحميل احترافية** - شاشة تحميل أنيقة تحتوي على شعار متحرك وشريط تقدم يظهر أثناء تحميل موارد الموقع.

- **تصميم بطابع داكن** - واجهة مستخدم حديثة ذات طابع داكن مع تدرجات لونية وتأثيرات متوهجة ورسوم متحركة سلسة تخلق تجربة غامرة تناسب أجواء الألعاب.

- **متجاوب بالكامل** - الموقع متجاوب بالكامل ويعمل بشكل ممتاز على جميع أحجام الشاشات، من الهواتف المحمولة إلى شاشات الحاسوب الكبيرة.

- **معالجة الأخطاء** - معالجة شاملة للأخطاء مع رسائل خطأ وديّة وزر إعادة المحاولة لضمان تجربة سلسة حتى عند حدوث مشاكل في الاتصال.

## بنية المشروع

يتميز المشروع ببنية بسيطة ونظيفة ولا يتطلب أي أدوات بناء أو مكتبات خارجية:

| الملف / المجلد | الوظيفة |
|---|---|
| `index.html` | الملف الرئيسي والوحيد الذي يحتوي على الموقع بالكامل — يشمل جميع الأنماط (CSS) والهيكل (HTML) والمنطق (JavaScript) في ملف واحد لتسهيل النشر والاستضافة. |
| `image/icon.jpg` | شعار/أيقونة الموقع المستخدمة في الرأس وشاشة التحميل والحالة الفارغة. يُستخدم أيضاً كأيقونة المتصفح (favicon). |
| `image/youtube.png` | أيقونة يوتيوب المعروضة في قسم الروابط الاجتماعية في التذييل. |
| `image/github.png` | أيقونة جيت هاب المعروضة في قسم الروابط الاجتماعية في التذييل. |
| `image/telegram.png` | أيقونة تيليغرام المعروضة في قسم الروابط الاجتماعية في التذييل. |
| `README.md` | هذا الملف — وثائق المشروع التي تحتوي على معلومات عن الموقع ومميزاته وبنيته وتعليمات الإعداد. |

## جرّب الموقع الحي

يمكنك تجربة الموقع الآن بالنقر على الرابط أدناه:

<a href="https://az-script-official.github.io/CRAFT-LAND-INFO/">
  <img src="https://img.shields.io/badge/اضغط%20هنا%20لتجربة%20الموقع-العرض%20الحي-brightgreen?style=for-the-badge&logo=link&logoColor=white" alt="Live Demo">
</a>

> **الرابط المباشر:** https://az-script-official.github.io/CRAFT-LAND-INFO/

## مهم: متطلبات الاستضافة

> ⚠️ **يجب استضافة هذا الموقع على خادم ويب (مثل GitHub Pages أو Netlify أو Vercel أو أي خدمة استضافة ثابتة). لن يعمل الموقع إذا قمت بفتح ملف `index.html` مباشرة على جهازك.**
>
> السبب هو أن الموقع يستخدم مكالمات `fetch()` لاسترجاع بيانات الخرائط من خوادم Garena. متصفحات الويب الحديثة تمنع هذا النوع من الطلبات عبر النطاقات (CORS) عند التشغيل من ملف محلي (`file://`) لأسباب أمنية. عندما يتم استضافة الموقع على خادم ويب حقيقي (`https://` أو `http://`)، تتم معالجة هذه القيود عبر نظام الخوادم الوسيطة المدمج في الكود، مما يسمح بعمل كل شيء بشكل صحيح.

### كيف تنشر الموقع

1. **انسخ أو نزّل** هذا المستودع إلى حسابك على GitHub.
2. اذهب إلى **Settings > Pages** في مستودعك.
3. تحت **Source**، اختر فرع `main` ومجلد `/ (root)`.
4. اضغط على **Save** وانتظر بضع دقائق حتى يتم نشر الموقع.
5. سيكون موقعك متاحاً على: `https://اسم المستخدم الخاص بك.github.io/CRAFT-LAND-INFO/`

بديلاً عن ذلك، يمكنك استضافته على **Netlify** أو **Vercel** ببساطة عن طريق ربط مستودع GitHub الخاص بك — لا حاجة لأي إعدادات.

## روابط التواصل الاجتماعي

<p align="center">
  <a href="https://youtube.com/@azcraftland">
    <img src="image/youtube.png" alt="YouTube" width="40" height="40" style="border-radius: 8px;">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/az-script-Official">
    <img src="image/github.png" alt="GitHub" width="40" height="40" style="border-radius: 8px;">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://t.me/AZSCRIPTX">
    <img src="image/telegram.png" alt="Telegram" width="40" height="40" style="border-radius: 8px;">
  </a>
</p>

<p align="center">
  <strong>صنع بكل ❤️ بواسطة AZ Script</strong>
</p>