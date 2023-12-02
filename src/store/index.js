import { createStore } from "vuex";

export default createStore({
    state: {
      appMode: 'light',
      showInvoiceForm: false
    },
    getters: {
      getAppMode: state => state.appMode,
      getShowInvoiceForm: state => state.showInvoiceForm
    },
    mutations: { 
      SET_APP_MODE(state, mode) {
        state.appMode = mode
      },
      TOGGLE_SHOW_INVOICE_FORM(state) {
        state.showInvoiceForm = !state.showInvoiceForm
      }
    },
    actions: {
      updateAppMode({ commit }, mode) {
        commit('SET_APP_MODE', mode)
      },
      toggleShowInvoiceForm({ commit }) {
        commit('TOGGLE_SHOW_INVOICE_FORM')
      }
    }
});