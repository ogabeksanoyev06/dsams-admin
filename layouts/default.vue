<script setup lang="ts">
import { Bot, BrickWall, ListChecks, LogOutIcon, Newspaper, School, User, UserCircle2 } from 'lucide-vue-next'

const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Getting Started',
      url: '#',
      items: [
        { title: 'Installation', url: '#' },
        { title: 'Project Structure', url: '#' },
      ],
    },
    {
      title: 'Building Your Application',
      url: '#',
      items: [
        { title: 'Routing', url: '#' },
        { title: 'Data Fetching', url: '#', isActive: true },
        { title: 'Rendering', url: '#' },
        { title: 'Caching', url: '#' },
        { title: 'Styling', url: '#' },
        { title: 'Optimizing', url: '#' },
        { title: 'Configuring', url: '#' },
        { title: 'Testing', url: '#' },
        { title: 'Authentication', url: '#' },
        { title: 'Deploying', url: '#' },
        { title: 'Upgrading', url: '#' },
        { title: 'Examples', url: '#' },
      ],
    },
    {
      title: 'API Reference',
      url: '#',
      items: [
        { title: 'Components', url: '#' },
        { title: 'File Conventions', url: '#' },
        { title: 'Functions', url: '#' },
        { title: 'next.config.js Options', url: '#' },
        { title: 'CLI', url: '#' },
        { title: 'Edge Runtime', url: '#' },
      ],
    },
    {
      title: 'Architecture',
      url: '#',
      items: [
        { title: 'Accessibility', url: '#' },
        { title: 'Fast Refresh', url: '#' },
        { title: 'Next.js Compiler', url: '#' },
        { title: 'Supported Browsers', url: '#' },
        { title: 'Turbopack', url: '#' },
      ],
    },
  ],
}
const open = ref(true)
</script>

<template>
  <SidebarProvider v-model:open="open">
    <Sidebar collapsible="icon" class="sidebar">
      <SidebarHeader class="p-0 px-2 backdrop-blur-lg border border-white/10 !bg-[#1F1F24] shadow-[0_6px_20px_0px_rgba(16,16,16,0.3)]">
        <SidebarMenu>
          <SidebarMenuItem class="h-16 flex items-center justify-between group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <NuxtLink to="/" class="block group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
              <img src="/assets/svg/logo.svg" alt="" />
            </NuxtLink>
            <button @click="open = !open" class="max-md:hidden group-has-[[data-collapsible=icon]]/sidebar-wrapper:rotate-180 transition-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.7071 6.70711C13.0976 6.31658 13.0976 5.68342 12.7071 5.29289C12.3166 4.90237 11.6834 4.90237 11.2929 5.29289L5.29289 11.2929C4.91431 11.6715 4.90107 12.2811 5.26285 12.6757L10.7628 18.6757C11.136 19.0828 11.7686 19.1103 12.1757 18.7372C12.5828 18.364 12.6103 17.7314 12.2372 17.3243L7.38414 12.0301L12.7071 6.70711Z"
                  fill="white"
                />
                <path
                  opacity="0.4"
                  d="M19.7071 6.70711C20.0976 6.31658 20.0976 5.68342 19.7071 5.29289C19.3166 4.90237 18.6834 4.90237 18.2929 5.29289L12.2929 11.2929C11.9143 11.6715 11.9011 12.2811 12.2628 12.6757L17.7628 18.6757C18.136 19.0828 18.7686 19.1103 19.1757 18.7372C19.5828 18.364 19.6103 17.7314 19.2372 17.3243L14.3841 12.0301L19.7071 6.70711Z"
                  fill="white"
                />
              </svg>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent class="bg-[#1F1F24] pt-2">
        <SidebarGroup>
          <!-- <SidebarGroupLabel>Menyular</SidebarGroupLabel> -->
          <SidebarGroupContent class="nav">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton as-child class="h-10 text-muted">
                  <NuxtLink to="/about" class="block">
                    <BrickWall />
                    Biz haqimizda
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton as-child class="h-10 text-muted">
                  <NuxtLink to="/blogs"> <Newspaper />Bloglar</NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton as-child class="h-10 text-muted">
                  <NuxtLink to="/sectors"> <School />Sektorlar</NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton as-child class="h-10 text-muted">
                  <NuxtLink to="/standards"> <School />Standardlar</NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton as-child class="h-10 text-muted">
                  <NuxtLink to="/applications"> <ListChecks />Arizalar</NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header class="flex h-16 px-4 z-40 shrink-0 sticky top-0 bg-white items-center gap-2 transition-[width,height] duration-300 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2">
          <SidebarTrigger class="-ml-1 max-md:block hidden" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink>
                  <NuxtLink to="/"> Bosh sahifa </NuxtLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Biz haqimizda</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="flex items-center justify-end flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Avatar class="cursor-pointer">
                <AvatarFallback>
                  <UserCircle2 />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" dir="ltr">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User class="mr-2 h-4 w-4" />
                  <span>Mening ma'lumotlarim</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="hover:!text-destructive hover:!bg-destructive/5 cursor-pointer">
                  <LogOutIcon class="mr-2 h-4 w-4" />
                  <span>Tizimdan chiqish</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div class="p-4 pt-4 bg-sidebar flex-1">
        <main class="container px-0">
          <slot />
        </main>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped>
.sidebar .nav .router-link-exact-active {
  @apply bg-sidebar-accent text-accent-foreground;
}
</style>
