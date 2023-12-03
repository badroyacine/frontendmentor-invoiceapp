<template>
  <div class="app-container">
    <TheNavbar />
    <main>
      <Transition name="slide" :duration="500">
        <InvoiceForm v-if="showInvoiceForm" />
      </Transition>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import InvoiceForm from '@/components/InvoiceForm.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const { getters } = useStore()

const showInvoiceForm = computed(() => getters['getShowInvoiceForm'])
</script>

<style lang="scss">
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

.slide-enter-from .invoice-form,
.slide-leave-to .invoice-form{
  transform: translateX(-100%);
}

.slide-enter-active .invoice-form,
.slide-leave-active .invoice-form {
  transition: all 0.5s ease-in;
}
</style>
