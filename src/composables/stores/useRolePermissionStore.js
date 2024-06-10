import { defineStore } from "pinia";

export const useRolePermissionStore = defineStore("rolePermission", {
    state: () => ({
        rolePermissions: {
            roleName: null,
            permissions: []
        }
    }),
    getters: {

    },
    actions: {

    },
});
