package com.thesis.TheChess.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountResult {
	private String id;
	private String username;
	private boolean online;
	private UserPerfs perfs;
	private String createdAt;
	private boolean disabled;
	private boolean tosViolation;
	private UserProfile profile;
	private String seenAt;
	private boolean patron;
	private boolean verified;
	private UserPlayTime playTime;
	private String title;
	private String url;
	private String playing;
	private String completionRate;
	private UserCount count;
	private boolean streaming;
	private boolean followable;
	private boolean following;
	private boolean blocking;
	private boolean followsYou;

}
