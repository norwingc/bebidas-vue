<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBebidaStore } from "@/stores/bebidas";
import { useNotificationStore } from "@/stores/notification";

const route = useRoute();
const store = useBebidaStore();
const notification = useNotificationStore();

const paginaInicio = computed(() => route.name === "home");

const handleSubmit = () => {
    if (Object.values(store.busqueda).includes("")) {
        notification.$patch({
            mostar: true,
            error: true,
            text: "Todos los campos son obligatorios",
        })

        return;
    }

    store.obtenerRecetas();
};
</script>

<template>
    <header class="bg-slate-800" :class="{ header: paginaInicio }">
        <div class="mx-auto container px-5 py-16">
            <div class="flex items-center justify-between">
                <div>
                    <RouterLink :to="{ name: 'home' }">
                        <img class="w-32" src="/img/logo.svg" alt="logo" />
                    </RouterLink>
                </div>
                <nav class="flex gap-4 text-white">
                    <RouterLink
                        :to="{ name: 'home' }"
                        class="uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Inicio
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'favoritos' }"
                        class="uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Favoritos
                    </RouterLink>
                </nav>
            </div>
            <form
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                @submit.prevent="handleSubmit"
                v-if="paginaInicio"
            >
                <div class="space-y-4">
                    <label
                        for="ingrediente"
                        class="block text-white uppercase font-extrabold text-lg"
                    >
                        Nombre o ingredientes
                    </label>
                    <input
                        type="text"
                        id="ingrediente"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o infredientes ej. Vodka, Tequila, Cerveza..."
                        v-model="store.busqueda.nombre"
                    />
                </div>
                <div class="space-y-4">
                    <label
                        for="categoria"
                        class="block text-white uppercase font-extrabold text-lg"
                    >
                        Categoria
                    </label>
                    <select
                        id="categoria"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="store.busqueda.categoria"
                    >
                        <option value="">-- Seleccione --</option>
                        <option
                            v-for="(category, index) in store.categories"
                            :key="index"
                            :value="category.strCategory"
                        >
                            {{ category.strCategory }}
                        </option>
                    </select>
                </div>
                <input
                    type="submit"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                    value="Buscar Recetas"
                />
            </form>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-image: url("/img/bg.jpg");
    background-size: cover;
    background-position: center;
}
</style>
