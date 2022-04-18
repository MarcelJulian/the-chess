package com.thesis.TheChess.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.thesis.TheChess.dto.MakeBoardMoveResult;

@Service
public class GamePlayService {
	
	@Value("${lichess_api_url}")	//	https://lichess.org/api/
    public String lichess_api_url;
	
	RestTemplate restTemplate = new RestTemplate();

	public Boolean movePieceService(String user_oauth, String game_id, String move) throws Exception{
		System.out.println("GamePlayService - movePieceService - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
		
		boolean result = false;
		
		try {
			result = hitMakeABoardMove(user_oauth, game_id, move);
			
			System.out.println("GamePlayService - movePieceService - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
			return result;
		} catch (Exception e) {
			System.out.println("GamePlayService - movePieceService - ERROR - user_oauth >> " + user_oauth  + " - game_id >> " + game_id + " - move >> " + move + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}

	private boolean hitMakeABoardMove(String user_oauth, String game_id, String move) throws Exception{
		System.out.println("hitMakeABoardMove - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
		
		boolean result = false;
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", "Bearer " + user_oauth);
			
			HttpEntity request = new HttpEntity("", headers);
			System.out.println("hitMakeABoardMove - request >> " + request);
			
			String uri = lichess_api_url + "board/game/" + game_id + "/move" + move;
			System.out.println("hitAbortGame - uri >> " + uri);
			
			ResponseEntity<MakeBoardMoveResult> responseHit = restTemplate.exchange(uri, HttpMethod.POST, request, MakeBoardMoveResult.class);
			System.out.println("hitChallengeAI - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				MakeBoardMoveResult output = responseHit.getBody();
				
				if (output.getOk().equalsIgnoreCase("true")){
					result = true;
				}
			} else {
				throw new Exception("Failed Make A Board Move; error code value >> " + responseHit.getStatusCodeValue());
			}

			System.out.println("hitMakeABoardMove - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
			return result;
		} catch (Exception e) {
			System.out.println("hitMakeABoardMove - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}

	public String speechToTextService() throws Exception{
		System.out.println("GamePlayService - speechToTextService - START");
		
		String output = "";
		
		try {
			try (SpeechClient speechClient = SpeechClient.create()) {

			      // The path to the audio file to transcribe
			      String gcsUri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw";

			      // Builds the sync recognize request
			      RecognitionConfig config =
			          RecognitionConfig.newBuilder()
			              .setEncoding(AudioEncoding.LINEAR16)
			              .setSampleRateHertz(16000)
			              .setLanguageCode("en-US")
			              .build();
			      RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(gcsUri).build();

			      // Performs speech recognition on the audio file
			      RecognizeResponse response = speechClient.recognize(config, audio);
			      List<SpeechRecognitionResult> results = response.getResultsList();

			      for (SpeechRecognitionResult result : results) {
			        // There can be several alternative transcripts for a given chunk of speech.
			    	// Just use the first (most likely) one here.
			        SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
			        output = alternative.getTranscript();
			      }
			    }
			
			System.out.println("GamePlayService - speechToTextService - END - output >> " + output);
			return output;
		} catch (Exception e) {
			System.out.println("GamePlayService - speechToTextService - ERROR - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	
}
