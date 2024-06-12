import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { useCookie } from "@/@core/composable/useCookie";

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
        async logout(router) {
            // Remove "accessToken" from cookie
            useCookie('accessToken').value = null;

            // Remove "userData" from cookie
            useCookie('userData').value = null;

            // Redirect to login page
            await router.push('/login');

            // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

            // Remove "userAbilities" from cookie
            useCookie('userAbilityRules').value = null;

            // Reset ability to initial ability
            // ability.update([]);
        },
    },
});
