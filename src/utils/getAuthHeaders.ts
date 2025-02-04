import { getLocalStorageToken } from "./localStorage";

export const getAuthHeaders = () => {
    const token = getLocalStorageToken();
    return token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };
}