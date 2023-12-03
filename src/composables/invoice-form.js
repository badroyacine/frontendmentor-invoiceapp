import { computed, ref } from 'vue'
import { object, string, number, date, array } from 'yup'
import { useForm, useFieldArray } from 'vee-validate'
import { useNow, useDateFormat } from '@vueuse/core'
import { PAYMENT_TERMS_OPTIONS } from '@/utils/constants'

export const useInvoiceForm = (invoice = null) => {

    const formTitle = invoice ? `Edit #${invoice.id}` : 'New Invoice'
    const invoiceStatus = ref(invoice ? invoice.status : 'pending')
    const today = useDateFormat(useNow(), 'YYYY-MM-DD')

    const paymentTermsOptions = ref(PAYMENT_TERMS_OPTIONS)

    const validationSchema = object({
        billToStreetAddress: string().trim().required('Can’t be empty'),
        billToCity: string().trim().required('Can’t be empty'),
        billToPostalCode: string().trim().required('Can’t be empty'),
        billToCountry: string().trim().required('Can’t be empty'),
        clientName: string().trim().required('Can’t be empty'),
        clientEmail: string().email().trim().required('Can’t be empty'),
        billFromStreetAddress: string().trim().required('Can’t be empty'),
        billFromCity: string().trim().required('Can’t be empty'),
        billFromPostalCode: string().trim().required('Can’t be empty'),
        billFromCountry: string().trim().required('Can’t be empty'),
        invoiceDate: date().required('Can’t be empty'),
        invoicePaymentTerms: string().trim().required('Can’t be empty'),
        projectDescription: string().trim().required('Can’t be empty'),
        invoiceItemlist: array(
            object({ 
                name: string().trim().required('Can’t be empty'), 
                qty: number().min(1).typeError('Must be a number'), 
                price: number().min(0.1).typeError('Must be a number')
            })
        ).min(1)
    })

    const { defineComponentBinds, handleSubmit, errors, isSubmitting, values } = useForm({
        validationSchema,
        initialValues: {
            billToStreetAddress: invoice?.billToStreetAddress,
            billToCity: invoice?.billToCity,
            billToPostalCode: invoice?.billToPostalCode,
            billToCountry: invoice?.billToCountry,
            clientName: invoice?.clientName,
            clientEmail: invoice?.clientEmail,
            billFromStreetAddress: invoice?.billFromStreetAddress,
            billFromCity: invoice?.billFromCity,
            billFromPostalCode: invoice?.billFromPostalCode,
            billFromCountry: invoice?.billFromCountry,
            invoicePaymentTerms: invoice?.invoicePaymentTerms,
            projectDescription: invoice?.projectDescription,
            invoiceItemlist: invoice?.invoiceItemlist ?? [{ name: '', qty: 1, price: 0.1, total: 0 }],
            invoiceDate: invoice?.invoiceDate ?? today.value
        }
    })    

    const billToStreetAddress = defineComponentBinds('billToStreetAddress');
    const billToCity = defineComponentBinds('billToCity');
    const billToPostalCode = defineComponentBinds('billToPostalCode');
    const billToCountry = defineComponentBinds('billToCountry');
    const clientName = defineComponentBinds('clientName');
    const clientEmail = defineComponentBinds('clientEmail');
    const billFromStreetAddress = defineComponentBinds('billFromStreetAddress');
    const billFromCity = defineComponentBinds('billFromCity');
    const billFromPostalCode = defineComponentBinds('billFromPostalCode');
    const billFromCountry = defineComponentBinds('billFromCountry');
    const invoiceDate = defineComponentBinds('invoiceDate');
    const invoicePaymentTerms = defineComponentBinds('invoicePaymentTerms');
    const projectDescription = defineComponentBinds('projectDescription');

    const { remove, push, fields } = useFieldArray('invoiceItemlist');

    const addEmptyItem = () => push({ name: '', qty: 1, price: 0.1 })
    const deleteItem = (index) => remove(index)

    const totalInvoice = computed(() => values.invoiceItemlist.reduce((acc, item) => {
        return acc + item.total
    }, 0))

    return {
        formTitle,
        invoiceStatus,
        handleSubmit,
        errors,
        isSubmitting,
        totalInvoice,
        addEmptyItem,
        deleteItem,
        fields,
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
    }
}