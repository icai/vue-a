/**
 * Created by fulin.wang on 17-3-29.
 * remark:我们组装模块并导出 store 的地方
 */
import Vue from 'vue'
import Vuex from 'vuex'
import invest from './modules/invest'
import trader from './modules/trader'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        invest,
        trader
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
