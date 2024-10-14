import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// ------------------------------- Params Global ----------------------- //

const config: AxiosRequestConfig = {
    baseURL: "http://localhost:5286/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

interface ReturnType {
    status: number; // status should always be a number
    data: any;
}

// --------------------------- POST request ------------------------------ //

export const postAPI = async (url: string, data: unknown): Promise<ReturnType> => {
    return await axios({
        ...config,
        method: 'post',
        url: `${config.baseURL}/${url}`,
        data,
    })
        .then((response: AxiosResponse) => {
            return {
                status: response.status, // This will always be a number
                data: response.data,
            };
        })
        .catch((error: AxiosError) => {
            return {
                status: error.response?.status || 0, // Fallback to 0 if status is undefined
                data: error.response || null, // If error.response is undefined, return null
            };
        });
};

// --------------------------- GET request ------------------------------ //

export const getAPI = async (url: string, data?: unknown): Promise<ReturnType> => {
    let new_url = `${config.baseURL}/${url}`;
    if (data !== undefined) {
        const params = new URLSearchParams(data as Record<string, string>);
        new_url += `?${params.toString()}`;
    }

    return await axios({
        ...config,
        method: 'get',
        url: new_url,
    })
        .then((response: AxiosResponse) => {
            console.log("kkkk", response)
            return {
                status: response.status, // This will always be a number
                data: response.data,
            };
        })
        .catch((error: AxiosError) => {
            console.log("kkkk222", error)

            return {
                status: error.response?.status || 0, // Fallback to 0 if status is undefined
                data: error.response || null, // If error.response is undefined, return null
            };
        });
};

//  -------------------------- PUT request ------------------------------ //

export const putAPI = async (url: string, data: unknown, id?: number): Promise<ReturnType> => {
    return await axios({
        ...config,
        method: 'put',
        url: `${config.baseURL}/${url}${id ? "/" + id : ''}`,
        data,
    })
        .then((response: AxiosResponse) => {
            return {
                status: response.status, // This will always be a number
                data: response.data,
            };
        })
        .catch((error: AxiosError) => {
            return {
                status: error.response?.status || 0, // Fallback to 0 if status is undefined
                data: error.response || null, // If error.response is undefined, return null
            };
        });
};

//  -------------------------- DELETE request ------------------------------ //

export const deleteAPI = async (url: string, data?: unknown): Promise<ReturnType> => {
    return await axios({
        ...config,
        method: 'delete',
        url: `${config.baseURL}/${url}`,
        data,
    })
        .then((response: AxiosResponse) => {
            return {
                status: response.status, // This will always be a number
                data: response.data,
            };
        })
        .catch((error: AxiosError) => {
            return {
                status: error.response?.status || 0, // Fallback to 0 if status is undefined
                data: error.response || null, // If error.response is undefined, return null
            };
        });
};
