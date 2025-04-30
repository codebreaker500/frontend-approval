
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Ripple from 'primevue/ripple';

import '@/assets/main.css';

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura
    }
})
app.use(ToastService)
app.directive('ripple', Ripple); 
app.component('Toast', Toast);

app.mount('#app')
