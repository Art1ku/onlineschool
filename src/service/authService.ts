// services/authService.ts
import { useAuthStore } from "@/store/userStore";

interface LoginBody {
  identifier: string;
  password: string;
}

export async function loginUser({ identifier, password }: LoginBody) {
  try {
    const res = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Ошибка входа");
    }

    const data = await res.json();
    const { accessToken, user } = data;

    const { setToken, setUser } = useAuthStore.getState();
    setToken(accessToken);
    setUser(user);
    localStorage.setItem("accessToken",accessToken)

    return data;
  } catch (error: any) {
    console.error("Ошибка логина:", error);
    throw error;
  }
}


interface RegisterBody {
  email: string;
  username: string;
  password: string;
  title: string;
}

export async function registerUser({ email, username, password, title }: RegisterBody) {
  try {
    const res = await fetch("http://localhost:8080/api/v1/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        password,
        roles: [{ title }],
        userStatus: "ACTIVE",
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Ошибка регистрации");
    }

    const data = await res.json();
    const { accessToken, user } = data;

    const { setToken, setUser } = useAuthStore.getState();
    setToken(accessToken);
    setUser(user);

    return data;
  } catch (error: any) {
    console.error("Ошибка регистрации:", error);
    throw error;
  }
}
