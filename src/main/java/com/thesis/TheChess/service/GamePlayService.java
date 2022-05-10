package com.thesis.TheChess.service;

import java.io.FileInputStream;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1p1beta1.RecognizeRequest;
import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
import com.google.cloud.speech.v1p1beta1.SpeechClient;
import com.google.cloud.speech.v1p1beta1.SpeechContext;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
import com.google.cloud.speech.v1p1beta1.SpeechSettings;
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
	
	public SpeechToTextOutput speechToTextProcess(SpeechToTextInput data) throws Exception {
		System.out.println("GamePlayService - speechToTextProcess - START");
		SpeechToTextOutput output = null;
		
		GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream("src/main/resources/the-chess-347506-f74a8ba65a99.json"))
		        .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"));
		
		SpeechSettings speechSettings = SpeechSettings.newBuilder()
			         .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
			         .build();
		
		try (SpeechClient speechClient = SpeechClient.create(speechSettings)) {
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

			byte[] byteArray = data.getData();
			ByteString audioBytes = ByteString.copyFrom(byteArray);
			
			RecognitionConfig config =
					RecognitionConfig.newBuilder()
					.setEncoding(AudioEncoding.LINEAR16)
					.setLanguageCode("en-US")
					.addSpeechContexts(speechContext)
					.build();
			
			RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();
			
			RecognizeRequest request = RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
			
			RecognizeResponse response = speechClient.recognize(request);
			System.out.println("Response >> " + response.getResultsList());
			
			for (SpeechRecognitionResult result : response.getResultsList()) {
				SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
				String sttResult = alternative.getTranscript();
				output = improveAccuracy(sttResult.toLowerCase());
			}
			System.out.println("GamePlayService - speechToTextProcess - END");
			return output;
		} catch (Exception e) {
			System.out.println("ERROR - GamePlayService - speechToTextProcess - exception >> " + e.getMessage());
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
		} else if (sttResult.contains("yes")) {
			output.setType("confirm");
			output.setValue("Yes");
		} else if (sttResult.contains("no")) {
			output.setType("confirm");
			output.setValue("No");
		} else {
			String[] splited = sttResult.split("\\s+");
			int totalWord = splited.length;
			
			switch (totalWord) {
			case 1:
				try {
					String temp = splited[0];
					String temp0 = "";
					System.out.println("temp0 >> " + temp0 + " -- temp >> " + temp);
					
					if (temp.length() == 2) {
						System.out.println("temp.length() == 2");
						if (isAccurate(temp.charAt(0), temp.charAt(1))) {
							System.out.println("isAccurate == true; temp >> " + temp);
							output.setType("move");
							output.setValue(temp);
						} else {
							System.out.println("isAccurate == false; temp >> " + temp);
							output.setType("error");
							output.setValue(temp);
						}
					} else {
						System.out.println("temp.length() != 2");
						if (containNumeric(temp)) {
							System.out.println("containNumeric(temp) == true");
							if (temp.charAt(0) == '9') {
								temp0 = "N";
							} else if (temp.charAt(0) == 'r') {
								temp0 = "R";
							}
							System.out.println("temp0 >> " + temp0);
							temp = removeDuplicateChar(temp);
							temp = cleanString(temp);
							
							if (temp.length() != 2) {
								System.out.println("temp.length() != 2 after remove and clean; temp >> " + temp);
								output.setType("error");
								output.setValue(temp);
							} else {
								System.out.println("temp.length() == 2 after remove and clean");
								if (isAccurate(temp.charAt(0), temp.charAt(1))) {
									if (temp0 != "") {
										temp = temp0 + temp;
									}
									output.setType("move");
									output.setValue(temp);
									System.out.println("isAccurate == true; temp >> " + temp);
								} else {
									System.out.println("isAccurate == false; temp >> " + temp);
									output.setType("error");
									output.setValue(temp);
								}
							}
						} else {
							System.out.println("containNumeric(temp) == false; temp >> " + temp);
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
					if (sttResult.equals("queenside castle") || (sttResult.contains("queen") && sttResult.contains("castle"))) {
						output.setType("move");
						output.setValue("0-0-0");
					} else if (sttResult.equals("kingside castle") || (sttResult.contains("king") && sttResult.contains("castle"))) {
						output.setType("move");
						output.setValue("0-0");
					} else {
						String temp1 = splited[0];
						String temp2 = splited[1];
						
						if (temp1.equalsIgnoreCase("bishop")) {
							temp1 = "B";
						} else if (temp1.equalsIgnoreCase("knight")) {
							temp1 = "N";
						} else if (temp1.equalsIgnoreCase("rook")) {
							temp1 = "R";
						} else if (temp1.equalsIgnoreCase("queen")) {
							temp1 = "Q";
						} else if (temp1.equalsIgnoreCase("king")) {
							temp1 = "K";
						} else {
							output.setType("error");
							output.setValue(temp1 + temp2);
						}
						
						if (containNumeric(temp2)) {
							temp2 = removeDuplicateChar(temp2);
							temp2 = cleanString(temp2);
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
					if (sttResult.equals("queen side castle") || (sttResult.contains("queen") && sttResult.contains("castle"))) {
						output.setType("move");
						output.setValue("0-0-0");
					} else if (sttResult.equals("King side Castle") || (sttResult.contains("king") && sttResult.contains("castle"))) {
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
			System.out.println("removeDuplicateChar -- temp1 >> " + temp1 + " -- temp2 >> " + temp2);
			if (temp1 == temp2) {
				StringBuilder sb = new StringBuilder(str);
				sb.deleteCharAt(i-1);
				str = sb.toString();
				System.out.println("removeDuplicateChar -- str >> " + str);
			}
		}
		return str;
	}
	
	private String cleanString(String str) {
		char[] strArray = str.toCharArray();
		
		StringBuilder sb = new StringBuilder();
		for (int i=0; i<strArray.length; i++) {
			System.out.println("cleanString -- strArray[i] >> " + strArray[i]);
			if (strArray[i] == isFound(strArray[i]) && strArray[i] != '0') {
				sb.append(strArray[i]);
				System.out.println("cleanString -- sb.append(strArray[i]) >> " + sb.toString());
			}
		}
		
		String newStr = sb.toString();
		System.out.println("cleanString -- newStr >> " + newStr);
		if (newStr.length() > 2) {
			System.out.println("cleanString -- newStr.length() > 2 -- " + String.valueOf(newStr.charAt(0)) + String.valueOf(newStr.charAt(newStr.length()-1)));
			return String.valueOf(newStr.charAt(0)) + String.valueOf(newStr.charAt(newStr.length()-1));
		} else {
			System.out.println("cleanString -- newStr.length() <= 2 -- " + newStr);
			return newStr;
		}
	}
	
	private char isFound(char src) {
		char[] piecesChar = {'a','b','c','d','e','f','g','h','1','2','3','4','5','6','7','8'};
		for (int i=0; i<piecesChar.length; i++) {
			System.out.println("isFound -- src >> " + src + " -- piecesChar[i] >> " + piecesChar[i]);
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
