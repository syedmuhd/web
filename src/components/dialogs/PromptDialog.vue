<script setup>
import { useDialogStore } from '@/stores/useDialogStore';

const dialogStore = useDialogStore()
</script>

<template>
    <VDialog v-model="dialogStore.isVisible" persistent class="v-dialog-sm">

        <!-- Dialog close btn -->
        <DialogCloseBtn @click="dialogStore.cancel()" />

        <!-- Dialog Content -->
        <VCard :title="dialogStore.title">
            <VCardText>
                {{ dialogStore.message }}
            </VCardText>

            <VCardText class="d-flex justify-end gap-3 flex-wrap">
                <VBtn color="secondary" variant="tonal" @click="dialogStore.cancel()">
                    Cancel
                </VBtn>
                <VBtn @click="dialogStore.confirm()">
                    Confirm
                </VBtn>
            </VCardText>
        </VCard>
    </VDialog>
</template>
