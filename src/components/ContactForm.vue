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

// Phone input handler - only allow numbers and common phone characters
const handlePhoneInput = (event) => {
  let value = event.target.value;
  // Remove any non-numeric characters except spaces, dashes, parentheses, and plus
  value = value.replace(/[^\d\s\-+()]/g, "");
  form.value.phone = value;
  event.target.value = value;
};

const handlePhoneKeyPress = (event) => {
  const char = event.key;
  // Allow numbers, backspace, delete, tab, enter
  const allowedChars = /[0-9\s\-+()]/;
  if (!allowedChars.test(char) && !["Backspace", "Delete", "Tab", "Enter"].includes(char)) {
    event.preventDefault();
  }
};
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4">

    <div class="grid md:grid-cols-3 gap-4">
      <!-- Name Input with Floating Label -->
      <div class="relative">
        <input 
          id="name"
          v-model="form.name" 
          type="text"
          placeholder=" "
          class="input peer"
          required
        />
        <label 
          for="name"
          class="floating-label"
        >
          Nom (Name)
        </label>
      </div>

      <!-- Email Input with Floating Label -->
      <div class="relative">
        <input 
          id="email"
          v-model="form.email" 
          type="email"
          placeholder=" "
          class="input peer"
          required
        />
        <label 
          for="email"
          class="floating-label"
        >
          Email
        </label>
      </div>

      <!-- Phone Input with Floating Label - Numbers Only -->
      <div class="relative">
        <input 
          id="phone"
          v-model="form.phone" 
          type="tel"
          placeholder=" "
          class="input peer"
          inputmode="numeric"
          @input="handlePhoneInput"
          @keypress="handlePhoneKeyPress"
          required
        />
        <label 
          for="phone"
          class="floating-label"
        >
          Téléphone (Phone)
        </label>
      </div>
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
