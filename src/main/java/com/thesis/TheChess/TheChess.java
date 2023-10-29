package com.thesis.TheChess;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan({"com.thesis.TheChess"})
//@ComponentScan(basePackages = {"com.thesis.TheChess.controller", "com.thesis.TheChess.model", "com.thesis.TheChess.repository", "com.thesis.TheChess.service"})
@EntityScan("com.thesis.TheChess.*")
//@EntityScan("com.thesis.TheChess.model")
@SpringBootApplication
public class TheChess {

	public static void main(String[] args) {
		SpringApplication.run(TheChess.class, args);
	}

}
