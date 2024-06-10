<script setup>
import avatar1 from "@images/avatars/avatar-1.png";
import avatar2 from "@images/avatars/avatar-2.png";
import avatar3 from "@images/avatars/avatar-3.png";
import avatar4 from "@images/avatars/avatar-4.png";
import girlUsingMobile from "@images/pages/girl-using-mobile.png";
import { useAuthStore } from "@/composables/stores/useAuthStore";
import { useQuery } from "villus";
import { useBranchStore } from "@/composables/stores/useBranchStore";
import { useRolePermissionStore } from "@/composables/stores/useRolePermissionStore";
import { onMounted } from "vue";

/**
 * Lifecycle
 */
onMounted(() => {
  rolePermissionStore.getRoles()
})

/**
 * Stores
 */
const rolePermissionStore = useRolePermissionStore()

/**
 * Local
 */
const isRoleDialogVisible = ref(false)
const isAddRoleDialogVisible = ref(false)

const clickAddNewRole = () => {
  isAddRoleDialogVisible.value = true
};

const deleteRole = (roleId) => {
  rolePermissionStore.deleteRole(roleId)
    .then(response => {
      rolePermissionStore.getRoles()
      console.log('Role deleted with ID:', response.data.deleteRole.id);
    })
    .catch(error => {
      console.error('Error deleting role:', error);
    })
}
</script>

<template>
  <VRow>
    <!-- 👉 Roles -->
    <VCol v-for="role in rolePermissionStore.roles" :key="role.id" cols="12" sm="6" lg="4">
      <VCard>

        <VCardText>
          <div class="d-flex justify-space-between align-center">
            <div>
              <h5 class="text-h5">
                {{ role.name }}
              </h5>
              <div class="d-flex align-center">
                Total users: 8
              </div>
            </div>
            <IconBtn>
              <VBtn icon variant="text" color="medium-emphasis">
                <VIcon icon="tabler-dots-vertical" />
                <VMenu activator="parent">
                  <VList>
                    <VListItem @click="deleteRole(role.id)">
                      <template #prepend>
                        <VIcon icon="tabler-trash" />
                      </template>
                      <VListItemTitle>Delete</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </IconBtn>
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Add New Role -->
    <VCol cols="12" sm="6" lg="4">
      <VCard class="h-100" :ripple="false">
        <VRow no-gutters class="h-100">
          <VCol cols="5" class="d-flex flex-column justify-end align-center mt-5">
            <img width="85" :src="girlUsingMobile" />
          </VCol>

          <VCol cols="7">
            <VCardText class="d-flex flex-column align-end justify-end gap-4">
              <VBtn size="small" @click="clickAddNewRole"> Add New Role </VBtn>
              <div class="text-end">
                Add new role,<br />
                if it doesn't exist.
              </div>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
      <AddEditRoleDialog v-model:is-dialog-visible="isAddRoleDialogVisible" />
    </VCol>
  </VRow>

  <AddEditRoleDialog v-model:is-dialog-visible="isRoleDialogVisible" />
</template>
