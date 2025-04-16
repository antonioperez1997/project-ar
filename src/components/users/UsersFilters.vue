<script setup>
import DialogCreateUsers from '@/components/users/DialogCreateUsers.vue'
import { ref, computed } from 'vue';

const menuInicio = ref(false);
const menuFin = ref(false);

const fechaInicio = ref(null);
const fechaFin = ref(null);

const formattedInicio = computed(() => {
  return fechaInicio.value ? new Date(fechaInicio.value).toLocaleDateString() : "";
});

const formattedFin = computed(() => {
  return fechaFin.value ? new Date(fechaFin.value).toLocaleDateString() : "";
});
</script>

<template>
  <VCol cols="12">

    <DialogCreateUsers/>

    <VCard>
      <!-- Título y botón de acción a la derecha -->
      <div class="d-flex justify-space-between align-center px-6 pt-4">
        <h3 class="text-h3">Usuarios</h3>
        <VBtn color="success" id="DialogCreateUsers">
          <VIcon start icon="bx-plus" /> Crear Usuario
        </VBtn>
      </div>
      <br>
    </VCard>
  </VCol>
</template>
