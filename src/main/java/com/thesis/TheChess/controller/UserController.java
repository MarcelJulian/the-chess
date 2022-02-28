package com.thesis.TheChess.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.thesis.TheChess.dto.CallbackOutput;
import com.thesis.TheChess.service.UserService;

@RestController
@RequestMapping(path = "/")
public class UserController {
	@Autowired
	UserService service;
	
	@GetMapping(path = "login-the-chess")
//	public ResponseEntity<Void> loginController(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
	public ResponseEntity<String> loginController(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		System.out.println("UserController - loginController START");
		
		String output = null;

		try {
			output = service.loginService(request);
			
			System.out.println("UserController - loginController END");
			
			HttpHeaders headers = new HttpHeaders();
			headers.add("Access-Control-Allow-Origin", "*");
			headers.add("Access-Control-Allow-Headers", "Content-Type");
			headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
			
//			response.sendRedirect(output);
//			return ResponseEntity.status(HttpStatus.OK).headers(headers).body(null);
//			return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY).header(HttpHeaders.LOCATION, output).build();
			return ResponseEntity.status(HttpStatus.OK).headers(headers).body(output);
		} catch (Exception e) {
			System.out.println("UserController - loginController ERROR - error >> " + e.getMessage());
			
			HttpHeaders headers = new HttpHeaders();
			headers.add("Access-Control-Allow-Origin", "*");
			headers.add("Access-Control-Allow-Headers", "Content-Type");
			headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).body(null);
		}
	}
	
	@GetMapping(path = "callback-the-chess")
	public ResponseEntity<CallbackOutput> callbackController(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		System.out.println("UserController - callbackController - START");
		
		CallbackOutput output = null;
		
		try {
			output = service.callbackService(request);
			
			HttpHeaders headers = new HttpHeaders();
			headers.add("Access-Control-Allow-Origin", "*");
			headers.add("Access-Control-Allow-Headers", "Content-Type");
			headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
			
			return ResponseEntity.status(HttpStatus.OK).headers(headers).body(output);
		} catch (Exception e) {
			System.out.println("UserController - callbackController - ERROR - error >> " + e.getMessage());
			
			HttpHeaders headers = new HttpHeaders();
			headers.add("Access-Control-Allow-Origin", "*");
			headers.add("Access-Control-Allow-Headers", "Content-Type");
			headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(headers).body(null);
		}
	}
}
