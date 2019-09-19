export const getAuthHeaders = () => {
    return {
        'x-access-token': localStorage.getItem('token')
    };
}

export const getRefreshAuthHeaders = () => {
    return {
        'x-refresh-token': localStorage.getItem('refreshToken')
    };
}

export const getJSONHeaders = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}