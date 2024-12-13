<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  loading: false,
})

// Compute loader fill color based on variant
const loaderFill = computed(() => {
  return props.variant === 'outline' ? '#0598D0' : 'white'
})
</script>

<template>
  <Primitive :as="props.as" :as-child="props.asChild" :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)">
    <span class="inline-flex items-center justify-center gap-2" :class="{ 'opacity-0  cursor-progress': props.loading }">
      <slot />
    </span>
    <transition name="fade" mode="out-in">
      <span v-if="loading" class="absolute-center z-10 !inline-block w-max h-max loading transition-300">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" font-size="48" class="animate-spin iconify iconify--ph w-5 h-5" width="1em" height="1em" viewBox="0 0 256 256" v-if="loading">
          <path
            fill="#fff"
            d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m39.11 25.19C170.24 83.71 155 99.44 135 113.61c-2.25-24.48-8.44-49.8-38.37-67.82a87.89 87.89 0 0 1 70.5 3.4ZM40.18 133.54c28.34-20 49.57-14.68 71.87-4.39c-20.05 14.19-38.86 32.21-39.53 67.11a87.92 87.92 0 0 1-32.34-62.72m136.5 67.73c-31.45-14.55-37.47-35.58-39.71-60c12.72 5.86 26.31 10.75 41.3 10.75c11.33 0 23.46-2.8 36.63-10.08a88.2 88.2 0 0 1-38.22 59.33"
          ></path>
        </svg>
      </span>
    </transition>
  </Primitive>
</template>
