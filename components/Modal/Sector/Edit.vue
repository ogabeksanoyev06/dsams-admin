<script setup>
import { reactive } from 'vue'
import { Edit3Icon } from 'lucide-vue-next'
import { useSectorsStore } from '@/stores/sectors.js'
import { useCustomToast } from '@/composables/useCustomToast.js'

const emit = defineEmits(['edit-sector'])

const props = defineProps({
  sectorId: [String, Number],
})

const { locale } = useI18n()

const { showToast } = useCustomToast()

const sectorsStore = useSectorsStore()

const { editSectorById, getSectorById } = sectorsStore

const languages = ['uz', 'ru', 'en']

const loadingSectorId = ref(false)
const loading = ref(false)

const form = reactive({
  title: { uz: '', ru: '', en: '' },
})

const tab = ref('uz')
const isOpen = ref(false)

const resetForm = () => {
  form.title = { uz: '', ru: '', en: '' }
  isOpen.value = false
}

const fetchSectorById = async () => {
  try {
    loadingSectorId.value = true
    const response = await getSectorById(props.sectorId)
    form.title = { uz: response.data.name_uz, ru: response.data.name_ru, en: response.data.name_en }
  } catch (error) {
    console.error(error)
  } finally {
    loadingSectorId.value = false
  }
}

const handleSubmitForm = async () => {
  try {
    loading.value = true
    const res = await editSectorById(props.sectorId, {
      name_uz: form.title.uz,
      name_ru: form.title.ru,
      name_en: form.title.en,
    })
    if (res.status) {
      showToast('Muvaffaqiyatli saqlandi', 'success')
      resetForm()
      emit('edit-sector')
    }
  } catch (error) {
    console.log(error)
    showToast(error.response.data.message, 'error')
  } finally {
    loading.value = false
  }
}

watch(isOpen, (newVal) => {
  if (newVal) fetchSectorById()
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
          <DialogTitle> Sektorni tahrirlash</DialogTitle>
        </DialogHeader>
        <Transition name="fade" mode="out-in">
          <template v-if="loadingSectorId">
            <div class="grid gap-2">
              <Skeleton class="h-10 w-full rounded-md" />
              <Skeleton class="h-10 w-3/4 rounded-md" />
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
                    <div class="grid md:col-span-12 w-full items-center gap-1.5">
                      <VField :name="`title.${tab}`" rules="required" v-model="form.title[tab]">
                        <Label :for="`title.${tab}`">Sarlavha</Label>
                        <Input :id="`title.${tab}`" type="text" v-model="form.title[tab]" :error="errors?.[`title.${tab}`]" />
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
        </Transition>
      </DialogContent>
    </Dialog>
  </div>
</template>
