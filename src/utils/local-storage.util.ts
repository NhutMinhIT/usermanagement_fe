export const setLocalStorageData = (data: any) => {
    localStorage.setItem('usermanagement_data', JSON.stringify(data));
};

export const getLocalStorageData = () => {
    return localStorage.getItem('usermanagement_data');
};

export const removeLocalStorageData = () => {
    localStorage.removeItem('usermanagement_data');
}

//Token 
export const setLocalStorageToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getLocalStorageToken = () => {
    const token = localStorage.getItem('token');
    return token;
};
export const removeLocalStorageToken = () => {
    localStorage.removeItem('token');
}