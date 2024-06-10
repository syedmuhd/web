<script setup>
import { useBranchStore } from '@/composables/stores/useBranchStore';
import congoImg from '@images/illustrations/congo-illustration.png'
import { useRouter } from 'vue-router';

const router = useRouter()
const branchStore = useBranchStore()

const setBranch = (branchId) => {
  branchStore.setCurrentActiveBranchId(branchId)
  router.replace('/dashboards/crm')
}

</script>

<template>
  <VCard v-for="branch in branchStore.branches" :key="branch.id">
    <VRow no-gutters>
      <VCol cols="8">
        <VCardText>
          <h5 class="text-h5 text-no-wrap">
            {{ branch.name }}
          </h5>
          <VBtn @click="setBranch(branch.id)">Manage</VBtn>
        </VCardText>
      </VCol>

      <VCol cols="4">
        <VCardText class="pb-0 px-0 position-relative h-100">
          <VImg
            :src="congoImg"
            :height="$vuetify.display.smAndUp ? 147 : 125"
            class="congo-john-img w-100"
          />
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.congo-john-img {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 1.25rem;
}
</style>
