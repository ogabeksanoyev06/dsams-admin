import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useCustomToast } from '@/composables/useCustomToast.js'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const router = useRouter()
  const { showToast } = useCustomToast()

  const accessToken = useCookie('auth_token')
  const loading = ref(false)

  const login = async (form) => {
    loading.value = true
    try {
      const response = await api.post('admins/login', form)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    accessToken.value = null
    router.push('/auth/login')
    showToast('Tizimdan chiqdingiz', 'info')
  }

  return {
    login,
    logout,
    loading,
  }
})
