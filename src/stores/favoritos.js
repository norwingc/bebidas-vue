import { defineStore } from "pinia";
import { ref, watch, onMounted, computed } from "vue";

import { useBebidaStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificationStore } from "./notification";

export const useFavoritosStore = defineStore("favoritos", () => {
    const favoritos = ref([]);
    const bebida = useBebidaStore();
    const modal = useModalStore();
    const notification = useNotificationStore();

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    });

    watch(
        favoritos,
        () => {
            sincronizarLocalStorage();
        },
        { deep: true }
    );

    function sincronizarLocalStorage() {
        localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
    }

    function existeFavorito() {
        const favoritosLocalStorage =
            JSON.parse(localStorage.getItem("favoritos")) ?? [];

        return favoritosLocalStorage.some(
            (favorito) => favorito.idDrink === bebida.receta.idDrink
        );
    }

    function agregarFavorito() {
        favoritos.value.push(bebida.receta);

        notification.text = `Se agrego ${bebida.receta.strDrink} a favoritos`;
        notification.mostar = true;
    }

    function elimiarFavorito() {
        favoritos.value = favoritos.value.filter(
            (favorito) => favorito.idDrink !== bebida.receta.idDrink
        );

        notification.text = `Se elimino ${bebida.receta.strDrink} de favoritos`;
        notification.mostar = true;
    }

    function handledClickFavorito() {
        if (existeFavorito()) {
            elimiarFavorito();
        } else {
            agregarFavorito();
        }
        modal.modal = false;
    }

    const noFavoritos = computed(() => {
        return favoritos.value.length === 0;
    });

    return {
        favoritos,
        handledClickFavorito,
        existeFavorito,
        noFavoritos,
    };
});
