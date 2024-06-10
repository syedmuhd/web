<script setup>
import { VForm } from 'vuetify/components/VForm'
import Permissions from '@/components/permissions/Permissions.vue'
import { useMutation } from 'villus';
import { useBranchStore } from '@/composables/stores/useBranchStore';
import { useRolePermissionStore } from '@/composables/stores/useRolePermissionStore';

const permissions = ref([])

/**
 * Stores
 */
const branchStore = useBranchStore()
const rolePermissionStore = useRolePermissionStore()

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  rolePermissions: {
    type: Object,
    required: false,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:rolePermissions',
])


const isSelectAll = ref(false)
const refPermissionForm = ref()

watch(props, () => {
  console.log(props.rolePermissions)
})

const onSubmit = () => {
  rolePermissionStore.createRole()

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
          Add Role
        </h4>
        <p class="text-body-1 text-center mb-6">
          Set Role Permissions
        </p>

        <!-- 👉 Form -->
        <VForm ref="refPermissionForm">
          <!-- 👉 Role name -->
          <AppTextField v-model="rolePermissionStore.rolePermissions.roleName" label="Role Name"
            placeholder="Enter Role Name" />

          <h5 class="text-h5 my-6">
            Role Permissions
          </h5>

          <!-- 👉 Role Permissions -->

          <VTable class="permission-table text-no-wrap mb-6">

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
