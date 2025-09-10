// Скрипт для тестирования отправки лида в Supabase

// Загрузка переменных окружения из .env.local
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cujvfxefnhswtwgogtqg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Создание клиента Supabase
console.log('URL:', supabaseUrl);
console.log('ANON KEY:', supabaseAnonKey);

// Создаем клиент Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Тестовые данные для отправки - используем правильные имена полей в snake_case
const testData = {
  nume: 'Test',
  prenume: 'User',
  functie: 'Developer',
  telefon: '+37312345678',
  email: 'test@example.com',
  nume_companie: 'Test Company',
  cod_fiscal: '12345678',
  telefon_marketing: '+37312345678',
  email_marketing: 'marketing@example.com'
};

// Функция для отправки тестового лида
async function sendTestLead() {
  console.log('Отправка тестового лида...');
  console.log('Данные:', testData);
  
  try {
    // Проверяем структуру таблицы с помощью простого запроса
    console.log('Проверка структуры таблицы leads...');
    
    // Попробуем получить метаданные таблицы
    console.log('Пробуем получить метаданные таблицы...');
    const { data: metaData, error: metaError } = await supabase
      .from('leads')
      .select()
      .limit(0);
    
    if (metaError) {
      console.error('Ошибка при получении метаданных:', metaError);
    } else {
      console.log('Метаданные получены:', metaData);
    }
    
    // Используем данные с правильным названием поля
    console.log('Используем данные с правильным названием поля...');
    
    console.log('Данные для отправки:', testData);
    
    // Отправляем данные в таблицу
    console.log('Отправляем данные в таблицу...');
    const { data: testInsert, error: testError } = await supabase
      .from('leads')
      .insert([testData]);
    
    if (testError) {
      console.error('Ошибка при тестовой отправке:', testError);
    } else {
      console.log('Тестовая отправка успешна:', testInsert);
      return; // Если успешно, прекращаем выполнение
    }
    
    // Отправляем данные
    const { data, error } = await supabase
      .from('leads')
      .insert([testData]);
    
    if (error) {
      console.error('Ошибка при отправке лида:', error);
    } else {
      console.log('Лид успешно отправлен!');
      console.log('Ответ:', data);
    }
  } catch (error) {
    console.error('Непредвиденная ошибка:', error);
  }
}

// Запускаем тест
sendTestLead();