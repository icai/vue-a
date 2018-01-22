/**
 * Created by fulin.wang on 17-3-29.
 * remark:投资决策模块
 * 异步操作请放在actions,组件通过dispatch通知
 * 同步操作一般放在mutations,用commit提交
 */
import * as types from '../types'

import ds from '../../common/ds'
import api from '../../common/api'
/*状态（数据）*/
const state = {
    mainStatus:'0',//0:指令/1:篮子明细
    instructData: [],//指令数据
    fundTreeData:[],// fund tree
    traderTypeList:[],//买卖类型下拉
    currencyList:[],
    searchData: '',//搜索
    formData:{
        fundPortf:[],
        security: '',
        traderType: '',
        investService:'',
        investType:'',
        currency: '',
        costPrice: 0,
        quantity: 0,
        amount: 0,
        volumeType:'',
        focus:''
    },
    currBasketInfo:[]
}

/*getters,相当于component的computed*/
const getters = {
    invest_main_status: state => state.mainStatus,
    invest_fund_tree: state => state.fundTreeData,
    invest_edit_data_fundTree: state => state.formData.fundPortf
}

/*mutations,更改状态*/
const mutations = {
    [types.INVEST_UPDATE_INSTRUCT_SINGLE] (state, item){
        for (var i=0;i<=state.instructData.length-1;i++){
            if (state.instructData[i].id==item.item.id){
                state.instructData[i].portfolioId = item.item.portfolioId;
                state.instructData[i].securityId = item.item.securityId;
                state.instructData[i].investService = item.item.investService;
                state.instructData[i].investType = item.item.investType;
                state.instructData[i].investManagerId = item.item.investManagerId;
                state.instructData[i].costPrice = item.item.costPrice;
                state.instructData[i].currency = item.item.currency;
                state.instructData[i].quantity = item.item.quantity;
                state.instructData[i].amount = item.item.amount;
                state.instructData[i].volumeType = item.item.volumeType;
                state.instructData[i].errors = item.item.errors;
                return;
            }

        }
    },
    [types.INVEST_SET_MAIN_STATUS] (state){
        state.mainStatus = state.mainStatus=='0'?'1':'0'
    },
    /*获取指令数据*/
    [types.INVEST_GET_INSTRUCTDATA] (state, { data }){
        state.instructData = data.length>0?data:[];
    },
    [types.INVEST_CREAT_INTRUST] (state, { data }){
        if (data){
            data.editer = true;
            state.instructData.splice(0,0,data);
        }
    },
    [types.INVEST_UPDATE_INSTRUCT_STATUS] (state, { item }){
        for (var i=0;i<=state.instructData.length-1;i++){
            if (state.instructData[i].id==item.id){
                state.instructData[i].executionStatus = item.executionStatus
                state.instructData[i].executionStatusLabel = item.executionStatusLabel
                return;
            }

        }
    },
    [types.INVEST_SET_EDITSTATUS] (state, { item }){
        for (var i=0;i<state.instructData.length;i++){
            state.instructData[i].editer = false;
        }
        item.item.editer = item.editer;
    },
    [types.INVEST_SET_SELECTSTATUS] (state, { item }){
        item.item.selected = item.selected;
    },
    [types.INVEST_SET_OPBUTTONSTATUS] (state, { item }){
        item.item.showOpbutton = item.showOpbutton;
    },
    [types.INVEST_GET_FUNDTREE] (state, { fundTree }){
        state.fundTreeData = fundTree;
    },
    //修改草稿
    [types.INVEST_FORM_FUNDPORTF] (state, value){
        state.formData.fundPortf = value;
    },
    [types.INVEST_FORM_SECURITY] (state, value){
        state.formData.security = value;
    },
    [types.INVEST_FORM_TRADERTYPE] (state, value){
        //拆分
        let str = value.split('.');
        state.formData.traderType = value;
        if (str.length >1){
            state.formData.investService = str[0];
            state.formData.investType = str[1];
        }
    },
    [types.INVEST_FORM_COSTPRICE] (state, value){
        state.formData.costPrice = value;
    },
    [types.INVEST_FORM_CURRENCY] (state, value){
        state.formData.currency = value;
    },
    [types.INVEST_FORM_QTY] (state, value){
        state.formData.quantity = value;
    },
    [types.INVEST_FORM_AMOUNT] (state, value){
        state.formData.amount = value;
    },
    [types.INVEST_FORM_VOLUMETYPE] (state, value){
        state.formData.volumeType = value;
    },
    [types.INVEST_FORM_FOCUS] (state, value){
        state.formData.focus = value;
    },
    [types.INVEST_SET_FORMDATA] (state, item){
        //设置下拉框
        state.traderTypeList = [];
        console.log(item)
        for (var i=0;i<item.item.supportedInvestService.length;i++) {
            state.traderTypeList.push(item.item.supportedInvestService[i])
        };
        state.currencyList = [];
        for (var i=0;i<item.item.supportedCurrencies.length;i++) {
            state.currencyList.push(item.item.supportedCurrencies[i])
        }
        //表单数据
        let fundId = item.item.fundId ? item.item.fundId:0;
        let fundAccId = item.item.fundAccId ? item.item.fundAccId:0;
        let portfolioId = item.item.portfolioId ? item.item.portfolioId:0;
        state.formData.fundPortf = [fundId,fundAccId,portfolioId];
        if (state.formData.focus!='security'){
            state.formData.security = item.item.securityId;
        }
        state.formData.traderType = (item.item.investService && item.item.investType)
            ? item.item.investService + '.' + item.item.investType : '';
        if (state.formData.focus!='costPrice') {
            state.formData.costPrice = item.item.costPrice;
        }
        state.formData.currency = item.item.currency;
        if (state.formData.focus!='qty') {
            state.formData.quantity = item.item.quantity;
        }
        if (state.formData.focus!='amount') {
            state.formData.amount = item.item.amount;
        }
        state.formData.volumeType = item.item.volumeType;
    },
    [types.INVEST_SET_BAKSET_INFO] (state, item){
        state.currBasketInfo = item.item;
    },
    [types.INVEST_SET_SEARCHDATA] (state, value){
        state.searchData = value;
    }

}

const actions = {
    invest_getInstructData: ({commit}) => {
        return new Promise((resolve, reject) => {
            ds.GET({
                url: api.invest.instructSelfURL(""),
                data: {}
            }, function (data) {
                commit(types.INVEST_GET_INSTRUCTDATA, {data: data});
                resolve()
            })
        })

    },
    invest_getBasketInstructData: ({commit,state}) => {
        return new Promise((resolve, reject) => {
            ds.GET({
                url: api.invest.basketInstructAllSelfURL(state.currBasketInfo.id),
                data: {}
            }, function (data) {
                commit(types.INVEST_GET_INSTRUCTDATA, {data: data});
                resolve()
            })
        })

    },
    invest_createInstruct: ({commit}) => {
        return new Promise((resolve, reject) => {
            ds.POST({
                url: api.invest.instructURL(""),
                data: {"investManagerId":"123456"}
            }, function (data) {
                if (data){
                    ds.GET({
                        url: api.invest.instructSelfURL(data.id),
                        data: {}
                    }, function (createData) {
                        commit(types.INVEST_SET_FORMDATA,{item: createData})
                        commit(types.INVEST_CREAT_INTRUST, {data: createData});
                    })
                    resolve()
                }

            })
        })
    },
    invest_createBasket: ({commit}) => {
        return new Promise((resolve, reject) => {
            ds.POST({
                url: api.invest.basketURL(""),
                data: {"investManagerId":123456}
            }, function (data) {
                if (data){
                    ds.GET({
                        url: api.invest.instructSelfURL(data.id),
                        data: {}
                    }, function (createData) {
                        commit(types.INVEST_SET_FORMDATA,{item: createData})
                        commit(types.INVEST_CREAT_INTRUST, {data: createData});
                    })
                    resolve()
                }

            })
        })
    },
    invest_createBasketInstruct: ({commit, state}, item) => {
        return new Promise((resolve, reject) => {
            ds.POST({
                url: api.invest.basketInstructURL(state.currBasketInfo.id),
                data: {"investManagerId":"123456"}
            }, function (data) {
                if (data){
                    ds.GET({
                        url: api.invest.instructSelfURL(data.id),
                        data: {}
                    }, function (createData) {
                        commit(types.INVEST_SET_FORMDATA,{item: createData})
                        commit(types.INVEST_CREAT_INTRUST, {data: createData});
                    })
                    resolve()
                }
            })
        })
    },
    invest_updateInstruct: ({commit,state},item)  => {
        ds.PUT({
            url:api.invest.instructURL(item.item.id),
            data: func.assemInstructJson()
        },function (data) {
            ds.GET({
                url: api.invest.instructSelfURL(item.item.id),
                data: {}
            }, function (updata) {
                console.log(updata)
                commit(types.INVEST_SET_FORMDATA,{item:updata});
                commit(types.INVEST_UPDATE_INSTRUCT_SINGLE,{item:updata})
            })
        })
    },
    invest_deleteInstruct: ({commit,state}) => {
        return new Promise((resolve, reject) => {
            var instructId = [];
            for (var i=0;i<=state.instructData.length-1;i++){
                if (state.instructData[i].selected==true){
                    instructId.push(state.instructData[i].id)
                }
            }
            if (instructId.length>0){
                ds.POST({
                    url:api.invest.deleteInstructURL(),
                    data: {
                            "instructionIds":instructId
                        }
                },function (data) {
                    resolve()
                })
            }
        })
    },
    invest_commitInstruct: ({commit}, item) => {
        return new Promise((resolve, reject) => {
            ds.POST({
                url:api.invest.commitInstruct(item.item.id),
                data: {}
            },function (data) {
                ds.GET({
                    url: api.invest.instructSelfURL(data.id),
                    data: {}
                }, function (singleData) {
                    commit(types.INVEST_UPDATE_INSTRUCT_STATUS,{item:singleData});
                })
                resolve()
            })
        })
    },
    invest_setEditStatus: ({commit},item) => {
        commit(types.INVEST_SET_EDITSTATUS, {item:item})
        commit(types.INVEST_SET_FORMDATA,{item:item.item})
    },
    invest_setSelectStatus: ({commit},item) => {
        commit(types.INVEST_SET_SELECTSTATUS, {item:item})
    },
    invest_fundTree:({commit}) =>{
        ds.GET({
            url: api.fund.fundTreeURL(),
            data: {}
        }, function (data) {
            var tempData = data._embedded['funds'];
            if (!tempData){ return ;}
            var fundTree = [];
            tempData.forEach(function(fundItems){
                var tempFundAccData = [];
                fundItems._embedded['fundAccounts'].forEach(function (fundAccItems) {
                    var tempPortfData = [];
                    fundAccItems._embedded['portfolios'].forEach(function(portfItems){
                        tempPortfData.push(portfItems)
                    })
                    tempFundAccData.push({
                        "value":fundAccItems.value,
                        "label":fundAccItems.label,
                        "children":tempPortfData
                    })
                })
                fundTree.push({
                    "value":fundItems.value,
                    "label":fundItems.label,
                    "children":tempFundAccData
                })
            })
            commit(types.INVEST_GET_FUNDTREE, {fundTree});
        })
    }
}

var func = {
    /*
    * post\put时的参数
    * */
    assemInstructJson: function (item) {
        return {
            portfolioId:state.formData.fundPortf[2]!=0?state.formData.fundPortf[2]:'',
            securityId: state.formData.security,
            investService:state.formData.investService,
            investType:state.formData.investType,
            investManagerId:'123456',
            costPrice: state.formData.costPrice,
            currency: state.formData.currency,
            quantity: state.formData.quantity,
            amount: state.formData.amount,
            volumeType: state.formData.volumeType
        }
    },
    /*
    * 修改本地指令数据
    * */
    updateInstructSingle: function (dest, src) {
        dest.portfolioId = src.portfolioId;
        dest.securityId = src.securityId;
        dest.investService = src.investService;
        dest.investType = src.investType;
        dest.investManagerId = src.investManagerId;
        dest.costPrice = src.costPrice;
        dest.currency = src.currency;
        dest.quantity = src.quantity;
        dest.amount = src.amount;
        dest.volumeType = src.volumeType;
        dest.errors = '123';//src.errors;
        this.$set(dest,errors,'123333');
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}