<template>
  <div>
    <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight mb-6">Sektor qo'shish</h1>
    <div class="flex justify-end mt-5">
      <ModalSectorCreate @create-sector="handleAddSector" />
    </div>
    <div class="border mt-10 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> #</TableHead>
            <TableHead> Sektor nomi </TableHead>
            <TableHead> Yaratilgan</TableHead>
            <TableHead>Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="font-medium">
          <TableRow v-for="(item, key) in sectors.data" class="odd:bg-gray-100">
            <TableCell>
              {{ key + 1 }}
            </TableCell>
            <NuxtLink :to="`/sectors/${item._id}`" class="text-blue-800">
              <TableCell>
                {{ item.name }}
              </TableCell>
            </NuxtLink>
            <TableCell>
              {{ $dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss') }}
            </TableCell>
            <TableCell class="flex items-center gap-2">
              <ModalSectorEdit :sectorId="item._id" @edit-sector="handleEditSector" />
              <ModalSectorDelete :sectorId="item._id" @delete-sector="handleDeleteSector" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { useSectorsStore } from '@/stores/sectors.js'

const sectorsStore = useSectorsStore()

const { getSectors } = sectorsStore

const { locale } = useI18n()

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
  data: sectors,
  refresh,
  pending,
} = await useAsyncData('sectors', async () => {
  return await getSectors({
    lang: locale.value,
    limit: itemsPerPage.value,
    page: currentPage.value,
  })
})
</script>
