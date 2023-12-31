<template>
    <router-link :to="{ name: 'InvoiceDetails', params: { id: invoice.id } }" class="invoice-card mb-15">
        <div class="invoice-card__invoiceId fw-bold">
            <span class="hash">#</span>{{ invoice.id.toUpperCase() }}
        </div>
        <div class="invoice-card__date">Due {{ formattedDueDate }}</div>
        <div class="invoice-card__client ml-auto ml-md-0">{{ invoice.clientName }}</div>
        <div class="invoice-card__total mt-md-0 fw-bold">{{ invoice.totalInvoice }} £</div>
        <div class="invoice-card__status ml-auto ml-md-0">
            <Status :status="invoice.status" />
        </div>
        <img v-if="!isMobile" src="@/assets/imgs/icon-arrow-right.svg" alt="Arrow right icon">
    </router-link>
</template>

<script setup>
import { useScreenSize } from '@/composables/screen-size'
import Status from '@/components/invoices/Status.vue'
import { useDateFormat } from "@vueuse/core";
import { addDaysToDate } from '@/utils/helpers';


const props = defineProps({
    invoice: {
        type: Object,
        required: true
    }
})

const { isMobile } = useScreenSize()

const formattedDueDate = useDateFormat(
    addDaysToDate(props.invoice.invoiceDate, props.invoice.invoicePaymentTerms), 'DD MMM YYYY')
</script>

<style lang="scss" scoped>
.invoice-card {
    display: grid;  
    border-radius: 8px;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background-color: $list-item-bg-color;
    padding: 1.5625rem 1.5rem 1.375rem 1.5rem;
    gap: 1.5rem;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;

    &__date {
        grid-area: date;
        @include custom-text(fs(sm), $main-text-color, 15px, -0.1px);
    }

    &__client {
        grid-area: client;
        @include custom-text(fs(sm), $main-text-color, 15px, -0.1px);
    }

    &__total {
        grid-area: total;
        margin-top: -15px;
        line-height: 1.5;
        color: $main-color;
    }

    &__status {
        @include flex-center;
        grid-area: status;
        width: 104px;
        height: 40px;
    }

    &__invoiceId {
        grid-area: invoiceId;
        line-height: 15px;
        color: $main-color;
    }

    grid-template-areas: 
        "invoiceId client"
        "date status"
        "total status";

    @include breakpoint(md) {
        @include flex(center, space-between);
        padding: 1em 1.5em;
    }

    &:hover{
        border: 1px solid $primary-color;
    }
}

// .hash {
//     color: $main-text-color;
// }
</style>