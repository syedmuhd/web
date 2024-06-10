<script setup>
import gql from 'graphql-tag'
import { useQuery } from 'villus'
import { ref } from 'vue'

const rolePermissions = ref([])
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

watch(rolePermissions, () => console.log(rolePermissions.value))

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
        <VCheckbox :label="permission" :value="permission + ' ' + module.name" v-model="rolePermissions" />
      </div>
    </td>
  </tr>
</template>