<template>
    <div class="invoice-details-container" v-if="invoice">
        <router-link :to="{ name: 'Home' }" class="back-btn">
            <img src="../assets/imgs/icon-arrow-left.svg" alt="Arrow left icon">
            <span class="ml-24">Go back</span>
        </router-link>
        
        <Header :invoice="invoice" />
        
        <div class="details mt-24">
            <BillDetails :id="id" :invoice="invoice" />
        
            <div class="item-list">
                <ItemsListDesktop v-if="!isMobile" :items="invoice.invoiceItemlist" />
                <ItemsListMobile v-else :items="invoice.invoiceItemlist" />
            </div>
            <div class="invoice-total">
                <div class="invoice-total__label">Amount Due</div>
                <div class="invoice-total__price">£ {{ invoice.totalInvoice }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useScreenSize } from '@/composables/screen-size'
import Header from '@/components/invoice-details/Header.vue'
import ItemsListDesktop from '@/components/invoice-details/ItemsListDesktop.vue'
import ItemsListMobile from '@/components/invoice-details/ItemsListMobile.vue'
import BillDetails from '@/components/invoice-details/BillDetails.vue'

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const { isMobile } = useScreenSize()

const { dispatch, getters } = useStore()

onMounted(async () => {
  await dispatch('invoice/fetchSingleInvoice', props.id)
})

onUnmounted(() => dispatch('invoice/resetCurrentInvoice'))

const invoice = computed(() => getters['invoice/getCurrentInvoice'])

</script>

<style lang="scss" scoped>
.invoice-details-container{
    @media (max-width: 480px) {
        max-height: calc(100vh - 200px);
        overflow: scroll;
    }
}
.back-btn {
    text-decoration: none;
    color: $main-color;
}

.details {
    background-color: $list-item-bg-color;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 10px 10px -10px rgba(#48549F, 0.1);

    @include breakpoint(md){
        padding: 3rem;
    }
}

.item-list {
    background-color: $invoice-details-items-bg-color;
    padding: 1.5rem;
    border-radius: 8px 8px 0 0;

    @include breakpoint(md){
        padding: 2rem;
    }
}

.invoice-total {
    @include flex(center, space-between);
    background-color: $invoice-details-total-bg-color;
    padding: 27px 32px 21px 32px;
    border-radius: 0 0 8px 8px;
    
    &__label {
        @include custom-text(fs(default), #fff, 18px, -0.1px);
    }

    &__price {
        @include custom-text(fs(xl), #fff, 32px, -0.5px, fw(bold));
    }
}
</style>