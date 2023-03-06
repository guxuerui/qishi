import { createHead } from '@vueuse/head'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import PostList from './components/postList.vue'
import StatusIndicator from './components/statusIndicator.vue'
import Vue3Guage from './components/vue3Guage.vue'
import Cog from './components/cog.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'

const app = createApp(App)
const head = createHead()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(router).use(head)
app
  .component('PostList', PostList)
  .component('StatusIndicator', StatusIndicator)
  .component('Vue3Guage', Vue3Guage)
  .component('Cog', Cog)
app.mount('#app')
