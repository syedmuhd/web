<script setup>
import { useRolePermissionStore } from '@/composables/stores/useRolePermissionStore';
import gql from 'graphql-tag'
import { useQuery } from 'villus'
import { ref } from 'vue'

/**
 * Stores
 */
const rolePermissionStore = useRolePermissionStore()

const modules = ref([])
const permissions = [
  'View',
  'Edit',
  'Create',
  'Delete'
]

const GetModules = gql`
    {
      modules {
        id
        name
      }
    }
  `
await useQuery({
  query: GetModules,
}).then(({ data }) => {
  modules.value = data.value.modules
})

</script>

<template>
  <tr v-for="module in modules" :key="module.id">
    <td>
      <h6 class="text-h6">
        {{ module.name }}
      </h6>
    </td>
    <td v-for="permission in permissions" :key="permission.id">
      <div class="d-flex justify-end">
        <VCheckbox :label="permission" :value="{ name: permission + ' ' + module.name }"
          v-model="rolePermissionStore.rolePermissions.permissions" />
      </div>
    </td>
  </tr>
</template>