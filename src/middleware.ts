import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/auth', '/register'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const role = req.cookies.get('role')?.value;

    // Если нет токена и это не публичная страница — редирект на авторизацию
    if (!token && !publicRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    // Если есть токен и юзер на публичных страницах — редирект по ролям
    if (token && publicRoutes.includes(req.nextUrl.pathname)) {
        if (role === 'PARENT') {
            return NextResponse.redirect(new URL('/parent', req.url));
        }
        if (role === 'EMPLOYEE') {
            return NextResponse.redirect(new URL('/employee', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
