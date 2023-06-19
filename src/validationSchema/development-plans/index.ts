import * as yup from 'yup';

export const developmentPlanValidationSchema = yup.object().shape({
  goals: yup.string(),
  progress: yup.string(),
  player_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
