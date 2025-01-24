import { NextResponse } from 'next/server';

const checkAndCreateFile = async () => {
  try {
 
  } catch (error) {
    console.error('Error', error);
  }
};

export async function middleware(req: Request) {
  await checkAndCreateFile();

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
  runtime: 'nodejs',
};
