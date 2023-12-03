<template>
    <template v-if="!isFetchingInvoices && invoices.length">
      <InvoiceCard v-for="invoice in invoices" :key="invoice.id" :invoice="invoice" />
    </template>
    <template v-else-if="isFetchingInvoices">Loading...</template>
    <template v-else>
      <EmptyInvoiceList />
    </template>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import InvoiceCard from '@/components/invoices/InvoiceCard.vue'
import EmptyInvoiceList from '@/components/invoices/EmptyInvoicesList.vue'

const { dispatch, getters } = useStore()

onMounted(async () => {
  await dispatch('invoice/fetchInvoices')
})

const invoices = computed(() => getters['invoice/getInvoices'])
const isFetchingInvoices = computed(() => getters['invoice/getIsFetchingInvoices'])

</script>