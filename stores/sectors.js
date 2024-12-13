import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useSectorsStore = defineStore('sectors', () => {
  const api = useApi()

  const loading = ref(false)

  const getSectors = async (params) => {
    try {
      const response = await api.get('admins/sektors', { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getSectorById = async (id, params) => {
    try {
      const response = await api.get(`admins/sektors/${id}`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const createSector = async (data) => {
    loading.value = true
    try {
      const response = await api.post('admins/sektors', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  const editSectorById = async (id, data) => {
    loading.value = true
    try {
      const response = await api.put(`admins/sektors/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteSectorById = async (id) => {
    loading.value = true
    try {
      const response = await api.delete(`admins/sektors/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    getSectors,
    getSectorById,
    createSector,
    editSectorById,
    deleteSectorById,
    loading,
  }
})
