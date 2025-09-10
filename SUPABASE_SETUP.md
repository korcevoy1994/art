# Настройка Supabase для ArtGarage

## Шаги настройки

1. **Создайте аккаунт Supabase**
   - Перейдите на [supabase.com](https://supabase.com/) и зарегистрируйтесь
   - Создайте новый проект

2. **Настройте таблицу для хранения данных формы**
   
   ### Вариант 1: Использование SQL-запроса (рекомендуется)
   - В панели управления Supabase перейдите в раздел "SQL Editor"
   - Создайте новый запрос
   - Вставьте содержимое файла `supabase_setup.sql` из корня проекта
   - Нажмите "Run" для выполнения запроса
   - Этот запрос создаст таблицу `leads` и настроит все необходимые политики безопасности
   
   ### Вариант 2: Ручное создание через Table Editor
   - В панели управления Supabase перейдите в раздел "Table Editor"
   - Создайте новую таблицу `leads` со следующими полями:
     - `id` (тип: uuid, primary key)
     - `created_at` (тип: timestamp with timezone, default: now())
     - `nume` (тип: text)
     - `prenume` (тип: text)
     - `functie` (тип: text)
     - `telefon` (тип: text)
     - `email` (тип: text)
     - `numeCompanie` (тип: text)
     - `codFiscal` (тип: text)
     - `telefonMarketing` (тип: text, not null)
     - `emailMarketing` (тип: text, not null)
     - `updated_at` (тип: timestamp with timezone, default: now())

3. **Настройте переменные окружения**
   - В корне проекта найдите файл `.env.local`
   - Замените значения на ваши ключи Supabase:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```
   - Эти значения можно найти в разделе Project Settings > API в панели управления Supabase

4. **Настройте Row Level Security (RLS)**
   - В панели управления Supabase перейдите к таблице `leads`
   - Включите RLS (Row Level Security)
   - Создайте следующие политики:
     - Политика для вставки данных:
       - Название: `Allow inserts for all`
       - Операция: `INSERT`
       - Целевая роль: `public`
       - Условие: `true`
     - Политика для чтения данных:
       - Название: `Allow reads for all`
       - Операция: `SELECT`
       - Целевая роль: `public`
       - Условие: `true`
     - Политика для обновления данных:
       - Название: `Allow updates for all`
       - Операция: `UPDATE`
       - Целевая роль: `public`
       - Условие: `true`

## Тестирование

1. Запустите приложение локально с помощью `npm run dev`
2. Заполните форму и отправьте ее
3. Проверьте, что данные появились в таблице `leads` в панели управления Supabase

## Устранение неполадок

- Если форма не отправляется, проверьте консоль браузера на наличие ошибок
- Убедитесь, что переменные окружения правильно настроены
- Проверьте, что таблица `leads` имеет правильную структуру полей
- Убедитесь, что политики RLS настроены правильно

## Обновление политик RLS

Если у вас возникают проблемы с отправкой формы из-за ошибок доступа, выполните следующие действия:

1. В панели управления Supabase перейдите в раздел "SQL Editor"
2. Создайте новый запрос
3. Вставьте следующий SQL-код для обновления политик RLS:

```sql
-- Удаляем существующие политики, если они есть
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated updates" ON leads;
DROP POLICY IF EXISTS "Allow inserts" ON leads;

-- Создаем политику, которая позволяет вставку данных для всех пользователей (включая анонимных)
CREATE POLICY "Allow inserts for all" ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Создаем политику, которая позволяет читать все записи для всех пользователей
CREATE POLICY "Allow reads for all" ON leads
  FOR SELECT
  TO public
  USING (true);

-- Создаем политику, которая позволяет обновлять записи для всех пользователей
CREATE POLICY "Allow updates for all" ON leads
  FOR UPDATE
  TO public
  USING (true);
```

4. Нажмите "Run" для выполнения запроса