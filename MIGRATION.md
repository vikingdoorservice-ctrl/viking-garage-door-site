# Миграция vikingdoor.net: Wix → GitHub Pages (боевой рунбук)

Статус на 20.07.2026: новый сайт живёт на превью-адресе
`https://vikingdoorservice-ctrl.github.io/viking-garage-door-site/`.
Осталось переключить домен **vikingdoor.net** со старого Wix на новый сайт.
Старый сайт Wix НЕ удаляем — он остаётся архивом и точкой отката.

---

## Почему SEO не слетит (главное)

- **4 ранжирующихся URL сохранены 1:1** — `/garage-door-repair-spartanburg-sc/`, `/garage-door-installation-spartanburg-sc/`, `/spring-replacement/`, `/opener-installation/` и главная `/`. Слоги совпадают дословно → позиции переезжают напрямую, редирект не нужен.
- **Второстепенные старые URL** (`/about`, `/services`, `/services-7`, `/book-online`, `/garage-door-service-south-carolina`, `/blog`) отдают мгновенный redirect (meta refresh 0) + canonical на ближайшую новую страницу.
- **Title, meta description, H1 и все JSON-LD схемы** (LocalBusiness, Service ×3, FAQPage ×2) перенесены дословно.
- **Meta Pixel и Google Ads тег** стоят на всех страницах — реклама и конверсии не прервутся.
- У домена **нет почты** (почта на @gmail.com) → MX-записи трогать не нужно, риск минимальный.

---

## Пред-полётный чек-лист (до переключения)

- [ ] Владелец посмотрел новый сайт и одобрил
- [ ] **Форма контактов активирована**: открыть `/contact/` на превью → отправить тестовую заявку → в почте vikingdoorservice@gmail.com письмо от FormSubmit → нажать **Activate** → отправить ещё раз, убедиться что заявка дошла. (Или заменить на форму Jobber — Jobber → Settings → Requests → Add to website.)
- [ ] (Опц.) Прогнать https://search.google.com/test/rich-results на страницах repair и spring

---

## Текущие DNS (Wix) — ЗАПИСАТЬ ДЛЯ ОТКАТА

Домен на нейм-серверах Wix: `ns8.wixdns.net`, `ns9.wixdns.net`.
Текущие записи (снято 20.07.2026):
- apex `vikingdoor.net` → A: `185.230.63.107`, `185.230.63.186`, `185.230.63.171`
- `www` → CNAME на Wix CDN (`cdn1.wixdns.net`)

Откат = вернуть эти записи или в Wix нажать **Reconnect domain to this site**.

---

## Переключение (делать вместе, по порядку)

### Шаг 1. GitHub: назначить домен
`github.com/vikingdoorservice-ctrl/viking-garage-door-site` → **Settings → Pages → Custom domain** → ввести `www.vikingdoor.net` → **Save**.
(GitHub создаст файл `CNAME` в репозитории и начнёт выпуск SSL-сертификата. Превью-адрес с этого момента будет вести на новый домен — это нормально.)

### Шаг 2. Wix: перенаправить DNS
Wix account → **Domains** → vikingdoor.net → **Advanced / DNS Records**. Заменить веб-записи:
- **A** (host `@` / apex) → четыре записи GitHub:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- **CNAME** (host `www`) → `vikingdoorservice-ctrl.github.io`

Старые Wix A-записи и www-CNAME при этом убрать/перезаписать.

### Шаг 3. Подождать и проверить
Пропагация 15 мин – 2 ч. Проверить, что открывается новый сайт и все страницы из `sitemap.xml`:
`https://www.vikingdoor.net/`, `/garage-door-repair-spartanburg-sc/`, `/garage-door-installation-spartanburg-sc/`, `/spring-replacement/`, `/opener-installation/`, `/contact/`, `/calculator/`.
Проверить 2–3 старых URL (`/services`, `/book-online`) — должны редиректить.

### Шаг 4. GitHub: включить HTTPS
Когда сертификат выпущен (в Settings → Pages пропадёт предупреждение) — поставить галочку **Enforce HTTPS**.

### Шаг 5. Обновить внутренние ссылки на боевой домен (делает Claude)
- `contact/index.html`: `_next` формы → `https://www.vikingdoor.net/thank-you/`
- `automation/posts.json`: адреса картинок → `https://www.vikingdoor.net/assets/img/...`
- Make: URL в модуле HTTP обоих сценариев (5707112, 5710112) → `https://www.vikingdoor.net/automation/posts.json`
- Push.

### Шаг 6. Google
- **Search Console** (property vikingdoor.net): Sitemaps → отправить `https://www.vikingdoor.net/sitemap.xml` заново. URL Inspection на 2–3 ключевых страницах → Request Indexing.
- **Google Business Profile**: сайт = `https://www.vikingdoor.net/`, телефон (864) 921-7373 (заодно закрывается NAP-конфликт со старым номером 656-224-1533).

### Шаг 7. Wix
Отключить домен от старого сайта (**НЕ удалять** сам сайт — пусть лежит архивом).

---

## Откат

Если что-то пошло не так на Шаге 2–3 — вернуть DNS-записи на значения из блока выше, либо Wix → Domains → **Reconnect to this site**. Старый сайт нетронут, вернётся за 1–2 часа. Внешние посетители во время пропагации видят рабочий сайт (старый или новый) — простоя нет.
