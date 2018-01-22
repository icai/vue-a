package com.winsigns.investment.webGateway.http.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.winsigns.investment.webGateway.http.service.InvestService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/instructions-self")
public class InvestController {

	@Autowired
	InvestService investService;

	@GetMapping
	public JsonNode getAllInstruct(String acceptLanguage) throws IOException{
		return investService.getAllInstruct();
	}

	@GetMapping("/{instructionId}")
	public ObjectNode getInstructById(@PathVariable String instructionId){
		return investService.getInstructById(instructionId);
	}
	
	@GetMapping("/baskets/{instructionId}")
	public JsonNode getBasketInstructById(@PathVariable String instructionId){
		return investService.getBasketInstructById(instructionId);
	}
}
