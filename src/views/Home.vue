<script setup>
import { useBebidaStore } from "@/stores/bebidas";
import Receta from "@/components/Receta.vue";

const store = useBebidaStore();
</script>

<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
        <Receta
            v-for="receta in store.recetas"
            :key="receta.idDrink"
            :receta="receta"
        />
    </div>
</template>
