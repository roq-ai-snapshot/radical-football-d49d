import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DevelopmentPlanInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  goals?: string;
  progress?: string;
  created_at?: any;
  updated_at?: any;

  player?: PlayerInterface;
  user?: UserInterface;
  _count?: {};
}

export interface DevelopmentPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  coach_id?: string;
  goals?: string;
  progress?: string;
}
