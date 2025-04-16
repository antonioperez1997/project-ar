<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const resetKey = ref(0);
const originalConfigurationInputs = ref([]);
const ConfigurationInputs = ref([]);
const isSubmitting = ref(false)

const getConfigurationInputs = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Params/get?type=analysis_configuration_inputs`); // Parametro en la URL
    originalConfigurationInputs.value = response.data.data.map(item => ({
      id: item.par_id,
      name: item.par_name,
      status: item.par_status == 1 ? true : false,
      value: item.par_value
    }));
    ConfigurationInputs.value = JSON.parse(JSON.stringify(originalConfigurationInputs.value));
  } catch (error) {
    console.error('Error al obtener los tipos de configuracion:', error);
  }
};

const resetForm = () => {
  ConfigurationInputs.value = JSON.parse(JSON.stringify(originalConfigurationInputs.value)); // Clonar datos
  resetKey.value++; // Cambiar clave para forzar renderizado
};

/* ENVIAR FORMULARIO PONDERACIONES */
const submitForm = async () => {
  if (!isFormValid.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Por favor complete todos los campos antes de guardar',
      confirmButtonText: '<span style="color: white;">OK</span>'
    })
    return
  }

  isSubmitting.value = true
  const formData = {
    data: ConfigurationInputs.value.map(input => ({
      id: input.id,
      value: input.value,
    }))
  };

  try {
    const response = await axios.post(`${apiUrl}/Params/form/update`, formData);
    Swal.fire({
      icon: 'success',
      title: 'Parametros actualizados',
      text: 'La configuracion fue guardada correctamente',
      confirmButtonText: '<span style="color: white;">OK</span>'
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar',
      text: 'Ocurrio un problema al guardar los datos',
      confirmButtonText: '<span style="color: white;">OK</span>'
    })
  } finally {
    isSubmitting.value = false
  }
};

/* VALIDACION DE INPUTS */
const isFormValid = computed(() => {
  return ConfigurationInputs.value.every(input => input.value && input.value.toString().trim() !== '')
})

onMounted(() => {
  getConfigurationInputs()
})
</script>

<template>
  <V-Col cols="12">
    <V-Card title="Variables en codigo">
      <V-CardText>
        Configure las variables globales del código.
      </V-CardText>

      <V-CardText>
        <!-- Form -->
        <V-Form class="mt-6" @submit.prevent="submitForm">
          <V-Row>

            <V-Col v-for="input in ConfigurationInputs" :key="index" cols="12" md="6">
              <V-TextField v-model="input.value" :label="input.name" :disabled="input.status" type="text"
                :error="!input.value" :error-messages="!input.value ? 'Debe ingresar un valor' : ''" />
            </V-Col>

            <!-- Form Actions -->
            <V-Col cols="12" class="d-flex flex-wrap gap-4">
              <V-Btn type="submit" :disabled="!isFormValid || isSubmitting">
                <template v-if="isSubmitting">
                  <V-ProgressCircular indeterminate size="20" color="white" />
                </template>
                <template v-else>
                  Guardar
                </template>
              </V-Btn>

              <V-Btn color="error" variant="tonal" @click="resetForm">
                Reiniciar
              </V-Btn>
            </V-Col>
          </V-Row>
        </V-Form>
      </V-CardText>
    </V-Card>
  </V-Col>
</template>
