import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';
import db from './pages/db/connectDb';


// Функція для перевірки наявності файлу та його створення, якщо необхідно
const checkAndCreateFile = async () => {
    console.log('MIDDLEWARE')
  // const filePath = path.join(process.cwd(), 'pages', 'db', 'db.json');
  try {
    // if (!fs.existsSync(filePath)) {
    //   // Якщо файл не існує, створюємо новий файл
    //   await db.initialize(filePath)
    //   console.log('Файл створено');
    // }
  } catch (error) {
    console.error('Помилка при роботі з файлом:', error);
  }
};

export async function middleware(req: Request) {
  // Перевіряємо і створюємо файл перед обробкою запиту
  await checkAndCreateFile();

  // Продовжуємо обробку запиту
  return NextResponse.next();
}

// Якщо ви хочете застосувати middleware до всіх запитів, використовуйте таку конфігурацію
export const config = {
  matcher: ['/api/:path*'],
  runtime: 'nodejs',
};
