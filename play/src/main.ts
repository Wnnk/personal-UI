import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from "@commonUI/components/icon"
import Tree from "@commonUI/components/tree"
import Checkbox from '@commonUI/components/checkbox'
import '@commonUI/theme-chalk/src/index.scss'

const plugins = [
  Icon,
  Tree,
  Checkbox
]
const app = createApp(App)
plugins.forEach(plugin => {
  app.use(plugin)
})
app.mount('#app')
