
/**
 * author:fulin.wang at 2017-03-08
 * router config
 */
//引入模块
import Home from "../page/Home.vue"

let defaultPath = '/fund'
let routes = [
                {
                    path: '/login',
                    component: (resolve) => {
                        require(['../page/login/Login'], resolve)
                    },
                    name: 'login'
                },
                {
                    path: '/',
                    component: Home,
                    name: '所有基金产品',
                    children: [
                        { path: '/fund', component: (resolve) => {
                            require(['../page/fund/Fund'], resolve)
                        }, name: 'fund' },
                        { path: '/fund-create', component: (resolve) => {
                            require(['../page/fund/FundCreate'], resolve)
                        }, name: 'fund-create' },
                        { path: '/fund-properties/:fundId', component: (resolve) => {
                            require(['../page/fund/FundProperties'], resolve)
                        }, name: 'fund-properties' },
                        { path: '/fund-account-properties/:fundAccId', component: (resolve) => {
                            require(['../page/fund/fundaccount/FundAccountProperties'], resolve)
                        }, name: 'fund-account-properties' },
                        { path: '/fund-eca-properties/:fundECAId', component: (resolve) => {
                            require(['../page/fund/fundECA/FundECAProperties'], resolve)
                        }, name: 'fund-eca-properties' }
                    ]
                },
                {
                    path: '/',
                    component: Home,
                    name: '投资决策',
                    children: [
                        { path: '/invest', component: (resolve) => {
                            require(['../page/Invest/Index'], resolve)
                        }, name: 'invest' },
                    ]
                },
                {
                    path: '/',
                    component: Home,
                    name: '交易员',
                    children: [
                        { path: '/trader', component: (resolve) => {
                            require(['../page/trader/Index'], resolve)
                        }, name: 'trader' },
                    ]
                }
            ]

    routes = routes.concat([{
        path: '/',
        redirect: defaultPath
    }, {
        path: '*',
        redirect: defaultPath
    }]);
export default routes;



