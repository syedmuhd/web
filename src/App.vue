<script setup>
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import initCore from '@core/initCore'
import {
  initConfigStore,
  useConfigStore,
} from '@core/stores/config'
import { hexToRgb } from '@layouts/utils'
import { useAlertStore } from './composables/stores/useAlertStore'
import PromptDialog from './components/dialogs/PromptDialog.vue'

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
initCore()
initConfigStore()

const configStore = useConfigStore()
const alertStore = useAlertStore()

</script>

<template>
  <VLocaleProvider :rtl="configStore.isAppRTL">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <VSnackbar :timeout="3500" v-model="alertStore.isVisible" transition="fade-transition" location="top">
        {{ alertStore.message }}
        {{ alertStore.content ? '<p>Woi</p>' : '' }}
        <template #actions>
          <VBtn color="error" @click="alertStore.isVisible = false">
            Close
          </VBtn>
        </template>
      </VSnackbar>
      <PromptDialog />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
