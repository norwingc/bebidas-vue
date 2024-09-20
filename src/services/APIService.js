import api from "../lib/axios";

export default {
    getCategories() {
        return api.get("/list.php?c=list");
    },
    findRecetas({ categoria, nombre }) {
        return api.get(`/filter.php?i=${nombre}&c=${categoria}`);
    },
    getReceta(id) {
        return api.get(`/lookup.php?i=${id}`);
    },
};
