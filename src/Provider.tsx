"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useAuthStore } from "@/store/storeAuth";

const AuthProvider = ({ children }: PropsWithChildren) => {
    const { data: session, status } = useSession();
    const setUser = useAuthStore((state) => state.setUser);
    const clearUser = useAuthStore((state) => state.clearUser);

    useEffect(() => {
        if (status === "unauthenticated") {
            clearUser();
        } else if (session?.user) {
            setUser({
                id: session.user.id,
                username: session.user.username,
                email: session.user.email,
                accessToken: session.user.accessToken,
                refreshToken: session.user.refreshToken,
                accessTokenExpires: session.user.accessTokenExpires,
                userDetails: session.user.userDetails,
            });
        }
    }, [session, status, setUser, clearUser]);

    return <>{children}</>;
};

const Provider = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>
            <AuthProvider>{children}</AuthProvider>
        </SessionProvider>
    );
};

export default Provider;
