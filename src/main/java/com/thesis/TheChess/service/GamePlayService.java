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
	
	public String speechToTextService() throws Exception {
		String output = "";
		
		try (SpeechClient speechClient = SpeechClient.create()) {
			System.out.println("masuk 2");
			
			List<String> phrases = Arrays.asList(
					"$OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Bishop $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Knight $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Rook $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Queen $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"King $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Bishop takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Knight takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Rook takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Queen takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"King takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"$OOV_CLASS_ALPHA_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Rook $OOV_CLASS_ALPHA_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Knight $OOV_CLASS_ALPHA_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Rook $OOV_CLASS_DIGIT_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					"Knight $OOV_CLASS_DIGIT_SEQUENCE takes $OOV_CLASS_ALPHANUMERIC_SEQUENCE",
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
					"gs://the-chess-bucket/RxH6.flac",
					"gs://the-chess-bucket/RxD4.flac",
					"gs://the-chess-bucket/RxB5.flac",
					"gs://the-chess-bucket/RxA8.flac",
					"gs://the-chess-bucket/Rh1.flac",
					"gs://the-chess-bucket/RdxG2.flac",
					"gs://the-chess-bucket/RcxF3.flac",
					"gs://the-chess-bucket/Rd5.flac",
					"gs://the-chess-bucket/Rc3.flac",
					"gs://the-chess-bucket/Ra7.flac",
					"gs://the-chess-bucket/R5xE4.flac",
					"gs://the-chess-bucket/R4xH1.flac",
					"gs://the-chess-bucket/QxG1.flac",
					"gs://the-chess-bucket/QxF4.flac",
					"gs://the-chess-bucket/QxC4.flac",
					"gs://the-chess-bucket/QxA2.flac",
					"gs://the-chess-bucket/Qh5.flac",
					"gs://the-chess-bucket/Qe8.flac",
					"gs://the-chess-bucket/Qc7.flac",
					"gs://the-chess-bucket/Qb7.flac",
					"gs://the-chess-bucket/NxH4.flac",
					"gs://the-chess-bucket/NxG3.flac",
					"gs://the-chess-bucket/NxA5.flac",
					"gs://the-chess-bucket/NxA1.flac",
					"gs://the-chess-bucket/Ng4.flac",
					"gs://the-chess-bucket/Nf7.flac",
					"gs://the-chess-bucket/NbxD5.flac",
					"gs://the-chess-bucket/Nb8.flac",
					"gs://the-chess-bucket/NaxB4.flac",
					"gs://the-chess-bucket/Na6.flac",
					"gs://the-chess-bucket/N7xD6.flac",
					"gs://the-chess-bucket/N2xF3.flac",
					"gs://the-chess-bucket/KxH1.flac",
					"gs://the-chess-bucket/KxC6.flac",
					"gs://the-chess-bucket/KxB4.flac",
					"gs://the-chess-bucket/KxB2.flac",
					"gs://the-chess-bucket/Kg2.flac",
					"gs://the-chess-bucket/Kf3.flac",
					"gs://the-chess-bucket/Ke4.flac",
					"gs://the-chess-bucket/h7.flac",
					"gs://the-chess-bucket/g1.flac",
					"gs://the-chess-bucket/fxG7.flac",
					"gs://the-chess-bucket/f5.flac",
					"gs://the-chess-bucket/exD4.flac",
					"gs://the-chess-bucket/e3.flac",
					"gs://the-chess-bucket/cxD5.flac",
					"gs://the-chess-bucket/BxE1.flac",
					"gs://the-chess-bucket/BxD1.flac",
					"gs://the-chess-bucket/BxB2.flac",
					"gs://the-chess-bucket/BxB1.flac",
					"gs://the-chess-bucket/Bd8.flac",
					"gs://the-chess-bucket/Bc4.flac",
					"gs://the-chess-bucket/Bb6.flac",
					"gs://the-chess-bucket/axB4.flac",
					"gs://the-chess-bucket/Ba2.flac");
			
			for (String strUrl : listUrl) {
				RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(strUrl).build();
//				System.out.println("masuk 9");
				
				RecognizeRequest request = RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
//				System.out.println("masuk 10");
				
				RecognizeResponse response = speechClient.recognize(request);
//				System.out.println("masuk 11");
				for (SpeechRecognitionResult result : response.getResultsList()) {
//					System.out.println("masuk 12");
					SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
					System.out.println("strUrl >> " + strUrl);
					System.out.printf("Transcript: %s\n", alternative.getTranscript());
					
//					String[] splited = alternative.getTranscript().split("\\s+");
//					System.out.println("splited: [" + Arrays.stream(splited).collect(Collectors.joining("][")) + "]");
//					
//					String newStr = splited[splited.length-1].toLowerCase();
//					newStr = newStr.replaceAll("([i-j])", "");
//					System.out.println("newStr >> " + newStr);
//					char finalChar = newStr.charAt(0);
//					System.out.println("finalChar >> " + finalChar);
				}
			}
			
			return output;
		} catch (Exception e) {
			System.out.println("error - " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}

	public String transcribeWithModelAdaptation() throws Exception {
		System.out.println("masuk 1");
		
		String output = "";
		
//		String uriPath = "gs://the-chess-bucket/a5-1.flac";
		String uriPath = "gs://the-chess-bucket/a5-2.flac";
//		String uriPath = "gs://the-chess-bucket/bishopb8-1.flac";
//		String uriPath = "gs://the-chess-bucket/bishopb8-2.flac";
//		String uriPath = "gs://the-chess-bucket/king-e2.flac";
//		String uriPath = "gs://the-chess-bucket/kinge2-1.flac";
//		String uriPath = "gs://the-chess-bucket/kinge2-2.flac";
//		String uriPath = "gs://the-chess-bucket/knight-h-three.flac";
		
		try (AdaptationClient adaptationClient = AdaptationClient.create()){
			System.out.println("masuk 2");
			
			LocationName parent = LocationName.of(project_id, "global");
			System.out.println("parent" + parent.toString());
//			System.out.println("masuk 3");
//			CreateCustomClassRequest alphabetClassRequest = CreateCustomClassRequest.newBuilder()
//					.setParent(parent.toString())
//					.setCustomClassId("the-chess-alphabet")
//					.setCustomClass(CustomClass.newBuilder()
//							.addItems(ClassItem.newBuilder().setValue("a"))
//							.addItems(ClassItem.newBuilder().setValue("b"))
//							.addItems(ClassItem.newBuilder().setValue("c"))
//							.addItems(ClassItem.newBuilder().setValue("d"))
//							.addItems(ClassItem.newBuilder().setValue("e"))
//							.addItems(ClassItem.newBuilder().setValue("f"))
//							.addItems(ClassItem.newBuilder().setValue("g"))
//							.addItems(ClassItem.newBuilder().setValue("h"))
//							.build())
//					.build();
//			System.out.println("masuk 4");
//			CustomClass alphabetClassResponse = adaptationClient.createCustomClass(alphabetClassRequest);
//			System.out.println("masuk 5");
//			 
//			CreateCustomClassRequest numericClassRequest = CreateCustomClassRequest.newBuilder()
//						.setParent(parent.toString())
//						.setCustomClassId("the-chess-numeric")
//						.setCustomClass(CustomClass.newBuilder()
//								.addItems(ClassItem.newBuilder().setValue("1"))
//								.addItems(ClassItem.newBuilder().setValue("2"))
//								.addItems(ClassItem.newBuilder().setValue("3"))
//								.addItems(ClassItem.newBuilder().setValue("4"))
//								.addItems(ClassItem.newBuilder().setValue("5"))
//								.addItems(ClassItem.newBuilder().setValue("6"))
//								.addItems(ClassItem.newBuilder().setValue("7"))
//								.addItems(ClassItem.newBuilder().setValue("8"))
//								.build())
//						.build();
//			System.out.println("masuk 6");
//			CustomClass numericClassResponse = adaptationClient.createCustomClass(numericClassRequest);
//			System.out.println("masuk 7");
//			
//			CreateCustomClassRequest numberClassRequest = CreateCustomClassRequest.newBuilder()
//					.setParent(parent.toString())
//					.setCustomClassId("the-chess-number")
//					.setCustomClass(CustomClass.newBuilder()
//							.addItems(ClassItem.newBuilder().setValue("One"))
//							.addItems(ClassItem.newBuilder().setValue("Two"))
//							.addItems(ClassItem.newBuilder().setValue("Three"))
//							.addItems(ClassItem.newBuilder().setValue("Four"))
//							.addItems(ClassItem.newBuilder().setValue("Five"))
//							.addItems(ClassItem.newBuilder().setValue("Six"))
//							.addItems(ClassItem.newBuilder().setValue("Seven"))
//							.addItems(ClassItem.newBuilder().setValue("Eight"))
//							.build())
//					.build();
//			System.out.println("masuk 6");
//			CustomClass numericClassResponse = adaptationClient.createCustomClass(numberClassRequest);
//			System.out.println("masuk 7");
//			 
//			CreateCustomClassRequest piecesClassRequest = CreateCustomClassRequest.newBuilder()
//							.setParent(parent.toString())
//							.setCustomClassId("the-chess-pieces")
//							.setCustomClass(CustomClass.newBuilder()
//									.addItems(ClassItem.newBuilder().setValue("Bishop"))
//									.addItems(ClassItem.newBuilder().setValue("Knight"))
//									.addItems(ClassItem.newBuilder().setValue("Rook"))
//									.addItems(ClassItem.newBuilder().setValue("Queen"))
//									.addItems(ClassItem.newBuilder().setValue("King"))
//									.addItems(ClassItem.newBuilder().setValue("Kingside Castle"))
//									.addItems(ClassItem.newBuilder().setValue("Queenside Castle"))
//									.build())
//							.build();
//			System.out.println("masuk 8");
//			CustomClass piecesClassResponse = adaptationClient.createCustomClass(piecesClassRequest);
//			System.out.println("masuk 9");
//			
//			System.out.println("masuk 3");
//			CreateCustomClassRequest alphabetClassRequest = CreateCustomClassRequest.newBuilder()
//					.setParent(parent.toString())
//					.setCustomClassId("the-chess-alphabet-numeric")
//					.setCustomClass(CustomClass.newBuilder()
//							.addItems(ClassItem.newBuilder().setValue("a"))
//							.addItems(ClassItem.newBuilder().setValue("b"))
//							.addItems(ClassItem.newBuilder().setValue("c"))
//							.addItems(ClassItem.newBuilder().setValue("d"))
//							.addItems(ClassItem.newBuilder().setValue("e"))
//							.addItems(ClassItem.newBuilder().setValue("f"))
//							.addItems(ClassItem.newBuilder().setValue("g"))
//							.addItems(ClassItem.newBuilder().setValue("h"))
//							.addItems(ClassItem.newBuilder().setValue("1"))
//							.addItems(ClassItem.newBuilder().setValue("2"))
//							.addItems(ClassItem.newBuilder().setValue("3"))
//							.addItems(ClassItem.newBuilder().setValue("4"))
//							.addItems(ClassItem.newBuilder().setValue("5"))
//							.addItems(ClassItem.newBuilder().setValue("6"))
//							.addItems(ClassItem.newBuilder().setValue("7"))
//							.addItems(ClassItem.newBuilder().setValue("8"))
//							.build())
//					.build();
//			System.out.println("masuk 4");
//			CustomClass alphabetClassResponse = adaptationClient.createCustomClass(alphabetClassRequest);
//			System.out.println("masuk 5");
//			 
//			List<CustomClass> customClasses = new ArrayList<>();
//			customClasses.add(alphabetClassResponse);
//			customClasses.add(numericClassResponse);
//			customClasses.add(piecesClassResponse);
//			System.out.println("masuk 10");
//			 
//			CreatePhraseSetRequest phraseRequest = CreatePhraseSetRequest.newBuilder()
//					 .setParent(parent.toString())
//					 .setPhraseSetId("chess-phrases-set-1")
//					 .setPhraseSet(PhraseSet.newBuilder()
//							 .setBoost(10)
//							 .addPhrases(Phrase.newBuilder()
//									 .setValue(String.format("%s%s%n", "the-chess-alphabet", "the-chess-numeric")))
//							 .addPhrases(Phrase.newBuilder()
//									 .setValue(String.format("%s %s %s %n", "the-chess-alphabet", "the-chess-numeric", "the-chess-pieces")))
//							 .build())
//					 .build();
//			 System.out.println("masuk 11");
//			 PhraseSet phraseResponse = adaptationClient.createPhraseSet(phraseRequest);
//			 System.out.println("masuk 12");
//			 
//			 CreatePhraseSetRequest phraseRequest = CreatePhraseSetRequest.newBuilder()
//					 .setParent(parent.toString())
//					 .setPhraseSetId("chess-phrases-set-3")
//					 .setPhraseSet(PhraseSet.newBuilder()
//							 .setBoost(10)
//							 .addPhrases(Phrase.newBuilder()
//									 .setValue(String.format("%s %s %n", "the-chess-alphabet", "the-chess-number")))
//							 .addPhrases(Phrase.newBuilder()
//									 .setValue(String.format("%s %s %s %n", "the-chess-alphabet", "the-chess-number", "the-chess-pieces")))
//							 .build())
//					 .build();
//			 System.out.println("masuk 11");
//			 PhraseSet phraseResponse = adaptationClient.createPhraseSet(phraseRequest);
//			 System.out.println("masuk 12");
//			 
//			 CreatePhraseSetRequest phraseRequest = CreatePhraseSetRequest.newBuilder()
//					 .setParent(parent.toString())
//					 .setPhraseSetId("chess-phrases-set-8")
//					 .setPhraseSet(PhraseSet.newBuilder()
//							 .setBoost(10)
//							 .addPhrases(Phrase.newBuilder()
//									 .setValue(String.format("${%s} ${%s}", "the-chess-alphabet", "the-chess-numeric")))
//							 .addPhrases(Phrase.newBuilder()
//									 .setValue(String.format("${%s} ${%s} ${%s}", "the-chess-alphabet", "the-chess-numeric", "the-chess-pieces")))
//							 .build())
//					 .build();
//			 System.out.println("phraseRequest" + phraseRequest.getPhraseSet().getPhrasesList().toString());
//			 System.out.println("masuk 11");
//			 PhraseSet phraseResponse = adaptationClient.createPhraseSet(phraseRequest);
//			 System.out.println("masuk 12");
			
			CreatePhraseSetRequest phraseRequest = CreatePhraseSetRequest.newBuilder()
					 .setParent(parent.toString())
					 .setPhraseSetId("chess-phrases-set-10")
					 .setPhraseSet(PhraseSet.newBuilder()
							 .setBoost(10)
							 .addPhrases(Phrase.newBuilder()
									 .setValue(String.format("%s", "the-chess-alphabet-numeric")))
							 .build())
					 .build();
			 System.out.println("phraseRequest" + phraseRequest.getPhraseSet().getPhrasesList().toString());
			 System.out.println("masuk 11");
			 PhraseSet phraseResponse = adaptationClient.createPhraseSet(phraseRequest);
			 System.out.println("masuk 12");
			 
			 SpeechAdaptation speechAdaptation = SpeechAdaptation.newBuilder()
//					 .addAllCustomClasses(customClasses)
//					 .addCustomClasses(alphabetClassResponse)
					 .addPhraseSets(phraseResponse)
					 .build();
			 System.out.println("masuk 13");
			 
			 try (SpeechClient speechClient = SpeechClient.create()){
				 System.out.println("masuk 14");
				 RecognitionConfig config = RecognitionConfig.newBuilder()
						 .setEncoding(AudioEncoding.FLAC)
						 .setSampleRateHertz(16000)
						 .setLanguageCode("en-US")
						 .setAdaptation(speechAdaptation)
						 .build();
				 System.out.println("masuk 15");
				 RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(uriPath).build();
				 System.out.println("masuk 16");
				 RecognizeResponse response = speechClient.recognize(config, audio);
				 System.out.println("masuk 17");
				 
				 List<SpeechRecognitionResult> results = response.getResultsList();
				 System.out.println("masuk 18");
				 for (SpeechRecognitionResult result : results) {
					 System.out.println("masuk 19");
					 SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
					 System.out.printf("Adapted Transcription: %s%n", alternative.getTranscript());
					 output = alternative.getTranscript();
					 System.out.println("masuk 20");
				}
				
				return output;
			} catch (Exception e) {
				throw new Exception(e.getMessage());
			}
		} catch (ApiException e) {
			System.out.println("Client Interaction Error: \n" + e.toString());
			throw new Exception(e.getMessage());
		}
	}
}
