import CredentialsProvider from "next-auth/providers/credentials"
import {NextAuthOptions} from "next-auth";
import {AuthenticatedFields, CustomJWTType, JWTUser, ReponseUserToken} from "./types/auth";

import {refreshAccessToken, requestTokenAuthorize} from "@/service/auth";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "AuthCredentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "Email..."},
                password: {label: "Password", type: "password", placeholder: "Password..."}
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }
                const data: AuthenticatedFields = {
                    identifier: credentials.email,
                    password: credentials.password
                }
                try {
                    const resData = await requestTokenAuthorize<ReponseUserToken>(data);
                    const {accessToken, refreshToken, expireIn} = resData;
                    console.log(resData);
                    

                    return {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        accessTokenExpires: expireIn
                    } as JWTUser

                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            },
        })
    ],
    session: {strategy: 'jwt'},
    callbacks: {
        async jwt({token, user}) {
            const jwtUser = user as JWTUser
            const jwtToken = token as CustomJWTType
            if (user) {
                return {
                    accessToken: jwtUser.accessToken,
                    refreshToken: jwtUser.refreshToken,
                    accessTokenExpires: jwtUser.accessTokenExpires * 1000,
                    user
                };
            }

            console.log(Date.now(), jwtToken)
            if (Date.now() < jwtToken.accessTokenExpires) {
                console.log("Get token")
                return token;
            }
            const generatedToken = await refreshAccessToken(jwtToken);
            console.log("Generated token", generatedToken)
            return generatedToken;
        },

        async session({ session, token }) {
            if (session.user) {
              return {
                ...session,
                user: {
                  ...session.user,
                  accessToken: token.accessToken,
                  refreshToken: token.refreshToken
                }
              };
            }
            return session;
          }
          

    }
}