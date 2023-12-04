<template>
    <div class="header mt-30">
        <div class="header__wrapper">
            <div class="header__left">
                <span class="header__status">Status</span>
                <Status :status="props.invoice.status" />
            </div>
            <div class="header__right">
                <BaseButton
                    label="Edit"
                    color="secondary-light"
                    @click="toggleInvoiceForm"
                />

                <BaseButton
                    label="Delete"
                    color="danger"
                    @click="showDeleteDialog = true"
                />

                <BaseButton
                    :label="btnLabel"
                    color="primary"
                    @click="updateInvoiceStatus(statusToUpdate)"
                />
            </div>
        </div>
    </div>

    <BaseDialog 
        v-if="showDeleteDialog"
        title="Confirm Deletion"
        :content="`Are you sure you want to delete invoice #${props.invoice.id.toUpperCase()}? This action cannot be undone.`"
        action-btn-text="Delete"
        action-btn-color="danger"
        :actions-disabled="isDeletingInvoice"
        @action-click="deleteInvoice"
        @close-dialog="closeDialog"
    />
</template>

<script setup>
import Status from '@/components/invoices/Status.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed, defineAsyncComponent } from 'vue'
import { useDeleteInvoiceDialog } from '@/composables/delete-invoice-dialog'

const BaseDialog = defineAsyncComponent(() => import('@/components/ui/BaseDialog.vue'))

const props = defineProps({
    invoice: {
        type: Object,
        required: true
    }
})

const toggleInvoiceForm = () => dispatch('toggleShowInvoiceForm')

const updateInvoiceStatus = async (status) => {
    await dispatch('invoice/saveInvoice', {
        id: props.invoice.id,
        data: {
            status
        },
        isEdit: true
    })
}

// we can do one computed property as an object
const btnLabel = computed(() => props.invoice.status === 'paid' ? 'Mark as Unpaid' : 'Mark as Paid')
const statusToUpdate = computed(() => props.invoice.status === 'paid' ? 'pending' : 'paid')

const {
    showDeleteDialog,
    isDeletingInvoice,
    closeDialog,
    deleteInvoice
} = useDeleteInvoiceDialog(props.invoice.id)

</script>

<style lang="scss" scoped>
.header {
    background-color: $list-item-bg-color;
    border-radius: 8px;
    padding: 1.25rem 2rem;
    box-shadow: 0 10px 10px -10px rgba(#48549F, 0.1);

    &__status {
        color: $main-text-color;
    }

    &__wrapper {
        @include flex(center, space-between)
    }

    &__left {
        @include flex(center, space-between, 20px);
        flex: 1;

        @include breakpoint(md) {
            justify-content: flex-start;
        }
    }

    &__right{
        @include flex(center, space-between, 8px);

        @media (max-width: 480px) {
            // display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            @include flex(center, center, 8px);
            background-color: $list-item-bg-color;
            padding: 1.375rem 1.5rem;
            width: 100vw;
            box-shadow: 0 10px 10px -10px rgba(#48549F, 0.1);
        }
    }
}
</style>