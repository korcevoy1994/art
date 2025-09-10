// Скрипт для создания таблицы leads в Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Получаем URL и ключ из переменных окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Создаем клиент Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('URL:', supabaseUrl);
console.log('ANON KEY:', supabaseAnonKey);

// Функция для создания таблицы leads
async function createLeadsTable() {
  console.log('Создание таблицы leads...');
  
  try {
    // Выполняем SQL запрос для создания таблицы
    const { data, error } = await supabase.rpc('create_leads_table');
    
    if (error) {
      console.error('Ошибка при создании таблицы через RPC:', error);
      
      // Альтернативный подход - прямой SQL запрос
      console.log('Пробуем прямой SQL запрос...');
      const { data: sqlData, error: sqlError } = await supabase
        .from('leads')
        .insert([
          {
            nume: 'Test',
            prenume: 'User',
            functie: 'Developer',
            telefon: '+37312345678',
            email: 'test@example.com',
            nume_companie: 'Test Company',
            cod_fiscal: '12345678',
            telefon_marketing: '+37312345678',
            email_marketing: 'marketing@example.com'
          }
        ]);
      
      if (sqlError) {
        console.error('Ошибка при тестовой вставке:', sqlError);
      } else {
        console.log('Тестовая вставка успешна:', sqlData);
      }
    } else {
      console.log('Таблица успешно создана:', data);
    }
  } catch (error) {
    console.error('Непредвиденная ошибка:', error);
  }
}

// Запускаем функцию создания таблицы
createLeadsTable();