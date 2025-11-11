# Recheckly MCP Server

MCP сервер для интеграции Recheckly с Claude Code. Позволяет автоматически создавать тест-кейсы из кода.

## Возможности

### 🤖 Автогенерация тестов
Claude Code может анализировать ваш код и автоматически создавать тест-кейсы:
- Анализ новых фич → создание кейсов
- Изменения в коде → обновление тестов
- Рефакторинг → проверка affected тестов

### 🔗 Traceability
Связывает тест-кейсы с файлами кода:
- Видно какие тесты покрывают какие файлы
- При изменении файла - список affected тестов
- Автоматические рекомендации по ретестированию

### 📦 Простое управление
- Создание кейсов, suites, runs через Claude
- Минимум ручной работы
- Фокус на тестировании, а не на администрировании

## Установка

```bash
cd mcp-server
npm install
npm run build
```

## Настройка в Claude Code

Добавьте в настройки Claude Code (`~/.config/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "recheckly": {
      "command": "node",
      "args": ["/path/to/recheckly/mcp-server/dist/index.js"],
      "env": {
        "RECHECKLY_DB": "/path/to/recheckly/.recheckly"
      }
    }
  }
}
```

## Использование

### Создание тест-кейса

```
Claude, создай тест-кейс для функции логина:
- Приоритет P0
- Smoke тест
- Проверить вход с валидными креденшалами
```

Claude использует MCP tool `create_test_case`:

```typescript
{
  title: "[Auth] Login with valid credentials",
  priority: "P0",
  type: "smoke",
  steps: [
    { action: "Open login page", expected: "Login form visible" },
    { action: "Enter email and password", expected: "Fields filled" },
    { action: "Click submit", expected: "Redirected to dashboard" }
  ],
  affectedFiles: ["src/auth/login.ts", "src/pages/LoginPage.tsx"]
}
```

### Проверка affected тестов

После изменения кода:

```
Claude, какие тесты нужно перепроверить после изменений в src/auth/login.ts?
```

Claude использует `get_affected_tests` и выдаст список кейсов.

### Создание test run

```
Claude, создай test run для спринта 23 с кейсами auth
```

## API Tools

### `create_test_case`
Создает новый тест-кейс.

**Параметры:**
- `title` - название
- `priority` - P0/P1/P2/P3
- `type` - smoke/functional/regression/integration/performance/security
- `steps` - массив шагов [{action, expected}]
- `affectedFiles` - файлы кода (опционально)

### `create_test_suite`
Группирует кейсы в набор.

**Параметры:**
- `name` - название
- `description` - описание
- `caseIds` - ID кейсов

### `create_test_run`
Создает test run.

**Параметры:**
- `name` - название
- `suiteId` - ID suite
- `assignedTo` - кому назначить (опционально)

### `list_test_cases`
Список всех кейсов.

**Параметры:**
- `affectedFile` - фильтр по файлу (опционально)

### `get_affected_tests`
Какие тесты затронуты изменениями.

**Параметры:**
- `changedFiles` - массив измененных файлов

## Workflow

### 1. Разработчик меняет код

```bash
git diff --name-only HEAD~1
# src/auth/login.ts
# src/components/LoginForm.tsx
```

### 2. Claude анализирует изменения

```
Claude, проверь какие тесты нужно перезапустить после этих изменений
```

Claude через MCP:
- Читает измененные файлы
- Находит affected кейсы
- Предлагает создать run

### 3. QA запускает тесты

Переходит на `/runs/run_xxx` и выполняет кейсы.

### 4. Результаты сохраняются

Статистика Pass/Fail доступна в dashboard.

## Примеры диалогов

### Создание кейсов для новой фичи

```
User: У нас новая фича - двухфакторная аутентификация в src/auth/2fa.ts.
      Создай тест-кейсы.

Claude: Создам несколько кейсов для 2FA:

1. [Auth] Enable 2FA (P0, functional)
   - Шаг 1: Go to security settings
   - Шаг 2: Click "Enable 2FA"
   - Шаг 3: Scan QR code
   - Шаг 4: Enter verification code
   Expected: 2FA enabled

2. [Auth] Login with 2FA (P0, smoke)
   - Шаг 1: Enter credentials
   - Шаг 2: Enter 2FA code
   Expected: Successfully logged in

3. [Auth] Backup codes (P1, functional)
   ...

✅ Created 3 test cases linked to src/auth/2fa.ts
```

### Проверка перед деплоем

```
User: Собираемся деплоить. Проверь что все P0 тесты актуальны.

Claude: Анализирую P0 кейсы...
- 8 P0 кейсов всего
- 3 затронуты последними изменениями:
  • case_xxx: [Auth] Login with 2FA
  • case_yyy: [Payment] Card processing
  • case_zzz: [API] User endpoint

Рекомендую создать smoke run с этими кейсами.
Создать? (yes/no)
```

## Хранение данных

Данные хранятся в `.recheckly/`:
- `cases.json` - тест-кейсы
- `suites.json` - test suites
- `runs.json` - test runs

Можно коммитить в git для версионирования:

```bash
git add .recheckly/
git commit -m "Add test cases for 2FA feature"
```

## Расширения

### Интеграция с CI/CD

```yaml
# .github/workflows/test.yml
- name: Check affected tests
  run: |
    CHANGED=$(git diff --name-only HEAD~1)
    echo "Changed files: $CHANGED"
    # Создать run для affected кейсов
```

### Автосоздание кейсов при PR

```yaml
- name: Generate tests
  run: |
    claude "Analyze changes in this PR and create test cases"
```

## Troubleshooting

### MCP сервер не запускается

Проверьте:
1. `npm run build` выполнен
2. Путь в конфиге правильный
3. Node.js >= 18

### Кейсы не создаются

Проверьте права на запись в `RECHECKLY_DB`.

### Affected tests не находятся

Убедитесь что при создании кейсов указан `affectedFiles`.

## Лицензия

MIT
