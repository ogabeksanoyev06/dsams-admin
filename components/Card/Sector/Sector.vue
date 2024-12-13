<template>
  <div class="flex flex-col rounded-xl bg-white border-b border-gray-400 p-3 md:p-4 transition-300 hover:shadow-box h-full gap-2 md:gap-3">
    <NuxtLink :to="`/sectors/${item._id}`" class="">
      <div class="flex max-md:justify-center max-md:flex-col items-center gap-2 md:gap-3">
        <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
          <span class="text-base font-medium">1</span>
        </div>
        <h3 class="text-base xl:text-lg font-medium w-full max-md:text-center md:line-clamp-2">
          {{ item.name_uz }}
        </h3>
      </div>
    </NuxtLink>
    <div class="h-px w-full bg-gray-100"></div>
    <div class="flex items-center justify-between">
      <ModalSectorEdit />
      <ModalSectorDelete />
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped></style>
