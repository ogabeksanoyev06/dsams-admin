<template>
  <div class="overflow-x-hidden">
    <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight mb-6">Bloglar</h1>
    <div class="flex justify-end mt-5">
      <ModalBlogCreate @create-blog="handleAddBlog" />
    </div>
    <div>
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 sm:mt-10">
        <template v-if="pending">
          <CardBlogLoading v-for="key in 4" :key />
        </template>
        <template v-else>
          <CardBlog v-for="(item, key) in blogs.data" :key :item @edit-blog="handleEditBlog" @delete-blog="handleDeleteBlog" />
        </template>
      </section>
      <!-- <div class="flex justify-end mt-6">
        <Pagination v-slot="{ page }" :total="totalPages * 10" :page-size="limit" :sibling-count="1" show-edges :default-page="1" @update:page="handlePageChange">
          <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <template v-for="(item, index) in items">
              <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                <Button class="w-9 h-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>
          </PaginationList>
        </Pagination>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { useBlogsStore } from '@/stores/blogs.js'
import { useCustomToast } from '@/composables/useCustomToast.js'
import { Calendar } from 'lucide-vue-next'

const blogsStore = useBlogsStore()

const { getBlogs, createBlog } = blogsStore

const { showToast } = useCustomToast()
const { locale } = useI18n()

const itemsPerPage = ref(10)
const currentPage = ref(1)
const totalItems = ref(0)
const totalPages = ref(0)

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleAddBlog = async () => {
  refresh()
}

const handleDeleteBlog = async () => {
  refresh()
}

const handleEditBlog = async () => {
  refresh()
}

const {
  data: blogs,
  refresh,
  pending,
} = await useAsyncData('blogs', async () => {
  return await getBlogs({
    page: currentPage.value,
    limit: itemsPerPage.value,
    locale: locale.value,
  })
})
</script>
