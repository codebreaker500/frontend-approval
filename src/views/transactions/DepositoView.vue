
<template>
    <div>
        <Panel>
            <div class="flex justify-end mb-4">
                <Button size="small" label="New Deposito" icon="pi pi-plus" class="mr-2" @click="openNew" />
            </div>
            <DataTable :value="deposito" size="small" showGridlines 
            tableStyle="min-width: 50rem" >
                <Column field="placementDate" header="Date">
                    <template #body="{ data, field }">
                        {{ formatDateTime(data[field]) }}
                    </template>
                </Column>
                <Column field="placementNominal" header="Nominal"  style="width: 20%">
                    <template #body="{ data, field }">
                        {{ formatCurrency(data[field]) }}
                    </template>
                </Column>
                <Column field="tenor" header="Tenor"></Column>
                <Column field="rate" header="Rate"></Column>
                <Column field="status" header="Status"></Column>
            </DataTable>
        </Panel>

        <Dialog v-model:visible="depositoDialog" :style="{ width: '450px' }" header="New Balance Deposito" :modal="true">
            <div class="flex flex-col gap-6">
                <Form v-slot="$form" :resolver="resolver" :initialValues="deposito" @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
                    <div class="flex flex-col mt-2">
                        <FloatLabel variant="on">
                            <InputNumber name="placementNominal" fluid inputId="on_deposito" mode="currency" currency="IDR" locale="id-ID" />
                            <label for="on_deposito">Nominal Deposito</label>
                        </FloatLabel>
                        <Message v-if="$form.placementNominal?.invalid" severity="error" size="small" variant="simple">{{ $form.placementNominal.error?.message }}</Message>
                    </div>
                    <div class="flex flex-col mt-2">
                        <FloatLabel variant="on">
                            <InputNumber name="tenor" fluid inputId="on_tenor" />
                            <label for="on_tenor">Tenor Deposito</label>
                        </FloatLabel>
                        <Message v-if="$form.tenor?.invalid" severity="error" size="small" variant="simple">{{ $form.tenor.error?.message }}</Message>
                    </div>
                    <div class="flex flex-col mt-2">
                        <FloatLabel variant="on">
                            <InputNumber name="rate" fluid inputId="on_rate" />
                            <label for="on_rate">Rate Deposito</label>
                        </FloatLabel>
                        <Message v-if="$form.rate?.invalid" severity="error" size="small" variant="simple">{{ $form.rate.error?.message }}</Message>
                    </div>
                    <Button type="submit" severity="secondary" label="Submit" />
                </Form>

            </div>
        </Dialog>

	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { Form } from '@primevue/forms';
import { FloatLabel, Message, Dialog, DataTable, Button, Column, InputNumber, Panel } from 'primevue';
import { getDepositoUser, createNewDeposito } from '@/services/depositoService';
import { formatCurrency, formatDateTime } from '@/utlis/GlobalHelper';
const toast = useToast();
const depositoDialog = ref(false);
const product = ref({});
const submitted = ref(false);
const deposito = ref({
    placementNominal: 5,
    tenor: 3,
    rate: 2
});

onMounted(async () => {
    try {
        await getListDeposito();
    } catch (error) {
        console.error("Failed to fetch Deposito:", error);
    }
});

const getListDeposito = async () => {
    try {
        const fetched = await getDepositoUser();
        deposito.value = fetched.depositos;
    } catch (error) {
        console.error("Failed to fetch Deposito:", error);
    }
};

const resolver = ref(zodResolver(
    z.object({
        placementNominal: z.union([z.number().gt(10000, { message: 'Must be greater than 10,000.' }), z.literal(null)])
        .refine((val) => val !== null, { message: 'Nominal balance is required' }),
        tenor: z.union([z.number().gt(2, { message: 'Must be greater than 2.' }), z.literal(null)])
        .refine((val) => val !== null, { message: 'Tenor is required' }),
        rate: z.union([z.number(), z.literal(null)])
        .refine((val) => val !== null, { message: 'Tenor is required' })
    })
));

const onFormSubmit = async (e) => {
    const { values, valid } = e;
    if (valid) {
        try {
            await createNewDeposito(values.placementNominal, values.tenor, values.rate);
            toast.add({ severity: 'success', summary: 'Successfully added a new deposito', detail: 'Your deposito has been added successfully.', life: 3000 });
            depositoDialog.value = false;
            await getListDeposito();
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Failed added a new deposito', detail: error.message || 'An error occurred.', life: 3000 });
        }
    }
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    depositoDialog.value = true;
};

</script>
