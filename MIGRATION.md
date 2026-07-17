# Миграция vikingdoor.net: Wix → GitHub Pages

Статус на 17.07.2026: сайт собран локально, git-коммит готов. Осталось: push на GitHub → включить Pages → одобрение владельца → переключение домена.

## Шаг 1. Запушить на GitHub (нужен доступ владельца)

⚠️ На этом Mac нет Homebrew и gh — используем чистый git (он установлен), ничего ставить не нужно.

1. В браузере (логин vikingdoorservice-ctrl): **github.com/new** → Repository name: `viking-garage-door-site` → выбрать **Public** → галочки README/.gitignore НЕ ставить → Create repository.
2. Создать токен: **github.com/settings/tokens** → Generate new token (classic) → Note: `mac-push`, галочка **repo** → Generate token → скопировать строку `ghp_…` (показывается один раз).
3. В терминале:

```bash
cd "/Users/taras/viking marketing/projects/01-site/site"
git remote add origin https://github.com/vikingdoorservice-ctrl/viking-garage-door-site.git
git push -u origin main
```

На вопрос Username ввести `vikingdoorservice-ctrl`, на Password вставить токен (Cmd+V; символы не отображаются — это нормально) и Enter. macOS запомнит токен в Keychain — второй раз вводить не придётся.

Репозиторий должен быть **public** — бесплатный GitHub Pages не работает с приватными.

Альтернатива без терминала: подключить GitHub-коннектор в настройках claude.ai (Settings → Connectors) — тогда Claude создаст репозиторий и зальёт файлы сам.

## Шаг 2. Включить GitHub Pages

github.com/vikingdoorservice-ctrl/viking-garage-door-site → Settings → Pages → Source: «Deploy from a branch» → Branch: `main`, папка `/ (root)` → Save.

Через ~2 минуты сайт живёт на `https://vikingdoorservice-ctrl.github.io/viking-garage-door-site/`. Это превью-адрес: старому сайту он не мешает (canonical у всех страниц указывает на vikingdoor.net).

## Шаг 3. Перед переключением домена (чек-лист)

- [ ] Владелец посмотрел сайт и одобрил дизайн/тексты
- [ ] Цены в /calculator/ подтверждены владельцем
- [ ] Форма /contact/ активирована: отправить тестовую заявку → в почте vikingdoorservice@gmail.com письмо от FormSubmit → нажать Activate → повторить тест
- [ ] (Опционально) заменить форму на Jobber: Jobber → Settings → Requests → Add to website
- [ ] Прогнать https://search.google.com/test/rich-results на страницах repair и spring (схемы FAQ/Service)

## Шаг 4. Переключение домена vikingdoor.net (только вместе с владельцем)

1. В репозитории: Settings → Pages → Custom domain → `www.vikingdoor.net` → Save (создаст файл CNAME). Включить «Enforce HTTPS» после проверки.
2. У DNS-провайдера домена (домен куплен через Wix — DNS управляется в Wix account → Domains, либо перенести DNS на Cloudflare):
   - `www` CNAME → `vikingdoorservice-ctrl.github.io`
   - apex `vikingdoor.net` A-записи → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Подождать пропагацию (до пары часов), проверить https://www.vikingdoor.net/ и все страницы из sitemap.
4. В Wix: домен отключить от старого сайта (НЕ удалять сам сайт — пусть лежит как архив).
5. Google Search Console (property vikingdoor.net): Sitemaps → отправить `https://www.vikingdoor.net/sitemap.xml` заново. Проверить «URL Inspection» на 2–3 ключевых страницах.
6. Google Business Profile: убедиться, что ссылка сайта — https://www.vikingdoor.net/ и телефон (864) 921-7373 (заодно закрывается NAP-конфликт: старый логотип с номером 656-224-1533 на новом сайте не используется).

## Почему SEO не слетит

- Слоги всех ранжирующихся URL сохранены 1:1 (repair, installation, spring, opener); старые второстепенные URL (/about, /services, /book-online, /blog, /garage-door-service-south-carolina) отдают мгновенный redirect + canonical.
- Title, meta description, H1 и все JSON-LD схемы (LocalBusiness, Service ×3, FAQPage ×2) перенесены дословно.
- Meta Pixel и Google Ads тег стоят на всех страницах — конверсии рекламы не прервутся.
- GitHub Pages сам делает 301 с URL-без-слэша на URL-со-слэшем — canonical совпадает с конечным адресом.

## Откат

Если что-то пошло не так — вернуть DNS-записи на Wix (Wix account → Domains → Reconnect) — старый сайт нетронут и вернётся в течение часа-двух.
