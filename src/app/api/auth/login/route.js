import { NextResponse } from 'next/server';
import { checkPassword, createToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;
    if (checkPassword(password)) {
      const token = await createToken();
      
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  }
}
