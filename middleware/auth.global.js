export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie('auth_token')

  if (!accessToken.value && to.path !== '/auth/login') {
    return navigateTo('/auth/login')
  }
})
