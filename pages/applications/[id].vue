<template>
  <div>
    <div>
      <h3 class="mb-4 text-lg font-semibold">Ma‘lumotlar</h3>
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
      <h3 class="mb-4 text-lg font-semibold">Tashkilotning tuzilishi va faoliyati xodimlarining soni</h3>

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
  </div>
</template>

<script setup>
import { useApplicationsStore } from '@/stores/applications.js'

const applicationsStore = useApplicationsStore()

const { getApplicationById } = applicationsStore

const route = useRoute()

const { data: application } = await useAsyncData('application', async () => {
  return await getApplicationById(route.params.id)
})

const date = computed(() => {
  return (application.value?.data?.company?.date).format('DD.MM.YYYY')
})
</script>
