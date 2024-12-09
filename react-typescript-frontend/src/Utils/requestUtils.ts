import axios from "axios";

export default function baseUrl() {
    return import.meta.env.VITE_DEV === 'true' ? 'http://localhost:5000' : 'https://hippo-immense-plainly.ngrok-free.app'
}

export function getApiKey() {
    return axios.get(`${baseUrl()}/get-api-key`)
}