import { defineStore } from "pinia";
import { useMutation, useQuery } from "villus";
import { useBranchStore } from "./useBranchStore";
import {
    QUERY_ROLES_BY_BRANCH,
    QUERY_ROLE_BY_ID,
    MUTATION_CREATE_ROLE,
    MUTATION_UPDATE_ROLE,
    MUTATION_DELETE_ROLE
} from "@/graphql/RolePermissionGQL"

const branchStore = useBranchStore();

export const useRolePermissionStore = defineStore("rolePermission", {
    state: () => ({
        roles: [],
        rolePermissions: {
            roleName: null,
            permissions: []
        },
        isEditing: false,
        editId: null
    }),
    getters: {

    },
    actions: {
        reset() {
            this.rolePermissions.roleName = null
            this.rolePermissions.permissions = []
            this.isEditing = false
        },
        getRoles() {
            const { execute } = useQuery({
                query: QUERY_ROLES_BY_BRANCH,
                variables: { id: parseInt(branchStore.currentActiveBranchId) }
            });

            execute()
                .then(response => this.roles = response.data.rolesByBranch)
                .catch(error => {
                    console.error('Error deleting role:', error);
                })
        },
        createRole() {
            const variables = {
                roleName: this.rolePermissions.roleName,
                branchId: parseInt(branchStore.currentActiveBranchId),
                permissions: this.rolePermissions.permissions
            };

            const { execute } = useMutation(MUTATION_CREATE_ROLE);

            return execute(variables)
        },
        editRole(id) {

            const { execute } = useQuery({
                query: QUERY_ROLE_BY_ID,
                variables: { id: parseInt(id) }
            })

            return execute()
        },
        updateRole(id) {
            const variables = {
                id: parseInt(id),
                roleName: this.rolePermissions.roleName,
                permissions: this.rolePermissions.permissions
            };


            const { execute } = useMutation(MUTATION_UPDATE_ROLE);

            return execute(variables)
        },
        deleteRole(id) {
            const variables = {
                id: id
            };

            const { execute } = useMutation(MUTATION_DELETE_ROLE);
            return execute(variables)
        }
    }
})
