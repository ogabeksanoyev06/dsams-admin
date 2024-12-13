<script setup>
import { reactive } from 'vue'
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

const form = reactive({
  title: { uz: '', ru: '', en: '' },
  description: { uz: '', ru: '', en: '' },
  content: { uz: '', ru: '', en: '' },
  image: { uz: null, ru: null, en: null },
})

const tab = ref('uz')
const isOpen = ref(false)

const resetForm = () => {
  form.title = { uz: '', ru: '', en: '' }
  form.description = { uz: '', ru: '', en: '' }
  form.image = { uz: null, ru: null, en: null }
  isOpen.value = false
}

const handleSubmitForm = async () => {}
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
          <VForm @submit="handleSubmitForm" v-slot="{ errors }">
            <div class="grid md:grid-cols-12 gap-5">
              <div class="grid md:col-span-12 w-full items-center gap-1.5">
                <VField :name="`title.${tab}`" rules="required" v-model="form.title[tab]">
                  <Label :for="`title.${tab}`">Sarlavha</Label>
                  <Input :id="`title.${tab}`" type="text" v-model="form.title[tab]" :error="errors?.[`title.${tab}`]" />
                </VField>
              </div>
              <div class="grid md:col-span-12 w-full items-center gap-1.5">
                <VField :name="`image.${tab}`" rules="required">
                  <Label :for="`image.${tab}`">Rasm</Label>
                  <FileInput :id="`image.${tab}`" v-model="form.image[tab]" :error="errors?.[`image.${tab}`] || isMaxSize" :dashed="true" @error="isMaxSize = $event" />
                </VField>
              </div>
              <div class="grid md:col-span-12 w-full items-center">
                <VField :name="`description.${tab}`" rules="required" v-model="form.description[tab]">
                  <Label :for="`description.${tab}`" class="mb-1.5">Tasnif</Label>
                  <ClientOnly>
                    <QuillWrapper class="w-full" contentType="html" theme="snow" v-model:content="form.content[tab]" placeholder="Matnni shu yerga yozing..." />
                  </ClientOnly>
                </VField>
              </div>
            </div>
            <div class="flex justify-end">
              <Button size="lg" :loa type="submit" class="mt-6">Saqlash</Button>
            </div>
          </VForm>
        </Tabs>
      </DialogContent>
    </Dialog>
  </div>
</template>
