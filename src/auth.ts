import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";
import { AuthenticatedFields, CustomJWTType, JWTUser, ReponseUserToken } from "./types/auth";
import { refreshAccessToken, requestTokenAuthorize } from "@/service/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "AuthCredentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email..." },
                password: { label: "Password", type: "password", placeholder: "Password..." }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                const data: AuthenticatedFields = {
                    identifier: credentials.email,
                    password: credentials.password
                };

                try {
                    const resData = await requestTokenAuthorize<ReponseUserToken>(data);
                    const { accessToken, refreshToken, expireIn } = resData;

                    const responseUserDetails = await fetch("http://localhost:8080/api/v1/auth/user/details", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });

                    if (!responseUserDetails.ok) {
                        throw new Error("Ошибка получения данных пользователя");
                    }

                    const userDetails = await responseUserDetails.json();
                    console.log("User Details:", userDetails);

                    const { username, email, id } = userDetails;

                    return {
                        id: String(id),
                        username,
                        email,
                        accessToken,
                        refreshToken,
                        accessTokenExpires: Date.now() + expireIn * 1000, 
                        details: userDetails
                    } as JWTUser;

                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/signin"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: user.accessTokenExpires,
                    details: user.details,
                    user
                } as CustomJWTType;
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log("Token is still valid");
                return token;
            }

            const generatedToken = await refreshAccessToken(token);
            console.log("Generated new token:", generatedToken);
            return generatedToken;
        },

        async session({ session, token }) {
            session.user = {
                ...session.user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                details: token.details
            } as JWTUser;

            return session;
        }
    }
};
