package com.thesis.TheChess.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserProfile {
	private String country;
	private String location;
	private String bio;
	private String firstName;
	private String lastName;
	private String fideRating;
	private String uscfRating;
	private String ecfRating;
	private String links;
}
