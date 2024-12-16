<template>
  <div>
    <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight">Standard savollarini qo'shish</h1>
    <p class="font-medium text-base md:text-lg mb-6">{{ data.data.name }}</p>
    <div class="flex justify-end mt-5">
      <ModalQuestionCreate :standard-id="route.params.id" @create-question="handleAddQuestion" />
    </div>
    <div class="border mt-10 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> #</TableHead>
            <TableHead> Savol nomi </TableHead>
            <TableHead> Savol tavsifi</TableHead>
            <TableHead> Yaratilgan</TableHead>
            <TableHead>Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="font-medium">
          <TableRow v-for="(item, key) in data.data?.questions" :key class="odd:bg-gray-100">
            <TableCell>
              {{ key + 1 }}
            </TableCell>
            <TableCell>
              {{ item.title }}
            </TableCell>
            <TableCell>
              <div v-html="item.description" />
            </TableCell>
            <TableCell>
              {{ $dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss') }}
            </TableCell>
            <TableCell class="flex items-center gap-2">
              <ModalQuestionEdit :standardId="route.params.id" :keyQuestion="key" :questionId="item._id" @edit-question="handleEditQuestion" />
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

const { getStandardById } = standardsStore

const { locale } = useI18n()

const route = useRoute()

const handleAddQuestion = async () => {
  await refresh()
}

const handleEditQuestion = async () => {
  await refresh()
}

const { data, refresh, pending } = await useAsyncData('standards-by-id', async () => {
  return await getStandardById(route.params.id, { lang: locale.value })
})
</script>
