<template>
  <div class="relative rounded-xl overflow-hidden bg-white border-b border-gray-400 p-4 hover:shadow-box transition-300 cursor-pointer review-grid-item h-max pb-2 group">
    <div>
      <p class="text-xs text-gray mb-2">Standard</p>
      <NuxtLink :to="`/sectors/${1}/${1}`" class="font-medium text-base md:text-xl transition-300 leading-130 line-clamp-2 break-words cursor-pointer group-hover:text-blue-800">
        <span>ISO/IEC 20000-1: 2018</span>
      </NuxtLink>
      <h3 class="font-medium text-base md:text-lg transition-300 leading-130 line-clamp-2 mb-2">
        <span>Axborot texnologiyalari</span>
      </h3>
    </div>
    <p class="text-gray-700 text-sm line-clamp-6">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa quis architecto, nobis dolore placeat dolores nesciunt ut delectus eligendi quam consequatur sapiente perferendis. Quam, illum nobis commodi sint rerum aliquid.
    </p>
    <div class="flex-y-center gap-4 pt-2 mt-2 border-t justify-between">
      <div class="text-xs leading-130">Chop etilgan</div>
      <div class="flex-y-center group gap-1">
        <Calendar class="w-4 h-4 text-gray-700"></Calendar>
        <p class="text-sm leading-130 text-gray-700">2015</p>
      </div>
    </div>
    <div class="absolute top-0 right-4 z-10 transition-300 lg:-translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
      <div class="flex items-center gap-3 bg-primary/90 py-2 px-4 rounded-b-xl">
        <ModalStandardEdit />
        <ModalStandardDelete />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next'
</script>

<style scoped></style>
