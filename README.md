# Recheckly - Веб-интерфейс для мануального тестирования

Быстрый и удобный веб-UI для джунов-тестировщиков. Никакой акробатики - просто ставь галочки.

## Возможности

- ✅ **Быстрая установка статусов** - PASS, FAIL, BLOCKED, SKIP прямо в списке
- 🔄 **Автосохранение** - никаких кнопок "Сохранить"
- 📋 **Детальный просмотр** - шаги, комментарии, скриншоты
- 🔍 **Фильтры** - по приоритету (P0/P1/P2/P3) и статусу
- ⌨️ **Горячие клавиши** - 1=PASS, 2=FAIL, 3=BLOCKED, 4=SKIP
- 💾 **Offline-режим** - локальное сохранение и синхронизация
- 📊 **Прогресс в реальном времени** - визуальный прогресс-бар

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Открыть в браузере
# http://localhost:3000
```

## Структура проекта

```
recheckly/
├── app/
│   ├── api/                    # API роуты
│   │   └── runs/
│   │       └── [runId]/
│   │           ├── route.ts           # GET /api/runs/:runId
│   │           ├── results/
│   │           │   └── [caseId]/
│   │           │       └── route.ts   # PUT /api/runs/:runId/results/:caseId
│   │           └── complete/
│   │               └── route.ts       # POST /api/runs/:runId/complete
│   ├── runs/
│   │   └── [runId]/
│   │       └── page.tsx        # Главная страница чек-листа
│   └── page.tsx                # Landing page
├── components/
│   ├── StatusPicker.tsx        # Компонент выбора статуса
│   ├── CaseRow.tsx             # Карточка кейса в списке
│   └── CaseDetailModal.tsx     # Модалка с деталями кейса
└── README.md
```

## API Schema

### GET /api/runs/:runId

Получить данные о run и результатах.

**Response:**
```json
{
  "suite": {
    "cases": [
      {
        "id": "c1",
        "title": "[Auth] Login with valid creds",
        "priority": "P0",
        "type": "smoke",
        "steps": [
          { "n": 1, "action": "Open app", "expected": "Home visible" },
          { "n": 2, "action": "Go Login", "expected": "Login visible" },
          { "n": 3, "action": "Enter creds & Submit", "expected": "Dashboard visible" }
        ]
      }
    ]
  },
  "results": {
    "c1": {
      "status": "PASS",
      "notes": "All good",
      "evidence": [
        { "kind": "screenshot", "url": "/uploads/..." }
      ]
    }
  }
}
```

### PUT /api/runs/:runId/results/:caseId

Обновить результат кейса.

**Request:**
```json
{
  "status": "PASS|FAIL|BLOCKED|SKIP|NONE",
  "notes": "Optional comment",
  "evidence": [
    { "kind": "screenshot", "url": "/uploads/..." }
  ]
}
```

### POST /api/runs/:runId/complete

Завершить run и отправить отчёт.

**Validation:**
- Все P0 кейсы должны иметь статус != NONE

## UX-правила

### Скорость работы
- Статус меняется **прямо в списке** - без открытия деталей
- **Автосейв** мгновенно, без ручного сохранения
- **Keyboard shortcuts** для быстрой работы (1-4)

### Гарды
- Нельзя завершить Run, если есть NONE в P0 кейсах
- При выборе FAIL автоматически открывается поле комментария

### Offline-первый подход
- Если сеть умерла - сохраняем локально в localStorage
- При восстановлении сети - автоматически синхронизируем
- Показываем статус "Offline режим" и количество в очереди

## Горячие клавиши

Работают когда открыта модалка с деталями кейса:

- `1` - PASS
- `2` - FAIL
- `3` - BLOCKED
- `4` - SKIP
- `Esc` - Закрыть модалку

## Следующие шаги

### Интеграция с БД

Сейчас используются mock-данные. Для production:

1. Замените mock в `app/api/runs/[runId]/route.ts` на запрос к БД
2. Реализуйте сохранение в `app/api/runs/[runId]/results/[caseId]/route.ts`
3. Добавьте валидацию в `app/api/runs/[runId]/complete/route.ts`

### Аутентификация

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
```

### Загрузка скриншотов

```typescript
// app/api/upload/route.ts
export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')

  // Upload to S3 or другое хранилище
  const url = await uploadToS3(file)

  return NextResponse.json({ url })
}
```

## Технологии

- **Next.js 15** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **localStorage** - offline хранение

## Развертывание

```bash
# Production build
npm run build

# Запуск production
npm start
```

### Vercel

```bash
vercel deploy
```

### Docker

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Доступность

- ARIA labels на всех интерактивных элементах
- Минимальный размер клика 44x44px
- Контрастность соответствует WCAG AA
- Keyboard navigation полностью поддерживается

## Лицензия

MIT
