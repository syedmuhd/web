import { defineStore } from "pinia";
import { useMutation, useQuery } from "villus";
import { useBranchStore } from "./useBranchStore";
import {
    QUERY_ROLES_BY_BRANCH,
    QUERY_ROLE_BY_ID,
    MUTATION_CREATE_ROLE,
    MUTATION_UPDATE_ROLE,
    MUTATION_DELETE_ROLE
} from "@/graphql/ModuleGQL"

export const useModuleStore = defineStore("module", {
    state: () => ({
    }),
    getters: {

    },
    actions: {
        reset() {
            // this.rolePermissions.roleName = null
        },
        get() { },
        create() { },
        editRole(id) { },
        updateRole(id) { },
        deleteRole(id) { }
    }
})
