package com.winsigns.investment.webGateway.http.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeType;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Created by wfl on 17-4-5.
 */
@Service
public class InvestService extends rootService{

    @Autowired
    FundService fundService;
    
    /*
     * fulin.wang at 2017-04-12
     * 对指令列表进行处理
     * */
    public JsonNode handleInstruct(ObjectNode node){
    	if (node.get("_embedded")==null){
            return objectMapper.createObjectNode();
        }

        ArrayNode jsonNode = node.with("_embedded").withArray("instructions");

        for(JsonNode item:jsonNode){
            if(item.getNodeType() == JsonNodeType.OBJECT) {
                ObjectNode instruct = (ObjectNode) item;
                instruct.put("editer",false);
                instruct.put("selected",false);
                instruct.put("showOpbutton",false);
                instruct.put("securityCode","600000");
                instruct.put("securityName","浦发银行");
                instruct.put("market","上海交易所");
                instruct.put("price","19.80");
                ObjectNode portfNode = fundService.getPortfById(instruct.get("portfolioId"));
                if(portfNode != null){
                    instruct.setAll(portfNode);
                }
            }

        }
		return jsonNode;
    }
    /*
     * fulin.wang at 2017-04-12
     * 获取所有指令
     * */
    public JsonNode getAllInstruct(){       
        ObjectNode node = this.getNode(loadBalancer.choose(invest_SERVICE).getUri() + "/instructions?investManagerId=123456");     
        return handleInstruct(node);//jsonNode;
    }

    /*
     * fulin.wang at 2017-04-12
     * 根据Id获取单条指令
     * */
    public ObjectNode getInstructById(String instructionId){
    	ObjectNode node = this.getNode(loadBalancer.choose(invest_SERVICE).getUri() +
                "/instructions/"+instructionId);
        
        if (node!=null){
            ObjectNode portfNode = fundService.getPortfById(node.get("portfolioId"));
            if(portfNode != null) {
                node.setAll(portfNode);
            }
            node.put("editer",false);
            node.put("selected",false);
        }
        return node;     
    }
    
    /*
     * fulin.wang at 2017-04-12
     * 获取篮子下所有指令
     * */
    public JsonNode getBasketInstructById(String instructionId){
    	ObjectNode node = this.getNode(loadBalancer.choose(invest_SERVICE).getUri() +
                "/instruction-baskets/"+instructionId);
        return handleInstruct(node); 
    }
}
