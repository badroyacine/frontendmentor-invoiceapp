import invoiceService from "@/services/invoiceService";

export default {
    namespaced: true,
    state: {
        invoices: [],
        filters: [],
        currentInvoice: null,
        isFetchingInvoices: false,
        error: null
    },
    mutations: {
        SET_INVOICES(state, invoices) {
            state.invoices = invoices
        },
        SET_CURRENT_INVOICE(state, invoice) {
            state.currentInvoice = invoice
        },
        SET_FILTERS(state, filters) {
          state.filters = filters
        },
        SET_IS_FETCHING_INVOICES(state, isFetching) {
            state.isFetchingInvoices = isFetching
        },
        SET_ERROR(state, error) {
            state.error = error
        }
    },
    getters: {
        getInvoices: state => {
          const { filters, invoices } = state
          return filters.length ? 
            invoices.filter(invoice => filters.includes(invoice.status)) 
            : invoices
        },
        getCurrentInvoice: state => state.currentInvoice,
        getIsFetchingInvoices: state => state.isFetchingInvoices,
        getError: state => state.error
    },
    actions: {
        updateFilters({ commit }, filters){
          commit('SET_FILTERS', filters)
        },

        async fetchInvoices({ commit }) {
          try {
            commit('SET_IS_FETCHING_INVOICES', true)
            const invoices = await invoiceService.getInvoices()
            commit('SET_INVOICES', invoices)
          } catch(err) {
            commit('SET_ERROR', 'Error occured when fetching invoices!')
          } finally {
            commit('SET_IS_FETCHING_INVOICES', false)
          }
        },

        async fetchSingleInvoice({ commit }, id) {
          try {
            const response = await invoiceService.getInvoice(id)

            if (response.exists()) {
              commit('SET_CURRENT_INVOICE', {
                ...response.data(),
                id
              })
            } else {
              // docSnap.data() will be undefined in this case
              commit('SET_ERROR', 'No invoice with this id')
            }
          } catch(err) {
            commit('SET_ERROR', 'Error occured when fetching the invoice!')
          }
        },

        resetCurrentInvoice({ commit }) {
          commit('SET_CURRENT_INVOICE', null)
        },

        async saveInvoice({ commit, dispatch }, { id, data, isEdit }) {
          try {
            await invoiceService.setInvoice(id, data)
            if(isEdit) {
              await dispatch('fetchSingleInvoice', id)
            } else {
              await dispatch('fetchInvoices')
            }
          } catch(err) {
            // console.log('err', err.message)
            commit('SET_ERROR', 'Error occured when fetching invoices!')
          }
        },

        deleteInvoice(_, id) {
          return invoiceService.deleteInvoice(id)
        }
    },
} 