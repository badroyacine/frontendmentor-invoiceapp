<template>
    <div class="header">
        <div style="flex: 1;">
            <h2 class="header__title fw-bold">Invoices</h2>
            <p class="header__sub-title">{{ subHeaderText }}</p>
        </div>
        
        <div class="status-selector" ref="statusSelector">
            <div @click="toggleDropdown" style="cursor: pointer;">
                <span class="mr-14">{{ filterText }}</span>
                <img v-if="!showDropdown" src="@/assets/imgs/icon-arrow-down.svg" alt="Arrow down" width="10">
                <img v-else src="@/assets/imgs/icon-arrow-up.svg" alt="Arrow up" width="10">
            </div>
            <div class="status-selector__dialog" v-if="showDropdown">
                <div class="status-selector__item" v-for="status in invoiceStatusArr" :key="status.name">
                    <input 
                        type="checkbox" 
                        :value="status.name"
                        :id="status.name"
                        name="invoice-status"
                        class="checkbox"
                        v-model="selectedFilters"
                    >
                    <label class="status-selector__item-label ml-14" :for="status.name">{{ status.label }}</label>
                </div>
            </div>
        </div>
        <BaseButton
            :label="createInvoiceBtnText"
            icon="icon-plus.svg"
            @click="toggleInvoiceForm"
        />
    </div>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStore } from 'vuex'
import { useScreenSize } from '@/composables/screen-size'
import { invoiceStatus } from '@/utils/invoice-status'
import BaseButton from '@/components/ui/BaseButton.vue'

const { getters, dispatch } = useStore()

// Use composable
const invoiceStatusArr = ref(invoiceStatus)
const showDropdown = ref(false)

const { isMobile } = useScreenSize()

const statusSelector = ref(null)
onClickOutside(statusSelector, () => showDropdown.value = false)

const totalInvoices = computed(() => getters['invoice/getInvoices'].length)
const filterText = computed(() => isMobile.value ? 'Filter' : 'Filter by status')
const createInvoiceBtnText = computed(() => isMobile.value ? 'New' : 'New Invoice')
const subHeaderText = computed(() => isMobile.value ? `${totalInvoices.value} invoices` : `There are ${totalInvoices.value} total invoices`)

const toggleDropdown = () => showDropdown.value = !showDropdown.value

const selectedFilters = ref([])
watch(selectedFilters, () => {
    dispatch('invoice/updateFilters', selectedFilters.value)
})

onUnmounted(() => dispatch('invoice/updateFilters', []))

const toggleInvoiceForm = () => dispatch('toggleShowInvoiceForm')

</script>

<style lang="scss" scoped>
.header {
    @include flex(center, space-between, 18px);

    &__title {
        
        font-size: fs(xl);
        margin-block: 5px;

        @include breakpoint(md) {
            font-size: fs(2xl);
            margin-block: 10px;
        }
    }

    &__sub-title {
        font-size: fs(sm);
        color: $main-text-color;
    }

    @include breakpoint(md) {
        gap: 40px;
    }
}

.status-selector {
    position: relative;

    &__dialog {
        position: absolute;
        top: 36px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 8px;
        padding: 1.5em;
        min-width: 192px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    }

    &__item:not(:last-child) {
        margin-bottom: 1rem;
    }

    &__item-label {
        font-weight: 700;
        letter-spacing: -0.25px;
        line-height: 15px;
        cursor: pointer;
    }
}

.checkbox {
    accent-color: $primary-color;
}
</style>