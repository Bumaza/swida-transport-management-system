
import { createApp } from 'vue'

import App from './App.vue'
import {router} from "@/router";

const app = createApp(App)
    .use(router)

if (import.meta.env.VITE_APP_ENV !== 'dev') {
    console.log = function () {};
    console.error = function () {};
}

app.mount('#app')
