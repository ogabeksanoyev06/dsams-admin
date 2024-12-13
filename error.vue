<template>
  <main>
    <section class="min-w-[308px] absolute absolute-center flex items-center justify-center flex-col mt-10">
      <div class="not_found relative z-0 flex items-center justify-center flex-col">
        <img class="" src="/assets/images/404/pattern.png" alt="Main pattern svg" />
        <h1 class="absolute -bottom-[60px] z-10 text-center text-yellow text-[120px] font-black leading-normal">
          {{ error.statusCode }}
        </h1>
      </div>
      <div class="max-w-[580px] mt-12 mx-auto flex items-center flex-col justify-center">
        <p class="mb-8 text-lg leading-140 text-black text-center font-normal">Siz qidirayotgan sahifa oʻchirilgan, nomi oʻzgartirilgan yoki vaqtincha mavjud boʻlmagan boʻlishi mumkin.</p>

        <div class="flex items-center flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          <nuxt-link to="/">
            <Button> Bosh sahifaga o'ting </Button>
          </nuxt-link>
          <nuxt-link to="/about">
            <Button variant="secondary"> Biz haqimizda </Button>
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
interface Props {
  error: {
    statusCode: number
    message: string
  }
}
defineProps<Props>()
</script>
