<script setup>
import ContactItem from "./ContactItem.vue";

defineProps({ contacts: Array });
const emit = defineEmits(["delete", "edit"]);
</script>

<template>
  <div v-if="contacts.length === 0" class="text-gray-500">
    Aucun contact
  </div>

  <div class="grid gap-4">
    <ContactItem
      v-for="contact in contacts"
      :key="contact.id"
      :contact="contact"
      @delete="emit('delete', contact.id)"
      @edit="emit('edit', contact)"
    />
  </div>
</template>
