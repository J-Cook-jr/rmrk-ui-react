import React from 'react';
import { Box, Input, Heading } from '@chakra-ui/react';
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
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" ref={register({ required: true })} />
        {errors.name && <Box>name is required</Box>}
        <Input type="submit" value="cool" />
      </Box>
    </Box>
  );
};

export default MintCollectionForm;
