export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= payload.exp * 1000;
    } catch (error) {
        return true;
    }
};
