<script setup>
import DialogInfoModels from '@/components/config/DialogInfoModels.vue'
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const idmode = ref();
const idmodel = ref();
const mode = ref();
const model = ref();
const resetKey = ref(0);
const originalConfigurationTypes = ref([]);
const ConfigurationTypes = ref([]);
const isSubmitting = ref(false)

// Funcion para obtener los datos desde la API con un parametro en la URL
const getConfigurationTypes = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Params/get?type=analysis_configuration_table`); // Parametro en la URL
    originalConfigurationTypes.value = response.data.data.map(item => ({
      id: item.par_id,
      name: item.par_name,
      status: item.par_status == 1 ? true : false,
      porcent: item.par_value
    }));
    ConfigurationTypes.value = JSON.parse(JSON.stringify(originalConfigurationTypes.value));
  } catch (error) {
    console.error('Error al obtener los tipos de configuracion:', error);
  }
};

const totalPercentage = computed(() =>
  ConfigurationTypes.value.filter(device => device.status)
    .reduce((sum, device) => sum + Number(device.porcent), 0)
);

const isPercentageValid = computed(() => totalPercentage.value === 100);

const resetForm = () => {
  ConfigurationTypes.value = JSON.parse(JSON.stringify(originalConfigurationTypes.value)); // Clonar datos
  resetKey.value++; // Cambiar clave para forzar renderizado
};


// Funcion para obtener los datos de los select
const getConfigurationSelect = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Params/get?type=analysis_configuration_select`);
    response.data.data.forEach(item => {
      if (item.par_name === 'mode') {
        idmode.value = item.par_id;
        mode.value = item.par_value;
      } else if (item.par_name === 'model') {
        idmodel.value = item.par_id;
        model.value = item.par_value;
      }
    });
  } catch (error) {
    console.error('Error al obtener los tipos de configuracion:', error);
  }
};


/* ENVIAR FORMULARIO PONDERACIONES */
const submitForm = async () => {
  
  isSubmitting.value = true
  const formData = {
    data: ConfigurationTypes.value.map(device => ({
      id: device.id,
      value: device.porcent,
      status: device.status ? "1" : "0"
    })).concat([
      { id: idmodel.value, value: model.value },
      { id: idmode.value, value: mode.value }
    ])
  };
  console.log(formData);

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

onMounted(() => {
  getConfigurationTypes()
  getConfigurationSelect()
})
</script>

<template>
  <V-Col cols="12">
    <V-Card title="Configuración de Porcentajes de Analisis">
      <V-CardText>
        Seleccione el modo manual para ajustar las ponderaciones del algoritmo, o el modo predefinido para elegir un
        modelo preconfigurado. <v-btn id="InfoModels" density="compact"
          variant="outlined" icon="bx-question-mark"></v-btn>
      </V-CardText>

      <!-- V-dialog -->
      <DialogInfoModels />
      <!-- fin V-dialog -->

      <V-CardText>
        <V-Row>
          <V-Col cols="6" md="2">
            <V-Select v-model="mode" label="Modo" :items="['Manual', 'Automatico']" />
          </V-Col>

          <V-Col cols="6" md="2">
            <V-Select v-model="model" label="Modelos" :items="['Costos Reducidos', 'Tiempos Reducidos', 'Puntaje']"
              :disabled="mode === 'Manual'" placeholder="Selecciona un modelo" />
          </V-Col>
        </V-Row>
      </V-CardText>


      <V-CardText>
        <V-Alert v-if="!isPercentageValid" type="error" class="mt-4">
          La suma de los porcentajes de los modelos activos debe ser exactamente 100%!
        </V-Alert>
      </V-CardText>


      <V-Table class="text-no-wrap" :key="resetKey">
        <thead>
          <tr>
            <th scope="col">
              Tipo de Modelo
            </th>
            <th scope="col">
              Estado
            </th>
            <th scope="col">
              Porcentaje
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in ConfigurationTypes" :key="device.type">
            <td>
              {{ device.name }}
            </td>
            <td>
              <V-Checkbox v-model="device.status" :disabled="mode === 'Automatico'" />
            </td>
            <td>
              <V-TextField v-model="device.porcent" label="" placeholder="0-100%"
                :disabled="mode === 'Automatico' || !device.status" :error="!isPercentageValid" type="number" min="0"
                max="100" suffix="%" />
            </td>
          </tr>
        </tbody>
      </V-Table>

      <V-Divider />

      <V-CardText>
        <V-Form @submit.prevent="submitForm">

          <div class="d-flex flex-wrap gap-4 mt-4">
            <V-Btn type="submit" :disabled="!isPercentageValid">
                <template v-if="isSubmitting">
                  <V-ProgressCircular indeterminate size="20" color="white" />
                </template>
                <template v-else>
                  Guardar
                </template>
              </V-Btn>
            <V-Btn :disabled="mode === 'Automatico'" color="error" variant="tonal" type="reset"
              @click="resetForm">Reiniciar</V-Btn>
          </div>
        </V-Form>
      </V-CardText>
    </V-Card>
  </V-Col>
</template>

<style lang="scss" scoped>
.v-table {
  th {
    text-align: start !important;
  }
}
</style>
