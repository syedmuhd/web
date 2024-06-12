<script setup>
import { useAlertStore } from '@/stores/useAlertStore';
import { useRolePermissionStore } from '@/stores/useRolePermissionStore';
import { useUserStore } from '@/stores/useUserStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
const alertStore = useAlertStore()

const roles = ref([])

/**
 * Lifecycle
 */
onMounted(() => {
    useRolePermissionStore().getRoles().then(({ data }) => {
        roles.value = data.rolesByBranch
    })
})

const clickSubmit = () => {
    userStore.createUser().then(response => {
        alertStore.showAlert("User successfully created")
        userStore.reset()
        router.replace('/users')
    }).catch(error => {
    })
}

const formTitle = !userStore.isEditing ? 'Add New User' : 'Edit User'

const clickCancel = () => {
    router.replace('/users')
}
</script>

<template>
    <div>
        <VRow>
            <VCol cols="12">
                <VCard :title="formTitle">
                    <VCardText>
                        <VForm @submit.prevent="() => clickSubmit()">
                            <VRow>
                                <!-- Name -->
                                <VCol cols="12" md="6">
                                    <AppTextField v-model="userStore.user.profile.name" label="Full Name"
                                        placeholder="Azlina binti Azmi" />
                                </VCol>

                                <!-- Email -->
                                <VCol cols="12" md="6">
                                    <AppTextField v-model="userStore.user.email" label="Email"
                                        placeholder="email@example.com" />
                                </VCol>

                                <!-- Phone-->
                                <VCol cols="12" md="6">
                                    <AppTextField v-model="userStore.user.phone" label="Phone"
                                        placeholder="0189192418" />
                                </VCol>

                                <VCol cols="12" md="6">
                                    <AppSelect item-title="name" v-model="userStore.user.role.id" item-value="id"
                                        label="Role" placeholder="Select role" :items="roles" />
                                </VCol>

                                <VCol cols="12" class="d-flex gap-4">
                                    <VBtn type="submit">
                                        {{ !userStore.isEditing ? "Submit" : "Update" }}
                                    </VBtn>

                                    <VBtn color="alert" variant="tonal" @click="clickCancel()">
                                        Cancel
                                    </VBtn>

                                    <VBtn type="reset" color="secondary" variant="tonal">
                                        Reset
                                    </VBtn>
                                </VCol>
                            </VRow>
                        </VForm>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
    </div>
</template>
