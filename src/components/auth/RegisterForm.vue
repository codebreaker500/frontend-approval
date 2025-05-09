<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSOv36ytrOFrj6kEUYL_JOAqo-k2uRXYBFYg&s" alt="Image" width="150"  />
        </div>
  
        <!-- Title -->
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
  
        <!-- Form -->
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
            <div class="flex flex-col gap-1">
                <InputGroup>
                    <InputText name="nik" type="text" placeholder="Nomor Induk Kependudukan" fluid />
                    <InputGroupAddon>
                        <Button icon="pi pi-search" severity="secondary" variant="text" />
                    </InputGroupAddon>
                </InputGroup>
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
            </div>
          <div class="flex flex-col gap-1">
              <InputText name="email" type="text" placeholder="Email" fluid />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
          </div>
          <div class="flex flex-col gap-1">
              <InputText name="name" type="text" placeholder="Nama Lengkap" fluid />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
          </div>
          <div class="flex flex-col gap-1">
              <InputMask id="phoneNumber" name="phoneNumber" mask="(628) 99-9999-9999" placeholder="(628) 99-9999-9999" fluid />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
          </div>
          <div class="flex flex-col gap-1">
              <Textarea name="address" type="text" placeholder="Alamat Lengkap" fluid rows="3" cols="30" />
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
          </div>
          
          <Button type="submit" icon="pi pi-users" severity="secondary" label="Register" />
          <Button as="a" label="Login" icon="pi pi-lock-open" href="https://vuejs.org/" target="_blank" rel="noopener" />
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
import { useRouter } from 'vue-router'; 
import { InputText, Button, Message, Image, Textarea, InputGroup, InputGroupAddon, InputMask  } from 'primevue';
import { login } from '@/services/authService'; 

const toast = useToast();
const router = useRouter(); 

const initialValues = ref({
    email: '',
    nik: '',
    address: '',
    nikStatus: false,
    phoneNumber: '',
    name: ''
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
            toast.add({ severity: 'success', summary: 'Login successful!', detail: 'You are now logged in.', life: 3000 });
            router.push({ name: 'dashboard' }); 
        } catch (error) {
            console.error('Login failed:', error);
            toast.add({ severity: 'error', summary: 'Login failed', detail: error.message || 'An error occurred.', life: 3000 });
        }
    }
};
</script>
