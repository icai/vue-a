/**
 * Created by fulin.wang on 17-3-29.
 * remark:Mutations Types
 */
/**
 * 投资决策事件通知
 * */
export const INVEST_CREAT_INTRUST = 'INVEST/INVEST_CREAT_INTRUST'//创建指令
export const INVEST_GET_INSTRUCTDATA = 'INVEST/INVEST_GET_INSTRUCTDATA'//获取所有指令
export const INVEST_GET_FUNDTREE = 'INVEST/INVEST_GET_FUNDTREE'//获得产品树
export const INVEST_FORM_FUNDPORTF = 'INVEST/INVEST_FORM_FUNDPORTF'//基金产品
export const INVEST_FORM_SECURITY = 'INVEST/INVEST_FORM_SECURITY'//投资标的
export const INVEST_FORM_TRADERTYPE = 'INVEST/INVEST_FORM_TRADERTYPE'//交易类型
export const INVEST_FORM_CURRENCY = 'INVEST/INVEST_FORM_CURRENCY'//币种
export const INVEST_FORM_COSTPRICE  = 'INVEST/INVEST_FORM_COSTPRICE'//成本价
export const INVEST_FORM_QTY = 'INVEST/INVEST_FORM_QTY'//数量
export const INVEST_FORM_AMOUNT = 'INVEST/INVEST_FORM_AMOUNT'//金额
export const INVEST_FORM_VOLUMETYPE = 'INVEST/INVEST_FORM_VOLUMETYPE'//金额or数量(FixedType:数量;AmountType:金额)
export const INVEST_FORM_FOCUS = 'INVEST/INVEST_FORM_FOCUS'//当前输入项
export const INVEST_SET_SEARCHDATA = 'INVEST/INVEST_SET_SEARCHDATA'//设置搜索数据
export const INVEST_SET_FORMDATA = 'INVEST/INVEST_SET_FORMDATA'//设置表单数据
export const INVEST_SET_OPBUTTONSTATUS = 'INVEST/INVEST_SET_OPBUTTONSTATUS'//设置操作按钮状态
export const INVEST_SET_EDITSTATUS = 'INVEST/INVEST_SET_EDITSTATUS'//指令编辑状态
export const INVEST_SET_SELECTSTATUS = 'INVEST/INVEST_SET_SELECTSTATUS'//切换选中状态
export const INVEST_SET_MAIN_STATUS = 'INVEST/INVEST_SET_MAIN_STATUS'//当日指令切换状态（指令/篮子明细）
export const INVEST_SET_BAKSET_INFO = 'INVEST/INVEST_SET_BAKSET_INFO'//设置当前篮子信息
export const INVEST_UPDATE_INSTRUCT_SINGLE = 'INVEST/INVEST_UPDATE_INSTRUCT_SINGLE'//更新当前指令
export const INVEST_UPDATE_INSTRUCT_STATUS = 'INVEST/INVEST_UPDATE_INSTRUCT_STATUS'//更新当前指令状态

/**
 * 交易员事件通知
 * */
export const TRADER_CREATE_ENTRUSTS = 'TRADER/TRADER_CREATE_ENTRUSTS'//创建委托
export const TRADER_GET_INSTRUCTS = 'TRADER/TRADER_GET_INSTRUCTS'//获取指令
export const TRADER_GET_BASKETINSTRUCTS = 'TRADER/TRADER_GET_BASKETINSTRUCTS'//获取篮子指令
export const TRADER_GET_ENTRUSTS = 'TRADER/TRADER_GET_ENTRUSTS'//获取委托信息
export const TRADER_GET_DONE = 'TRADER/TRADER_GET_DONE'//获取成交信息
export const TRADER_SET_BASKETEXPAND = 'TRADER/TRADER_SET_BASKETEXPAND'//篮子展开与折叠
export const TRADER_SET_SELECTEDINSTRUCT = 'TRADER/TRADER_SET_SELECTEDINSTRUCT'//选中的指令
export const TRADER_SET_SELECTEDSTATUS = 'TRADER/TRADER_SET_SELECTEDSTATUS'//设置指令选中状态
export const TRADER_SET_SINGLE_SELECTED = 'TRADER/TRADER_SET_SINGLE_SELECTED'//设置委托单选状态
export const TRADER_SET_EDITSTATUS = 'TRADER/TRADER_SET_EDITSTATUS'//设置编辑状态
export const TRADER_FORM_TRADERTYPE = 'TRADER/TRADER_FORM_TRADERTYPE'//买卖类型
export const TRADER_FORM_BROKERAGEFIRM = 'TRADER/TRADER_FORM_BROKERAGEFIRM'//经纪公司
export const TRADER_FORM_ENTRUSTQUANTITY = 'TRADER/TRADER_FORM_ENTRUSTQUANTITY'//委托量
export const TRADER_FORM_PRICETYPE = 'TRADER/TRADER_FORM_PRICETYPE'//价格类型
export const TRADER_FORM_ENTRUSTPRICE = 'TRADER/TRADER_FORM_ENTRUSTPRICE'//委托价格
export const TRADER_SET_FORMDATA = 'TRADER/TRADER_SET_FORMDATA'//设置表单数据
export const TRADER_ADD_DONE = 'TRADER/TRADER_ADD_DONE'//添加成交数据