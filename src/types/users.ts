import { ObjectId } from 'mongodb';

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

export interface UserDb {
  _id: ObjectId;
  captain: string;
  viceCaptain: string;
  teamPlayers: UserPlayer[];
  teamname: string;
  exPlayers: UserExPlayer[];
  email: string;
  createdAt: string;
  updatedAt: string;
  lateEntry?: boolean;
  isAdmin?: boolean;
}

export interface User
  extends Pick<
    UserDb,
    | 'captain'
    | 'viceCaptain'
    | 'teamname'
    | 'teamPlayers'
    | 'exPlayers'
    | 'lateEntry'
  > {
  _id: string;
}

export interface CurrentUser extends Omit<UserDb, '_id'> {
  _id: string;
}
