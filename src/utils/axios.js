import axios from 'axios';

let meLang = JSON.parse(localStorage.getItem('iLang'));

const axiosServices = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3010/',
    headers: {
        'Content-Type': 'application/json',
        lang: meLang ? meLang : 'uz'
    }
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('serviceToken');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.code === 'ERR_NETWORK' || error.response.status === 403) {
            localStorage.removeItem('serviceToken');
            // window.location.pathname = '/';

        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default axiosServices;

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosServices.get(url, {...config});

    return res.data;
};

export const fetcherPost = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosServices.post(url, {...config});

    return res.data;
};
