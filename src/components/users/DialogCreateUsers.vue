<script setup>

</script>

<template>
  <v-dialog activator="#DialogCreateUsers" max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">
            Crear Usuario
          </div>

          <v-btn icon="bx-x" variant="text" @click="isActive.value = false"></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            
          </v-container>
        </v-card-text>

      </v-card>
    </template>
  </v-dialog>
</template>
