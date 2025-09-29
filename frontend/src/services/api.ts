import axios, {
    type AxiosInstance,
    type AxiosResponse,
    type InternalAxiosRequestConfig
} from "axios";

export const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
});

// Request interceptor
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log("➡️ [Request]", {
            url: config.url,
            method: config.method,
            headers: config.headers,
            params: config.params,
            data: config.data,
        });
        return config;
    },
    (error) => {
        console.error("❌ [Request Error]", error);
        return Promise.reject(error);
    }
);

// Response interceptor
http.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("⬅️ [Response]", {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });
        return response;
    },
    (error) => {
        if (error.response) {
            console.error("❌ [Response Error]", {
                url: error.config?.url,
                status: error.response.status,
                data: error.response.data,
            });
        } else {
            console.error("❌ [Network Error]", error.message);
        }
        return Promise.reject(error);
    }
);
