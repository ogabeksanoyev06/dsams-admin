<template>
  <div>
    <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight mb-6">Standard qo'shish</h1>
    <div class="flex justify-end mt-5">
      <ModalStandardCreate @create-standard="handleAddStandard" />
    </div>
    <div class="border mt-10 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> #</TableHead>
            <TableHead> Standard nomi </TableHead>
            <TableHead> Yaratilgan</TableHead>
            <TableHead>Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="font-medium">
          <TableRow v-for="(item, key) in standards.data" class="odd:bg-gray-100">
            <TableCell>
              {{ key + 1 }}
            </TableCell>
            <NuxtLink :to="`/standards/${item._id}`" class="text-blue-800">
              <TableCell>
                {{ item.name }}
              </TableCell>
            </NuxtLink>
            <TableCell>
              {{ $dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss') }}
            </TableCell>
            <TableCell class="flex items-center gap-2">
              <ModalStandardEdit :standardId="item._id" @edit-standard="handleEditStandard" />
              <ModalStandardDelete :standardId="item._id" @delete-standard="handleDeleteStandard" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { useStandardsStore } from '@/stores/standards.js'

const standardsStore = useStandardsStore()

const { getStandards } = standardsStore

const { locale } = useI18n()

const itemsPerPage = ref(20)
const currentPage = ref(1)
const totalPages = ref(2)

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleAddStandard = async () => {
  refresh()
}

const handleDeleteStandard = async () => {
  refresh()
}

const handleEditStandard = async () => {
  refresh()
}

const {
  data: standards,
  refresh,
  pending,
} = await useAsyncData('standards', async () => {
  return await getStandards({
    lang: locale.value,
    limit: itemsPerPage.value,
    page: currentPage.value,
  })
})
</script>
