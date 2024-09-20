import { defineStore } from "pinia";
import { ref, onMounted, reactive, computed } from "vue";
import APIService from "@/services/APIService";
import { useModalStore } from "./modal";

export const useBebidaStore = defineStore("bebidas", () => {
    const modal = useModalStore();

    const categories = ref([]);
    const busqueda = reactive({
        nombre: "",
        categoria: "",
    });
    const recetas = ref([]);
    const receta = ref({});

    onMounted(async function () {
        const {
            data: { drinks },
        } = await APIService.getCategories();
        categories.value = drinks;
    });

    async function obtenerRecetas() {
        const {
            data: { drinks },
        } = await APIService.findRecetas(busqueda);

        recetas.value = drinks;
    }

    async function seleccionarBebida(id) {
        const {
            data: { drinks },
        } = await APIService.getReceta(id);

        receta.value = drinks[0];

        modal.haldedlClickModal();
    }

    const noRecetas = computed(() => {
        return recetas.value.length === 0;
    });

    return {
        categories,
        busqueda,
        obtenerRecetas,
        recetas,
        seleccionarBebida,
        receta,
        noRecetas
    };
});
