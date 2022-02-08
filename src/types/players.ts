interface PlayerGame {
  gameId: string;
  startDateTime: string;
  points: number | string;
  goalsScored: number | string;
  goalAssists: number | string;
  feeds: number | string;
  goalsMissed: number | string;
  penalties: number | string;
  offensiveRebounds: number | string;
  defensiveRebounds: number | string;
  interceptions: number | string;
  deflections: number | string;
  turnovers: number | string;
  unforcedErrors: number | string;
  cautions: number | string;
  mvp: number | string;
}

export interface Player {
  _id: string;
  name: string;
  position: string[];
  team: string;
  games: PlayerGame[];
  isInjured?: boolean;
}
