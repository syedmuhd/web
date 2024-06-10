import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: useLocalStorage('auth', null)
    }),
    getters: {
        getToken(state) {
            return state.token
        },
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        removeToken() {
            this.token = null
        },
    },
});
