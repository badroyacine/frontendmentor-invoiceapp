import { ref } from "vue"
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


export const useDeleteInvoiceDialog = (invoiceId) => {
    const { dispatch } = useStore()
    const router = useRouter()
    
    const showDeleteDialog = ref(false)
    const isDeletingInvoice = ref(false)
    const closeDialog = () => showDeleteDialog.value = false
    const deleteInvoice = async () =>  {
        isDeletingInvoice.value = true
        try {
            await dispatch('invoice/deleteInvoice', invoiceId)
            router.push({ name: 'Home' })
        } catch (err) {
            console.log('error', err)
        } finally {
            isDeletingInvoice.value = false
        }
    }

    return {
        showDeleteDialog,
        isDeletingInvoice,
        closeDialog,
        deleteInvoice
    }
}
