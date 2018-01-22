package com.winsigns.investment.webGateway.http.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeType;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Created by wfl on 17-4-17.
 */
@Service
public class EntrustService extends rootService{
    
    /*
     * fulin.wang at 2017-04-17
     * 对委托列表进行处理
     * */
    public JsonNode handleEntrust(ObjectNode node){
    	if (node.get("_embedded")==null){
            return objectMapper.createObjectNode();
        }

        ArrayNode jsonNode = node.with("_embedded").withArray("entrusts");
        for(JsonNode item:jsonNode){
            if(item.getNodeType() == JsonNodeType.OBJECT) {
                ObjectNode entrust = (ObjectNode) item;
                entrust.put("editer",false);     
                entrust.put("selected",false);
            }

        }
		return jsonNode;
    }
    /*
     * fulin.wang at 2017-04-17
     * 获取指令下所有委托
     * */
    public JsonNode getEntrust(Long instructionId){ 
        ObjectNode node = this.getNode(loadBalancer.choose(trade_SERVICE).getUri() + "/entrusts?instructionId="+instructionId);         
        return handleEntrust(node);
    }
    
    /*
     * fulin.wang at 2017-04-17
     * 查询单条委托
     * */
    public JsonNode getEntrustById(String entrustId){ 
        ObjectNode node = this.getNode(loadBalancer.choose(trade_SERVICE).getUri() + "/entrusts/"+entrustId); 
        if (node!=null){          
            node.put("editer",false);
            node.put("selected",false);
        }
        return node;
    }
}
