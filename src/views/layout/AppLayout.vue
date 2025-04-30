<script setup>
import AppSidebar from './AppSidebar.vue'; // Import the new AppSidebar component
import Image from 'primevue/image';

</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <AppSidebar />
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-md p-4 flex justify-between items-center" style="margin-left: 250px;">
        <div class="flex items-center space-x-4">
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOv36ytrOFrj6kEUYL_JOAqo-k2uRXYBFYg&s" alt="Image" width="150" />
        </div>
      </header>
      <main class="flex-1 bg-gray-100 p-6 overflow-y-auto" style="margin-left: 250px;">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling if required */
</style>