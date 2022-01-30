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
public class ChallengeAIResult {
	private String id;
	private boolean rated;
	private String variant;
	private String speed;
	private String perf;
	private Integer createdAt;
	private Integer lastMoveAt;
	private String status;
	private Players players;
	private String initialFen;
	private String winner;
	private Opening opening;
	private String moves;
	private String pgn;
	private Integer daysPerTurn;
	private ArrayList<Analysis> analysis;
	private String tournament;
	private String swiss;
	private Clock clock;
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Players{
		private Pieces white;
		private Pieces black;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Pieces{
		private User user;
		private Integer rating;
		private Integer ratingDiff;
		private String name;
		private Boolean provisional;
		private Integer aiLevel;
		private PieceAnalysis analysis;
		private String team;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class User{
		private String name;
		private String title;
		private boolean patron;
		private String id;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class PieceAnalysis{
		private Integer inaccuracy;
		private Integer mistake;
		private Integer blunder;
		private Integer acpl;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Opening{
		private String eco;
		private String name;
		private Integer ply;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Analysis{
		private Integer eval;
		private String best;
		private String variation;
		private Judgement judgment;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
		public class Judgement{
		private String name;
		private String comment;
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class Clock{
		private Integer initial;
		private Integer increment;
		private Integer totalTime;
	}
}
