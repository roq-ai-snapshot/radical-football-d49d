import { DevelopmentPlanInterface } from 'interfaces/development-plan';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  coach_id: string;
  personal_information?: string;
  skills?: string;
  performance_data?: string;
  created_at?: any;
  updated_at?: any;
  development_plan?: DevelopmentPlanInterface[];
  user_player_user_idTouser?: UserInterface;
  user_player_coach_idTouser?: UserInterface;
  _count?: {
    development_plan?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  coach_id?: string;
  personal_information?: string;
  skills?: string;
  performance_data?: string;
}
