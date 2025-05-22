import { Schema, model } from "mongoose";

const matchSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  season: { type: String },
  city: { type: String },
  date: { type: String },
  match_type: { type: String },
  player_of_match: { type: String },
  venue: { type: String },
  team1: { type: String },
  team2: { type: String },
  toss_winner: { type: String },
  toss_decision: { type: String },
  winner: { type: String },
  result: { type: String },
  result_margin: { type: String },
  target_runs: { type: String },
  target_overs: { type: String },
  super_over: { type: String },
  isLive: { type: Boolean, default: false },

  score1: { type: Number },
  score2: { type: Number },
  wicket1: { type: Number },
  wicket2: { type: Number },

  overs1: { type: Number },
  overs2: { type: Number },
});

export const Match = model("Match", matchSchema);
