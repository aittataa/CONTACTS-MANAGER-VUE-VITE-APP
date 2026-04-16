<script setup>
import { ref, watch } from "vue";

const props = defineProps({ selected: Object });
const emit = defineEmits(["add", "update", "cancel"]);

const form = ref({
  name: "",
  email: "",
  phone: ""
});

watch(() => props.selected, (val) => {
  if (val) form.value = { ...val };
});

const submit = () => {
  if (!form.value.name || !form.value.email || !form.value.phone) {
    alert("Tous les champs sont obligatoires");
    return;
  }

  if (props.selected) {
    emit("update", form.value);
  } else {
    emit("add", form.value);
    form.value = { name: "", email: "", phone: "" };
  }
};
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4">

    <div class="grid md:grid-cols-3 gap-4">
      <input v-model="form.name" placeholder="Nom"
        class="input" />

      <input v-model="form.email" placeholder="Email"
        class="input" />

      <input v-model="form.phone" placeholder="Téléphone"
        class="input" />
    </div>

    <div class="flex gap-3">
      <button class="btn-primary">
        {{ selected ? "Mettre à jour" : "Ajouter" }}
      </button>

      <button v-if="selected"
        type="button"
        @click="$emit('cancel')"
        class="btn-secondary">
        Annuler
      </button>
    </div>

  </form>
</template>
