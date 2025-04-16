<script setup>
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
  <VRow>
    <VCol cols="12">
      <VCard title="Reportes">
        <VCardText>
          Seleccione una fecha y el tipo de reporte que desea consultar. Luego, haga clic en el botón 'Descargar' para
          generar un archivo Excel con la información.
        </VCardText>

        <VCardText>
          <!-- Form -->
          <VForm>
            <VRow>

              <!-- Fecha Inicial -->
              <VCol cols="12" md="2">
                <VMenu v-model="menuInicio" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ props }">
                    <vTextField v-bind="props" v-model="formattedInicio" label="Fecha Inicial"
                      prepend-inner-icon="$calendar" readonly></vTextField>
                  </template>
                  <vDatePicker v-model="fechaInicio" @update:modelValue="menuInicio = false"></vDatePicker>
                </VMenu>
              </VCol>

              <!-- Fecha Final -->
              <VCol cols="12" md="2">
                <VMenu v-model="menuFin" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ props }">
                    <vTextField v-bind="props" v-model="formattedFin" label="Fecha Final" prepend-inner-icon="$calendar"
                      readonly></vTextField>
                  </template>
                  <vDatePicker v-model="fechaFin" :min="fechaInicio" @update:modelValue="menuFin = false"></vDatePicker>
                </VMenu>
              </VCol>

              <VCol cols="12" md="2">
                <VSelect label="Tipo de Reporte" :items="['Ventas', 'Analisis Motorizados']" />
              </VCol>


              <!-- Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn>Consultar</VBtn>

                <VBtn color="success" variant="tonal">
                  Descargar
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
