/**
 * Created by fulin.wang on 17-4-19.
 * directives
 */
import Vue from 'vue'

/*
* created by fulin.wang
* 焦点
* */
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    bind: function (el) {
        // 聚焦元素
        el.focus()
    }
})

/*
 * created by fulin.wang
 * 搜索字体变色
 * */
Vue.directive('search',function(el, binding){
    var elVal = el.innerText;
    var searchVal = binding.value;
    var newSpan = '<span class="text-warning">'+searchVal+'</span>'
    elVal = elVal.replace(searchVal,newSpan)
    el.innerHTML = elVal;
})

