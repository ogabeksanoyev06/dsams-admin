<template>
  <div>
    <div class="grid gap-6">
      <div>
        <h3 class="mb-4 text-xl font-bold">Ma‘lumotlar</h3>
        <div class="mb-6 grid gap-6 md:grid-cols-12">
          <div class="grid gap-1.5 md:col-span-12">
            <Label for="company-name">Tashkilot nomi</Label>
            <Input id="company-name" v-model="application.data.company.name" placeholder="Tashkilot nomi" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-12">
            <Label for="company-yur-address">Yuridik manzil</Label>
            <Input id="company-yur-address" v-model="application.data.company.yur_address" placeholder="Yuridik manzil" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-12">
            <Label for="company-real-address">Haqiqiy manzil</Label>
            <Input id="company-real-address" v-model="application.data.company.real_address" placeholder="Haqiqiy manzil" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-phone-number">Telefon raqami</Label>
            <div class="relative w-full">
              <Input disabled id="company-phone-number" v-model="application.data.company.phone_number" placeholder="Telefon raqami" />
            </div>
          </div>

          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-inn">INN</Label>
            <Input id="company-inn" v-model="application.data.company.inn" placeholder="INN" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-email">Email</Label>
            <Input id="company-email" v-model="application.data.company.email" placeholder="Email" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-website">Vebsayt</Label>
            <Input id="company-website" v-model="application.data.company.website" placeholder="Vebsayt" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-mfo">MFO</Label>
            <Input id="company-mfo" v-model="application.data.company.mfo" placeholder="MFO" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-12">
            <Label for="company-bank-account">Bank raqami</Label>
            <Textarea id="company-bank-account" type="text" v-model="application.data.company.bank_account" placeholder="Bank raqami" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-12">
            <Label for="company-director">Tashkilot direktori F.I.Sh</Label>
            <Input id="company-director" v-model="application.data.company.director" placeholder="Tashkilot direktori F.I.Sh" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-12">
            <Label for="company-second-director">Biriktirilgan vakil F.I.SH va lavozimi</Label>
            <Input id="company-second-director" v-model="application.data.company.second_director" placeholder="Biriktirilgan vakil F.I.SH va lavozimi" disabled />
          </div>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-xl font-bold">Tashkilotning tuzilishi va faoliyati xodimlarining soni</h3>
        <div class="mb-6 grid gap-4 md:grid-cols-12">
          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-workers">Xodimlarning umumiy soni</Label>
            <Input id="company-workers" type="number" v-model="application.data.company.workers" placeholder="Xodimlarning umumiy soni" disabled />
          </div>
          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-t_workers">Vaqtinchalik ishchilar soni</Label>
            <Input id="company-t_workers" v-model="application.data.company.t_workers" placeholder="Vaqtinchalik ishchilar soni" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-employees-s_workers">Smenada ishlaydigan xodimlar soni</Label>
            <Input id="company-employees-s_workers" v-model="application.data.company.s_workers" placeholder="Smenada ishlaydigan xodimlar soni" disabled />
          </div>

          <div class="grid gap-1.5 md:col-span-6">
            <Label for="company-work-time">Standart ish vaqti (soat)</Label>
            <Input id="company-work-time" v-model="application.data.company.work_time" placeholder="Standart ish vaqti (soat)" disabled />
          </div>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-xl font-bold">Sektor</h3>
        <div class="mb-6 grid gap-4 md:grid-cols-12">
          <div class="grid gap-1.5 md:col-span-6">
            <Label for="sektor">Tanlangan sektor</Label>
            <Input id="sektor" type="text" v-model="application.data.sektor.name_uz" disabled />
          </div>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-xl font-bold">Ekspertlar</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> № </TableHead>
              <TableHead>Ekspert</TableHead>
              <TableHead>F.I.SH</TableHead>
              <TableHead>Telefon raqam</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>O'rtacha ball</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell> Bosh ekspert </TableCell>
              <TableCell> {{ application.data?.experts?.main?.id?.name + ' ' + application.data?.experts?.main?.id?.surname + ' ' + application.data?.experts?.main?.id?.father_name }} </TableCell>
              <TableCell> {{ application.data?.experts?.main?.id?.phone_number }} </TableCell>
              <TableCell> {{ application.data?.experts?.main?.id?.email }} </TableCell>
              <TableCell> {{ $dayjs(application.data.experts?.main?.id?.createdAt).format('DD.MM.YYYY HH:mm:ss') }} </TableCell>
              <TableCell class="text-right"> {{ averageScore(application.data.experts.main.rating) }} </TableCell>
            </TableRow>
            <TableRow v-for="(item, key) in application.data?.experts?.secondary" :key>
              <TableCell>{{ key + 2 }}</TableCell>
              <TableCell> Ekspert </TableCell>
              <TableCell> {{ item.id?.name + ' ' + item.id?.surname + ' ' + item.id?.father_name }} </TableCell>
              <TableCell> {{ item.id?.phone_number }} </TableCell>
              <TableCell> {{ item.id?.email }} </TableCell>
              <TableCell>{{ $dayjs(item.id?.createdAt).format('DD.MM.YYYY HH:mm:ss') }} </TableCell>
              <TableCell class="text-right">
                {{ averageScore(item.rating) }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 class="mb-4 text-xl font-bold">Savol va javoblar</h3>
        <div class="relative flex flex-col gap-2 overflow-hidden rounded-xl border border-border p-2 sm:p-4 mb-4" v-for="(item, i) in questionsWithAnswers" :class="{ 'shadow-sm shadow-orange-300': item.status }">
          <div class="mt-7 flex flex-col gap-2 sm:flex-row">
            <span class="flex-center h-7 w-7 flex-shrink-0 rounded-full bg-primary leading-normal text-xs font-semibold text-white">{{ i + 1 }}</span>
            <div class="question text-sm leading-6" v-html="item.description_uz" />
          </div>
          <a :href="item.answer_url" target="_blank" class="mt-2 text-sm"
            >Berilgan javob:
            <span v-if="item.answer_url" class="font-semibold text-blue-500">Ko'rish</span>
            <span v-else class="font-semibold text-destructive">Javob berilmagan</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApplicationsStore } from '@/stores/applications.js'

const applicationsStore = useApplicationsStore()

const { getApplicationById } = applicationsStore

const { questionsWithAnswers } = storeToRefs(applicationsStore)

const route = useRoute()

const averageScore = (list) => {
  if (!list || list.length === 0) return 'Ball kiritilmagan'
  const scores = list.map((item) => item.ball)
  const total = scores.reduce((acc, score) => acc + score, 0)
  const average = total / scores.length
  return parseFloat(average.toFixed(2))
}

const { data: application } = await useAsyncData('application-id', async () => {
  const response = await getApplicationById(route.params.id)

  const questions = response.data.standart?.questions || []
  const answers = response.data?.answers || []

  questionsWithAnswers.value = questions.map((question) => {
    const answer = answers?.find((ans) => ans.question_id === question._id)

    return {
      ...question,
      status: answer ? answer.status : false,
      ball: answer ? answer.ball : 0,
      answer_id: answer ? answer._id : null,
      answer_url: answer ? answer.answer_url : null,
    }
  })

  return response
})

const date = computed(() => {
  return (application.value?.data?.company?.date).format('DD.MM.YYYY')
})
</script>
