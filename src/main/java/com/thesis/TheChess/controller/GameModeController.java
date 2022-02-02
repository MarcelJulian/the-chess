package com.thesis.TheChess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.TheChess.dto.OngoingGamesOutput;
import com.thesis.TheChess.dto.PlayWithBotInput;
import com.thesis.TheChess.dto.PlayWithBotOutput;
import com.thesis.TheChess.service.GameModeService;

@RestController
@RequestMapping(path = "/")
public class GameModeController {
	
	@Autowired
	GameModeService service;

	@GetMapping(path = "get-ongoing-games")
	public ResponseEntity<OngoingGamesOutput> getOngoingGamesController(@RequestHeader String user_oauth) throws Exception{
		System.out.println("GameModeController - getOngoingGamesController - START - user_oauth >> " + user_oauth);
		
		OngoingGamesOutput output = null;
		
		try {
			output = service.ongoingGamesService(user_oauth);
			
			System.out.println("GameModeController - getOngoingGamesController - END - user_oauth >> " + user_oauth);
			return ResponseEntity.status(HttpStatus.OK).body(output);
		} catch (Exception e) {
			System.out.println("GameModeController - getOngoingGamesController - ERROR - user_oauth >> " + user_oauth + " - exception >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
	
	@PostMapping(path = "play-with-bot")
	public ResponseEntity<PlayWithBotOutput> playWithBotController(@RequestHeader String user_oauth, @RequestBody PlayWithBotInput input) throws Exception{
		System.out.println("GameModeController - playWithBotController - START - user_oauth >> " + user_oauth + " - input >> " + input);
		
		PlayWithBotOutput output = null;
		try {
			output = service.playWithBotService(user_oauth, input);
			
			System.out.println("GameModeController - playWithBotController - END - user_oauth >> " + user_oauth + " - input >> " + input);
			return ResponseEntity.status(HttpStatus.OK).body(output);			
		} catch (Exception e) {
			System.out.println("GameModeController - playWithBotController - ERROR - user_oauth >> " + user_oauth + " - input >> " + input + " - exception >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
		
	}
}
