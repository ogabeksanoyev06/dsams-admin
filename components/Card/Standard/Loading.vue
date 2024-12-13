<template>
  <div class="relative rounded-xl overflow-hidden bg-white border-b border-gray-400 p-4 transition-300 h-max pb-2 group">
    <Skeleton class="h-4 w-20 mb-2" />

    <Skeleton class="h-6 w-3/4 mb-2" />
    <Skeleton class="h-6 w-1/2 mb-2" />

    <div class="space-y-2">
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-5/6" />
      <Skeleton class="h-4 w-3/4" />
    </div>

    <div class="flex-y-center gap-4 pt-2 justify-between">
      <Skeleton class="h-4 w-24" />
      <div class="flex-y-center gap-1">
        <Skeleton class="w-4 h-4 rounded-full" />
        <Skeleton class="h-4 w-12" />
      </div>
    </div>
  </div>
</template>

<script setup></script>
