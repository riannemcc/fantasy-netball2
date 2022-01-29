interface PlayerGame {
  gameId: string;
  startDateTime: string;
  points: number | string;
  goalsScored: string;
  goalsMissed: string;
}

export interface Player {
  _id: string;
  name: string;
  position: string[];
  team: string;
  games: PlayerGame[];
  isInjured?: boolean;
}
