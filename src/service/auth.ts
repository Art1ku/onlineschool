import {AuthenticatedFields} from "@/types/auth";
import {POST} from "@/app/api/auth/[...nextauth]/route";

async function requestTokenAuthorize<T>(body: AuthenticatedFields): Promise<T> {
    "use server"

    try {
        const response = await fetch("http://localhost:8080/api/v1/auth/login",
            {
                "method": "POST",
                "body": JSON.stringify(body),
                "headers": {
                    "content-type": "application/json",
                }
            }
        )
        return response.json();
    } catch (error) {
        console.error(error)
        throw error
    }
}


async function refreshAccessToken(token: {
    accessTokenExpires: number;
    accessToken: string;
    refreshToken: string;
}) {
    try {
        const data = {
            refreshToken: token.refreshToken
        }

        const response = await fetch('http://localhost:8080/api/v1/auth/refresh',
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )

        const resData = await response.json();
        return {
            ...token,
            accessToken: resData.accessToken,
            refreshToken: resData.refreshToken,
            accessTokenExpires: resData.expireIn * 1000,
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}


export {
    requestTokenAuthorize,
    refreshAccessToken,
}