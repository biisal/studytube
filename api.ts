import axios from "axios";

let base = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!base) {
    base = "https://api.codeltix.com/api/v1"
}

export const api = axios.create({
    baseURL: base,
    headers: {
        "Content-Type": "application/json",
    },
});