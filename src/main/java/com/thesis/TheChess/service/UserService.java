package com.thesis.TheChess.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.thesis.TheChess.model.LoginInput;
import com.thesis.TheChess.model.LoginOutput;

@Service
public class UserService {

	@Value("${lichess_url}")
    public String lichess_url;

	public LoginOutput loginService(LoginInput input) throws Exception{
		System.out.println("UserService - loginService - START - input >> " + input);
		LoginOutput output = null;
		
		try {
			validasiLoginInput(input);
			
//			TODO:buat hit ke API lichess cb liat ke DownloadSPPJSPPK (dia gapake ResultServiceOutput)
			
			System.out.println("UserService - loginService - END - input >> " + input);
			return output;
		} catch (Exception e) {
			
			System.out.println("UserService - loginService - ERROR - input >> " + input + " - Exception >> " + e.getMessage());
			return null;
		}
	}
	
	private void validasiLoginInput(LoginInput data) throws Exception{
		mandatoryInputValidation("User ID", data.getUser_id());
	}
	
	public void mandatoryInputValidation(String field, String value) throws Exception {
        if (value.equals("")) {
            throw new Exception("CORP-00-002;"+field);	//TODO: coba contek error messagenya apa wkwk
        }
    }
	
}
