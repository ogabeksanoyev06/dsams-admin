<script setup>
import { reactive } from 'vue'
import { useBlogsStore } from '@/stores/blogs.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import FileInput from '../../components/ui/file-input/FileInput.vue'
import { Edit3Icon } from 'lucide-vue-next'

const QuillWrapper = defineAsyncComponent({
  loader: async () => {
    const { QuillEditor } = await import('@vueup/vue-quill')
    return QuillEditor
  },
  ssr: false,
})

const props = defineProps({
  blogId: [String, Number],
})

const emit = defineEmits(['edit-blog'])

const { locale } = useI18n()

const { showToast } = useCustomToast()

const blogStore = useBlogsStore()

const { editBlogById, getBlogById } = blogStore

const loadingBlogId = ref(false)
const loading = ref(false)

const form = reactive({
  title: { uz: '', ru: '', en: '' },
  description: { uz: '', ru: '', en: '' },
  photo_url: 'https://avatars.githubusercontent.com/u/97165289',
})

const languages = ['uz', 'ru', 'en']

const tab = ref('uz')
const isOpen = ref(false)

const resetForm = () => {
  form.title = { uz: '', ru: '', en: '' }
  form.description = { uz: '', ru: '', en: '' }
  form.image = 'https://avatars.githubusercontent.com/u/97165289'
  isOpen.value = false
}

const fetchBlogById = async () => {
  try {
    loadingBlogId.value = false
    const response = await getBlogById(props.blogId, {
      locale: locale.value,
    })
    form.title = { uz: response.data.title_uz, ru: response.data.title_ru, en: response.data.title_en }
    form.description = { uz: response.data.description_uz, ru: response.data.description_ru, en: response.data.description_en }
    form.photo_url = response.data.photo_url
  } catch (error) {
    console.error(error)
  } finally {
    loadingBlogId.value = true
  }
}

const handleSubmitForm = async () => {
  try {
    loading.value = true
    const res = await editBlogById(props.blogId, {
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
      emit('edit-blog')
    }
  } catch (error) {
    console.log(error)
    // showToast(error.response.data.message, 'error')
  } finally {
    loading.value = false
  }
}

watch(isOpen, (newVal) => {
  if (newVal) fetchBlogById()
})
</script>

<template>
  <div>
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Edit3Icon class="text-white cursor-pointer h-5 w-5" />
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
                <Button size="lg" :loa type="submit" class="mt-6">Saqlash</Button>
              </div>
            </VForm>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  </div>
</template>
