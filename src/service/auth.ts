import { AuthenticatedFields } from "@/types/auth";
import { useAuthStore } from "@/store/userStore";  

async function requestTokenAuthorize<T>(body: AuthenticatedFields): Promise<T> {

  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    if (data?.accessToken) {
      const { setToken, setUser } = useAuthStore.getState();

      console.log(data); 

      setToken(data.accessToken);

      if (data.user) {
        setUser(data.user); 
      }
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
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

        const response = await fetch('http://localhost:8080/api/v1/auth/refresh', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const resData = await response.json();
        console.log(resData, 'resData');
        
        return {
            ...token,
            accessToken: resData.accessToken,
            refreshToken: resData.refreshToken,
            accessTokenExpires: resData.expireIn,
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {
    requestTokenAuthorize,
    refreshAccessToken,
}