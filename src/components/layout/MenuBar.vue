
<template>
    <div class="card flex justify-center">
        <Menu :model="items" class="w-full md:w-60">
            
            <template #submenulabel="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
            <template #end>
                <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                    <span class="inline-flex flex-col items-start">
                        <span class="font-bold">Amy Elsner</span>
                        <span class="text-sm">Admin</span>
                    </span>
                </button>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref([
    {
        label: 'Dashboard',
        items: [
            {
                label: 'Approval',
                icon: 'pi pi-cog',
                shortcut: '⌘+O'
            }
        ]
    },
    {
        separator: true
    },
    {
        label: 'Transactions',
        items: [
            {
                label: 'Deposito',
                icon: 'pi pi-plus',
                shortcut: '⌘+N'
            },
            {
                label: 'Tracking Request',
                icon: 'pi pi-search',
                shortcut: '⌘+S'
            }
        ]
    },
    {
        label: 'User',
        items: [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                shortcut: '⌘+Q',
                command: () => {
                    localStorage.clear();
                    router.push('/auth/login');
                }
            }
        ]
    },
    {
        separator: true
    }
]);
</script>
