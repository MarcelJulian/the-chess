package com.thesis.TheChess.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
	public void loginController(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		System.out.println("UserController - loginController START");
		
		String output = null;

		try {
			output = service.loginService(request);
			
			System.out.println("UserController - loginController END");
			response.sendRedirect(output);
		} catch (Exception e) {
			System.out.println("UserController - loginController ERROR - error >> " + e.getMessage());
		}
	}
	
	@GetMapping(path = "callback-the-chess")
	public ResponseEntity<CallbackOutput> callbackController(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		System.out.println("UserController - callbackController - START");
		
		CallbackOutput output = null;
		
		try {
			output = service.callbackService(request);
			return ResponseEntity.status(HttpStatus.OK).body(output);
		} catch (Exception e) {
			System.out.println("UserController - callbackController - ERROR - error >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
