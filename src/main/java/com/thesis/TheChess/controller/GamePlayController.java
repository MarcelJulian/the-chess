package com.thesis.TheChess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesis.TheChess.dto.SpeechToTextInput;
import com.thesis.TheChess.dto.SpeechToTextOutput;
import com.thesis.TheChess.service.GamePlayService;

@RestController
@RequestMapping(path = "/")
public class GamePlayController {
	
	@Autowired
	GamePlayService service;

	@PostMapping(path = "api/move-piece/{game_id}/{move}")
	public ResponseEntity<Boolean> movePieceController(@RequestHeader("oauth") String user_oauth, @PathVariable String game_id, @PathVariable String move){
		System.out.println("GamePlayController - movePieceController START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
		
		Boolean output = false;
		
		try {
			output = service.movePieceService(user_oauth, game_id, move);
			
			System.out.println("GamePlayController - movePieceController END - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
			return ResponseEntity.status(HttpStatus.OK).body(output);
		} catch (Exception e) {
			System.out.println("GamePlayController - movePieceController ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move + " - exception >> " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
	
	@PostMapping(path = "api/speech-to-text")
	@PostMapping(path = "api/speech-to-text/path")
	public ResponseEntity<SpeechToTextOutput> speechToTextController(@RequestHeader("path") String path){
		System.out.println("GamePlayController - speechToTextController START - path >> " + path);
		
		SpeechToTextOutput output = null;
		
		try {
			output = service.speechToTextService(path);
			
			System.out.println("GamePlayController - speechToTextController END");
			return ResponseEntity.status(HttpStatus.OK).body(output);
		} catch (Exception e) {
			System.out.println("GamePlayController - speechToTextController ERROR");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
	
	@PostMapping(path = "api/speech-to-text")
	public ResponseEntity<SpeechToTextOutput> speechToTextController(@RequestBody SpeechToTextInput data){
		System.out.println("GamePlayController - speechToTextController START - data >> " + data);
		
		SpeechToTextOutput output = null;
		
		try {
			output = service.speechToTextService(data);
			
			System.out.println("GamePlayController - speechToTextController END");
			return ResponseEntity.status(HttpStatus.OK).body(output);
		} catch (Exception e) {
			System.out.println("GamePlayController - speechToTextController ERROR");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(output);
		}
	}
}
