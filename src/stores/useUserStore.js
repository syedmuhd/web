import { defineStore } from "pinia";
import { useMutation, useQuery } from "villus";
import { useBranchStore } from "./useBranchStore";
import {
    QUERY_ALL_USERS,
    QUERY_GET_USER_BY_ID,
    MUTATION_CREATE_USER,
    MUTATION_UPDATE_USER,
    MUTATION_DELETE_USER,
} from "@/graphql/UserGQL"

export const useUserStore = defineStore("user", {
    state: () => ({
        users: [],
        user: {
            id: null,
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
            this.user.profile = this.user.profile || {};
            this.user.role = this.user.role || {};

            this.isEditing = false
            this.user.email = null
            this.user.phone = null
            this.user.profile.name = null
            this.user.role.id = null
            this.user.role.name = null
        },
        getAllUsers(variables) {
            const { execute } = useQuery({
                query: QUERY_ALL_USERS,
                variables
            });

            execute()
                .then(({ data }) => this.users = data.users)
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
            const variables = {
                email: this.user.email,
                phone: this.user.phone,
                name: this.user.profile.name,
                roleId: this.user.role.id,
                branchId: useBranchStore().currentActiveBranchId
            }
            const { execute } = useMutation(MUTATION_CREATE_USER);
            return execute(variables)
        },
        editRole(id) { },
        updateUser() {
            const variables = {
                id: this.user.id,
                email: this.user.email,
                phone: this.user.phone,
                name: this.user.profile.name,
                profileId: this.user.profile.id,
                roleId: this.user.role.id,
            }
            const { execute } = useMutation(MUTATION_UPDATE_USER);
            return execute(variables)
        },
        async deleteUser(id) {
            const variables = {
                id: id
            };
            const { execute } = useMutation(MUTATION_DELETE_USER);
            try {
                const { data } = await execute(variables)
                this.users = this.users.filter(user => user.id !== id)
                return data
            } catch (error) { }
        }
    }
})
