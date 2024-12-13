<template>
  <div class="relative flex flex-col rounded-xl bg-white overflow-hidden group shadow hover:shadow-blog h-full">
    <div class="h-[200px] shrink-0 aspect-[252/200]">
      <BaseImage :src="item.photo_url" :alt="item.title_uz" class="object-cover w-full h-full object-top" />
    </div>
    <div class="p-4 rounded-xl h-full flex flex-col">
      <div class="flex-y-center space-x-1">
        <Calendar class="text-base text-gray-500 h-5 w-5" />
        <span class="text-gray text-sm font-medium leading-130">
          {{ $dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss') }}
        </span>
      </div>
      <NuxtLink :to="`/blogs/${item._id}`" class="text-base font-medium leading-130 mt-2 line-clamp-3 group-hover:text-blue-800">{{ item.title_uz }}</NuxtLink>
    </div>
    <div class="absolute top-0 left-4 z-10 transition-300 lg:-translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
      <div class="flex items-center gap-3 bg-primary/90 py-2 px-4 pt-3 rounded-b-xl">
        <ModalBlogEdit :blog-id="item._id" @edit-blog="handleEditBlog" />
        <ModalBlogDelete :blog-id="item._id" @delete-blog="handleDeleteBlog" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next'

defineProps({
  item: Object,
})

const emit = defineEmits(['edit-blog', 'delete-blog'])

const handleEditBlog = () => {
  emit('edit-blog')
}


const handleDeleteBlog = () => {
  emit('delete-blog')
}
</script>
