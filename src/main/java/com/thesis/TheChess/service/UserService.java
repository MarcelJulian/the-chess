package com.thesis.TheChess.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
	
//	public RedirectView loginService(HttpServletRequest request) throws Exception{
//		System.out.println("UserService - loginService START - request >> " + request);
//		
//		RedirectView output = null;
//		
//		try {
//			String verifier = createVerifier();
//			System.out.println("verifier: " + verifier);
//			String challenge = createChallenge(verifier);
//			System.out.println("challenge: " + challenge);
//			
////			req.session.codeVerifier = verifier
//			HttpSession session = request.getSession();
//			session.setAttribute("codeVerifier", verifier);
//			
//			String url = chess_url + "oauth?response_type=code&client_id=" + client_id + "&redirect_uri=" + chess_url + "&scope=board:play&code_challenge_method=S256&code_challenge=" + challenge;
//			
//			output = new RedirectView();
//			output.setUrl(url);
//			
//			System.out.println("UserService - loginService END - output: " + output);
//			return output;
//		} catch (Exception e) {
//			System.out.println("UserService - loginService ERROR - error: " + e.getMessage());
//			throw new Exception("ERROR loginService >> " + e.getMessage());
//		}
//	}
	
	public String loginService(HttpServletRequest request) throws Exception{
		System.out.println("UserService - loginService START - request >> " + request);
		
		try {
			String verifier = createVerifier();
			System.out.println("verifier: " + verifier);
			String challenge = createChallenge(verifier);
			System.out.println("challenge: " + challenge);
			
//			req.session.codeVerifier = verifier
			HttpSession session = request.getSession();
			session.setAttribute("codeVerifier", verifier);
			
			String url = chess_url + "oauth?response_type=code&client_id=" + client_id + "&redirect_uri=" + chess_url + "/callback&scope=board:play&code_challenge_method=S256&code_challenge=" + challenge;
			
			System.out.println("UserService - loginService END - output: " + url);
			return url;
		} catch (Exception e) {
			System.out.println("UserService - loginService ERROR - error: " + e.getMessage());
			throw new Exception("ERROR loginService >> " + e.getMessage());
		}
	}

//	const createChallenge = (verifier) => base64URLEncode(sha256(verifier));
	private String createChallenge(String verifier) {
		return base64URLEncode(sha256(verifier));
	}

//	const createVerifier = () => base64URLEncode(crypto.randomBytes(32));
	private String createVerifier() throws NoSuchAlgorithmException {
		/* Source: https://howtodoinjava.com/java/java-security/how-to-generate-secure-password-hash-md5-sha-pbkdf2-bcrypt-examples/ */
		SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
		byte[] salt = new byte[32];
		sr.nextBytes(salt);
		return base64URLEncode(salt.toString());
	}
	
//	const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest();
	private String sha256(String salt) {
		/* Source: https://howtodoinjava.com/java/java-security/how-to-generate-secure-password-hash-md5-sha-pbkdf2-bcrypt-examples/ */
		String generatedPassword = null;
		String passwordToHash = "password";
		
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt.getBytes());
            
            byte[] bytes = md.digest(passwordToHash.getBytes());
            
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 32).substring(1));
            }
            generatedPassword = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return generatedPassword;
	}

	private String base64URLEncode(String str) {
		return Base64.getEncoder().encodeToString(str.getBytes()).replace("+", "-").replace("/", "_").replace("=", "");
	}

	public String callbackService(HttpServletRequest request) throws Exception{
		System.out.println("UserService - callbackService START");
		
		String output = "";
		String session_value = "";
		String authCode = "";
		String lichess_token = "";
		String username = "";
		
		try {
//			const verifier = req.session.codeVerifier;
			HttpSession session = request.getSession();
			session_value = (String) session.getAttribute("codeVerifier");
			
//			const lichessToken = await getLichessToken(req.query.code, verifier, url)
			authCode = request.getQueryString();	//TODO: ini gatau dapet codenya gmn
			
			lichess_token = getLichessToken(authCode, session_value);
			
//			const lichessUser = await getLichessUser(lichessToken.access_token)
			username = getLichessUser(lichess_token);
			
			output = "Logged in as " + username;
			
			System.out.println("UserService - callbackService END");
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
			map.add("redirect_uri", chess_url + "/callback");
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

				System.out.println("getLichessToken END - authCode: " + authCode + " - verifier: " + verifier);
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
			headers.add("Authorization", lichess_token);
			
			HttpEntity request = new HttpEntity("", headers);
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
