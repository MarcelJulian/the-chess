package com.thesis.TheChess.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.thesis.TheChess.dto.LoginInput;
import com.thesis.TheChess.dto.LoginOutput;

@Service
public class UserService {

	@Value("${lichess_url}")
    public String lichess_url;

	public LoginOutput loginService(LoginInput input) throws Exception{
		System.out.println("UserService - loginService - START - input >> " + input);
		LoginOutput output = null;
		
		try {
//			TODO:buat hit ke API lichess cb liat ke DownloadSPPJSPPK (dia gapake ResultServiceOutput)
			
			System.out.println("UserService - loginService - END - input >> " + input);
			return output;
		} catch (Exception e) {
			
			System.out.println("UserService - loginService - ERROR - input >> " + input + " - Exception >> " + e.getMessage());
			return null;
		}
	}
	
}
