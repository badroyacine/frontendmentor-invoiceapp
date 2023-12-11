<template>
  <div>
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
main {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  padding: 104px 24px 32px;

  @include breakpoint(md) {
    padding-top: 142px;
  }

  @include breakpoint(lg) {
    padding-top: 77px;
  }
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
