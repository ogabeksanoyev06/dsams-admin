<template>
  <div class="relative flex flex-col rounded-xl bg-white overflow-hidden group shadow h-full">
    <div class="h-[200px] shrink-0 aspect-[252/200]">
      <Skeleton class="h-full w-full" />
    </div>

    <div class="p-4 rounded-xl h-full flex flex-col">
      <div class="flex-y-center space-x-1">
        <Skeleton class="h-5 w-5 rounded-sm" />
        <Skeleton class="h-4 w-[150px]" />
      </div>

      <div class="mt-2">
        <Skeleton class="h-5 w-full mb-2" />
        <Skeleton class="h-5 w-3/4" />
      </div>
    </div>
  </div>
</template>

<script setup></script>
