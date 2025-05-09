<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOv36ytrOFrj6kEUYL_JOAqo-k2uRXYBFYg&s" alt="Image" width="150"  />
        </div>
  
        <!-- Title -->
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
  
        <!-- Form -->
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
          <div class="flex flex-col gap-1">
              <InputText name="email" type="text" placeholder="Username" fluid autocomplete="new-password" />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
          </div>
          <div class="flex flex-col gap-1">
              <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid autocomplete="new-password" />
              <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                  <ul class="my-0 px-4 flex flex-col gap-1">
                      <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
                  </ul>
              </Message>
          </div>
          <Button type="submit" severity="secondary" label="Log In" />
        </Form>
  
        <!-- Additional Links -->
        <div class="mt-4 text-center text-sm text-gray-600">
          <p>
            Don't have an account?
            <a href="/auth/register" class="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>
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
import { InputText, Password, Button, Message, Image } from 'primevue';
import { login } from '@/services/authService'; // Import the login service

const toast = useToast();
const router = useRouter(); // Initialize the router

const initialValues = ref({
    email: '',
    password: ''
});

const resolver = zodResolver(
    z.object({
        email: z.string().min(1, { message: 'email is required.' }),
        password: z
            .string()
            .min(1, { message: 'Password is required.' })
    })
);

const onFormSubmit = async (e) => {
    if (e.valid) {
        try {
            const result = await login(e.values.email, e.values.password);
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
