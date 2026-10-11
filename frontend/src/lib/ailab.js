import axios from "axios";
import { api, API_BASE } from "./api.js";

export { API_BASE };

export const ML_API =
    import.meta.env.VITE_ML_API_URL || "https://model-api-dbuz.onrender.com";

export const runMlScreening = async (path, payload) => {
    const { data } = await axios.post(`${ML_API}/${path}`, payload);
    return data[0];
};

export const screeningIntake = async (screening, message, collected, profileContext) => {
    const { data } = await api.post("/ailab/intake", {
        screening,
        message,
        collected,
        profileContext: profileContext || undefined,
    });
    return data;
};

export const screeningExplain = async (screening, result) => {
    const { data } = await api.post("/ailab/explain", {
        screening,
        result,
    });
    return data.insight;
};
