<template>
  <div class="md:bg-white md:p-6 rounded-2xl max-md:shadow-none shadow w-full lg:max-w-[960px] mx-auto flex flex-col justify-between">
    <div>
      <h1 class="text-2xl max-md:text-xl font-semibold leading-130">
        {{ blogs.data.title_uz }}
      </h1>
      <div class="flex-center-between border-y my-4 py-1 md:py-2 mt-2 mb-4 max-sm:border-none">
        <p class="flex-y-center space-x-1.5 text-sm md:text-base max-sm:text-gray-700 max-sm:font-medium leading-130">
          <Calendar class="w-5 h-5" />
          <span class="flex-center"> {{ $dayjs(blogs.data.createdAt).format('DD.MM.YYYY') }} <span class="w-1 h-1 bg-gray-500 rounded-full mx-1.5"> </span> {{ $dayjs(blogs.data.createdAt).format('HH:mm') }}</span>
        </p>
      </div>
      <div class="mb-4 rounded-lg relative overflow-hidden">
        <img :src="blogs.data.photo_url" alt="blog-single" class="w-full h-full object-cover" />
      </div>
      <div class="content" v-html="blogs.data.description_uz"></div>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next'
import { useBlogsStore } from '@/stores/blogs.js'

const route = useRoute()

const blogsStore = useBlogsStore()

const { getBlogById } = blogsStore

const { locale } = useI18n()

const { data: blogs } = await useAsyncData('blogs', async () => {
  return await getBlogById(route.params.id, {
    locale: locale.value,
  })
})
</script>
