export default {
    /*
    * created by fulin.wang at 2017-04-17
    * 对象的深拷贝
    * */
    copyObject(p, c) {
        c = c || {};
        for (var i in p) {
            // 属性i是否为p对象的自有属性
            if (p.hasOwnProperty(i)) {
                // 属性i是否为复杂类型
                if (typeof p[i] === 'object') {
                    // 如果p[i]是数组，则创建一个新数组
                    // 如果p[i]是普通对象，则创建一个新对象
                    c[i] = Array.isArray(p[i]) ? [] : {};
                    // 递归拷贝复杂类型的属性
                    this.copyObject(p[i], c[i]);
                } else {
                    // 属性是基础类型时，直接拷贝
                    c[i] = p[i];
                }
            }
        }
        return c;
    },
    /*
    * created by fulin.wang at 2017-04-24
    * 去掉主机和端口号后的URL
    * */
    getUrlPath(url){
        var arrObj = url.split('//');
        if (arrObj.length > 1){
            return arrObj[1].substring(arrObj[1].indexOf('/')+1);
        }
        return url
    },
    setCookie(c_name, value, expiredays){
        var exdate = new Date();

        exdate.setDate(exdate.getDate() + 3);
        var se = (c_name + "=" + value + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()))
        document.cookie = se;
        console.log(document.cookie)
    },
    getCookie(name) {
        //return document.cookie;
        var arr, reg = new RegExp(name);
        if (arr = document.cookie.match(reg))
            return (arr[0]);
        else
            return null;
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};
