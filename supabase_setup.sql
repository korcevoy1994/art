-- Создание таблицы leads для хранения данных из формы обратной связи
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nume TEXT,
  prenume TEXT,
  functie TEXT,
  telefon TEXT,
  email TEXT,
  numeCompanie TEXT,
  codFiscal TEXT,
  telefonMarketing TEXT NOT NULL,
  emailMarketing TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение расширения для генерации UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Настройка Row Level Security (RLS)
-- Сначала включаем RLS для таблицы
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики, если они есть
DROP POLICY IF EXISTS "Allow anonymous inserts" ON leads;
DROP POLICY IF EXISTS "Allow authenticated reads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated updates" ON leads;

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