package com.thesis.TheChess.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

@Service
public class UserService {

	@Value("${client_id}")
	private String client_id;

	@Value("${lichess_url}")
    public String lichess_url;
	
	@Value("${theChess_url}")
	private String chess_url;
	
	public RedirectView loginService(HttpServletRequest request) throws Exception{
		System.out.println("UserService - loginService START - request >> " + request);
		
		RedirectView output = null;
		
		try {
			String verifier = createVerifier();
			String challenge = createChallenge(verifier);
			
			System.out.println("request.getSession().getAttributeNames() >> " + request.getSession().getAttributeNames());
			
//			req.session.codeVerifier = verifier
			HttpSession session = request.getSession();
			session.setAttribute("codeVerifier", verifier);
			
			String url = chess_url + "oauth?response_type=code&client_id=" + client_id + "&redirect_uri=" + chess_url + "&scope=board:play&code_challenge_method=S256&code_challenge=" + challenge;
			
			output = new RedirectView();
			output.setUrl(url);
			
			System.out.println("UserService - loginService END - output: " + output);
			return output;
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

	public void callbackService() throws Exception{
		System.out.println("UserService - callbackService START");
		
		try {
			
			
			System.out.println("UserService - callbackService END");
		} catch (Exception e) {
			System.out.println("UserService - callbackService ERROR - error >> " + e.getMessage());
			throw new Exception("ERROR callbackService >> " + e.getMessage());
		}
	}
}
