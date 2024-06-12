<script setup>
import { useUserStore } from '@/stores/useUserStore';
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useRouter } from 'vue-router';

const userStore = useUserStore()

/**
 * Lifecycle
 */
onMounted(() => {
    userStore.getAllUsers()
})

// 👉 Store
const searchQuery = ref('')

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const updateOptions = options => {
    sortBy.value = options.sortBy[0]?.key
    orderBy.value = options.sortBy[0]?.order
}

// Headers
const headers = [
    {
        title: 'User',
        key: 'user',
    },
    {
        title: 'Role',
        key: 'role',
    },
    {
        title: 'Actions',
        key: 'actions',
        sortable: false,
    },
]

const users = computed(() => userStore.users)
const totalUsers = computed(() => users.length)

const router = useRouter()
const clickAddNewUser = () => {
    userStore.reset()
    router.replace('users/add')
}
const clickEditUser = (userId) => {
    userStore.reset()
    userStore.isEditing = true
    userStore.getUserById(userId)
    router.replace('users/add')
}

const deleteUser = (userId) => {

}
</script>

<template>
    <section>
        <VCard class="mb-6">
            <VCardItem class="pb-4">
                <VCardTitle>Filters</VCardTitle>
            </VCardItem>

            <VCardText>
                <VRow>
                    <!-- 👉 Select Role -->
                    <VCol cols="12" sm="4">
                        <AppSelect placeholder="Select Role" :items="roles" clearable clear-icon="tabler-x" />
                    </VCol>
                </VRow>
            </VCardText>

            <VDivider />

            <VCardText class="d-flex flex-wrap gap-4">
                <div class="me-3 d-flex gap-3">
                    <AppSelect :model-value="itemsPerPage" :items="[
                        { value: 10, title: '10' },
                        { value: 25, title: '25' },
                        { value: 50, title: '50' },
                        { value: 100, title: '100' },
                        { value: -1, title: 'All' },
                    ]" style="inline-size: 6.25rem;" @update:model-value="itemsPerPage = parseInt($event, 10)" />
                </div>
                <VSpacer />

                <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
                    <!-- 👉 Search  -->
                    <div style="inline-size: 15.625rem;">
                        <AppTextField v-model="searchQuery" placeholder="Search User" />
                    </div>

                    <!-- 👉 Export button -->
                    <VBtn variant="tonal" color="secondary" prepend-icon="tabler-upload">
                        Export
                    </VBtn>

                    <!-- 👉 Add user button -->
                    <VBtn prepend-icon="tabler-plus" @click="clickAddNewUser()">
                        Add New User
                    </VBtn>
                </div>
            </VCardText>

            <VDivider />

            <!-- SECTION datatable -->
            <VDataTableServer v-model:items-per-page="itemsPerPage" v-model:page="page" :items="users"
                :items-length="totalUsers" :headers="headers" class="text-no-wrap" show-select
                @update:options="updateOptions">
                <!-- User -->
                <template #item.user="{ item }">
                    <div class="d-flex align-center gap-x-4">
                        <div class="d-flex flex-column">
                            <h6 class="text-base">
                                <RouterLink :to="{ name: 'apps-user-view-id', params: { id: item.id } }"
                                    class="font-weight-medium text-link">
                                    {{ item.profile?.name }}
                                </RouterLink>
                            </h6>
                            <div class="text-sm">
                                {{ item.email }}
                            </div>
                        </div>
                    </div>
                </template>

                <!-- 👉 Role -->
                <template #item.role="{ item }">
                    <div class="d-flex align-center gap-x-2">
                        <div class="text-capitalize text-high-emphasis text-body-1">
                            {{ item.role.name }}
                        </div>
                    </div>
                </template>

                <!-- Actions -->
                <template #item.actions="{ item }">
                    <IconBtn @click="deleteUser(item.id)">
                        <VIcon icon="tabler-trash" />
                    </IconBtn>

                    <IconBtn>
                        <VIcon icon="tabler-eye" />
                    </IconBtn>

                    <VBtn icon variant="text" color="medium-emphasis">
                        <VIcon icon="tabler-dots-vertical" />
                        <VMenu activator="parent">
                            <VList>
                                <VListItem :to="{ name: 'apps-user-view-id', params: { id: item.id } }">
                                    <template #prepend>
                                        <VIcon icon="tabler-eye" />
                                    </template>

                                    <VListItemTitle>View</VListItemTitle>
                                </VListItem>

                                <VListItem @click="clickEditUser(item.id)">
                                    <template #prepend>
                                        <VIcon icon="tabler-pencil" />
                                    </template>
                                    <VListItemTitle>Edit</VListItemTitle>
                                </VListItem>

                                <VListItem @click="deleteUser(item.id)">
                                    <template #prepend>
                                        <VIcon icon="tabler-trash" />
                                    </template>
                                    <VListItemTitle>Delete</VListItemTitle>
                                </VListItem>
                            </VList>
                        </VMenu>
                    </VBtn>
                </template>

                <!-- pagination -->
                <template #bottom>
                    <TablePagination v-model:page="page" :items-per-page="itemsPerPage" :total-items="totalUsers" />
                </template>
            </VDataTableServer>
            <!-- SECTION -->
        </VCard>
    </section>
</template>
