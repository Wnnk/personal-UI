import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from "@commonUI/components/icon"
import Tree from "@commonUI/components/tree"
import Checkbox from '@commonUI/components/checkbox'
import Button from '@commonUI/components/button'
import Input from '@commonUI/components/input'
import TimeAge from '@commonUI/components/timeago'
import DragForm from '@commonUI/components/drag-form'
import '@commonUI/theme-chalk/src/index.scss'

const plugins = [
  Icon,
  Tree,
  Checkbox,
  Button,
  TimeAge,
  Input,
  DragForm
]
const app = createApp(App)
plugins.forEach(plugin => {
  app.use(plugin)
})
app.mount('#app')
