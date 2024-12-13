import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useProfileStore = defineStore('profile', () => {
  const api = useApi()

  const loading = ref(false)

  const getProfile = async () => {
    try {
      const response = await api.get('admins/me')
      return response.data
    } catch (error) {
      throw error
    }
  }

  const editProfile = async (data) => {
    loading.value = true
    try {
      const response = await api.patch('admins/profile', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getProfile,
    editProfile,
  }
})
