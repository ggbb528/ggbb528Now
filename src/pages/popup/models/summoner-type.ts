// Generated by https://quicktype.io

export interface Summoner {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: string;
  memo: null;
  created_at: Date;
  game_map: GameMap;
  queue_info: QueueInfo;
  version: Version;
  game_length_second: number;
  is_remake: boolean;
  is_opscore_active: boolean;
  is_recorded: boolean;
  average_tier_info: TierInfo;
  participants: MyData[];
  teams: Team[];
  myData: MyData;
}

export interface TierInfo {
  tier: Tier | null;
  division: number | null;
  tier_image_url: string;
  border_image_url: null | string;
  lp?: number | null;
}

export enum Tier {
  Diamond = 'DIAMOND',
  Grandmaster = 'GRANDMASTER',
  Master = 'MASTER',
  Platinum = 'PLATINUM',
}

export enum GameMap {
  SummonersRift = 'SUMMONERS_RIFT',
}

export interface MyData {
  summoner: SummonerClass;
  participant_id: number;
  champion_id: number;
  team_key: Key;
  position: Position;
  items: number[];
  trinket_item: number;
  rune: Rune;
  spells: number[];
  stats: Stats;
  tier_info: TierInfo;
}

export enum Position {
  ADC = 'ADC',
  Jungle = 'JUNGLE',
  Mid = 'MID',
  Support = 'SUPPORT',
  Top = 'TOP',
}

export interface Rune {
  primary_page_id: number;
  primary_rune_id: number;
  secondary_page_id: number;
}

export interface Stats {
  champion_level: number;
  damage_self_mitigated: number;
  damage_dealt_to_objectives: number;
  damage_dealt_to_turrets: number;
  magic_damage_dealt_player: number;
  physical_damage_taken: number;
  physical_damage_dealt_to_champions: number;
  total_damage_taken: number;
  total_damage_dealt: number;
  total_damage_dealt_to_champions: number;
  largest_critical_strike: number;
  time_ccing_others: number;
  vision_score: number;
  vision_wards_bought_in_game: number;
  sight_wards_bought_in_game: number;
  ward_kill: number;
  ward_place: number;
  turret_kill: number;
  barrack_kill: number;
  kill: number;
  death: number;
  assist: number;
  largest_multi_kill: number;
  largest_killing_spree: number;
  minion_kill: number;
  neutral_minion_kill_team_jungle: number;
  neutral_minion_kill_enemy_jungle: number;
  neutral_minion_kill: number;
  gold_earned: number;
  total_heal: number;
  result: Result;
  op_score: number;
  op_score_rank: number;
  is_opscore_max_in_team: boolean;
}

export enum Result {
  Lose = 'LOSE',
  Win = 'WIN',
}

export interface SummonerClass {
  id: number;
  summoner_id: string;
  acct_id: string;
  puuid: string;
  name: string;
  internal_name: string;
  profile_image_url: string;
  level: number;
  updated_at: Date | null;
}

export enum Key {
  Blue = 'BLUE',
  Red = 'RED',
}

export interface QueueInfo {
  id: number;
  queue_translate: QueueTranslate;
  game_type: GameType;
}

export enum GameType {
  SoloRanked = 'SOLORANKED',
  FlexRanked = 'FLEXRANKED',
  Total = 'TOTAL',
}

export enum QueueTranslate {
  單雙排積分 = '單 / 雙排積分',
}

export interface Team {
  key: Key;
  game_stat: GameStat;
  banned_champions: Array<number | null>;
}

export interface GameStat {
  dragon_kill: number;
  baron_kill: number;
  tower_kill: number;
  is_remake: boolean;
  is_win: boolean;
  kill: number;
  death: number;
  assist: number;
  gold_earned: number;
}

export enum Version {
  The1314893737 = '13.1.489.3737',
}

export interface Meta {
  first_game_created_at: Date;
  last_game_created_at: Date;
}
