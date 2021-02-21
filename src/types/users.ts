interface UserPlayer {
  playerId: string;
  position: string;
  dateAdded: string;
}

interface UserExPlayer extends UserPlayer {
  dateRemoved: string;
  wasCaptain: boolean;
  wasViceCaptain: boolean;
}

export interface User {
  _id: string;
  captain: string;
  viceCaptain: string;
  teamPlayers: UserPlayer[];
  teamname: string;
  exPlayers: UserExPlayer[];
  lateEntry?: boolean;
}

export interface CurrentUser extends User {
  email: string;
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
}
