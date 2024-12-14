<script setup>
import { reactive } from 'vue'
import { useStandardsStore } from '@/stores/standards.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { Edit3Icon } from 'lucide-vue-next'

const QuillWrapper = defineAsyncComponent({
  loader: async () => {
    const { QuillEditor } = await import('@vueup/vue-quill')
    return QuillEditor
  },
  ssr: false,
})

const emit = defineEmits(['edit-question'])

const props = defineProps({
  standardId: [String, Number],
})

const { showToast } = useCustomToast()

const standardsStore = useStandardsStore()

const { editStandardById, getStandardById } = standardsStore

const form = reactive({
  title: { uz: '', ru: '', en: '' },
  description: { uz: '', ru: '', en: '' },
})

const tab = ref('uz')
const isOpen = ref(false)

const loading = ref(false)
const loadingStandardId = ref(false)

const resetForm = () => {
  form.title = { uz: '', ru: '', en: '' }
  form.description = { uz: '', ru: '', en: '' }
  isOpen.value = false
}

const fetchStandard = async () => {
  try {
    loadingStandardId.value = true
    const res = await getStandardById(props.standardId)
    if (res.status) {
      form.title.uz = res.data.questions[0].title_uz
      form.title.ru = res.data.questions[0].title_ru
      form.title.en = res.data.questions[0].title_en
      form.description.uz = res.data.questions[0].description_uz
      form.description.ru = res.data.questions[0].description_ru
      form.description.en = res.data.questions[0].description_en
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
      questions: [
        {
          title_uz: form.title.uz,
          title_ru: form.title.ru,
          title_en: form.title.en,
          description_uz: form.description.uz,
          description_ru: form.description.ru,
          description_en: form.description.en,
        },
      ],
    })
    if (res.status) {
      showToast("Savol o'zgartirildi", 'success')
      resetForm()
      emit('edit-question')
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
      <DialogContent class="p-6 max-w-[600px]">
        <DialogHeader>
          <DialogTitle> Savol qo'shish</DialogTitle>
        </DialogHeader>
        <Transition name="fade" mode="out-in">
          <template v-if="loadingStandardId">
            <div class="grid gap-3">
              <Skeleton class="h-10 w-full rounded-md" />
              <Skeleton class="h-20 w-full rounded-md" />
            </div>
          </template>
          <template v-else>
            <Tabs default-value="uz" v-model="tab">
              <TabsList class="inline-flex mb-6">
                <TabsTrigger value="uz"> O'zbekcha </TabsTrigger>
                <TabsTrigger value="ru"> Русский </TabsTrigger>
                <TabsTrigger value="en"> English </TabsTrigger>
              </TabsList>
              <VForm @submit="handleSubmitForm" v-slot="{ errors }">
                <div class="grid md:grid-cols-12 gap-5">
                  <div class="grid md:col-span-12 w-full items-center gap-1.5">
                    <VField :name="`title.${tab}`" rules="required" v-model="form.title[tab]">
                      <Label :for="`title.${tab}`">Sarlavha</Label>
                      <Input :id="`title.${tab}`" type="text" v-model="form.title[tab]" :error="errors?.[`title.${tab}`]" />
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
                  <Button size="lg" type="submit" class="mt-6" :loading="loading">Saqlash</Button>
                </div>
              </VForm>
            </Tabs>
          </template>
        </Transition>
      </DialogContent>
    </Dialog>
  </div>
</template>
