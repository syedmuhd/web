import { useAuthStore } from "@/stores/useAuthStore"
import { createClient, defaultPlugins } from "villus"
import { router } from '@/plugins/1.router'

function authPlugin({ opContext, afterQuery }) {
  const authStore = useAuthStore()

  afterQuery(async ({ error }, { response }) => {
    if (response && response.body.errors && response.body.errors[0] && response.body.errors[0].message == "Unauthenticated.") {
      await authStore.logout(router);
      return
    }
  });

  if (authStore.token) {
    opContext.headers.Authorization = 'Bearer ' + authStore.token
  }
}

export const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_BASE_URL,
  // If found in cache return it, then fetch a fresh result from the network and update current data (reactive). 
  // If not found in cache, it will fetch it from the network and cache it
  cachePolicy: 'network-only', // 
  use: [
    authPlugin,
    ...defaultPlugins()
  ],

})
export default function (app) {
  app.use(client)
}