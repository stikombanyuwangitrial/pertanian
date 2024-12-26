import { NextResponse } from 'next/server';
import { supabase } from './server/subapase';

export async function middleware(req) {
  const { data: { session } } = await supabase.auth.getSession(req.cookies);

  if (!session) {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Lanjutkan permintaan jika autentikasi valid
}

export const config = {
  matcher: ['/admin/:path*'], // Terapkan middleware di rute admin
};
