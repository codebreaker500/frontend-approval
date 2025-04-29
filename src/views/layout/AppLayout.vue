<script setup>
import AppSidebar from './AppSidebar.vue'; // Import the new AppSidebar component
import Image from 'primevue/image';

</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-md p-4 flex justify-between items-center">
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOv36ytrOFrj6kEUYL_JOAqo-k2uRXYBFYg&s" alt="Image" width="150" />
      </header>

      <!-- Content -->
      <main class="flex-1 bg-gray-150 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling if required */
</style>