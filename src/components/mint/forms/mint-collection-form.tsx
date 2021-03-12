import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import FormHeading from 'components/mint/forms/form-heading';
import { useForm } from 'react-hook-form';

const MintCollectionForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  console.log(watch('name'));

  return (
    <Box data-name="mint-collection-form">
      <FormHeading>Mint collection</FormHeading>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-collection-form">
        <Input name="name" ref={register({ required: true })} />
        {errors.name && <Box>name is required</Box>}
        <Button
          type="submit"
          form="mint-collection-form"
          colorScheme="pink"
          variant="solid"
          color="white"
          backgroundColor="pink.400">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default MintCollectionForm;
