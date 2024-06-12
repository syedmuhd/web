import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
    state: () => ({
        isVisible: false,
        title: 'Please confirm your action',
        message: '',
        content: '',
        callback: null,  // Add a callback to the state
    }),
    actions: {
        confirm() {
            if (this.callback) {
                this.callback();  // Execute the callback if it exists
                this.callback = null;  // Reset the callback after execution
            }
            this.isVisible = false;  // Close the dialog after confirmation
        },

        cancel() {
            this.$reset()
        },

        showDialog(message, callback) {
            this.message = message;
            this.callback = callback;
            this.isVisible = true;
        }
    },
});
