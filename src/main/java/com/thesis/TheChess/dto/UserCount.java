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
	private Integer all;
	private Integer rated;
	private Integer ai;
	private Integer draw;
	private Integer drawH;
	private Integer loss;
	private Integer lossH;
	private Integer win;
	private Integer winH;
}
