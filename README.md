# Viking Garage Door — vikingdoor.net

Статичный сайт Viking Garage Door LLC (Boiling Springs, SC). Перенос с Wix, дизайн — DeWalt-гамма (графит `#20262E`/`#16191D`, оранжевый `#E8820C`, Barlow Condensed).

## Структура

- 4 страницы в меню: `/` (Главная), `/garage-door-repair-spartanburg-sc/` (Ремонт), `/garage-door-installation-spartanburg-sc/` (Установка), `/contact/` (Контакты)
- 2 SEO-страницы вне меню (сохраняют позиции старого сайта): `/spring-replacement/`, `/opener-installation/`
- `/calculator/` — конфигуратор двери с ценами
- Редирект-заглушки со старых Wix-URL: `/about/`, `/services/`, `/services-7/`, `/book-online/`, `/garage-door-service-south-carolina/`, `/blog/`
- `sitemap.xml`, `robots.txt`, `404.html`, `/thank-you/` (после отправки формы)

## Что перенесено с Wix (SEO)

- Точные title и meta description каждой страницы
- Все JSON-LD схемы: LocalBusiness (глобально), Service ×3, FAQPage ×2
- Meta Pixel `2051813482430700`, Google Ads тег `AW-17915902926`
- Слоги URL старого сайта; canonical — на `https://www.vikingdoor.net/...`
- Телефон везде единый: **(864) 921-7373** (номер 656-224-1533 нигде не используется — он был источником NAP-конфликта)

## Форма заявки

`/contact/` отправляет через FormSubmit на vikingdoorservice@gmail.com. **Первая отправка пришлёт на почту письмо-подтверждение от FormSubmit — надо нажать Activate.** Когда будет ссылка на форму Jobber (Settings → Requests → Add to website), заменить форму на неё.

## Деплой

GitHub Pages: Settings → Pages → «Deploy from a branch» → `main`, папка `/ (root)`. Файл `.nojekyll` уже лежит.

Локальный запуск: `python3 -m http.server 8080` из корня репо.

## Переключение домена (когда сайт одобрен)

См. `MIGRATION.md` — DNS-записи, подключение vikingdoor.net в настройках Pages, Search Console. До переключения сайт живёт на github.io-адресе и не конфликтует со старым (canonical указывает на vikingdoor.net).
