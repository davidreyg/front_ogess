<template>
  <router-view v-slot="{ Component }">
    <transition
      appear
      mode="in-out"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      :duration="150"
    >
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>
