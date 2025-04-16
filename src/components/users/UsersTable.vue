<script setup>
import { ref } from 'vue'

// Definicion de columnas
const columns = [
  {
    label: 'Nombre',
    field: 'name',
    sortable: true,
  },
  {
    label: 'Correo',
    field: 'email',
    sortable: true,
  },
  {
    label: 'Rol',
    field: 'role',
  },
  {
    label: 'Acciones',
    field: 'actions',
  }
]

// Datos (pueden venir de una API)
const rows = ref([
  { name: 'Juan Perez', email: 'juan@email.com', role: 'admin' },
  { name: 'Ana Gomez', email: 'ana@email.com', role: 'medico' },
  { name: 'Pedro Ruiz', email: 'pedro@email.com', role: 'paciente' },
])
</script>

<template>
  <VCol cols="12">
    <VCard>
      <vue-good-table :columns="columns" :rows="rows" :pagination-options="{
        enabled: true,
        perPage: 5
      }" :search-options="{
        enabled: true
      }">

        <template #table-row="props">
          <div v-if="props.column.field === 'actions'">
            <button class="success">{{ props.row.name }}</button>
          </div>
        </template>

      </vue-good-table>
    </VCard>
  </VCol>
</template>
