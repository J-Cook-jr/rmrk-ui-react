import React, { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import FormHeading from 'components/mint/forms/form-heading';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';

const MintCollectionForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box data-name="mint-collection-form">
      <FormHeading>Mint collection</FormHeading>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-collection-form">
        <Input
          name="name"
          ref={register({ required: 'Please enter name' })}
          label="Name"
          error={errors.name}
        />
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
