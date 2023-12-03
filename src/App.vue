<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
</script>

<template>
  <div class="app-container">
    <TheNavbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  @include breakpoint(lg) {
    flex-direction: row;
  }
}

main {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  padding: 1.5em;
}
</style>
