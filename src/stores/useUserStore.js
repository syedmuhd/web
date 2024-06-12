import { defineStore } from "pinia";
import { useMutation, useQuery } from "villus";
import { useBranchStore } from "./useBranchStore";
import {
    QUERY_ALL_USERS,
    QUERY_GET_USER_BY_ID,
    MUTATION_CREATE_USER
} from "@/graphql/UserGQL"

export const useUserStore = defineStore("user", {
    state: () => ({
        users: [],
        user: {
            email: null,
            phone: null,
            profile: {
                name: null,
            },
            role: {
                id: null,
                name: null,
            },
            branchId: useBranchStore().currentActiveBranchId
        },
        isEditing: false,
    }),
    getters: {

    },
    actions: {
        reset() {
            this.isEditing = false
            this.user.email = null
            this.user.phone = null
            this.user.profile.name = null
            this.user.role.id = null
            this.user.role.name = null
        },
        getAllUsers() {
            const { execute } = useQuery({
                query: QUERY_ALL_USERS,
                variables: { id: parseInt(useBranchStore().currentActiveBranchId) }
            });

            execute()
                .then(({ data }) => this.users = data.branchById.users)
                .catch(error => {
                    console.error('Error:', error);
                })
        },
        getUserById(userId) {
            console.log(userId)
            const { execute } = useQuery({
                query: QUERY_GET_USER_BY_ID,
                variables: { id: userId }
            });

            execute()
                .then(({ data }) => this.user = data.userById)
                .catch(error => {
                    console.error('Error:', error);
                })
        },
        createUser() {
            const { execute } = useMutation(MUTATION_CREATE_USER);
            return execute(this.user)
        },
        editRole(id) { },
        updateRole(id) { },
        deleteRole(id) { }
    }
})
