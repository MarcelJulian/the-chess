package com.thesis.TheChess.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognizeRequest;
import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
import com.google.cloud.speech.v1p1beta1.SpeechClient;
import com.google.cloud.speech.v1p1beta1.SpeechContext;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
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

//			      // The path to the audio file to transcribe
////			      String gcsUri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw";
//			      String gcsUri = "gs://the-chess-bucket/gtakesf4-2.flac";
//
//			      // Builds the sync recognize request
//			      RecognitionConfig config =
//			          RecognitionConfig.newBuilder()
////			              .setEncoding(AudioEncoding.LINEAR16)
//			              .setEncoding(AudioEncoding.FLAC)
//			              .setSampleRateHertz(16000)
//			              .setLanguageCode("en-US")
//			              .build();
//			      RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(gcsUri).build();
//
//			      // Performs speech recognition on the audio file
//			      RecognizeResponse response = speechClient.recognize(config, audio);
//			      List<SpeechRecognitionResult> results = response.getResultsList();
//
//			      for (SpeechRecognitionResult result : results) {
//			        // There can be several alternative transcripts for a given chunk of speech.
//			    	// Just use the first (most likely) one here.
//			        SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
//			        output = alternative.getTranscript();
//			      }
//			    }
			
			System.out.println("GamePlayService - speechToTextService - END - output >> " + output);
			return output;
		} catch (Exception e) {
			System.out.println("GamePlayService - speechToTextService - ERROR - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	public String speechAdaptationService() throws Exception{
		System.out.println("masuk 1");
		String uriPath = "gs://the-chess-bucket/a5-2.flac";
		return speechAdaptation(uriPath);
	}
	
	public String speechAdaptation(String uriPath) throws Exception {
		String output = "";
		
		try (SpeechClient speechClient = SpeechClient.create()) {
			System.out.println("masuk 2");
//			List<String> phrases = Arrays.asList("$OOV_CLASS_ALPHANUMERIC_SEQUENCE", "Knight $OOV_CLASS_ALPHANUMERIC_SEQUENCE", "King $OOV_CLASS_ALPHANUMERIC_SEQUENCE", "Bishop $OOV_CLASS_ALPHANUMERIC_SEQUENCE", "Queen $OOV_CLASS_ALPHANUMERIC_SEQUENCE", "$OOV_CLASS_ALPHANUMERIC_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE", "Rook $OOV_CLASS_ALPHANUMERIC_SEQUENCE");
//			List<String> phrases = Arrays.asList("$");
//			SpeechContext speechContext = SpeechContext.newBuilder().addAllPhrases(phrases).build();
			SpeechContext speechContext = SpeechContext.newBuilder().addPhrases("$the-chess-alphabet $the-chess-numeric").build();
//			SpeechContext speechContext = SpeechContext.newBuilder().addPhrases("$OOV_CLASS_ALPHANUMERIC_SEQUENCE").build();
			System.out.println("masuk 3");
			
			RecognitionConfig config =
					RecognitionConfig.newBuilder()
					.setEncoding(RecognitionConfig.AudioEncoding.FLAC)
					.setSampleRateHertz(16000)
					.setLanguageCode("en-US")
					.addSpeechContexts(speechContext)
					.setAdaptation(value)
					.build();
			System.out.println("masuk 4");
			
			RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(uriPath).build();
			System.out.println("masuk 5");
			
			RecognizeRequest request = RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
			System.out.println("masuk 6");

			RecognizeResponse response = speechClient.recognize(request);
			System.out.println("masuk 7");
			for (SpeechRecognitionResult result : response.getResultsList()) {
				System.out.println("masuk 8");
				SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
				System.out.printf("Transcript: %s\n", alternative.getTranscript());
				output = alternative.getTranscript();
			}
			
			return output;
		} catch (Exception e) {
			System.out.println("error - " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	
}
