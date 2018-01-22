/**
 * Created by wfl on 17-4-5.
 */
export default {
    invest:{
        /*单条指令(gateway)*/
        instructSelfURL: function (instructId) {
            return "instructions-self/"+instructId
        },
        /*篮子下面的指令*/
        basketInstructAllSelfURL: function (baskeId) {
            return "instructions-self/baskets/"+baskeId
        },
        /*单条指令*/
        instructURL: function (instructId) {
            return "instructions/"+instructId
        },
        deleteInstructURL: function () {
            return "instructions/deletes"
        },
        /*篮子*/
        basketURL: function(baskeId){
            return "instruction-baskets/"+baskeId
        },
        /*篮子下指令*/
        basketInstructURL: function(baskeId){
            return "instruction-baskets/"+baskeId+'/instructions'
        },
        /*提交指令*/
        commitInstruct: function (instructId) {
            return "instructions/"+instructId+'/commit'
        }
    },
    trader:{
        entrustURL: function (entrustId) {
            return "entrusts/"+entrustId;
        },
        /*委托*/
        entrustSelfURL: function (entrustId) {
            return "entrusts-self/"+entrustId;
        },
        doneUrl: function (entrustId) {
            return "entrusts/"+entrustId+"/dones"
        }
    },
    fund:{
        /*基金产品*/
        fundURL: function (fundId) {
            return "funds/"+fundId;
        },
        fundAccountFromFundURL: function (fundId, fundAccId) {
            return "funds/"+fundId+"/fund-accounts/"+fundAccId;
        },
        fundAccountURL: function (fundAccId) {
            return "fund-accounts/"+fundAccId;
        },
        fundPortfFromFundacc: function (fundAccId, portfId) {
            return "fund-accounts/"+fundAccId+"/portfolios/"+portfId;
        },
        fundPortf: function (portfId) {
            return "portfolios/"+portfId;
        },
        fundTreeURL: function () {
            return "funds/tree"
        },
        ecaFromFundURL: function (fundId,ecaId) {
            return "funds/"+fundId+'/external-capital-accounts/'+ecaId;
        },
        ecaURL: function (ecaId) {
            return 'external-capital-accounts/'+ecaId;
        },
        /*资金账户类型*/
        ecaTypes: function () {
            return "external-capital-accounts/eca-types";
        },
        /*资金明细*/
        ecaCapitalDetailURL: function (id) {
            return "capital-details/"+id;
        },
        /*将资金转入产品账户*/
        allotEcaToFa: function (ecaCashPoolId) {
            return "eca-cash-pools/"+ecaCashPoolId+'/to-fa'
        },
        /*将产品账户的资金转入资金账户*/
        allotFaToEca: function (faCapitalPoolId) {
            return "fa-capital-pools/"+faCapitalPoolId+'/to-eca'
        }
    }
}