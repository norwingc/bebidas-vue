import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useFavoritosStore } from "./favoritos";
import { useBebidaStore } from "./bebidas";

export const useModalStore = defineStore("modal", () => {
    const favoritos = useFavoritosStore();
    const bebidas = useBebidaStore();
    const modal = ref(false);

    function haldedlClickModal() {
        modal.value = !modal.value;
    }

    const textoButton = computed(() => {
        return favoritos.existeFavorito()
            ? "Quitar de favoritos"
            : "Agregar a favoritos";
    });

    return {
        modal,
        haldedlClickModal,
        textoButton,
    };
});
