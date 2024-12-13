<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow w-full max-w-md">
    <div class="flex flex-col gap-y-1.5 p-6">
      <h3 class="font-semibold tracking-tight text-2xl">Tizimga kirish</h3>
      <p class="text-sm text-muted-foreground">Tizimga kirish uchun ma'lumotlaringizni kiriting</p>
    </div>
    <VForm @submit="handleSubmitForm" v-slot="{ errors }">
      <div class="p-6 pt-0 grid gap-4">
        <div class="grid gap-2">
          <VField name="login" rules="required" v-model="form.login">
            <Label for="login">Login</Label>
            <Input id="login" type="text" placeholder="Parol" v-model="form.login" :error="errors.login" />
          </VField>
        </div>
        <div class="grid gap-2">
          <VField name="password" rules="required" v-model="form.password">
            <Label for="password">Parol</Label>
            <div class="relative">
              <Input id="password" :type="password ? 'text' : 'password'" placeholder="Login" v-model="form.password" class="pr-12" :error="errors.password" />
              <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2" @click="passwordSee">
                <Transition name="icon-scale" mode="out-in">
                  <Eye class="size-5 text-muted-foreground cursor-pointer" v-if="!password" />
                  <EyeOff class="size-5 text-muted-foreground cursor-pointer" v-else />
                </Transition>
              </span>
            </div>
          </VField>
        </div>
      </div>
      <div class="flex items-center p-6 pt-0">
        <Button :loading="loading" class="w-full"> Tizimga kirish </Button>
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { Eye, EyeOff } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth',
})
const { showToast } = useCustomToast()

const authStore = useAuthStore()
const { login } = authStore

const { loading } = storeToRefs(authStore)

const accessToken = useCookie('auth_token')
const cdnToken = useCookie('cdn_token')

const form = reactive({
  login: '',
  password: '',
})

const resetForm = () => {
  form.login = ''
  form.password = ''
}

const password = ref(false)

const passwordSee = () => {
  password.value = !password.value
}

const handleSubmitForm = async () => {
  try {
    const response = await login(form)
    if (response?.status) {
      accessToken.value = response.data.auth_token
      cdnToken.value = response.data.cdn_token
      showToast('Tizimga muvaffaqiyatli kirdingiz', 'success')
      navigateTo('/')
    }
  } catch (error) {
    showToast(error.response.data.message, 'error')
    resetForm()
  }
}
</script>

<style scoped>
.icon-scale-enter-active,
.icon-scale-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.icon-scale-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
.icon-scale-enter-to {
  transform: scale(1);
  opacity: 1;
}
.icon-scale-leave-from {
  transform: scale(1);
  opacity: 1;
}
.icon-scale-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
