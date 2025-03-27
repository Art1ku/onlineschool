import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    const role = token?.userDetails?.roles[0]?.title;

    console.log(role, "roles in middleware");

    const protectedRoutes = [
        { path: "/ADMIN", roles: ["ADMIN", "DIRECTOR"] },
        { path: "/TEACHER", roles: ["TEACHER", "HEAD_TEACHER"] },
    ];

    for (const route of protectedRoutes) {
        if (req.nextUrl.pathname.startsWith(route.path) && !route.roles.includes(role)) {
            return NextResponse.redirect(new URL("/403", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/ADMIN", "/TEACHER"],
};
