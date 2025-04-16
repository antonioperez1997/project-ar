<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>

  <!-- Opciones de usuarios -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Funcionalidades',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Analiticas',
      to: '/dashboard',
      icon: 'bx-bar-chart-square',
      badgeClass: 'text-primary',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Configuracion',
      icon: 'bx-cog',
      to: '/config',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Reportes',
      icon: 'bx-folder-open',
      to: '/reports',
    }"
  />

  <!-- Opciones de administrador -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Administrador',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Usuarios',
      icon: 'bx-user',
      to: '/users',
    }"
  />
</template>
