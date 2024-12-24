import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useApplicationsStore = defineStore('applications', () => {
  const api = useApi()

  const loading = ref(false)
  const questionsWithAnswers = ref([])

  const getApplications = async (params) => {
    loading.value = true
    try {
      const response = await api.get('admins/applications', { params })
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const getApplicationById = async (id) => {
    loading.value = true
    try {
      const response = await api.get(`admins/applications/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const completeApplication = async (id) => {
    loading.value = true
    try {
      const response = await api.patch(`admins/applications/done/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const approveApplication = async (id) => {
    loading.value = true
    try {
      const response = await api.patch(`admins/applications/submit/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const cancelApplication = async (id) => {
    loading.value = true
    try {
      const response = await api.patch(`admins/applications/cancel/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getApplications,
    getApplicationById,
    completeApplication,
    approveApplication,
    cancelApplication,
    questionsWithAnswers,
  }
})
