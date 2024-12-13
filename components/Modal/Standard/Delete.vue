<script setup>
import { useCustomToast } from '@/composables/useCustomToast.js'
import { Trash2 } from 'lucide-vue-next'

const emit = defineEmits(['standard-deleted'])

const props = defineProps({
  standardId: String,
})

const { showToast } = useCustomToast()

const isOpen = ref(false)

const confirmDelete = async () => {
  try {
    // if (response?.status === 'success') {
    showToast("Blog o'chirildi.", 'success')
    emit('standard-deleted')
    isOpen.value = false
    // }
  } catch (error) {
    showToast("Blog o'chirishda xatolik", 'error')
  }
}
</script>
<template>
  <div>
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Trash2 class="text-white cursor-pointer h-5 w-5 hover:text-destructive" />
      </DialogTrigger>
      <DialogContent class="sm:max-w-[600px] p-4">
        <div class="pt-6 p-5 flex flex-col items-center text-center">
          <div class="flex items-center justify-center w-16 h-16 p-2 rounded-full bg-red-100">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32.5167 9.75016L22.6167 4.0335C21 3.10016 19 3.10016 17.3667 4.0335L7.48337 9.75016C5.8667 10.6835 4.8667 12.4168 4.8667 14.3002V25.7002C4.8667 27.5668 5.8667 29.3002 7.48337 30.2502L17.3834 35.9668C19 36.9002 21 36.9002 22.6334 35.9668L32.5334 30.2502C34.15 29.3168 35.15 27.5835 35.15 25.7002V14.3002C35.1334 12.4168 34.1334 10.7002 32.5167 9.75016ZM18.75 12.9168C18.75 12.2335 19.3167 11.6668 20 11.6668C20.6834 11.6668 21.25 12.2335 21.25 12.9168V21.6668C21.25 22.3502 20.6834 22.9168 20 22.9168C19.3167 22.9168 18.75 22.3502 18.75 21.6668V12.9168ZM21.5334 27.7168C21.45 27.9168 21.3334 28.1002 21.1834 28.2668C20.8667 28.5835 20.45 28.7502 20 28.7502C19.7834 28.7502 19.5667 28.7002 19.3667 28.6168C19.15 28.5335 18.9834 28.4168 18.8167 28.2668C18.6667 28.1002 18.55 27.9168 18.45 27.7168C18.3667 27.5168 18.3334 27.3002 18.3334 27.0835C18.3334 26.6502 18.5 26.2168 18.8167 25.9002C18.9834 25.7502 19.15 25.6335 19.3667 25.5502C19.9834 25.2835 20.7167 25.4335 21.1834 25.9002C21.3334 26.0668 21.45 26.2335 21.5334 26.4502C21.6167 26.6502 21.6667 26.8668 21.6667 27.0835C21.6667 27.3002 21.6167 27.5168 21.5334 27.7168Z"
                fill="#E62E30"
              />
            </svg>
          </div>
          <h2 class="mt-4 mb-1 text-xl  font-semibold leading-130">Вы точно хотите удалить</h2>
          <p class="leading-130 text-gray-700 text-sm">Вы уверены, что хотите удалить пользователя "Ахмаджон Санакулов"?</p>
          <div class="flex gap-2 w-full mt-7">
            <DialogClose asChild>
              <Button size="lg" class="w-full"> Отменить </Button>
            </DialogClose>
            <Button variant="destructive" size="lg" class="w-full" @click="confirmDelete"> Удалить </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
