package com.thesis.TheChess.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
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
import com.google.auth.oauth2.GoogleCredentials;
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
import com.google.common.collect.Lists;
import com.google.protobuf.ByteString;
import com.thesis.TheChess.dto.MakeBoardMoveResult;
import com.thesis.TheChess.dto.SpeechToTextInput;
import com.thesis.TheChess.dto.SpeechToTextOutput;

@Service
public class GamePlayService {

    @Value("${lichess_api_url}") // https://lichess.org/api/
    public String lichess_api_url;
	
	@Value("${gcloud_project_id}")
	public String project_id;
	
	RestTemplate restTemplate = new RestTemplate();

	public Boolean movePieceProcess(String user_oauth, String game_id, String move) throws Exception{
		System.out.println("GamePlayService - movePieceProcess - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
		
		boolean result = false;
		
		try {
			result = hitMakeABoardMove(user_oauth, game_id, move);
			
			System.out.println("GamePlayService - movePieceProcess - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - move >> " + move);
			return result;
		} catch (Exception e) {
			System.out.println("GamePlayService - movePieceProcess - ERROR - user_oauth >> " + user_oauth  + " - game_id >> " + game_id + " - move >> " + move + " - exception >> " + e.getMessage());
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
			
			String uri = lichess_api_url + "board/game/" + game_id + "/move/" + move;
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
	
	public SpeechToTextOutput speechToTextProcess(String strPath) throws Exception {
		System.out.println("GamePlayService - speechToTextProcess - START - path >> " + strPath);
		SpeechToTextOutput output = null;
		
		authExplicit();
		
		try (SpeechClient speechClient = SpeechClient.create()) {
			List<String> phrases = Arrays.asList(
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

			Path path = Paths.get(strPath);
			byte[] data = Files.readAllBytes(path);
			ByteString audioBytes = ByteString.copyFrom(data);
			System.out.println("masuk 2 >> ");

			RecognitionConfig config =
					RecognitionConfig.newBuilder()
					.setEncoding(AudioEncoding.LINEAR16)
					.setLanguageCode("en-US")
					.addSpeechContexts(speechContext)
					.build();
			
			RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();
			
			RecognizeRequest request = RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
			
			RecognizeResponse response = speechClient.recognize(request);
			System.out.println("masuk 6 >> " + response.getResultsList());
			
			for (SpeechRecognitionResult result : response.getResultsList()) {
				SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
				String sttResult = alternative.getTranscript();
				output = improveAccuracy(sttResult);
			}
			System.out.println("GamePlayService - speechToTextProcess - END - path >> " + strPath);
			return output;
		} catch (Exception e) {
			System.out.println("ERROR - GamePlayService - speechToTextProcess - path >> " + strPath + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	private SpeechToTextOutput improveAccuracy(String sttResult) throws Exception{
		System.out.println("improveAccuracy START - string >> " + sttResult);
		SpeechToTextOutput output = new SpeechToTextOutput();
		
		if (sttResult.contains("sign")) {
			output.setType("command");
			output.setValue("Resign");
		} else if (sttResult.contains("cept")) {
			output.setType("command");
			output.setValue("Accept Draw");
		} else if (sttResult.contains("line")) {
			output.setType("command");
			output.setValue("Decline Draw");
		} else if (sttResult.contains("bor")) {
			output.setType("command");
			output.setValue("Abort");
		} else if (sttResult.contains("raw")) {
			output.setType("command");
			output.setValue("Draw");
		} else {
			String[] splited = sttResult.split("\\s+");
			int totalWord = splited.length;
			
			switch (totalWord) {
			case 1:
				try {
					String temp = splited[0];
					String temp0 = "";
					if (temp.length() == 2) {
						if (isAccurate(temp.charAt(0), temp.charAt(1))) {
							output.setType("move");
							output.setValue(temp.toLowerCase());
						} else {
							output.setType("error");
							output.setValue(temp);
						}
					} else {
						if (containNumeric(temp)) {
							if (temp.charAt(0) == '9') {
								temp0 = "N";
							} else if (temp.charAt(0) == 'r' || temp.charAt(0) == 'R') {
								temp0 = "R";
							}
							temp = removeDuplicateChar(temp);
							temp = cleanString(temp.toUpperCase()).toLowerCase();
							
							if (temp.length() != 2) {
								output.setType("error");
								output.setValue(temp);
							} else {
								if (isAccurate(temp.charAt(0), temp.charAt(1))) {
									if (temp0 != "") {
										temp = temp0 + temp;
									}
									output.setType("move");
									output.setValue(temp);
								} else {
									output.setType("error");
									output.setValue(temp);
								}
							}
						} else {
							output.setType("error");
							output.setValue(temp);
						}
					}
				} catch (Exception e) {
					throw new Exception("ERROR improveAccuracy -- exception >> " + e.getMessage());
				}
				break;
			case 2:
				try {
					if (sttResult.equalsIgnoreCase("Queenside Castle") || ((sttResult.contains("queen") || sttResult.contains("Queen")) && (sttResult.contains("castle") || sttResult.contains("Castle")))) {
						output.setType("move");
						output.setValue("0-0-0");
					} else if (sttResult.equalsIgnoreCase("Kingside Castle") || ((sttResult.contains("king") || sttResult.contains("King")) && (sttResult.contains("castle") || sttResult.contains("Castle")))) {
						output.setType("move");
						output.setValue("0-0");
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
							output.setType("error");
							output.setValue(temp1 + temp2);
						}
						
						if (containNumeric(temp2)) {
							temp2 = removeDuplicateChar(temp2);
							temp2 = cleanString(temp2.toUpperCase()).toLowerCase();
							if (temp2.length() != 2) {
								output.setType("error");
								output.setValue(temp1 + temp2);
							} else {
								if (isAccurate(temp2.charAt(0), temp2.charAt(1))) {
									output.setType("move");
									output.setValue(temp1 + temp2);
								} else {
									output.setType("error");
									output.setValue(temp1 + temp2);
								}
							}
						} else {
							output.setType("error");
							output.setValue(temp1 + temp2);
						}
					}
				} catch (Exception e) {
					throw new Exception("ERROR improveAccuracy -- exception >> " + e.getMessage());
				}
				break;
			case 3:
				try {
					if (sttResult.equalsIgnoreCase("Queen side Castle") || ((sttResult.contains("queen") || sttResult.contains("Queen")) && (sttResult.contains("castle") || sttResult.contains("Castle")))) {
						output.setType("move");
						output.setValue("0-0-0");
					} else if (sttResult.equalsIgnoreCase("King side Castle") || ((sttResult.contains("king") || sttResult.contains("King")) && (sttResult.contains("castle") || sttResult.contains("Castle")))) {
						output.setType("move");
						output.setValue("0-0");
					} else {
						output.setType("error");
						output.setValue(sttResult);
					}
				} catch (Exception e) {
					throw new Exception("ERROR improveAccuracy -- exception >> " + e.getMessage());
				}
				break;
			default:
				output.setType("error");
				output.setValue(sttResult);
				break;
			}
		}
		System.out.println("improveAccuracy END - string >> " + sttResult);
		return output;
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
			if (strArray[i] == isFound(strArray[i]) && strArray[i] != '0') {
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

	public SpeechToTextOutput speechToTextProcess(SpeechToTextInput data) throws Exception {
		System.out.println("GamePlayService - speechToTextProcess - START");
		SpeechToTextOutput output = null;
		
		authExplicit();
		
		try (SpeechClient speechClient = SpeechClient.create()) {
			List<String> phrases = Arrays.asList(
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

//			Path path = Paths.get(strPath);
//			byte[] data = Files.readAllBytes(path);
			byte[] byteArray = data.getData();
			ByteString audioBytes = ByteString.copyFrom(byteArray);
			
			RecognitionConfig config =
					RecognitionConfig.newBuilder()
					.setEncoding(RecognitionConfig.AudioEncoding.FLAC)
					.setSampleRateHertz(16000)
					.setLanguageCode("en-US")
					.addSpeechContexts(speechContext)
					.build();
			
			RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();
			
			RecognizeRequest request = RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
			
			RecognizeResponse response = speechClient.recognize(request);
			
			for (SpeechRecognitionResult result : response.getResultsList()) {
				SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
				String sttResult = alternative.getTranscript();
				output = improveAccuracy(sttResult);
			}
			System.out.println("GamePlayService - speechToTextProcess - END");
			return output;
		} catch (Exception e) {
			System.out.println("ERROR - GamePlayService - speechToTextProcess - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	static void authExplicit() throws IOException {
		  GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("src/main/resources/the-chess-347506-f74a8ba65a99.json"))
		        .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"));
		}
}
