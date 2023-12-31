<script setup>
import { useDateFormat } from "@vueuse/core";
import { addDaysToDate } from "@/utils/helpers";
import { computed } from "vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    invoice: {
        type: Object,
        required: true
    }
})

const formattedInvoiceDate = computed(() => useDateFormat(props.invoice.invoiceDate, 'DD MMM YYYY'))

const formattedDueDate = computed(() => 
    useDateFormat(
        addDaysToDate(props.invoice.invoiceDate, props.invoice.invoicePaymentTerms), 'DD MMM YYYY')
)

</script>
<template>
    <div class="bill-from mb-32 mb-md-20">
        <div>
            <div class="invoice-id mb-8">#{{ id.toUpperCase() }}</div>
            <div class="default-label">{{ invoice.projectDescription }}</div>
        </div>

        <div class="address">
            <p>{{ invoice.billFromStreetAddress }}</p>
            <p>{{ invoice.billFromCity }}</p>
            <p>{{ invoice.billFromPostalCode }}</p>
            <p>{{ invoice.billFromCountry }}</p>
        </div>
    </div>

    <div class="bill-to mb-48">
        <div class="bill-to__left">
            <div>
                <div class="mb-32">
                    <div class="default-label mb-13">Invoice Date</div>
                    <div class="default-value">{{ formattedInvoiceDate.value }}</div>
                </div>

                <div>
                    <div class="default-label mb-13">Payment Due</div>
                    <div class="default-value">{{ formattedDueDate.value }}</div>
                </div>
            </div>

            <div>
                <div class="default-label mb-13">Bill To</div>
                <div class="default-value">{{ invoice.clientName }}</div>
                <div class="address text-left mt-8">
                    <p>{{ invoice.billToStreetAddress }}</p>
                    <p>{{ invoice.billToCity }}</p>
                    <p>{{ invoice.billToPostalCode }}</p>
                    <p>{{ invoice.billToCountry }}</p>
                </div>
            </div>
        </div>

        <div>
            <div class="default-label mb-13">Sent to</div>
            <div class="default-value">{{ invoice.clientEmail }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.bill-from {
    @include flex(flex-start, space-between, 30px);
    flex-direction: column;
    
    @include breakpoint(md) {
        flex-direction: row;
    }
}

.bill-to {
    @include flex(flex-start, flex-start, 30px);
    flex-direction: column;

    &__left {
        @include flex(flex-start, flex-start, 60px);

        @include breakpoint(md) {
            gap: 115px;
        }
    }

    @include breakpoint(md) {
       flex-direction: row;
       gap: 115px;
    }
}

.invoice-id {
    @include custom-text(fs(default), $main-color, 24px, -0.25px, 700);
}

.default-value {
    @include custom-text(fs(default), $main-color, 20px, -0.25px, 700);
}
.address {
    @include custom-text(fs(sm), $input-label-color, 18px, -0.1px);
    max-width: 88px;
    text-align: left;

    @include breakpoint(md) {
        text-align: right;
    }
}
</style>