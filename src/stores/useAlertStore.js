import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
    state: () => ({
        isVisible: false,
        message: '',
        content: ''
    }),
    getters: {

    },
    actions: {
        showAlert(message) {
            this.message = message
            this.isVisible = true
        },
    },
});
