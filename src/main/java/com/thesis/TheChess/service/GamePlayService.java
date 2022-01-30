package com.thesis.TheChess.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.thesis.TheChess.dto.OngoingGamesOutput;
import com.thesis.TheChess.dto.OngoingGamesResult;

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
}
