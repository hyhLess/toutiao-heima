import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './utils/dayjs'
// 加载 Vant 核心组件库
import Vant from 'vant'

// 加载 Vant 全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'
import 'vant/lib/icon/local.css'
import { Icon } from 'vant';

Vue.use(Icon);

// 加载动态设置 REM 基准值
import 'amfe-flexible'

// 注册使用 Vant 组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
