package com.thesis.TheChess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.TheChess.dto.LoginInput;
import com.thesis.TheChess.dto.LoginOutput;
import com.thesis.TheChess.service.UserService;

@RestController
@RequestMapping(path = "/")
public class UserController {

	@Autowired
	UserService service;
	
	@GetMapping(path = "login-the-chess")
	public ResponseEntity<LoginOutput> loginController(@RequestBody LoginInput data) throws Exception{
		System.out.println("UserController - loginController - START - ");
		
		try {
			LoginOutput output = null;
			output = service.loginService(data);
			
			System.out.println("UserController - loginController - END - ");
			return ResponseEntity.status(HttpStatus.OK).body(output);
		} catch (Exception e) {
			System.out.println("UserController - loginController - ERROR - ");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body();
		}
	}
}
