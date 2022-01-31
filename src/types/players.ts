interface PlayerGame {
  gameId: string;
  startDateTime: string;
  points: number;
  goalsScored: number;
  goalsMissed: number;
}

export interface Player {
  _id: string;
  name: string;
  position: string[];
  team: string;
  games: PlayerGame[];
  isInjured?: boolean;
}
