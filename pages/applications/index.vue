<template>
  <div class="">
    <h1 class="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight mb-6">Arizalar ro'yxati</h1>
    <div class="flex border p-2">
      <Button variant="outline">
        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="retweet" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path
            d="M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0011.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 00-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 00-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"
          ></path>
        </svg>
        Yangilash
      </Button>
      <div class="flex items-center justify-end flex-1 gap-2">
        <Button disabled class="hover:border-green-600 !text-green-600 hover:bg-green-600/5" variant="outline">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="file-excel" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path
              d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM514.1 580.1l-61.8-102.4c-2.2-3.6-6.1-5.8-10.3-5.8h-38.4c-2.3 0-4.5.6-6.4 1.9-5.6 3.5-7.3 10.9-3.7 16.6l82.3 130.4-83.4 132.8a12.04 12.04 0 0010.2 18.4h34.5c4.2 0 8-2.2 10.2-5.7L510 664.8l62.3 101.4c2.2 3.6 6.1 5.7 10.2 5.7H620c2.3 0 4.5-.7 6.5-1.9 5.6-3.6 7.2-11 3.6-16.6l-84-130.4 85.3-132.5a12.04 12.04 0 00-10.1-18.5h-35.7c-4.2 0-8.1 2.2-10.3 5.8l-61.2 102.3z"
            ></path>
          </svg>
          Excelga
        </Button>
      </div>
    </div>
    <Table>
      <TableCaption>Arizalaringiz ro'yxati</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[50px]"> № </TableHead>
          <TableHead>Kompaniya nomi</TableHead>
          <TableHead>Direktor</TableHead>
          <TableHead>Telefon raqam</TableHead>
          <TableHead>Manzil</TableHead>
          <TableHead>Yuborilgan sana</TableHead>
          <TableHead>Ko'rib chiqish muddati</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Amallar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, i) in applications.data" :key="item._id" class="odd:bg-accent">
          <TableCell>{{ i + 1 }}</TableCell>
          <TableCell class="whitespace-nowrap">{{ item.company.name }}</TableCell>
          <TableCell class="whitespace-nowrap">{{ item.company.director }}</TableCell>
          <TableCell>{{ item.company.phone_number }}</TableCell>
          <TableCell>{{ item.company.yur_address }}</TableCell>
          <TableCell class="whitespace-nowrap">
            {{ $dayjs(item.company.date).format('DD.MM.YYYY HH:mm:ss') }}
          </TableCell>
          <TableCell>
            {{ $dayjs(item.date).format('DD.MM.YYYY HH:mm:ss') }}
          </TableCell>
          <TableCell>
            <span :class="getStatusClass(item.status)">
              {{ getStatusText(item.status) }}
            </span>
          </TableCell>
          <TableCell class="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-9 h-9">
                  <EllipsisIcon class="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56" align="end">
                <DropdownMenuLabel>Kerakli amalni bajaring</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NuxtLink :to="`/applications/${item._id}`" class="flex items-center gap-1">
                    <EyeIcon class="size-4" />
                    Batafsil
                  </NuxtLink>
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer" @click="handleAccept(item._id)">
                  <CheckCircleIcon class="size-4 text-green-500" />
                  Qabul qilish
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer" @click="handleDecline(item._id)">
                  <CrossIcon class="size-4 text-destructive" />
                  Bekor qilish
                </DropdownMenuItem>
                <DropdownMenuItem class="cursor-pointer" @click="handleFinish(item._id)">
                  <ClipboardCheckIcon class="size-4 text-blue-500" />
                  Yakunlash
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex items-center justify-end mt-4">
      <Pagination :disabled="pending" v-slot="{ page }" :total="totalPages * 10" :page-size="itemsPerPage" :sibling-count="1" show-edges :default-page="1" @update:page="handlePageChange">
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
    </div>
  </div>
</template>

<script setup>
import { useApplicationsStore } from '@/stores/applications.js'
import { CheckCircleIcon, ClipboardCheckIcon, CrossIcon, EllipsisIcon, Eye, EyeIcon, Search } from 'lucide-vue-next'
import { useCustomToast } from '@/composables/useCustomToast.js'

const { showToast } = useCustomToast()

const applicationsStore = useApplicationsStore()

const { getApplications, cancelApplication, approveApplication, completeApplication } = applicationsStore

const data = [
  {
    company: {
      name: 'Tech Innovations LLC',
      director: 'John Doe',
      phone_number: '+998901234567',
      yur_address: '123 Business Rd, Suite 100, Tech City, TC 12345',
      date: 20241113,
    },
    status: 0,
    _id: 5,
  },
  {
    company: {
      name: 'Tech Innovations LLC',
      director: 'John Doe',
      phone_number: '+998901234567',
      yur_address: '123 Business Rd, Suite 100, Tech City, TC 12345',
      date: 20241113,
    },
    status: 0,
    _id: 5,
  },
]

const itemsPerPage = ref(15)
const currentPage = ref(1)
const totalPages = ref(10)
const totalItems = ref(0)

const getStatusClass = (status) => {
  switch (status) {
    case 0:
      return 'text-red-500'
    case 1:
      return 'text-yellow-500'
    case 2:
      return 'text-blue-500'
    case 3:
      return 'text-green-500'
    case -1:
      return 'text-gray-500'
    default:
      return ''
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Kutilmoqda'
    case 1:
      return 'Tasdiqlangan'
    case 2:
      return 'Ekspert tasdiqlash'
    case 3:
      return 'Yakunlangan'
    case -1:
      return 'Bekor qilingan'
    default:
      return ''
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleAccept = async (id) => {
  await approveApplication(id)
  showToast('Muvaffaqiyatli qabul qilindi', 'success')
  refresh()
}

const handleDecline = async (id) => {
  await cancelApplication(id)
  showToast('Muvaffaqiyatli bekor qilindi', 'success')
  refresh()
}

const handleFinish = async (id) => {
  await completeApplication(id)
  showToast('Muvaffaqiyatli yakunlandi', 'success')
  refresh()
}

const {
  data: applications,
  refresh,
  pending,
} = await useAsyncData(
  'applications',
  async () => {
    return await getApplications({
      lang: 'uz',
      limit: itemsPerPage.value,
      page: currentPage.value,
    })
  },
  { watch: [currentPage] }
)
if (applications.value) totalPages.value = applications.value._meta.totalPages
</script>
