package com.thesis.TheChess.dto;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class OngoingGamesResult {
	private ArrayList<OngoingGamesDetail> nowPlaying;

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class OngoingGamesDetail {
		private String fullId;
		private String gameId;
		private String fen;
		private String color;
		private String lastMove;
		private Variant variant;
		private String speed;
		private String perf;
		private String rated;
		private Opponent opponent;
		private String isMyTurn;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Variant {
		private String key;
		private String name;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Opponent {
		private String id;
		private String username;
		private Integer rating;
	}
}

