import { defineStore } from "pinia";

export const useBranchStore = defineStore("branch", {
    state: () => ({
        branches: [],
        currentActiveBranchId: useLocalStorage('currentActiveBranchId', null)
    }),
    getters: {
        getBranches(state) {
            return state.branches
        },
        getCurrentActiveBranchId(state) {
            return state.currentActiveBranchId
        }
    },
    actions: {
        setBranches(branches) {
            this.branches = branches
        },
        setCurrentActiveBranchId(branchId) {
            this.currentActiveBranchId = branchId
        }
    },
});
