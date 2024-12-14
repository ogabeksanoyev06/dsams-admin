<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, Array],
    default: (props) => (props.isRange ? [0, 100] : 0),
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  isRange: {
    type: Boolean,
    default: false,
  },
})

const barHeights = [12, 12, 18, 25, 20, 29, 33, 36, 41, 54, 46, 54, 54, 44, 48, 36, 29, 41, 44, 33, 54, 41, 29, 25, 18, 25, 15, 12]

const sliderPositions = ref(props.isRange ? props.modelValue || [props.min, props.max] : [props.modelValue || props.min])

const isActive = (index) => {
  if (props.isRange) {
    return sliderPositions.value[0] <= index && sliderPositions.value[1] >= index
  } else {
    return sliderPositions.value[0] === index
  }
}

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full">
    <div class="relative">
      <svg width="100%" height="54" viewBox="0 0 390 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect v-for="(height, index) in barHeights" :key="index" :x="index * 14" :y="54 - height" width="12" :height="height" rx="6" :fill="!isActive(index) ? '#D6D6D6' : '#F6F6F6'" />
      </svg>
    </div>

    <div class="w-full h-[2px] relative bg-[#D6D6D6] rounded-md">
      <span class="bg-black h-full absolute block w-full"> </span>

      <div class="sort-by__price-range">
        <input type="range" class="range-min absolute opacity-0 invisible h-0 w-0" :min="min" :max="max" :step="step" :value="sliderPositions[0]" @input="handleChange" />
        <input type="range" class="range-max absolute opacity-0 invisible h-0 w-0" :min="min" :max="max" :step="step" :value="sliderPositions[1]" @input="handleChange" />
      </div>
      <span class="w-5 h-5 block bg-black rounded-full absolute top-1/2 -translate-y-1/2 left-0 cursor-grab" />
      <span class="w-5 h-5 block bg-black rounded-full absolute top-1/2 -translate-y-1/2 right-0 cursor-grab" />
    </div>
  </div>
</template>

<style scoped></style>
