/**
 * Created by wfl on 17-4-17.
 */
import * as types from '../types'
import Vue from 'vue'

import ds from '../../common/ds'
import api from '../../common/api'
/*状态（数据）*/
const state = {
    instructs:[],//指令数据
    entrusts:[],//委托数据
    traderTypeList:[],//交易类型下拉
    priceTypeList:[],//价格类型
    selectedInstruct:[],//选中的指令
    formData:{
        priceType:'',//价格类型
        entrustPrice:0,//委托价格
        traderType:'',//交易类型
        tradeService: '',　//买卖类型
        tradeType:'',//
        brokerageFirm: '',　//经纪公司
        entrustQuantity:0　//委托量
    },
    doneList:[]//成交列表
}

/*getters,相当于component的computed*/
const getters = {

}

/*mutations,更改状态*/
const mutations = {
    /*创建委托*/
    [types.TRADER_CREATE_ENTRUSTS] (state, { data }){
        for (var i=0;i<state.entrusts.length;i++){
            state.entrusts[i].editer = false;
        }
        if (data){
            data.editer = true;
            state.entrusts.splice(0,0,data);
        }
    },
    /*获取指令*/
    [types.TRADER_GET_INSTRUCTS] (state, { data }){
        state.instructs = data.length>0?data:[];
    },
    /*获取篮子指令*/
    [types.TRADER_GET_BASKETINSTRUCTS] (state, item){
        Vue.set(item.item,'detail',item.data);
    },
    /*篮子展开与折叠*/
    [types.TRADER_SET_BASKETEXPAND] (state, { item }){
        Vue.set(item,'expand',!item.expand);
    },
    /*获取委托*/
    [types.TRADER_GET_ENTRUSTS] (state, { data }){
        state.entrusts = data.length>0?data:[];
    },
    /*选中指令*/
    [types.TRADER_SET_SELECTEDINSTRUCT] (state, { item }){
        state.selectedInstruct = item;
    },
    /*设置指令选中状态*/
    [types.TRADER_SET_SELECTEDSTATUS] (state, item){
        for (var i=0;i<state.instructs.length;i++){
            state.instructs[i].selected = false;
            if (state.instructs[i].detail){
                for (var j=0;j<state.instructs[i].detail.length;j++){
                    state.instructs[i].detail[j].selected = false;
                }
            }
        }
        Vue.set(item.item,'selected',item.selected);
    },
    /*设置委托单选状态*/
    [types.TRADER_SET_SINGLE_SELECTED] (state, item){
        for (var i=0;i<state.entrusts.length;i++){
            state.entrusts[i].selected = false;
        }
        item.item.selected = item.selected;
    },
    /*设置编辑状态*/
    [types.TRADER_SET_EDITSTATUS] (state, {item}){
        for (var i=0;i<state.entrusts.length;i++){
            state.entrusts[i].editer = false;
        }
        item.item.editer = item.editer;
    },
    [types.TRADER_FORM_TRADERTYPE] (state, value){
        let str = value.split('.');
        state.formData.traderType = value;
        if (str.length >1){
            state.formData.tradeService = str[0];
            state.formData.tradeType = str[1];
        }
    },
    [types.TRADER_FORM_BROKERAGEFIRM] (state, value){
        state.formData.brokerageFirm = value;
    },
    [types.TRADER_FORM_ENTRUSTQUANTITY] (state, value){
        state.formData.entrustQuantity = value;
    },
    [types.TRADER_FORM_PRICETYPE] (state, value){
        state.formData.priceType = value;
    },
    [types.TRADER_FORM_ENTRUSTPRICE] (state, value){
        state.formData.entrustPrice = value;
    },
    [types.TRADER_SET_FORMDATA] (state, item){
        //设置下拉框
        state.traderTypeList = [];
        if (item.item.supportedTradeService){
            for (var i=0;i<item.item.supportedTradeService.length;i++) {
                state.traderTypeList.push(item.item.supportedTradeService[i])
            };
        }
        state.priceTypeList = [];
        if (item.item.supportPriceType){
            for (var i=0;i<item.item.supportPriceType.length;i++) {
                state.priceTypeList.push(item.item.supportPriceType[i])
            };
        }
        state.formData.priceType = item.item.priceType;
        state.formData.entrustPrice = item.item.entrustPrice;
        state.formData.traderType = (item.item.tradeService && item.item.tradeType)
            ? item.item.tradeService + '.' + item.item.tradeType : '';
        //表单数据
        state.formData.brokerageFirm = item.item.brokerageFirmId;
        state.formData.entrustQuantity = item.item.entrustQuantity;
    },
    [types.TRADER_ADD_DONE] (state){
        state.doneList.splice(0,0,{
            editer: true,
            donePrice:0,
            doneQty:0
        });
    },
    /*获取成交*/
    [types.TRADER_GET_DONE] (state,  data){
        state.doneList = data;
    }
}

const actions = {
    trader_getInstructs: ({commit,state}) => {
        return new Promise((resolve, reject) => {
            ds.GET({
                url: api.invest.instructSelfURL(""),
                data: {'traderId':'123456'}
            }, function (data) {
                commit(types.TRADER_GET_INSTRUCTS, {data: data});
                resolve()
            })
        })

    },
    trader_getBasketInstructData: ({commit,state},item) => {
        return new Promise((resolve, reject) => {
            ds.GET({
                url: api.invest.basketInstructAllSelfURL(item.id),
                data: {}
            }, function (data) {
                commit(types.TRADER_GET_BASKETINSTRUCTS, {item:item,data: data});
                resolve()
            })
        })

    },
    trader_getEntrusts: ({commit,state}) => {
        var instructId = state.selectedInstruct.id?state.selectedInstruct.id:'';
        if (instructId=='') {return true;}
        return new Promise((resolve, reject) => {
            ds.GET({
                url: api.trader.entrustSelfURL(""),
                data: {'instructionId':instructId}
            }, function (data) {
                commit(types.TRADER_GET_ENTRUSTS, {data: data});
                resolve()
            })
        })

    },
    trader_createEntrust: ({commit,state}) =>{
        var instructId = state.selectedInstruct.id?state.selectedInstruct.id:'';
        if (instructId=='') {return true;}
        return new Promise((resolve, reject) => {
            ds.POST({
                url: api.trader.entrustURL(""),
                data: {"instructionId": instructId}
            }, function (data) {
                if (data){
                    ds.GET({
                        url: api.trader.entrustSelfURL(data.id),
                        data: {}
                    }, function (createData) {
                        commit(types.TRADER_CREATE_ENTRUSTS, {data: createData});
                        commit(types.TRADER_SET_FORMDATA, {item: createData});
                        resolve()
                    })
                }
            })
        })
    },
    trader_updateEntrust: ({commit,state},item)  => {
        ds.PUT({
            url:api.trader.entrustURL(item.item.id),
            data: func.assemEntrustJson(item)
        },function (data) {
            if (data){
                ds.GET({
                    url: api.trader.entrustSelfURL(data.id),
                    data: {}
                }, function (updateData) {
                    commit(types.TRADER_SET_FORMDATA, {item: updateData});
                })
            }
        })
    },
    trader_deleteEntrust: ({commit,state})  => {
        var entrustId ='';
        for (var i=0;i<state.entrusts.length;i++){
            if (state.entrusts[i].selected == true){
                entrustId = state.entrusts[i].id;
                break;
            }
        }
        if (entrustId==''){return}
        return new Promise((resolve, reject) => {
            ds.DELETE({
                url: api.trader.entrustURL(entrustId),
                data: {}
            }, function (data) {
                resolve();
            })
        });
    },
    trader_setEditStatus: ({commit},item) => {
        commit(types.TRADER_SET_EDITSTATUS, {item: item})
        commit(types.TRADER_SET_FORMDATA, {item: item.item})
    },
    trader_addDone:({commit}, item)=>{
        return new Promise((resolve, reject) => {
            ds.POST({
                url: api.trader.doneUrl(item.entrust.id),
                data: {
                    "donePrice": item.item.donePrice,
                    "doneQuantity": item.item.doneQty
                }
            }, function (data) {
                ds.GET({
                    url: api.trader.entrustSelfURL(item.entrust.id),
                    data: {}
                }, function (doneData) {
                    if (doneData._embedded) {
                        commit(types.TRADER_GET_DONE, doneData._embedded.dones);
                    }
                    resolve();
                })
            })
        });
    },
    trader_getDone:({commit}, item)=>{
        commit(types.TRADER_GET_DONE, []);
        ds.GET({
            url: api.trader.entrustSelfURL(item.id),
            data: {}
        }, function (data) {
            if (data._embedded){
                commit(types.TRADER_GET_DONE, data._embedded.dones);
            }

        })
    }
}

var func = {
    /*
     * post\put时的参数
     * */
    assemEntrustJson: function (item) {
        return {
            brokerageFirmId:state.formData.brokerageFirm,
            currency: null,
            entrustPrice: state.formData.entrustPrice,
            entrustQuantity: state.formData.entrustQuantity,
            instructionId:item.instructionId,
            priceType: state.formData.priceType,
            securityId: item.securityId,
            tradeService: state.formData.tradeService,
            tradeType:state.formData.tradeType
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
