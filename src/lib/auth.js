import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.ADMIN_PASSWORD || 'akonzi-admin-2026'
);

export async function createToken() {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export function checkPassword(password) {
  return password === (process.env.ADMIN_PASSWORD || 'akonzi-admin-2026');
}

export const COOKIE_NAME = 'akonzi_admin_token';
