<template>
    <InvoiceListHeader />
    <div class="spacer"></div>
    <InvoicesList />
</template>

<script setup>
import InvoicesList from '@/components/invoices/InvoicesList.vue'
import InvoiceListHeader from '@/components/invoices/InvoiceListHeader.vue'
</script>

<style lang="scss" scoped>
.spacer {
  margin-bottom: 2rem;
  @include breakpoint(md) {
    margin-bottom: 4rem;
  }
}
</style>