/** 
 * author:fulin.wang
 * date:2017-03-09
*/
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

//const dataURL = 'http://localhost:8088';//http://180.168.43.246:8897/'; //开发环境中数据服务器地址
var proxyTable = {
    target: 'http://localhost:8088',
    changeOrigin: true,
    ws: true //proxy webSocket
}

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8089,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/funds/':proxyTable,
            '/fund-accounts/':proxyTable,
            '/portfolios/':proxyTable,
            '/external-capital-accounts/':proxyTable,
            '/capital-details/':proxyTable,
            '/eca-cash-pools/':proxyTable,
            '/fa-capital-pools/':proxyTable,
            '/instructions/':proxyTable,
            '/instruction-baskets/':proxyTable,
            '/instructions-self/':proxyTable,
            '/entrusts/':proxyTable,
            '/entrusts-self/':proxyTable
        },
        cssSourceMap: false
    }
}