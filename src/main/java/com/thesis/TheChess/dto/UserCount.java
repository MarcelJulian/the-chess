package com.thesis.TheChess.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserCount {
	private String all;
	private String rated;
	private String ai;
	private String draw;
	private String drawH;
	private String loss;
	private String lossH;
	private String win;
	private String winH;
}
