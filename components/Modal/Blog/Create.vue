<script setup>
import { reactive } from 'vue'
import { useBlogsStore } from '@/stores/blogs.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import FileInput from '../../components/ui/file-input/FileInput.vue'

const QuillWrapper = defineAsyncComponent({
  loader: async () => {
    const { QuillEditor } = await import('@vueup/vue-quill')
    return QuillEditor
  },
  ssr: false,
})

const emit = defineEmits(['create-blog'])

const { showToast } = useCustomToast()

const blogStore = useBlogsStore()

const { createBlog } = blogStore

const loading = ref(false)

const languages = ['uz', 'ru', 'en']

const form = reactive({
  title: { uz: '', ru: '', en: '' },
  description: { uz: '', ru: '', en: '' },
  photo_url: 'https://avatars.githubusercontent.com/u/97165289',
})

const tab = ref('uz')
const isOpen = ref(false)

const resetForm = () => {
  form.title = { uz: '', ru: '', en: '' }
  form.description = { uz: '', ru: '', en: '' }
  form.image = 'https://avatars.githubusercontent.com/u/97165289'
  isOpen.value = false
}

const handleSubmitForm = async () => {
  try {
    loading.value = true
    const res = await createBlog({
      photo_url: form.photo_url,
      title_uz: form.title.uz,
      title_ru: form.title.ru,
      title_en: form.title.en,
      description_uz: form.description.uz,
      description_ru: form.description.ru,
      description_en: form.description.en,
    })
    if (res.status) {
      showToast("Blog qo'shildi", 'success')
      resetForm()
      emit('create-blog')
    }
  } catch (error) {
    console.log(error)
    showToast(error.response.data.message, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button size="lg">
          Blog qo'shish
          <svg class="w-5 h-5" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 12.3252H15M12 9.3252V15.3252M3 12.3252C3 13.5071 3.23279 14.6774 3.68508 15.7693C4.13738 16.8613 4.80031 17.8534 5.63604 18.6892C6.47177 19.5249 7.46392 20.1878 8.55585 20.6401C9.64778 21.0924 10.8181 21.3252 12 21.3252C13.1819 21.3252 14.3522 21.0924 15.4442 20.6401C16.5361 20.1878 17.5282 19.5249 18.364 18.6892C19.1997 17.8534 19.8626 16.8613 20.3149 15.7693C20.7672 14.6774 21 13.5071 21 12.3252C21 11.1433 20.7672 9.97297 20.3149 8.88104C19.8626 7.78911 19.1997 6.79696 18.364 5.96123C17.5282 5.12551 16.5361 4.46257 15.4442 4.01028C14.3522 3.55799 13.1819 3.3252 12 3.3252C10.8181 3.3252 9.64778 3.55799 8.55585 4.01028C7.46392 4.46257 6.47177 5.12551 5.63604 5.96123C4.80031 6.79696 4.13738 7.78911 3.68508 8.88104C3.23279 9.97297 3 11.1433 3 12.3252Z"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent class="p-6 max-w-[600px]">
        <DialogHeader>
          <DialogTitle> Blog yaratish</DialogTitle>
        </DialogHeader>
        <Tabs default-value="uz" v-model="tab">
          <TabsList class="inline-flex mb-6">
            <TabsTrigger value="uz"> O'zbekcha </TabsTrigger>
            <TabsTrigger value="ru"> Русский </TabsTrigger>
            <TabsTrigger value="en"> English </TabsTrigger>
          </TabsList>
          <TabsContent :value="lang" v-for="lang in languages" :key="lang" v-show="tab === lang">
            <VForm @submit="handleSubmitForm" v-slot="{ errors }">
              <div class="grid md:grid-cols-12 gap-5">
                <div class="grid md:col-span-12 w-full items-center gap-1.5">
                  <VField :name="`title.${tab}`" rules="required" v-model="form.title[tab]">
                    <Label :for="`title.${tab}`">Sarlavha</Label>
                    <Input :id="`title.${tab}`" type="text" v-model="form.title[tab]" :error="errors?.[`title.${tab}`]" />
                  </VField>
                </div>
                <div class="grid md:col-span-12 w-full items-center gap-1.5">
                  <VField name="photo_url" rules="required" v-model="form.photo_url">
                    <Label for="photo_url">Rasm</Label>
                    <FileInput id="photo_url" v-model="form.photo_url" :error="errors?.photo_url" />
                  </VField>
                </div>
                <div class="grid md:col-span-12 w-full items-center">
                  <VField :name="`description.${tab}`" rules="required" v-model="form.description[tab]">
                    <Label :for="`description.${tab}`" class="mb-1.5">Tasnif</Label>
                    <ClientOnly>
                      <QuillWrapper class="w-full" contentType="html" theme="snow" v-model:content="form.description[tab]" placeholder="Matnni shu yerga yozing..." />
                    </ClientOnly>
                  </VField>
                </div>
              </div>
              <div class="flex justify-end">
                <Button size="lg" :loading="loading" type="submit" class="mt-6">Saqlash</Button>
              </div>
            </VForm>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  </div>
</template>
