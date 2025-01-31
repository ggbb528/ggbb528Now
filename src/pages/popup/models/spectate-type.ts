// Generated by https://quicktype.io

export interface Spectate {
  data: Data;
}

export interface Data {
  game_id: string;
  created_at: Date;
  game_map: string;
  game_type: GameType;
  record_status: string;
  participants: Participant[];
  teams: Team[];
  championsById: { [key: string]: ChampionsByID };
  spellsById: { [key: string]: SByID };
  runePagesById: { [key: string]: SByID };
  runes: Rune[];
  statMods: StatMod[];
  seasons: Season[];
  account: Account;
}

export interface Account {
  server: string;
  summonerId: string;
  accountId: string;
}

export interface ChampionsByID {
  id: number;
  key: string;
  name: string;
  image_url: string;
  evolve: Evolve[];
  blurb: string;
  title: string;
  tags: Tag[];
  lore: string;
  partype: string;
  info: Info;
  stats: { [key: string]: number };
  enemy_tips: string[];
  ally_tips: string[];
  skins: Skin[];
  passive: Passive;
  spells: Spell[];
}

export interface Evolve {
  key: string;
  name: string;
  image_url: string;
}

export interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface Passive {
  name: string;
  description: string;
  image_url: string;
  video_url: null | string;
}

export interface Skin {
  id: number;
  champion_id: number;
  name: string;
  has_chromas: boolean;
  splash_image: string;
  loading_image: string;
  tiles_image: string;
  centered_image: string;
  skin_video_url: null | string;
  prices: Price[] | null;
  sales: Sale[] | null;
  release_date: Date | null;
}

export interface Price {
  currency: Currency;
  cost: number;
}

export enum Currency {
  IP = 'IP',
  Rp = 'RP',
}

export interface Sale {
  currency: Currency;
  cost: number;
  discount_rate: number;
  started_at: Date;
  ended_at: Date;
}

export interface Spell {
  key: SpellKey;
  name: string;
  description: string;
  max_rank: number;
  range_burn: number[];
  cooldown_burn: number[];
  cooldown_burn_float: number[];
  cost_burn: number[];
  tooltip: string;
  image_url: string;
  video_url: null | string;
}

export enum SpellKey {
  E = 'E',
  Q = 'Q',
  R = 'R',
  W = 'W',
}

export enum Tag {
  Assassin = 'Assassin',
  Fighter = 'Fighter',
  Mage = 'Mage',
  Marksman = 'Marksman',
  Support = 'Support',
  Tank = 'Tank',
}

export enum GameType {
  Soloranked = 'SOLORANKED',
}

export interface Participant {
  summoner: Summoner;
  team_key: TeamKeyEnum;
  champion_id: number;
  position: string;
  rune_build: RuneBuild;
  spells: number[];
  most_champion_stat: { [key: string]: number | null } | null;
}

export interface RuneBuild {
  primary_page_id: number;
  primary_rune_ids: number[];
  secondary_page_id: number;
  secondary_rune_ids: number[];
  stat_mod_ids: number[];
}

export interface Summoner {
  id: number;
  summoner_id: string;
  acct_id: string;
  puuid: string;
  game_name: string;
  tagline: string;
  name: string;
  internal_name: string;
  profile_image_url: string;
  level: number;
  updated_at: Date;
  renewable_at: Date;
  revision_at: Date;
  player: null;
  previous_seasons: PreviousSeason[];
  league_stats: LeagueStat[];
}

export interface LeagueStat {
  game_type: GameType;
  tier_info: TierInfo;
  win: number;
  lose: number;
  is_hot_streak: boolean;
  is_fresh_blood: boolean;
  is_veteran: boolean;
  is_inactive: boolean;
  series: null;
  updated_at: Date;
}

export interface TierInfo {
  tier: Tier;
  division: number;
  lp: number;
  level: null;
  tier_image_url: string;
  border_image_url: string;
}

export enum Tier {
  Diamond = 'DIAMOND',
  Emerald = 'EMERALD',
  Grandmaster = 'GRANDMASTER',
  Master = 'MASTER',
  Challenger = 'CHALLENGER',
}

export interface PreviousSeason {
  season_id: number;
  tier_info: TierInfo;
}

export enum TeamKeyEnum {
  Blue = 'BLUE',
  Red = 'RED',
}

export interface SByID {
  id: number;
  name: string;
  description: string;
  slogan?: string;
  image_url: string;
  key?: string;
}

export interface Rune {
  id: number;
  page_id: number;
  slot_sequence: number;
  rune_sequence: number;
  key: string;
  name: string;
  short_desc: string;
  long_desc: string;
  image_url: string;
}

export interface Season {
  id: number;
  value: number;
  display_value: number;
  split: number | null;
  season: number | null;
  is_preseason: boolean;
}

export interface StatMod {
  id: number;
  name: string;
  short_desc: string;
  image_url: string;
}

export interface Team {
  key: TeamKeyEnum;
  average_tier_info: AverageTierInfo;
  banned_champions: number[];
}

export interface AverageTierInfo {
  tier: Tier;
  division: number;
  tier_image_url: string;
  border_image_url: string;
}
