<script setup>
import avatar1 from "@images/avatars/avatar-1.png";
import avatar2 from "@images/avatars/avatar-2.png";
import avatar3 from "@images/avatars/avatar-3.png";
import avatar4 from "@images/avatars/avatar-4.png";
import girlUsingMobile from "@images/pages/girl-using-mobile.png";
import { useAuthStore } from "@/composables/stores/useAuthStore";
import { useQuery } from "villus";
import { useBranchStore } from "@/composables/stores/useBranchStore";

const branchStore = useBranchStore()

const roles = ref([])

const isRoleDialogVisible = ref(false)
const isAddRoleDialogVisible = ref(false)

const editPermission = (value) => {
  isRoleDialogVisible.value = true
};

const clickAddNewRole = () => {
  isAddRoleDialogVisible.value = true
};

const GetModules = `
    query rolesByBranch ($id: ID!) {
      rolesByBranch(branch_id: $id) {
        id
        name
      }
    }
  `
await useQuery({
  query: GetModules,
  variables: { id: branchStore.getCurrentActiveBranchId },
}).then(({ data }) => {
  roles.value = data.value.rolesByBranch
})
</script>

<template>
  <VRow>
    <!-- 👉 Roles -->
    <VCol v-for="role in roles" :key="role.id" cols="12" sm="6" lg="4">
      <VCard>
        <VCardText class="d-flex align-center pb-4">
          <div class="text-body-1">Total users</div>

          <VSpacer />

          <!-- <div class="v-avatar-group">
            <template v-for="(user, index) in item.users" :key="user">
              <VAvatar v-if="
                item.users.length > 4 && item.users.length !== 4 && index < 3
              " size="40" :image="user" />

              <VAvatar v-if="item.users.length === 4" size="40" :image="user" />
            </template>
<VAvatar v-if="item.users.length > 4" :color="$vuetify.theme.current.dark ? '#373B50' : '#EEEDF0'">
  <span> +{{ item.users.length - 3 }} </span>
</VAvatar>
</div> -->
        </VCardText>

        <VCardText>
          <div class="d-flex justify-space-between align-center">
            <div>
              <h5 class="text-h5">
                {{ role.name }}
              </h5>
              <div class="d-flex align-center">
                <a href="javascript:void(0)" @click="editPermission">
                  Edit Role
                </a>
              </div>
            </div>
            <IconBtn>
              <VIcon icon="tabler-copy" class="text-high-emphasis" />
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
