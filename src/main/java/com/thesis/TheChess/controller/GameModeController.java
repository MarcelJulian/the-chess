package com.thesis.TheChess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.TheChess.dto.OngoingGamesOutput;
import com.thesis.TheChess.dto.PlayWithBotInput;
import com.thesis.TheChess.dto.PlayWithBotOutput;
import com.thesis.TheChess.dto.PlayWithHumanInput;
import com.thesis.TheChess.dto.PlayWithHumanOutput;
import com.thesis.TheChess.service.GameModeService;

@RestController
@RequestMapping(path = "/")
public class GameModeController {
	
	@Autowired
	GameModeService service;

	@GetMapping(path = "api/ongoing-games")
	public ResponseEntity<OngoingGamesOutput> getOngoingGamesController(@RequestHeader("oauth") String user_oauth) throws Exception{
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
	
	@PostMapping(path = "api/play-with-bot")
	public ResponseEntity<PlayWithBotOutput> playWithBotController(@RequestHeader("oauth")  String user_oauth, @RequestBody PlayWithBotInput input) throws Exception{
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
	
	@PostMapping(path = "api/play-with-human")
	public ResponseEntity<PlayWithHumanOutput> playWithHumanController(@RequestHeader("oauth")  String user_oauth, @RequestBody PlayWithHumanInput input) throws Exception{
		System.out.println("GameModeController - playWithHumanController - START - user_oauth >> " + user_oauth + " - input >> " + input);
		
		PlayWithHumanOutput output = null;
		try {
			output = service.playWithHumanService(user_oauth, input);
			
			System.out.println("GameModeController - playWithHumanController - END - user_oauth >> " + user_oauth + " - input >> " + input);
			return ResponseEntity.status(HttpStatus.OK).body(output);			
		} catch (Exception e) {
			System.out.println("GameModeController - playWithHumanController - ERROR - user_oauth >> " + user_oauth + " - input >> " + input + " - exception >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
	
	@PostMapping(path = "api/abort-game/{game_id}")
	public ResponseEntity<Boolean> abortGameController(@RequestHeader("oauth") String user_oauth, @PathVariable String game_id) throws Exception{
		System.out.println("GameModeController - abortGameController - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
		
		Boolean output = false;
		
		try {
			output = service.abortGameService(user_oauth, game_id);
			
			System.out.println("GameModeController - abortGameController - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
			return ResponseEntity.status(HttpStatus.OK).body(output);			
		} catch (Exception e) {
			System.out.println("GameModeController - abortGameController - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - exception >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
	
	@PostMapping(path = "api/resign-game/{game_id}")
	public ResponseEntity<Boolean> resignGameController(@RequestHeader("oauth") String user_oauth, @PathVariable String game_id) throws Exception{
		System.out.println("GameModeController - resignGameController - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
		
		Boolean output = false;
		
		try {
			output = service.resignGameService(user_oauth, game_id);
			
			System.out.println("GameModeController - resignGameController - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
			return ResponseEntity.status(HttpStatus.OK).body(output);			
		} catch (Exception e) {
			System.out.println("GameModeController - resignGameController - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - exception >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
	
	@PostMapping(path = "api/handle-draw-offer/{game_id}/{accept}")
	public ResponseEntity<Boolean> handleDrawOfferController(@RequestHeader("oauth") String user_oauth, @PathVariable String game_id, @PathVariable String accept) throws Exception{
		System.out.println("GameModeController - handleDrawOfferController - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept);
		
		Boolean output = false;
		
		try {
			output = service.handleDrawOfferService(user_oauth, game_id, accept);
			
			System.out.println("GameModeController - handleDrawOfferController - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept);
			return ResponseEntity.status(HttpStatus.OK).body(output);			
		} catch (Exception e) {
			System.out.println("GameModeController - handleDrawOfferController - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept + " - exception >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
}
