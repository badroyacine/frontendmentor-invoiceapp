<script setup>
import BaseInput from "./ui/BaseInput.vue";
import BaseSelect from "./ui/BaseSelect.vue";
import BaseButton from "./ui/BaseButton.vue";
import { useStore } from 'vuex'
import { useInvoiceForm } from "@/composables/invoice-form";
import { computed } from 'vue'

import { uid } from 'uid';

const { dispatch, getters } = useStore()

const invoice = computed(() => getters['invoice/getCurrentInvoice'])
const toggleInvoiceForm = () => dispatch('toggleShowInvoiceForm')

const {
    formTitle,
    invoiceStatus,
    fields,
    handleSubmit,
    errors,
    isSubmitting,
    totalInvoice,
    addEmptyItem,
    deleteItem,
    paymentTermsOptions,
    billToStreetAddress,
    billToCity,
    billToPostalCode,
    billToCountry,
    clientName,
    clientEmail,
    billFromStreetAddress,
    billFromCity,
    billFromPostalCode,
    billFromCountry,
    invoiceDate,
    invoicePaymentTerms,
    projectDescription
} = useInvoiceForm(invoice.value)

const onSubmit = handleSubmit(async (values) => {
    try {
        await dispatch('invoice/saveInvoice', {
            id: invoice.value ? invoice.value.id : uid(6),
            data: {
                ...values,
                status: invoiceStatus.value,
                totalInvoice: totalInvoice.value
            },
            isEdit: !!invoice.value
        })
        toggleInvoiceForm()
    } catch(err) {
        console.log('errror', err)
    }
});

</script>

<template>
    <div class="invoice-form-container" @click.self="toggleInvoiceForm">
        <div class="invoice-form">
            <h3 class="title mb-45">{{ formTitle }}</h3>

            <form @submit="onSubmit">
                <h5 class="section-title mb-24">Bill to</h5>

                <BaseInput 
                    class="mb-24" 
                    type="text" 
                    label="Street Address" 
                    v-bind="billToStreetAddress"
                    :error="errors.billToStreetAddress"
                />

                <div class="flex-container mb-48">
                    <BaseInput label="City" type="text" v-bind="billToCity" :error="errors.billToCity" />
                    <BaseInput label="Post Code" type="text" v-bind="billToPostalCode" :error="errors.billToPostalCode" />
                    <BaseInput label="Country" type="text" v-bind="billToCountry" :error="errors.billToCountry" />
                </div>

                <h5 class="section-title mb-24">Bill from</h5>

                <BaseInput class="mb-24" label="Client’s Name" type="text" v-bind="clientName" :error="errors.clientName" />
                <BaseInput class="mb-24" label="Client’s Email" type="text" v-bind="clientEmail" :error="errors.clientEmail" />
                <BaseInput class="mb-24" label="Street Address" type="text" v-bind="billFromStreetAddress" :error="errors.billFromStreetAddress" />

                <div class="flex-container mb-48">
                    <BaseInput label="City" type="text" v-bind="billFromCity" :error="errors.billFromCity" />
                    <BaseInput label="Post Code" type="text" v-bind="billFromPostalCode" :error="errors.billFromPostalCode" />
                    <BaseInput label="Country" type="text" v-bind="billFromCountry" :error="errors.billFromCountry" />
                </div>

                <div class="flex-container mb-24">
                    <BaseInput label="Invoice Date" type="date" v-bind="invoiceDate" :error="errors.invoiceDate" />
                    <BaseSelect label="Payment Terms" :options="paymentTermsOptions" v-bind="invoicePaymentTerms" :error="errors.invoicePaymentTerms" />
                </div>

                <BaseInput 
                    class="mb-32" 
                    label="Project Description" 
                    type="text" 
                    v-bind="projectDescription" 
                    :error="errors.projectDescription" 
                />

                <div class="item-list">
                    <h5 class="item-list__title mb-13">Item List</h5>

                    <div class="item header mb-15">
                        <div class="item__name">Item Name</div>
                        <div class="text-center" style="flex: 1">QTY.</div>
                        <div style="flex: 1.5">Price</div>
                        <div>Total</div>
                        <div></div>
                    </div>

                    <div v-for="(item, index) in fields" :key="index" class="item mb-18">
                        <div class="item__name">
                            <BaseInput type="text" v-model="item.value.name" :error="errors[`invoiceItemlist[${index}].name`]" />
                        </div>
                        <div style="flex: 1">
                            <BaseInput type="text" v-model="item.value.qty" :error="errors[`invoiceItemlist[${index}].qty`]" />
                        </div>
                        <div style="flex: 1.5">
                            <BaseInput type="text" v-model="item.value.price" :error="errors[`invoiceItemlist[${index}].price`]" />
                        </div>
                        <div>
                            £ {{ (item.value.total = item.value.qty * item.value.price) }}
                        </div>
                        <div>
                            <button type="button" class="delete-btn" @click="deleteItem(index)">
                                <img src="@/assets/imgs/icon-delete.svg" alt="Delete icon" width="16">
                            </button>
                        </div>
                    </div>

                    <button type="button" class="add-item-btn fw-bold" @click="addEmptyItem">
                        + Add New Item
                    </button>
                </div>

                <div class="form-actions mt-38">
                    <BaseButton
                        label="Cancel"
                        color="secondary-light"
                        type="button"
                        @click="toggleInvoiceForm"
                        :disabled="isSubmitting"
                    />

                    <div class="form-actions__right">
                        <BaseButton
                            v-if="!invoice"
                            label="Save as Draft"
                            color="secondary-dark"
                            type="submit"
                            @click="invoiceStatus = 'draft'"
                            :disabled="isSubmitting"
                        />
                        <BaseButton
                            label="Save & Send"
                            type="submit"
                            :disabled="isSubmitting"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.title {
    @include custom-text(fs(xl), $main-color, 32px, -0.5px, 700);
}
.invoice-form-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(#000000, 0.5);
    width: 100vw;
}

.invoice-form {
    width: 100%;
    max-width: 720px;
    height: 100vh;
    overflow-y: scroll;
    border-radius: 0 20px 20px 0;
    background-color: $invoice-form-bg-color;
    padding: 104px 24px 24px 24px;

    @include breakpoint(lg) {
        padding: 59px 57px 32px 159px;
    }
}

.section-title {
    @include custom-text(fs(default), $primary-color, 24px, -0.25px, 700);
}

.flex-container {
    @include flex(center, center, 24px)
}

.item-list {
    &__title {
        @include custom-text(fs(lg), #777F98, 32px, -0.38px, 700);
    }

    .item {
        @include flex(center, space-between, 16px);
        text-align: center;

        &:last-child {
            margin-bottom: 0.5rem;
        }

        > div {
            flex: 1;
        }

        &__name {
            flex: 3 !important;
            text-align: left;
        }
    }

    .header {
        @include custom-text(fs(sm), $input-label-color, 15px, -0.1px);
    }
}

.delete-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.add-item-btn {
    width: 100%;
    background-color: $invoice-details-items-bg-color;
    border-radius: 24px;
    border: none;
    padding: 1.125rem 1rem 0.9375rem 1rem;
    color: $input-label-color;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
        // Need to do dark mode
        background-color: $light-color;
    }
}

.form-actions {
    @include flex(center, space-between);

    &__right {
        @include flex(center, space-between, 8px);
    }
}
</style>