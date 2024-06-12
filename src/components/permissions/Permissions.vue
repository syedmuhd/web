<script setup>
import { useModuleStore } from '@/stores/useModuleStore';
import { useRolePermissionStore } from '@/stores/useRolePermissionStore';
import { onMounted, ref } from 'vue'

/**
 * Stores
 */
const moduleStore = useModuleStore()
const rolePermissionStore = useRolePermissionStore()

onMounted(() => {
  moduleStore.getModulesWithPermissions()
})

</script>

<template>
  <tr v-for="module in moduleStore.modules" :key="module.id">
    <td>
      <h6 class="text-h6">
        {{ module.name }}
      </h6>
    </td>
    <td v-for="permission in module.permissions" :key="permission.id">
      <div class="d-flex justify-end">
        <VCheckbox v-model="rolePermissionStore.rolePermissions.permissions"
          :label="permission.name.replace(module.name, '')" :value="permission.id" />
      </div>
    </td>
  </tr>
</template>