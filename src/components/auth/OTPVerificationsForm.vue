<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOv36ytrOFrj6kEUYL_JOAqo-k2uRXYBFYg&s" alt="Image" width="150"  />
        </div>
  
        <!-- Title -->
         <div class="flex flex-col items-center gap-x-2">
            <div class="font-bold text-xl">Authenticate Your Account</div>
            <p class="text-surface-500 dark:text-surface-400 block mb-8">Please enter the code sent to your phone.</p>
         </div>
        
  
        <!-- Form -->
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
          <div class="flex flex-col gap-1 items-center">
               <InputOtp name="passcode" size="large" integerOnly />
          </div>
            <div class="flex justify-between mt-8 self-stretch">
                <Button label="Resend Code" link class="p-0"></Button>
                <Button label="Submit Code"></Button>
            </div>
        </Form>
  
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Form } from '@primevue/forms';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router'; // Import useRouter
import { InputOtp, Button, Image } from 'primevue';
import { login } from '@/services/authService'; // Import the login service

const toast = useToast();
const router = useRouter(); // Initialize the router

const initialValues = ref({
    passcode: ''
});

const resolver = zodResolver(
    z.object({
        passcode: z.string().min(1, { passcode: 'email is required.' })
    })
);

const onFormSubmit = async (e) => {
    if (e.valid) {
        try {
            const result = await login(e.values.email, e.values.passcode);
            localStorage.setItem('jwtToken', result.token);
            toast.add({ severity: 'success', summary: 'Login successful!', detail: 'You are now logged in.', life: 3000 });
            router.push({ name: 'dashboard' }); 
        } catch (error) {
            console.error('Login failed:', error);
            toast.add({ severity: 'error', summary: 'Login failed', detail: error.message || 'An error occurred.', life: 3000 });
        }
    }
};
</script>

<style>
.custom-otp-input {
    width: 48px;
    height: 48px;
    font-size: 24px;
    appearance: none;
    text-align: center;
    transition: all 0.2s;
    border-radius: 0;
    border: 1px solid var(--p-inputtext-border-color);
    background: transparent;
    outline-offset: -2px;
    outline-color: transparent;
    border-right: 0 none;
    transition: outline-color 0.3s;
    color: var(--p-inputtext-color);
}

.custom-otp-input:focus {
    outline: 2px solid var(--p-focus-ring-color);
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right-width: 1px;
    border-right-style: solid;
    border-color: var(--p-inputtext-border-color);
}
</style>