<script setup>
import { ref } from 'vue';
import { Card, DataTable, Column, Textarea, Button } from 'primevue';
import { useToast } from 'primevue/usetoast';

// Initialize Toast for notifications
const toast = useToast();

// Reactive state
const users = ref([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
]);
const selectedUser = ref(null);
const messages = ref([]);
const newMessage = ref('');

// Method to handle user selection
const onUserSelect = (event) => {
    selectedUser.value = event.data;
    messages.value = []; // Reset messages for the selected user
    toast.add({ severity: 'info', summary: 'User Selected', detail: `You are now chatting with ${selectedUser.value.name}`, life: 3000 });
};

// Method to send a message
const sendMessage = () => {
    if (newMessage.value.trim()) {
        messages.value.push(newMessage.value.trim());
        newMessage.value = ''; // Clear the input field
        toast.add({ severity: 'success', summary: 'Message Sent', detail: 'Your message has been sent.', life: 3000 });
    } else {
        toast.add({ severity: 'warn', summary: 'Empty Message', detail: 'Please type a message before sending.', life: 3000 });
    }
};
</script>

<template>
  <div class="chat-container">
    <!-- User List Column -->
    <div class="user-list">
      <DataTable :value="users" selectionMode="single" @row-select="onUserSelect">
        <Column field="name" header="Users"></Column>
      </DataTable>
    </div>

    <!-- Chat Room Column -->
    <div class="chat-room">
      <Card>
        <template #title>
          <h2>{{ selectedUser ? selectedUser.name : "Select a user" }}</h2>
        </template>
        <div class="chat-messages">
          <div v-for="(message, index) in messages" :key="index" class="chat-message">
            <span>{{ message }}</span>
          </div>
        </div>
        <div class="chat-input">
          <Textarea v-model="newMessage" placeholder="Type a message..." rows="3" />
          <Button label="Send" @click="sendMessage" :disabled="!newMessage" />
        </div>
      </Card>
    </div>
  </div>
</template>

<style>
.chat-container {
  display: flex;
  height: 100vh;
}

.user-list {
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 1rem;
  overflow-y: auto;
}

.chat-room {
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.chat-message {
  background: #f1f1f1;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
}

.chat-input {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>