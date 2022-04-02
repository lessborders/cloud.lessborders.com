export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const loggedIn = false
    if (!loggedIn) {
      let cloudBaseUrl = null
      if (
        location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1'
      ) {
        cloudBaseUrl = 'http://localhost:4001'
      } else {
        cloudBaseUrl = 'https://cloud.lessborders.com'
      }
      let toFullPath = new URL(to.fullPath, window.location.href).href
      let overridePrev = false
      if (to.name == 'auth-login' || to.name == 'auth-register') {
        toFullPath = new URL(from.fullPath, window.location.href).href
        overridePrev = true
      }
      const fromFullPath = new URL(from.fullPath, window.location.href).href
      let newUrl = cloudBaseUrl + '/auth/signin/?redirect_url=' + toFullPath
      if(toFullPath != fromFullPath || overridePrev) {
        newUrl += '&previous_url=' + fromFullPath
      }
      window.location.href = newUrl
      return navigateTo(from.fullPath)
    }
  }
  console.log(to, from)
})
