import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import Textarea from 'components/common/inputs/textarea';
import { useForm } from 'react-hook-form';
import FormHeading from 'components/mint/forms/form-heading';

const SubmitRemarkForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box>
      <Box mb={4}>
        <FormHeading>Submit Remark</FormHeading>
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="submit-rmrk-form">
        <Box mb={4}>
          <Textarea
            name="rmrk"
            label="Remark*"
            ref={register({ required: 'Please add remark' })}
            error={errors.rmrk}
          />
        </Box>
        <Textarea name="rmrk" label="Decoded remark object" readOnly />
        <Box mt={6}>
          <Button
            type="submit"
            form="submit-rmrk-form"
            colorScheme="pink"
            variant="solid"
            color="white"
            backgroundColor="pink.400">
            Submit Remark
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubmitRemarkForm;
