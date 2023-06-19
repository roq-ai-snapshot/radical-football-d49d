import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createDevelopmentPlan } from 'apiSdk/development-plans';
import { Error } from 'components/error';
import { developmentPlanValidationSchema } from 'validationSchema/development-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { getPlayers } from 'apiSdk/players';
import { getUsers } from 'apiSdk/users';
import { DevelopmentPlanInterface } from 'interfaces/development-plan';

function DevelopmentPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DevelopmentPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDevelopmentPlan(values);
      resetForm();
      router.push('/development-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DevelopmentPlanInterface>({
    initialValues: {
      goals: '',
      progress: '',
      player_id: (router.query.player_id as string) ?? null,
      coach_id: (router.query.coach_id as string) ?? null,
    },
    validationSchema: developmentPlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Development Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="goals" mb="4" isInvalid={!!formik.errors?.goals}>
            <FormLabel>Goals</FormLabel>
            <Input type="text" name="goals" value={formik.values?.goals} onChange={formik.handleChange} />
            {formik.errors.goals && <FormErrorMessage>{formik.errors?.goals}</FormErrorMessage>}
          </FormControl>
          <FormControl id="progress" mb="4" isInvalid={!!formik.errors?.progress}>
            <FormLabel>Progress</FormLabel>
            <Input type="text" name="progress" value={formik.values?.progress} onChange={formik.handleChange} />
            {formik.errors.progress && <FormErrorMessage>{formik.errors?.progress}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Select Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.personal_information}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'coach_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'development_plan',
  operation: AccessOperationEnum.CREATE,
})(DevelopmentPlanCreatePage);
