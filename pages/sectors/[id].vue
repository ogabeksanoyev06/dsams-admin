<template>
  <div>
    <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight">Bo'limlar</h1>
    <p class="font-medium text-base md:text-lg mb-6">{{ sections?.data[0]?.name }}</p>
    <div class="flex justify-end mt-5">
      <ModalSectionCreate @create-section="handleAddSector" :sector-id="route.params.id" />
    </div>
    <div class="border mt-10 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> #</TableHead>
            <TableHead> Bo'lim nomi </TableHead>
            <TableHead> Yaratilgan</TableHead>
            <TableHead>Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="font-medium">
          <TableRow v-for="(item, key) in sections.data" class="odd:bg-gray-100">
            <TableCell>
              {{ key + 1 }}
            </TableCell>
            <TableCell>
              {{ item.name }}
            </TableCell>
            <TableCell>
              {{ $dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss') }}
            </TableCell>
            <TableCell class="flex items-center gap-2">
              <ModalSectionEdit :sectionId="item._id" @edit-section="handleEditSector" />
              <ModalSectionDelete :sectionId="item._id" :sectorId="route.params.id" @delete-section="handleDeleteSector" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { useSectionsStore } from '@/stores/section.js'
import { useSectorsStore } from '@/stores/sectors.js'

const sectionStore = useSectionsStore()
const sectorsStore = useSectorsStore()

const { getSections, getSectionById } = sectionStore
const { getSectorById } = sectorsStore

const { locale } = useI18n()
const route = useRoute()

const itemsPerPage = ref(20)
const currentPage = ref(1)
const totalPages = ref(2)

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleAddSector = async () => {
  refresh()
}

const handleDeleteSector = async () => {
  refresh()
}

const handleEditSector = async () => {
  refresh()
}

const {
  data: sections,
  refresh,
  pending,
} = await useAsyncData('sector-by-id', async () => {
  return await getSections({
    lang: locale.value,
    'filter[sektor]': route.params.id,
  })
})
</script>
