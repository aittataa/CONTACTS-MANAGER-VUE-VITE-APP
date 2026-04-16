<script setup>
defineProps({ contact: Object });
const emit = defineEmits(["delete", "edit"]);
</script>

<template>
  <div class="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition">

    <div>
      <p class="font-semibold text-gray-800">
        {{ contact.name }}
      </p>
      <p class="text-sm text-gray-500">
        {{ contact.email }}
      </p>
      <p class="text-sm text-gray-500">
        {{ contact.phone }}
      </p>
    </div>

    <div class="flex gap-2">
      <button
        @click="emit('edit')"
        class="btn-warning">
        Modifier
      </button>

      <button
        @click="emit('delete')"
        class="btn-danger">
        Supprimer
      </button>
    </div>

  </div>
</template>
