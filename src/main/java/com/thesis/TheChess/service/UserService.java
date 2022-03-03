package com.thesis.TheChess.service;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.servlet.view.RedirectView;

import com.thesis.TheChess.dto.AccountResult;
import com.thesis.TheChess.dto.CallbackOutput;
import com.thesis.TheChess.dto.LichessTokenResult;

@Service
public class UserService {

	@Value("${client_id}")
	private String client_id;

	@Value("${lichess_api_url}")	//	https://lichess.org/api/
    public String lichess_api_url;
	
	@Value("${lichess_url}")
    public String lichess_url;
	
	@Value("${theChess_url}")
	private String chess_url;
	
	RestTemplate restTemplate = new RestTemplate();
	
	public String loginService(HttpServletRequest request) throws Exception{
		System.out.println("UserService - loginService START - request >> " + request);
		
		try {
			String verifier = generateCodeVerifier();
			String challenge = generateCodeChallange(verifier);
			
			HttpSession session = request.getSession();
			session.setAttribute("codeVerifier", verifier);
			
			String url = lichess_url + "oauth?response_type=code&client_id=" + client_id + "&redirect_uri=" + chess_url + "api/callback-the-chess&scope=board:play&code_challenge_method=S256&code_challenge=" + challenge;
			
			System.out.println("UserService - loginService END - output: " + url);
			return url;
		} catch (Exception e) {
			System.out.println("UserService - loginService ERROR - error: " + e.getMessage());
			throw new Exception("ERROR loginService >> " + e.getMessage());
		}
	}
	
	private String generateCodeVerifier() throws UnsupportedEncodingException {
        SecureRandom secureRandom = new SecureRandom();
        byte[] codeVerifier = new byte[32];
        secureRandom.nextBytes(codeVerifier);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(codeVerifier);
    }
	
	private String generateCodeChallange(String codeVerifier) throws UnsupportedEncodingException, NoSuchAlgorithmException {
	    byte[] bytes = codeVerifier.getBytes("US-ASCII");
	    MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
	    messageDigest.update(bytes, 0, bytes.length);
	    byte[] digest = messageDigest.digest();
	    
	    return Base64.getUrlEncoder().withoutPadding().encodeToString(digest);
	}

	public CallbackOutput callbackService(HttpServletRequest request) throws Exception{
		System.out.println("UserService - callbackService START");
		
		CallbackOutput output = null;
		String session_value = "";
		String authCode = "";
		String lichess_token = "";
		String username = "";
		
		try {
			HttpSession session = request.getSession();
			session_value = (String) session.getAttribute("codeVerifier");
			authCode = request.getParameter("code");
			lichess_token = getLichessToken(authCode, session_value);
			username = getLichessUser(lichess_token);
			output = new CallbackOutput(lichess_token, username);
	
			System.out.println("UserService - callbackService END - output >> " + output);
			return output;
		} catch (Exception e) {
			System.out.println("UserService - callbackService ERROR - error >> " + e.getMessage());
			throw new Exception("ERROR callbackService >> " + e.getMessage());
		}
	}
	
	public String getLichessToken(String authCode, String verifier) throws Exception{
		System.out.println("getLichessToken START - authCode: " + authCode + " - verifier: " + verifier);
		
		String output = "";
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			
			MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
			map.add("grant_type", "authorization_code");
			map.add("code", authCode);
			map.add("code_verifier", verifier);
			map.add("redirect_uri", chess_url + "callback-the-chess");
			map.add("client_id", client_id);
			
			HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);
			System.out.println("getLichessToken - entity >> " + entity);
			
			String uri = lichess_api_url + "token";
			System.out.println("getLichessToken - uri >> " + uri);
			
			ResponseEntity<LichessTokenResult> responseHit = restTemplate.exchange(uri, HttpMethod.POST, entity, LichessTokenResult.class);
			System.out.println("getLichessToken - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				LichessTokenResult result = responseHit.getBody();
				output = result.getAccess_token();

				System.out.println("getLichessToken END - authCode: " + authCode + " - verifier: " + verifier + " - accessToken: " + output);
				return output;
			} else {
				throw new Exception("Failed getting token");
			}
		} catch (Exception e) {
			System.out.println("getLichessToken ERROR - authCode: " + authCode + " - verifier: " + verifier + " - error >> " + e.getMessage());
			throw new Exception("ERROR getLichessToken >> " + e.getMessage());
		}
	}
	
	public String getLichessUser(String lichess_token) throws Exception{
		System.out.println("getLichessUser START - lichess_token: " + lichess_token);
		
		String output = "";
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.add("Authorization", "Bearer " + lichess_token);
			
			HttpEntity request = new HttpEntity(headers);
			System.out.println("getLichessUser - request >> " + request);
			
			String uri = lichess_api_url + "account";
			System.out.println("getLichessUser - uri >> " + uri);
			
			ResponseEntity<AccountResult> responseHit = restTemplate.exchange(uri, HttpMethod.GET, request, AccountResult.class);
			System.out.println("getLichessUser - responseHit >> " + responseHit);
			
			if (responseHit.getStatusCodeValue() == 200) {
				AccountResult result = responseHit.getBody();
				output = result.getUsername();

				System.out.println("getLichessUser END - lichess_token: " + lichess_token);
				return output;
			} else {
				throw new Exception("Failed getting account");
			}
		} catch (Exception e) {
			System.out.println("getLichessUser ERROR - lichess_token: " + lichess_token + " - error >> " + e.getMessage());
			throw new Exception("ERROR getLichessUser >> " + e.getMessage());
		}
	}
}
