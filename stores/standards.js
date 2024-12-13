import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useStandardsStore = defineStore('standards', () => {
  const api = useApi()

  const loading = ref(false)

  const getStandards = async (params) => {
    try {
      const response = await api.get('admins/standarts', { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getStandardById = async (id, params) => {
    try {
      const response = await api.get(`admins/standarts/${id}`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const createStandard = async (data) => {
    loading.value = true
    try {
      const response = await api.post('admins/standarts', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  const editStandardById = async (id, data) => {
    loading.value = true
    try {
      const response = await api.put(`admins/standarts/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteStandardById = async (id) => {
    loading.value = true
    try {
      const response = await api.delete(`admins/Standard/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    getStandards,
    getStandardById,
    createStandard,
    editStandardById,
    deleteStandardById,
    loading,
  }
})
