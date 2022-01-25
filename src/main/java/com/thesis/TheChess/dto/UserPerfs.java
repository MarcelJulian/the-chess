package com.thesis.TheChess.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserPerfs {
	private Perfs chess960;
	private Perfs atomic;
	private Perfs racingKings;
	private Perfs ultraBullet;
	private Perfs blitz;
	private Perfs kingOfTheHill;
	private Perfs bullet;
	private Perfs correspondence;
	private Perfs horde;
	private Perfs puzzle;
	private Perfs classical;
	private Perfs rapid;
	private PerfsStorm storm;
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Perfs {
		private Integer games;
		private Integer rating;
		private Integer rd;
		private Integer prog;
		private boolean prov;
	}
}
