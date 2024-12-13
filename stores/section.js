import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useSectionsStore = defineStore('sections', () => {
  const api = useApi()

  const loading = ref(false)

  const getSections = async (params) => {
    try {
      const response = await api.get('admins/sections', { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getSectionById = async (id, params) => {
    try {
      const response = await api.get(`admins/sections/${id}`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const createSection = async (data) => {
    loading.value = true
    try {
      const response = await api.post('admins/sections', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  const editSectionById = async (id, data) => {
    loading.value = true
    try {
      const response = await api.put(`admins/sections/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteSectionById = async (id) => {
    loading.value = true
    try {
      const response = await api.delete(`admins/sections/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    getSections,
    getSectionById,
    createSection,
    editSectionById,
    deleteSectionById,
    loading,
  }
})
