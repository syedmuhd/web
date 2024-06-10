<script setup>
import { VForm } from 'vuetify/components/VForm'
import Permissions from '@/components/permissions/Permissions.vue'
import { useRolePermissionStore } from '@/composables/stores/useRolePermissionStore';
import { useMutation } from 'villus';
import { useBranchStore } from '@/composables/stores/useBranchStore';

const roleName = ref('')
const branchStore = useBranchStore()

const props = defineProps({
  rolePermissions: {
    type: Object,
    required: false,
    default: () => ({
      name: '',
      permissions: [],
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:rolePermissions',
])

const permissions = ref([
  {
    name: 'User Management',
    view: false,
    read: false,
    write: false,
    create: false,
    delete: false,
  },
])

const isSelectAll = ref(false)
const role = ref('')
const refPermissionForm = ref()

const checkedCount = computed(() => {
  let counter = 0
  permissions.value.forEach(permission => {
    Object.entries(permission).forEach(([key, value]) => {
      if (key !== 'name' && value)
        counter++
    })
  })

  return counter
})

const isIndeterminate = computed(() => checkedCount.value > 0 && checkedCount.value < permissions.value.length * 5)

watch(isSelectAll, val => {
  permissions.value = permissions.value.map(permission => ({
    ...permission,
    view: val,
    read: val,
    write: val,
    create: val,
    delete: val,
  }))
})

watch(isIndeterminate, () => {
  if (!isIndeterminate.value)
    isSelectAll.value = false
})

watch(permissions, () => {
  if (checkedCount.value === permissions.value.length * 5)
    isSelectAll.value = true
}, { deep: true })

watch(props, async () => {

  // if (props.isDialogVisible) {

  // }

  if (props.rolePermissions && props.rolePermissions.permissions.length) {
    role.value = props.rolePermissions.name
    permissions.value = permissions.value.map(permission => {
      const rolePermission = props.rolePermissions?.permissions.find(item => item.name === permission.name)
      if (rolePermission) {
        return {
          ...permission,
          ...rolePermission,
        }
      }

      return permission
    })
  }
})

const onSubmit = () => {
  const MUTATION_CREATE_ROLE_WITH_PERMISSIONS = `
    mutation CreateRole ($roleName: String!, $branchId: Int!, $permissions: [CreatePermissionInput!]!) {
      createRole(
        input: {name: $roleName, branch_id: $branchId, permissions: {create: $permissions}}
      ) {
        id
      }
    }
  `
  const { data, execute } = useMutation(MUTATION_CREATE_ROLE_WITH_PERMISSIONS);

  const variables = {
    roleName: roleName.value,
    branchId: branchStore.getCurrentActiveBranchId,
    permissions: [
      { name: 'Ina Go' },
      { name: 'Ina Wow' }
    ]
  };

  execute(variables)
    .then(response => {
      console.log('Role created with ID:', response.data.createRole.id);
    })
    .catch(error => {
      console.error('Error creating role:', error);
    });

  emit('update:isDialogVisible', false)

  return false
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}

const onReset = () => {
  emit('update:isDialogVisible', false)
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}
</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 900" :model-value="props.isDialogVisible"
    @update:model-value="onReset">
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-10 pa-2">
      <VCardText>
        <!-- 👉 Title -->
        <h4 class="text-h4 text-center mb-2">
          {{ props.rolePermissions.name ? 'Edit' : 'Add New' }} Role
        </h4>
        <p class="text-body-1 text-center mb-6">
          Set Role Permissions
        </p>

        <!-- 👉 Form -->
        <VForm ref="refPermissionForm">
          <!-- 👉 Role name -->
          <AppTextField v-model="roleName" label="Role Name" placeholder="Enter Role Name" />

          <h5 class="text-h5 my-6">
            Role Permissions
          </h5>

          <!-- 👉 Role Permissions -->

          <VTable class="permission-table text-no-wrap mb-6">
            <!-- 👉 Admin  -->
            <tr>
              <td>
                <h6 class="text-h6">
                  Administrator Access
                </h6>
              </td>
              <td colspan="5">
                <div class="d-flex justify-end">
                  <VCheckbox v-model="isSelectAll" v-model:indeterminate="isIndeterminate" label="Select All" />
                </div>
              </td>
            </tr>

            <Suspense>
              <template #default>
                <Permissions />
              </template>
              <template #fallback>
                <span>Loading...</span>
              </template>
            </Suspense>

          </VTable>

          <!-- 👉 Actions button -->
          <div class="d-flex align-center justify-center gap-4">
            <VBtn @click="onSubmit">
              Save
            </VBtn>

            <VBtn color="secondary" variant="tonal" @click="onReset">
              Cancel
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.permission-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;

    .v-checkbox {
      min-inline-size: 4.75rem;
    }

    &:not(:first-child) {
      padding-inline: 0.5rem;
    }

    .v-label {
      white-space: nowrap;
    }
  }
}
</style>
