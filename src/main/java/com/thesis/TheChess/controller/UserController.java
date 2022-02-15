package com.thesis.TheChess.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.thesis.TheChess.dto.LoginOutput;
import com.thesis.TheChess.service.UserService;

@RestController
@RequestMapping(path = "/")
public class UserController {
	@Autowired
	UserService service;
	
	@GetMapping(path = "login-the-chess")
	public RedirectView loginController(HttpServletRequest request) throws Exception{
		System.out.println("UserController - loginController START");
		
		RedirectView redirectView = null;

		try {
			redirectView = service.loginService(request);
			
			System.out.println("UserController - loginController END");
			return redirectView;
		} catch (Exception e) {
			System.out.println("UserController - loginController ERROR");
			return redirectView;
		}
	}
	
	@GetMapping(path = "callback-the-chess")
	public ResponseEntity<LoginOutput> callbackController() throws Exception{
		System.out.println("UserController - callbackController - START");
		
		LoginOutput output = null;
		
		try {
			
			return ResponseEntity.status(HttpStatus.OK).body(output);
		} catch (Exception e) {
			System.out.println("UserController - callbackController - ERROR");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
