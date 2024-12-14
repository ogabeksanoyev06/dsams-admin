<script setup>
import { reactive } from 'vue'
import { useStandardsStore } from '@/stores/standards.js'
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

const emit = defineEmits(['edit-standard'])

const props = defineProps({
  standardId: [String, Number],
})

const { showToast } = useCustomToast()

const standardsStore = useStandardsStore()

const { editStandardById, getStandardById } = standardsStore

const loading = ref(false)
const loadingStandardId = ref(false)

const languages = ['uz', 'ru', 'en']

const form = reactive({
  name: '',
  short_description: { uz: '', ru: '', en: '' },
  description: { uz: '', ru: '', en: '' },
  photo_url: null,
  creation_date: null,
})

const tab = ref('uz')
const isOpen = ref(false)

const resetForm = () => {
  form.name = ''
  form.short_description = { uz: '', ru: '', en: '' }
  form.description = { uz: '', ru: '', en: '' }
  form.photo_url = null
  form.creation_date = null
  isOpen.value = false
}

const fetchStandard = async () => {
  try {
    loadingStandardId.value = true
    const res = await getStandardById(props.standardId)
    if (res.status) {
      form.name = res.data.name
      form.short_description = { uz: res.data.short_description_uz, ru: res.data.short_description_ru, en: res.data.short_description_en }
      form.description = { uz: res.data.description_uz, ru: res.data.description_ru, en: res.data.description_en }
      form.photo_url = res.data.photo_url
      form.creation_date = res.data.creation_date
    }
  } catch (error) {
    console.log(error)
  } finally {
    loadingStandardId.value = false
  }
}

const handleSubmitForm = async () => {
  try {
    loading.value = true
    const res = await editStandardById(props.standardId, {
      photo_url: 'https://www.iso.org/modules/iso-jahia-service-module/img/iso-standard-cover-thumbnail.png',
      name: form.name,
      description_uz: form.description.uz,
      description_ru: form.description.ru,
      description_en: form.description.en,
      short_description_uz: form.short_description.uz,
      short_description_ru: form.short_description.ru,
      short_description_en: form.short_description.en,
      creation_date: form.creation_date,
    })
    if (res.status) {
      showToast("Standard o'zgartirildi", 'success')
      resetForm()
      emit('edit-standard')
    }
  } catch (error) {
    showToast(error.response.data.message, 'error')
  } finally {
    loading.value = false
  }
}

watch(isOpen, (newVal) => {
  if (newVal) fetchStandard()
})
</script>

<template>
  <div>
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Edit3Icon class="cursor-pointer h-5 w-5" />
      </DialogTrigger>
      <DialogScrollContent class="p-6 max-w-[900px]">
        <DialogHeader>
          <DialogTitle> Standard qo'shish</DialogTitle>
        </DialogHeader>

        <template v-if="loadingStandardId">
          <div class="grid md:grid-cols-2 gap-3">
            <Skeleton class="h-10 w-full rounded-md" />
            <Skeleton class="h-10 w-full rounded-md" />
            <Skeleton class="h-10 w-full rounded-md" />
            <Skeleton class="h-10 w-full rounded-md" />
            <Skeleton class="h-10 w-full rounded-md" />
          </div>
        </template>
        <template v-else>
          <Tabs default-value="uz" v-model="tab">
            <TabsList class="inline-flex mb-6">
              <TabsTrigger value="uz"> O'zbekcha </TabsTrigger>
              <TabsTrigger value="ru"> Русский </TabsTrigger>
              <TabsTrigger value="en"> English </TabsTrigger>
            </TabsList>
            <TabsContent :value="lang" v-for="lang in languages" :key="lang" v-show="tab === lang">
              <VForm @submit="handleSubmitForm" v-slot="{ errors }">
                <div class="grid md:grid-cols-12 gap-5">
                  <div class="grid md:col-span-6 w-full items-center gap-1.5">
                    <VField name="name" rules="required" v-model="form.name">
                      <Label for="name">Sarlavha</Label>
                      <Input id="name" type="text" v-model="form.name" :error="errors?.name" />
                    </VField>
                  </div>
                  <div class="grid md:col-span-6 w-full items-center gap-1.5">
                    <VField name="creation_date" rules="required" v-model="form.creation_date">
                      <Label for="creation_date">Chop etilgan sana</Label>
                      <Input id="creation_date" type="number" v-model="form.creation_date" :error="errors?.creation_date" />
                    </VField>
                  </div>

                  <div class="grid md:col-span-6 w-full items-center gap-1.5">
                    <VField name="photo_url" rules="required" v-model="form.photo_url">
                      <Label for="photo_url">Rasm</Label>
                      <FileInput id="photo_url" v-model="form.photo_url" :error="errors?.photo_url || isMaxSize" :dashed="true" @error="isMaxSize = $event" />
                    </VField>
                  </div>
                  <div class="grid md:col-span-12 w-full items-center">
                    <VField :name="`short_description.${tab}`" rules="required" v-model="form.short_description[tab]">
                      <Label :for="`short_description.${tab}`" class="mb-1.5">Bu qisqa tavsif</Label>
                      <ClientOnly>
                        <QuillWrapper class="w-full word-break-break-word" contentType="html" theme="snow" v-model:content="form.short_description[tab]" placeholder="Matnni shu yerga yozing..." />
                      </ClientOnly>
                    </VField>
                  </div>
                  <div class="grid md:col-span-12 w-full items-center">
                    <VField :name="`description.${tab}`" rules="required" v-model="form.description[tab]">
                      <Label :for="`description.${tab}`" class="mb-1.5">Bu batafsil tavsif</Label>
                      <ClientOnly>
                        <QuillWrapper class="w-full word-break-break-word" contentType="html" theme="snow" v-model:content="form.description[tab]" placeholder="Matnni shu yerga yozing..." />
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
        </template>
      </DialogScrollContent>
    </Dialog>
  </div>
</template>
