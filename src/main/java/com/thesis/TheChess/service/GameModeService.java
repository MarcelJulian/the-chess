package com.thesis.TheChess.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.thesis.TheChess.dto.AbortResignDrawOfferResult;
import com.thesis.TheChess.dto.ChallengeAIResult;
import com.thesis.TheChess.dto.OngoingGamesOutput;
import com.thesis.TheChess.dto.OngoingGamesResult;
import com.thesis.TheChess.dto.PlayWithBotInput;
import com.thesis.TheChess.dto.PlayWithBotOutput;

@Service
public class GameModeService {

	@Value("${lichess_api_url}")	//	https://lichess.org/api/
    public String lichess_api_url;
	
	RestTemplate restTemplate = new RestTemplate();
	
	public OngoingGamesOutput ongoingGamesProcess(String user_oauth) throws Exception{
		System.out.println("GameModeService - ongoingGamesProcess - START - user_oauth >> " + user_oauth);
		
		OngoingGamesOutput output = new OngoingGamesOutput();
		OngoingGamesResult result = null;
		
		try {
			result = hitOngoingGames(user_oauth);
			
			if (result.getNowPlaying().size() == 0) {
				output.setGame_id("");
			} else {
				output.setGame_id(result.getNowPlaying().get(result.getNowPlaying().size()-1).getGameId());				
			}
			
			System.out.println("GameModeService - ongoingGamesProcess - END - user_oauth >> " + user_oauth);
			return output;
		} catch (Exception e) {
			System.out.println("GameModeService - ongoingGamesProcess - ERROR - user_oauth >> " + user_oauth + " - exception >> " + e.getMessage());
			throw new Exception("");
		}
	}
	
	private OngoingGamesResult hitOngoingGames(String user_oauth) throws Exception{
		System.out.println("hitOngoingGames START - user_oauth >> " + user_oauth);
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", "Bearer " + user_oauth);
			
			HttpEntity request = new HttpEntity("", headers);
			System.out.println("hitOngoingGames - request >> " + request);
			
			String uri = lichess_api_url + "account/playing";
			System.out.println("hitOngoingGames - uri >> " + uri);
			
			ResponseEntity<OngoingGamesResult> responseHit = restTemplate.exchange(uri, HttpMethod.GET, request, OngoingGamesResult.class);
			System.out.println("hitOngoingGames - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				OngoingGamesResult output = responseHit.getBody();
				
				System.out.println("hitOngoingGames END - user_oauth >> " + user_oauth + " - output >> " + output);
				return output;
			} else {
				throw new Exception("Failed Get Ongoing Games; error code value >> " + responseHit.getStatusCodeValue());
			}
		} catch (Exception e) {
			System.out.println("hitOngoingGames ERROR - user_oauth >> " + user_oauth + " - exception >> " + e.getMessage());
			throw new Exception("ERROR hitOngoingGames >> " + e.getMessage());
		}
	}
	
	public PlayWithBotOutput playWithBotProcess(String user_oauth, PlayWithBotInput input) throws Exception{
		System.out.println("GameModeService - playWithBotProcess - START - user_oauth >> " + user_oauth + " - input >> " + input);
		
		PlayWithBotOutput output = new PlayWithBotOutput();
		ChallengeAIResult result = null;
		
		try {
			result = hitChallengeAI(user_oauth, input);			//matchmaking
			output.setGame_id(result.getId());
			
			System.out.println("GameModeService - playWithBotProcess - END - user_oauth >> " + user_oauth + " - input >> " + input);
			return output;
		} catch (Exception e) {
			System.out.println("GameModeService - playWithBotProcess - ERROR - user_oauth >> " + user_oauth + " - input >> " + input + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}		
	}
	
	private ChallengeAIResult hitChallengeAI(String user_oauth, PlayWithBotInput input) throws Exception{
		System.out.println("hitChallengeAI - START - user_oauth >> " + user_oauth + " - input >> " + input);
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			headers.add("Authorization", "Bearer " + user_oauth);

			MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			map.add("level", input.getLevel());
			map.add("clock.limit", input.getClock_limit());
			map.add("clock.increment", input.getClock_increment());
//			map.add("days", input.getDays());	//cobain dulu butuh atau ga
			map.add("color", input.getColor());
			map.add("variant","standard");
			
			HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);
			System.out.println("hitChallengeAI - entity >> " + entity);
			
			String uri = lichess_api_url + "challenge/ai";
			System.out.println("hitChallengeAI - uri >> " + uri);

			ResponseEntity<ChallengeAIResult> responseHit = restTemplate.exchange(uri, HttpMethod.POST, entity, ChallengeAIResult.class);
			System.out.println("hitChallengeAI - responseHit >> " + responseHit);

			if (responseHit.getStatusCodeValue() == 201 || responseHit.getStatusCodeValue() == 200) {
				ChallengeAIResult output = responseHit.getBody();
				
				System.out.println("hitChallengeAI - END - user_oauth >> " + user_oauth + " - input >> " + input + " - output >> " + output);
				return output;
			} else {
				throw new Exception();
			}
		} catch (Exception e) {
			System.out.println("hitChallengeAI - ERROR - user_oauth >> " + user_oauth + " - input >> " + input + " - exception >> " + e.getMessage());
			throw new Exception("ERROR hitChallengeAI >> " + e.getMessage());
		}		
	}

	public Boolean abortGameProcess(String user_oauth, String game_id) throws Exception{
		System.out.println("GameModeService - abortGameProcess - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
		
		boolean result = false;
		
		try {
			result = hitAbortGame(user_oauth, game_id);
			
			System.out.println("GameModeService - abortGameProcess - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
			return result;
		} catch (Exception e) {
			System.out.println("GameModeService - abortGameProcess - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	private boolean hitAbortGame(String user_oauth, String game_id) throws Exception{
		System.out.println("hitAbortGame - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
		
		boolean result = false;
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", "Bearer " + user_oauth);
			
			HttpEntity request = new HttpEntity("", headers);
			System.out.println("hitAbortGame - request >> " + request);
			
			String uri = lichess_api_url + "board/game/" + game_id + "/abort";
			System.out.println("hitAbortGame - uri >> " + uri);
			
			ResponseEntity<AbortResignDrawOfferResult> responseHit = restTemplate.exchange(uri, HttpMethod.POST, request, AbortResignDrawOfferResult.class);
			System.out.println("hitChallengeAI - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				AbortResignDrawOfferResult output = responseHit.getBody();
				
				if (output.getOk().equalsIgnoreCase("true")){
					result = true;
				}
			} else {
				throw new Exception("Failed Abort Game; error code value >> " + responseHit.getStatusCodeValue());
			}
			
			System.out.println("hitAbortGame - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
			return result;
		} catch (Exception e) {
			System.out.println("hitAbortGame - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	public Boolean resignGameProcess(String user_oauth, String game_id) throws Exception{
		System.out.println("GameModeService - resignGameProcess - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
		
		boolean result = false;
		
		try {
			result = hitResignGame(user_oauth, game_id);
			
			System.out.println("GameModeService - resignGameProcess - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
			return result;
		} catch (Exception e) {
			System.out.println("GameModeService - resignGameProcess - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	private boolean hitResignGame(String user_oauth, String game_id) throws Exception{
		System.out.println("hitResignGame - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
		
		boolean result = false;
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", "Bearer " + user_oauth);
			
			HttpEntity request = new HttpEntity("", headers);
			System.out.println("hitResignGame - request >> " + request);
			
			String uri = lichess_api_url + "board/game/" + game_id + "/resign";
			System.out.println("hitResignGame - uri >> " + uri);
			
			ResponseEntity<AbortResignDrawOfferResult> responseHit = restTemplate.exchange(uri, HttpMethod.POST, request, AbortResignDrawOfferResult.class);
			System.out.println("hitResignGame - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				AbortResignDrawOfferResult output = responseHit.getBody();
				
				if (output.getOk().equalsIgnoreCase("true")){
					result = true;
				}
			} else {
				throw new Exception("Failed Resign Game; error code value >> " + responseHit.getStatusCodeValue());
			}
			
			System.out.println("hitResignGame - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id);
			return result;
		} catch (Exception e) {
			System.out.println("hitResignGame - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	public Boolean handleDrawOfferProcess(String user_oauth, String game_id, String accept) throws Exception{
		System.out.println("GameModeService - handleDrawOfferProcess - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept);
		
		boolean result = false;
		
		try {
			result = hitHandleDrawOffer(user_oauth, game_id, accept);
			
			System.out.println("GameModeService - handleDrawOfferProcess - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept);
			return result;
		} catch (Exception e) {
			System.out.println("GameModeService - handleDrawOfferProcess - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	private boolean hitHandleDrawOffer(String user_oauth, String game_id, String accept) throws Exception{
		System.out.println("hithandleDrawOffer - START - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept);
		
		boolean result = false;
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", "Bearer " + user_oauth);
			
			HttpEntity request = new HttpEntity("", headers);
			System.out.println("hithandleDrawOffer - request >> " + request);
			
			String uri = lichess_api_url + "board/game/" + game_id + "/draw/" + accept;
			System.out.println("hithandleDrawOffer - uri >> " + uri);
			
			ResponseEntity<AbortResignDrawOfferResult> responseHit = restTemplate.exchange(uri, HttpMethod.POST, request, AbortResignDrawOfferResult.class);
			System.out.println("hithandleDrawOffer - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				AbortResignDrawOfferResult output = responseHit.getBody();
				
				if (output.getOk().equalsIgnoreCase("true")){
					result = true;
				}
			} else {
				throw new Exception("Failed Handle Draw Offer; error code value >> " + responseHit.getStatusCodeValue());
			}
			
			System.out.println("hithandleDrawOffer - END - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept);
			return result;
		} catch (Exception e) {
			System.out.println("hithandleDrawOffer - ERROR - user_oauth >> " + user_oauth + " - game_id >> " + game_id + " - accept >> " + accept + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
}
