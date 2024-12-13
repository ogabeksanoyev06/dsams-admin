import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export const useBlogsStore = defineStore('blogs', () => {
  const api = useApi()

  const loading = ref(false)

  const getBlogs = async (params) => {
    try {
      const response = await api.get('admins/blogs', { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getBlogById = async (id, params) => {
    try {
      const response = await api.get(`admins/blogs/${id}`, { params })
      return response.data
    } catch (error) {
      throw error
    }
  }

  const createBlog = async (data) => {
    loading.value = true
    try {
      const response = await api.post('admins/blogs', data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }
  const editBlogById = async (id) => {
    loading.value = true
    try {
      const response = await api.put(`admins/blogs/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteBlogById = async (id) => {
    loading.value = true
    try {
      const response = await api.delete(`admins/blogs/${id}`)
      return response.data
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    getBlogs,
    getBlogById,
    createBlog,
    editBlogById,
    deleteBlogById,
    loading,
  }
})
