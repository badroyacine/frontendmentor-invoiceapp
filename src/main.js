import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import "@/assets/scss/main.scss";

const app = createApp(App)

app.use(store)
app.use(router)

app.component('BaseButton', defineAsyncComponent(() => import('@/components/ui/BaseButton.vue')))
app.component('BaseDialog', defineAsyncComponent(() => import('@/components/ui/BaseDialog.vue')))
app.component('BaseInput', defineAsyncComponent(() => import('@/components/ui/BaseInput.vue')))
app.component('BaseSelect', defineAsyncComponent(() => import('@/components/ui/BaseSelect.vue')))

app.mount('#app')
