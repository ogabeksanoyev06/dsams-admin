<template>
  <div class="flex flex-col rounded-xl bg-white border-b border-gray-400 p-3 md:p-4 transition-300 h-full gap-2 md:gap-3">
    <div class="flex max-md:justify-center max-md:flex-col items-center gap-2 md:gap-3">
      <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
        <Skeleton class="w-6 h-6 rounded-full" />
      </div>
      <Skeleton class="h-4 w-3/4 md:w-full max-md:text-center" />
    </div>

    <Skeleton class="h-px w-full bg-gray-100" />

    <div class="flex items-center justify-between">
      <Skeleton class="h-8 w-8 rounded-full" />
      <Skeleton class="h-8 w-8 rounded-full" />
    </div>
  </div>
</template>

<script setup></script>
