import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/favoritos",
            name: "favoritos",
            component: () => import("../views/Favoritos.vue"),
        },
    ],
});

export default router;
