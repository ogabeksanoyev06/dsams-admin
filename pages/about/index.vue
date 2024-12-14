<template>
  <div>
    <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight mb-6">Biz haqimizda</h1>
    <Tabs default-value="uz" v-model="tab" @update:model-value="handleTab">
      <TabsList class="inline-flex mb-6">
        <TabsTrigger value="uz"> O'zbekcha </TabsTrigger>
        <TabsTrigger value="ru"> Русский </TabsTrigger>
        <TabsTrigger value="en"> English </TabsTrigger>
      </TabsList>
      <TabsContent :value="lang" v-for="lang in languages" :key="lang" v-show="tab === lang">
        <VForm @submit="handleSubmitForm" v-slot="{ errors }">
          <div class="grid md:grid-cols-12 gap-4">
            <div class="grid md:col-span-6 w-full items-center gap-1.5">
              <VField :name="`title.${tab}`" rules="required" v-model="form.title[tab]">
                <Label :for="`title.${tab}`">Sarlavha</Label>
                <Input :id="`title.${tab}`" type="text" v-model="form.title[tab]" :error="errors?.[`title.${tab}`]" />
              </VField>
            </div>
            <div class="grid md:col-span-6 w-full items-center gap-1.5">
              <VField name="photo_url" rules="required" v-model="form.photo_url">
                <Label for="photo_url`">Rasm</Label>
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
            <Button :loading="loading" class="mt-6" type="submit" size="lg">Saqlash</Button>
          </div>
        </VForm>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAboutStore } from '@/stores/about'
import FileInput from '../../components/ui/file-input/FileInput.vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const QuillWrapper = defineAsyncComponent({
  loader: async () => {
    const { QuillEditor } = await import('@vueup/vue-quill')
    return QuillEditor
  },
  ssr: false,
})

const aboutStore = useAboutStore()
const { getAbout, updateAbout } = aboutStore

const { loading } = storeToRefs(aboutStore)

const languages = ['uz', 'ru', 'en']

const tab = ref('uz')
const isMaxSize = ref(false)

const form = reactive({
  title: { uz: '', ru: '', en: '' },
  description: { uz: '', ru: '', en: '' },
  photo_url: '',
})

const handleTab = (value) => {
  tab.value = value
}

const handleSubmitForm = async () => {
  try {
    const formData = {
      photo_url: 'https://www.iso.org/files/live/sites/isoorg/files/standards/popular_standards/iso_9000_quality_management/img/iso9000-banner/thumbnails/1200x600',
      title_uz: form.title.uz,
      title_ru: form.title.ru,
      title_en: form.title.en,
      description_uz: form.description.uz,
      description_ru: form.description.ru,
      description_en: form.description.en,
    }
    const response = await updateAbout(formData)
    if (response?.status) {
      showToast('Muvaffaqiyatli saqlandi', 'success')
    }
  } catch (error) {
    showToast(error.response.data.message, 'error')
  }
}

const { data: about } = await useAsyncData('about', () => getAbout())
if (about.value) {
  form.photo_url = about.value.data.photo_url
  form.title.uz = about.value.data.title_uz
  form.title.ru = about.value.data.title_ru
  form.title.en = about.value.data.title_en
  form.description.uz = about.value.data.description_uz
  form.description.ru = about.value.data.description_ru
  form.description.en = about.value.data.description_en
}
</script>
