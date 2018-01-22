package com.winsigns.investment.webGateway.http.service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class rootService {
	private static final String URI_PATTERN = "(https?|ftp|file)(://)([^/]*)(/.*)";
	protected static String invest_SERVICE = "invest-service";
	protected static String trade_SERVICE = "trade-service";

	protected ObjectMapper objectMapper = new ObjectMapper().configure(
            DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false
    );
	
    @Autowired
    protected LoadBalancerClient loadBalancer;

    @Autowired
    protected RestOperations restTemplate;
   
    /*
     * fulin.wang at 2017-04-12
     * 传入url获取ObjectNode
     * */
	public ObjectNode getNodeLink(String url){
    	RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		//Assert.state(requestAttributes != null, REQUEST_ATTRIBUTES_MISSING);
		//Assert.isInstanceOf(ServletRequestAttributes.class, requestAttributes);
		HttpServletRequest servletRequest = ((ServletRequestAttributes) requestAttributes).getRequest();
		//Assert.state(servletRequest != null, "Could not find current HttpServletRequest");
		HttpHeaders reponseHeaders = new HttpHeaders();
        reponseHeaders.set("accept-language",servletRequest.getHeader("accept-language"));
        ObjectNode node = null;
        try {
        	Pattern p = Pattern.compile(URI_PATTERN);
    	    Matcher matcher = p.matcher(url);
    	    if (matcher.matches()) {
    	        String urlh = matcher.group(3);
    	        String urlb =  matcher.group(4);
    	    
	            RequestEntity<String> request = new RequestEntity<String>(reponseHeaders,HttpMethod.GET,
	            		new URI(loadBalancer.choose(urlh).getUri()+urlb));
	            ResponseEntity<String> resultStr =restTemplate.exchange(request,String.class);	            	           
	            node = objectMapper.readerFor(JsonNode.class).readValue(resultStr.getBody());
    	    }
            return node;            
        } catch(IOException e){
            throw new RuntimeException(e);
        } catch(URISyntaxException e){
        	throw new RuntimeException(e);
        }
	}
      
    /*
     * fulin.wang at 2017-04-12
     * 传入url获取ObjectNode
     * */
	public ObjectNode getNode(String url){
    	RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		//Assert.state(requestAttributes != null, REQUEST_ATTRIBUTES_MISSING);
		//Assert.isInstanceOf(ServletRequestAttributes.class, requestAttributes);
		HttpServletRequest servletRequest = ((ServletRequestAttributes) requestAttributes).getRequest();
		//Assert.state(servletRequest != null, "Could not find current HttpServletRequest");
		HttpHeaders reponseHeaders = new HttpHeaders();
        reponseHeaders.set("accept-language",servletRequest.getHeader("accept-language"));
        try {
            RequestEntity<String> request = new RequestEntity<String>(reponseHeaders,HttpMethod.GET,
            		new URI(url));
            ResponseEntity<String> resultStr =restTemplate.exchange(request,String.class);
            
            ObjectNode node = null;
            node = objectMapper.readerFor(JsonNode.class).readValue(resultStr.getBody());
            return node;
        } catch(IOException e){
            throw new RuntimeException(e);
        } catch(URISyntaxException e){
        	throw new RuntimeException(e);
        }
	}
	
	public <T> ObjectNode getNode(T body, String url){
    	RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		//Assert.state(requestAttributes != null, REQUEST_ATTRIBUTES_MISSING);
		//Assert.isInstanceOf(ServletRequestAttributes.class, requestAttributes);
		HttpServletRequest servletRequest = ((ServletRequestAttributes) requestAttributes).getRequest();
		//Assert.state(servletRequest != null, "Could not find current HttpServletRequest");
		HttpHeaders reponseHeaders = new HttpHeaders();
        reponseHeaders.set("accept-language",servletRequest.getHeader("accept-language"));
        try {
            RequestEntity<T> request = new RequestEntity<T>(body,reponseHeaders,HttpMethod.GET,
            		new URI(url));
            ResponseEntity<String> resultStr =restTemplate.exchange(request,String.class);
            
            ObjectNode node = null;
            node = objectMapper.readerFor(JsonNode.class).readValue(resultStr.getBody());
            return node;
        } catch(IOException e){
            throw new RuntimeException(e);
        } catch(URISyntaxException e){
        	throw new RuntimeException(e);
        }
	}
}
