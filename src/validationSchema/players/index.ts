import * as yup from 'yup';

export const playerValidationSchema = yup.object().shape({
  personal_information: yup.string(),
  skills: yup.string(),
  performance_data: yup.string(),
  user_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
