<template>
    <InvoicesList />
</template>

<script setup>
import InvoicesList from '@/components/invoices/InvoicesList.vue'
</script>

<style lang="scss" scoped>
.spacer {
  margin-bottom: 2rem;
  @include breakpoint(md) {
    margin-bottom: 4rem;
  }
}
</style>