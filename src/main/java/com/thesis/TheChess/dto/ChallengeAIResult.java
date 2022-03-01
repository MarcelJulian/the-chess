package com.thesis.TheChess.dto;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ChallengeAIResult {
	private String id;
	private String rated;
	private Variant variant;
	private String speed;
	private String perf;
	private String createdAt;
	private String lastMoveAt;
	private Status status;
	private Players players;
	private String initialFen;
	private String winner;
	private Opening opening;
	private String moves;
	private String pgn;
	private String daysPerTurn;
	private ArrayList<Analysis> analysis;
	private String tournament;
	private String swiss;
	private Clock clock;
	private String fen;
	private String turns;
	private String startedAtTurn;
	private String source;
	
	
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Variant {
		private String key;
		private String name;
		@JsonAlias("short")
		private String short_key;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Status{
		private String id;
		private String name;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Players{
		private Pieces white;
		private Pieces black;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Pieces{
		private User user;
		private String rating;
		private String ratingDiff;
		private String name;
		private String provisional;
		private String aiLevel;
		private PieceAnalysis analysis;
		private String team;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class User{
		private String name;
		private String title;
		private String patron;
		private String id;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class PieceAnalysis{
		private Integer inaccuracy;
		private Integer mistake;
		private Integer blunder;
		private Integer acpl;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Opening{
		private String eco;
		private String name;
		private String ply;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Analysis{
		private String eval;
		private String best;
		private String variation;
		private Judgement judgment;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Judgement{
		private String name;
		private String comment;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public static class Clock{
		private String initial;
		private String increment;
		private String totalTime;
	}
}
