import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useAboutStore = defineStore('about', () => {
  const api = useApi()
  const { locale } = useI18n()

  const loading = ref(false)

  const getAbout = async (params) => {
    try {
      const response = await api.get(`admins/about`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const updateAbout = async (data) => {
    loading.value = true
    try {
      const response = await api.post('admins/about', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    getAbout,
    updateAbout,
    loading,
  }
})
