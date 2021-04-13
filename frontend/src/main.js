import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store'
import api from './modules/api'


const app = createApp(App).use(store).use(api, {
    default: 'v1',
    resources: [
        {
            name: 'v1',
            baseUrl: import.meta.env.VITE_API_URL
        },
    ],
})

app.use(ElementPlus)

app.mount('#app')