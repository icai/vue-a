/**
 * Created by fulin.wang on 17-4-19.
 * filters
 */
import Vue from 'vue'

/*
* 时间过滤器
* value为13位的时间戳
* */
Vue.filter('time', function (value) {
    function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '.' + add0(m) + '.' + add0(d);
});

