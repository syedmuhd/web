import { defineStore } from "pinia";
import { useQuery } from "villus";

export const useModuleStore = defineStore("module", {
    state: () => ({
        modules: [],
    }),
    getters: {

    },
    actions: {
        getModulesWithPermissions() {
            const GetModulesWithPermissions = `
            {
              modules {
                id
                name
                permissions {
                    id
                    name
                }
              }
            }
          `
            const { execute } = useQuery({
                query: GetModulesWithPermissions,
            }).then(({ data }) => {
                this.modules = data.value.modules
            })
        },
    }
})
