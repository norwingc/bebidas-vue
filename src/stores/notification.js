import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useNotificationStore = defineStore("notification", () => {
    const text = ref("");
    const error = ref(false);
    const mostar = ref(false);

    function $reset() {
        text.value = "";
        error.value = false;
        mostar.value = false;
    }

    watch(mostar, () => {
        if (mostar.value) {
            setTimeout(() => {
                $reset();
            }, 3000);
        }
    });

    return {
        text,
        error,
        mostar,
    };
});
