
<template>
    <div class="card flex justify-center">
        <Menu :model="items" class="w-full md:w-60">
            <template #submenulabel="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="item.route && (!item.role || item.role.includes(profile.role))" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else-if="!item.route && (!item.role || item.role.includes(profile.role))" v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                </a>
            </template>
            <template #end>
                <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
                    <span class="inline-flex flex-col items-start">
                        <span class="font-bold">{{ profile.name }}</span>
                        <span class="text-sm">{{ profile.role }}</span>
                    </span>
                </button>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { Menu, Skeleton } from 'primevue';
import { getUserProfile } from "@/services/authService";
import { useRouter } from 'vue-router';
const router = useRouter();

const profile = ref({
    name: 'User',
    role: 'Role'
});

const items = ref([
    {
        label: 'Dashboard', 
        role : ['DEALER'],
        icon : 'pi pi-fw pi-home',
        route: '/',
    },
    {
        label: 'Transactions',
        items: [
            {
                label: 'Deposito',
                role : ['DEALER'],
                route: '/transactions/deposito',
                icon: 'pi pi-money-bill',
            },
            {
                label: 'Approval',
                role : ['SETTLEMENT_ARRANGER'],
                icon: 'pi pi-cog',
            },
            {
                label: 'Tracking Request',
                icon: 'pi pi-search',
                role : ['DEALER', 'SETTLEMENT_ARRANGER'],
            },
            {
                label: 'Settlement',
                role : ['SETTLEMENT_ARRANGER'],
                icon: 'pi pi-arrow-up-right-and-arrow-down-left-from-center',
            }
        ]
    },
    {
        label: 'User',
        items: [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
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

onBeforeMount(async () => {
    try {
        const fetchedProfile = await getUserProfile();
        profile.value = fetchedProfile.profile;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
    }
});
</script>
