package com.thesis.TheChess.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.api.gax.rpc.ApiException;
import com.google.cloud.speech.v1p1beta1.AdaptationClient;
import com.google.cloud.speech.v1p1beta1.CreateCustomClassRequest;
import com.google.cloud.speech.v1p1beta1.CreatePhraseSetRequest;
import com.google.cloud.speech.v1p1beta1.CustomClass;
import com.google.cloud.speech.v1p1beta1.CustomClass.ClassItem;
import com.google.cloud.speech.v1p1beta1.LocationName;
import com.google.cloud.speech.v1p1beta1.PhraseSet;
import com.google.cloud.speech.v1p1beta1.PhraseSet.Phrase;
import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1p1beta1.RecognizeRequest;
import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
import com.google.cloud.speech.v1p1beta1.SpeechAdaptation;
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

    @Value("${lichess_api_url}") // https://lichess.org/api/
    public String lichess_api_url;
	
	@Value("${gcloud_project_id}")
	public String project_id;
	
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
			System.out.println("hitMakeABoardMove - uri >> " + uri);
			
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
	
	public String speechToTextService() throws Exception {
		String output = "";
		
		try (SpeechClient speechClient = SpeechClient.create()) {
			System.out.println("masuk 2");
			
			List<String> phrases = Arrays.asList(
//					"Bishop takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"Knight takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"Rook takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"Queen takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"King takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"$OOV_CLASS_ALPHA_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"Rook $OOV_CLASS_ALPHA_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"Knight $OOV_CLASS_ALPHA_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"Rook $OOV_CLASS_DIGIT_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
//					"Knight $OOV_CLASS_DIGIT_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"$OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Bishop $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Knight $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Rook $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Queen $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"King $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Kingside Castle",
					"Queenside Castle"
					);

			SpeechContext speechContext = SpeechContext.newBuilder().addAllPhrases(phrases).build();

			RecognitionConfig config =
					RecognitionConfig.newBuilder()
					.setEncoding(RecognitionConfig.AudioEncoding.FLAC)
					.setSampleRateHertz(16000)
					.setLanguageCode("en-US")
					.addSpeechContexts(speechContext)
//					.setAdaptation(adaptation)
					.build();
//			System.out.println("masuk 8");
			
			List<String> listUrl = Arrays.asList("gs://the-chess-bucket/a5-1.flac", 
					"gs://the-chess-bucket/a5-2.flac", 
					"gs://the-chess-bucket/bishopb8-1.flac", 
					"gs://the-chess-bucket/bishopb8-2.flac", 
					"gs://the-chess-bucket/king-e2.flac", 
					"gs://the-chess-bucket/kinge2-1.flac", 
					"gs://the-chess-bucket/kinge2-2.flac", 
					"gs://the-chess-bucket/knight-h-three.flac",
					"gs://the-chess-bucket/Rh3.flac", 
					"gs://the-chess-bucket/Rg7.flac", 
					"gs://the-chess-bucket/Rc5.flac", 
					"gs://the-chess-bucket/Ra1.flac", 
					"gs://the-chess-bucket/queenside-castle2.flac", 
					"gs://the-chess-bucket/queenside-castle1.flac", 
					"gs://the-chess-bucket/Qh7.flac", 
					"gs://the-chess-bucket/Qe5.flac", 
					"gs://the-chess-bucket/Qc8.flac", 
					"gs://the-chess-bucket/Qa4.flac", 
					"gs://the-chess-bucket/Ne6.flac", 
					"gs://the-chess-bucket/Nf8.flac", 
					"gs://the-chess-bucket/Nd4.flac", 
					"gs://the-chess-bucket/Nd1.flac", 
					"gs://the-chess-bucket/kingside-castle2.flac", 
					"gs://the-chess-bucket/kingside-castle1.flac", 
					"gs://the-chess-bucket/Kd3.flac", 
					"gs://the-chess-bucket/Kc6.flac", 
					"gs://the-chess-bucket/Kf2.flac", 
					"gs://the-chess-bucket/d7.flac", 
					"gs://the-chess-bucket/c1.flac", 
					"gs://the-chess-bucket/Kb2.flac", 
					"gs://the-chess-bucket/Bg6.flac", 
					"gs://the-chess-bucket/Bh8.flac", 
					"gs://the-chess-bucket/Bf4.flac", 
					"gs://the-chess-bucket/Be2.flac", 
					"gs://the-chess-bucket/b5.flac", 
					"gs://the-chess-bucket/a3.flac",
//					"gs://the-chess-bucket/RxH6.flac",
//					"gs://the-chess-bucket/RxD4.flac",
//					"gs://the-chess-bucket/RxB5.flac",
//					"gs://the-chess-bucket/RxA8.flac",
					"gs://the-chess-bucket/Rh1.flac",
//					"gs://the-chess-bucket/RdxG2.flac",
//					"gs://the-chess-bucket/RcxF3.flac",
					"gs://the-chess-bucket/Rd5.flac",
					"gs://the-chess-bucket/Rc3.flac",
					"gs://the-chess-bucket/Ra7.flac",
//					"gs://the-chess-bucket/R5xE4.flac",
//					"gs://the-chess-bucket/R4xH1.flac",
//					"gs://the-chess-bucket/QxG1.flac",
//					"gs://the-chess-bucket/QxF4.flac",
//					"gs://the-chess-bucket/QxC4.flac",
//					"gs://the-chess-bucket/QxA2.flac",
					"gs://the-chess-bucket/Qh5.flac",
					"gs://the-chess-bucket/Qe8.flac",
					"gs://the-chess-bucket/Qc7.flac",
					"gs://the-chess-bucket/Qb7.flac",
//					"gs://the-chess-bucket/NxH4.flac",
//					"gs://the-chess-bucket/NxG3.flac",
//					"gs://the-chess-bucket/NxA5.flac",
//					"gs://the-chess-bucket/NxA1.flac",
					"gs://the-chess-bucket/Ng4.flac",
					"gs://the-chess-bucket/Nf7.flac",
//					"gs://the-chess-bucket/NbxD5.flac",
					"gs://the-chess-bucket/Nb8.flac",
//					"gs://the-chess-bucket/NaxB4.flac",
					"gs://the-chess-bucket/Na6.flac",
//					"gs://the-chess-bucket/N7xD6.flac",
//					"gs://the-chess-bucket/N2xF3.flac",
//					"gs://the-chess-bucket/KxH1.flac",
//					"gs://the-chess-bucket/KxC6.flac",
//					"gs://the-chess-bucket/KxB4.flac",
//					"gs://the-chess-bucket/KxB2.flac",
					"gs://the-chess-bucket/Kg2.flac",
					"gs://the-chess-bucket/Kf3.flac",
					"gs://the-chess-bucket/Ke4.flac",
					"gs://the-chess-bucket/h7.flac",
					"gs://the-chess-bucket/g1.flac",
//					"gs://the-chess-bucket/fxG7.flac",
					"gs://the-chess-bucket/f5.flac",
//					"gs://the-chess-bucket/exD4.flac",
					"gs://the-chess-bucket/e3.flac",
//					"gs://the-chess-bucket/cxD5.flac",
//					"gs://the-chess-bucket/BxE1.flac",
//					"gs://the-chess-bucket/BxD1.flac",
//					"gs://the-chess-bucket/BxB2.flac",
//					"gs://the-chess-bucket/BxB1.flac",
					"gs://the-chess-bucket/Bd8.flac",
					"gs://the-chess-bucket/Bc4.flac",
					"gs://the-chess-bucket/Bb6.flac",
//					"gs://the-chess-bucket/axB4.flac",
					"gs://the-chess-bucket/Rh1_1.flac",
					"gs://the-chess-bucket/Qh5_1.flac",
					"gs://the-chess-bucket/Re7.flac	",
					"gs://the-chess-bucket/Qh2.flac",
					"gs://the-chess-bucket/Rb3.flac",
					"gs://the-chess-bucket/Ba3.flac",
					"gs://the-chess-bucket/Bd6.flac",
					"gs://the-chess-bucket/Ba2.flac");
			
			for (String strUrl : listUrl) {
				RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(strUrl).build();
				
				RecognizeRequest request = RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
				
				RecognizeResponse response = speechClient.recognize(request);
				for (SpeechRecognitionResult result : response.getResultsList()) {
					SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
					String sttResult = alternative.getTranscript();
					System.out.println("strUrl >> " + strUrl);
					System.out.println("sttResult >> " + sttResult);
					
					
					String fin = improveAccuracy(sttResult);
					System.out.println("after improve >> " + fin);
//					return improveAccuracy(sttResult);
				}
			}
			
			return output;
		} catch (Exception e) {
			System.out.println("error - " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	private String improveAccuracy(String sttResult) throws Exception{
		String[] splited = sttResult.split("\\s+");
		int totalWord = splited.length;
		
		switch (totalWord) {
		case 1:
			try {
				String temp = splited[0];
				if (temp.length() == 2) {
					return temp.toLowerCase();
				} else {
					if (containNumeric(temp)) {
						temp = removeDuplicateChar(temp);
						temp = cleanString(temp.toUpperCase()).toLowerCase();
						
						if (temp.length() != 2) {
							return "ERROR - " + temp;
						} else {
							if (isAccurate(temp.charAt(0), temp.charAt(1))) {
								return temp;							
							} else {
								return "ERROR - " + temp;
							}
						}
					} else {
						return "ERROR - " + temp;
					}
				}
			} catch (Exception e) {
				throw new Exception("ERROR improveAccuracy -- exception >> " + e.getMessage());
			}
		case 2:
			try {
				if (sttResult.equalsIgnoreCase("Queenside Castle")) {
					return "0-0-0";
				} else if (sttResult.equalsIgnoreCase("Kingside Castle")) {
					return "0-0";
				} else {
					String temp1 = splited[0];
					String temp2 = splited[1];
					
					if (temp1.toLowerCase().equalsIgnoreCase("bishop")) {
						temp1 = "B";
					} else if (temp1.toLowerCase().equalsIgnoreCase("knight")) {
						temp1 = "N";
					} else if (temp1.toLowerCase().equalsIgnoreCase("rook")) {
						temp1 = "R";
					} else if (temp1.toLowerCase().equalsIgnoreCase("queen")) {
						temp1 = "Q";
					} else if (temp1.toLowerCase().equalsIgnoreCase("king")) {
						temp1 = "K";
					} else {
						return "ERROR - " + temp1 + temp2;
					}
					
					if (containNumeric(temp2)) {
						temp2 = removeDuplicateChar(temp2);
						temp2 = cleanString(temp2.toUpperCase()).toLowerCase();
						if (temp2.length() != 2) {
							return "ERROR - " + temp1 + temp2;
						} else {
							return temp1 + temp2;
						}
					} else {
						return "ERROR - " + temp1 + temp2;
					}
				}
			} catch (Exception e) {
				throw new Exception("ERROR improveAccuracy -- exception >> " + e.getMessage());
			}
		case 3:
			try {
				if (sttResult.equalsIgnoreCase("Queen side Castle")) {
					return "0-0-0";
				} else if (sttResult.equalsIgnoreCase("King side Castle")) {
					return "0-0";
				} else {
					return "ERROR - " + sttResult;
				}
			} catch (Exception e) {
				throw new Exception("ERROR improveAccuracy -- exception >> " + e.getMessage());
			}
		default:
			return "ERROR - " + sttResult;
		}
	}
	
	private boolean containNumeric(String temp) {
		return temp.matches(".*[0-9].*");
	}
	
	private String removeDuplicateChar(String str) {
		char temp1, temp2;
		for (int i=1; i<str.length(); i++) {
			temp1 = str.charAt(i-1);
			temp2 = str.charAt(i);
			if (temp1 == temp2) {
				StringBuilder sb = new StringBuilder(str);
				sb.deleteCharAt(i-1);
				str = sb.toString();
			}
		}
		return str;
	}
	
	
	private String cleanString(String str) {
		char[] strArray = str.toCharArray();
		
		StringBuilder sb = new StringBuilder();
		for (int i=0; i<strArray.length; i++) {
			if (strArray[i] == isFound(strArray[i])) {
				sb.append(strArray[i]);
			}
		}
		
		String newStr = sb.toString();
		if (newStr.length() > 2) {
			return String.valueOf(newStr.charAt(0)) + String.valueOf(newStr.charAt(newStr.length()-1));
		} else {
			return newStr;
		}
	}
	
	private char isFound(char src) {
		char[] piecesChar = {'A','B','C','D','E','F','G','H','1','2','3','4','5','6','7','8'};
		for (int i=0; i<piecesChar.length; i++) {
			if (src == piecesChar[i]) {
				return src;
			}
		}
		return '0';
	}
	
	private boolean isAccurate(char first, char second) {
		if (Character.isDigit(second) && !(Character.isDigit(first))) {
			return true;
		} else {
			return false;
		}
	}

}
