<script setup>

</script>

<template>
  <v-dialog activator="#InfoModels" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Tipos de Modelos
                </div>

                <v-btn
                  icon="bx-x"
                  variant="text"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>

              <v-card-text>
                <v-container>
            <ul>
            <li><strong>Proximidad Geográfica:</strong> Utiliza la API de Google Maps para calcular la distancia y
              seleccionar al motorizado más cercano.</li>
            <li><strong>Balanceo de Carga:</strong> Distribuye pedidos equitativamente para evitar sobrecarga en ciertos
              motorizados.</li>
          </ul>
          <ul>
            <li><strong>Priorización por SLA:</strong> Da prioridad a los pedidos con ventanas de entrega próximas a
              vencer.</li>
            <li><strong>Asignación por Puntaje:</strong> Selecciona motorizados con mejor desempeño basado en
              cumplimiento de entregas y satisfacción del cliente.</li>
            <li><strong>Asignación por capacidad:</strong> Se considera la capacidad de carga de cada motorizado en
              términos de volumen y peso.</li>
            <li><strong>Asignación por tiempo de llegada:</strong> Se asignan los pedidos al motorizado que pueda llegar
              al punto de venta en el menor tiempo posible.</li>
          </ul>
          </v-container>
              </v-card-text>

            </v-card>
          </template>
        </v-dialog>
</template>

