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

import com.thesis.TheChess.dto.ChallengeAIResult;
import com.thesis.TheChess.dto.OngoingGamesOutput;
import com.thesis.TheChess.dto.OngoingGamesResult;
import com.thesis.TheChess.dto.PlayWithBotInput;
import com.thesis.TheChess.dto.PlayWithBotOutput;

@Service
public class GamePlayService {

	@Value("${lichess_url}")
    public String lichess_url;
	
	RestTemplate restTemplate = new RestTemplate();
	
	public OngoingGamesOutput ongoingGamesService(String user_oauth) throws Exception{
		System.out.println("GamePlayService - ongoingGamesService - START - user_oauth >> " + user_oauth);
		
		OngoingGamesOutput output = new OngoingGamesOutput();
		OngoingGamesResult result = null;
		
		try {
			validasiUserAuthorization(user_oauth);
			result = hitOngoingGames(user_oauth);
			output.setGame_id(result.getNowPlaying().get(result.getNowPlaying().size()-1).getGameId());
			
			System.out.println("GamePlayService - ongoingGamesService - END - user_oauth >> " + user_oauth);
			return output;
		} catch (Exception e) {
			System.out.println("GamePlayService - ongoingGamesService - ERROR - user_oauth >> " + user_oauth + " - exception >> " + e.getMessage());
			throw new Exception("");
		}
	}
	
	private OngoingGamesResult hitOngoingGames(String user_oauth) throws Exception{
		System.out.println("hitOngoingGames START - user_oauth >> " + user_oauth);
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", user_oauth);
			
			HttpEntity request = new HttpEntity("", headers);
			System.out.println("hitOngoingGames - request >> " + request);
			
			String uri = lichess_url + "api/account/playing";
			System.out.println("hitOngoingGames - uri >> " + uri);
			
			ResponseEntity<OngoingGamesResult> responseHit = restTemplate.exchange(uri, HttpMethod.GET, request, OngoingGamesResult.class);
			System.out.println("hitOngoingGames - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				OngoingGamesResult output = responseHit.getBody();
				
				System.out.println("hitOngoingGames END - user_oauth >> " + user_oauth + " - output >> " + output);
				return output;
			} else {
				throw new Exception("");
			}
		} catch (Exception e) {
			System.out.println("hitOngoingGames ERROR - user_oauth >> " + user_oauth + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	public PlayWithBotOutput playWithBotService(String user_oauth, PlayWithBotInput input) throws Exception{
		System.out.println("GamePlayService - playWithBotService - START - user_oauth >> " + user_oauth + " - input >> " + input);
		
		PlayWithBotOutput output = new PlayWithBotOutput();
		ChallengeAIResult result = null;
		
		try {
			validasiUserAuthorization(user_oauth);
			result = hitChallengeAI(user_oauth, input);
//			TODO: set output data
			
			System.out.println("GamePlayService - playWithBotService - END - user_oauth >> " + user_oauth + " - input >> " + input);
			return output;
		} catch (Exception e) {
			System.out.println("GamePlayService - playWithBotService - ERROR - user_oauth >> " + user_oauth + " - input >> " + input);
			throw new Exception(e.getMessage());
		}		
	}
	
	private ChallengeAIResult hitChallengeAI(String user_oauth, PlayWithBotInput input) throws Exception{
		System.out.println("hitChallengeAI - START - user_oauth >> " + user_oauth + " - input >> " + input);
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			headers.add("Authorization", user_oauth);

			MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			map.add("level", input.getLevel());
			map.add("clock.limit", input.getClock_limit());
			map.add("clock.increment", input.getClock_increment());
			map.add("days", input.getDays());
			map.add("variant","standard");
			
			HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);
			System.out.println("hitChallengeAI - entity >> " + entity);
			
			String uri = lichess_url + "api/challenge/ai";
			System.out.println("hitChallengeAI - uri >> " + uri);

			ResponseEntity<ChallengeAIResult> responseHit = restTemplate.exchange(uri, HttpMethod.POST, entity, ChallengeAIResult.class);
			System.out.println("hitChallengeAI - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				ChallengeAIResult output = responseHit.getBody();
				
				System.out.println("hitChallengeAI - END - user_oauth >> " + user_oauth + " - input >> " + input + " - output >> " + output);
				return output;
			} else {
				throw new Exception();
			}
		} catch (Exception e) {
			System.out.println("hitChallengeAI - ERROR - user_oauth >> " + user_oauth + " - input >> " + input + " - exception >> " + e.getMessage());
			throw new Exception(e.getMessage());
		}		
	}
	
	private void validasiUserAuthorization(String user_oauth) throws Exception{
		mandatoryInputValidation("User Authorization", user_oauth);
	}
	
	public void mandatoryInputValidation(String field, String value) throws Exception {
        if (value.equals("") || value == null) {
            throw new Exception("CORP-00-002;"+field);	//TODO: coba contek error messagenya apa wkwk
        }
    }
}
