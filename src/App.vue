<script setup>
import { ref, onMounted } from "vue";
import ContactList from "./components/ContactList.vue";
import ContactForm from "./components/ContactForm.vue";
import { getContacts, addContact, updateContact, deleteContact } from "./services/api";

const contacts = ref([]);
const loading = ref(false);
const selectedContact = ref(null);

const fetchContacts = async () => {
  loading.value = true;
  const res = await getContacts();
  contacts.value = res.data;
  loading.value = false;
};

const handleAdd = async (contact) => {
  const res = await addContact(contact);
  contacts.value.push(res.data);
};

const handleDelete = async (id) => {
  if (!confirm("Supprimer ce contact ?")) return;
  await deleteContact(id);
  contacts.value = contacts.value.filter(c => c.id !== id);
};

const handleEdit = (contact) => {
  selectedContact.value = { ...contact };
};

const handleUpdate = async (contact) => {
  const res = await updateContact(contact.id, contact);
  const index = contacts.value.findIndex(c => c.id === contact.id);
  contacts.value[index] = res.data;
  selectedContact.value = null;
};

onMounted(fetchContacts);
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto space-y-6">

      <h1 class="text-3xl font-bold text-gray-800">
        Contacts Manager
      </h1>

      <div class="bg-white p-6 rounded-2xl shadow">
        <ContactForm
          :selected="selectedContact"
          @add="handleAdd"
          @update="handleUpdate"
          @cancel="selectedContact = null"
        />
      </div>

      <div class="bg-white p-6 rounded-2xl shadow">
        <p v-if="loading" class="text-gray-500">Chargement...</p>

        <ContactList
          :contacts="contacts"
          @delete="handleDelete"
          @edit="handleEdit"
        />
      </div>

    </div>
  </div>
</template>
