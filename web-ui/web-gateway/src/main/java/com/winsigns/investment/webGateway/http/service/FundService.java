package com.winsigns.investment.webGateway.http.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * Created by wfl on 17-4-5.
 */
@Service
public class FundService extends rootService{

    private static String FUND_SERVICE = "fund-service";
  
    public ObjectNode getPortfById(JsonNode portfId){
        if(portfId.isNull()){
            return null;
        }       
        ObjectNode rNode = objectMapper.createObjectNode();
        ObjectNode node = this.getNode(loadBalancer.choose(FUND_SERVICE).getUri() + "/portfolios/" + portfId.asText()); 
		rNode.set("portfolioName",node.get("name"));
		//产品账户
		ObjectNode fundAccNode = this.getNodeLink(node.get("_links").get("fund-account").get("href").asText());
		rNode.set("fundAccId",fundAccNode.get("id"));
		rNode.set("fundAccName",fundAccNode.get("name"));
		//基金产品
		ObjectNode fundNode = this.getNodeLink(fundAccNode.get("_links").get("fund").get("href").asText());
		rNode.set("fundId",fundNode.get("id"));
		rNode.set("fundName",fundNode.get("shortName"));
		return rNode;
    }
}

