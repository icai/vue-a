package com.winsigns.investment.webGateway.http.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.winsigns.investment.webGateway.http.service.EntrustService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/entrusts-self")
public class EntrustController {

	@Autowired
	EntrustService entrustService;


	@GetMapping
	public JsonNode getEntrust(@RequestParam Long instructionId){
		return entrustService.getEntrust(instructionId);
	}
	
	@GetMapping("/{entrustId}")
	public JsonNode getEntrustById(@PathVariable String entrustId){
		return entrustService.getEntrustById(entrustId);
	}

}
