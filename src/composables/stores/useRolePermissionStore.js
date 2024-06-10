import { defineStore } from "pinia";
import { useMutation, useQuery } from "villus";
import { useBranchStore } from "./useBranchStore";

const branchStore = useBranchStore();

export const useRolePermissionStore = defineStore("rolePermission", {
    state: () => ({
        roles: [],
        rolePermissions: {
            roleName: null,
            permissions: []
        }
    }),
    getters: {

    },
    actions: {
        createRole() {
            const variables = {
                roleName: this.rolePermissions.roleName,
                branchId: parseInt(branchStore.currentActiveBranchId),
                permissions: this.rolePermissions.permissions
            };

            const MUTATION_CREATE_ROLE_WITH_PERMISSIONS = `
                mutation CreateRole ($roleName: String!, $branchId: Int!, $permissions: [CreatePermissionInput!]!) {
                  createRole(
                    input: {name: $roleName, branch_id: $branchId, permissions: {create: $permissions}}
                  ) {
                    id
                  }
                }
              `
            const { execute } = useMutation(MUTATION_CREATE_ROLE_WITH_PERMISSIONS);

            execute(variables)
                .then(response => {
                    this.getRoles()
                })
                .catch(error => {
                    console.error('Error creating role:', error);
                });
        },
        async getRoles() {
            const GetModules = `
                query rolesByBranch ($id: ID!) {
                    rolesByBranch(branch_id: $id) {
                        id
                        name
                    }
                }
            `
            const { execute } = useQuery({
                query: GetModules,
                variables: { id: parseInt(branchStore.currentActiveBranchId) }
            });

            execute()
                .then(response => this.roles = response.data.rolesByBranch)
                .catch(error => {
                    console.error('Error deleting role:', error);
                })
        },
        deleteRole(id) {
            const variables = {
                id: id
            };

            const MUTATION_DELETE_ROLE = `
                mutation DeleteRole($id: ID!) {
                    deleteRole(id: $id) {
                        id
                    }
                }
              `
            const { execute } = useMutation(MUTATION_DELETE_ROLE);

            return execute(variables)
        }
    }
})
