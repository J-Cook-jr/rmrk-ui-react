import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import FormHeading from 'components/mint/forms/form-heading';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import { IMintFormField } from 'lib/types';

const MintCollectionForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const formFieldList: IMintFormField[] = [
    {
      name: 'name',
      required: 'Please enter name',
      label: 'Name*',
      error: errors.name,
    },
    {
      type: 'number',
      name: 'max',
      required: 'Please enter max',
      label: 'Max*',
      error: errors.max,
    },
    {
      name: 'issuer',
      required: 'Please enter issuer',
      label: 'Issuer*',
      error: errors.issuer,
    },
    {
      name: 'symbol',
      required: 'Please enter symbol',
      label: 'Symbol*',
      error: errors.symbol,
    },
    {
      name: 'id',
      label: 'ID (auto-generated)',
    },
    {
      name: 'metadata',
      required: 'Please enter ipfs metadata',
      label: 'Metadata (IPFS hash)',
      error: errors.metadata,
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box data-name="mint-collection-form">
      <Box mb={4}>
        <FormHeading>Mint collection</FormHeading>
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-collection-form">
        {formFieldList.map((item, i) => (
          <Box mt={i === 0 ? undefined : 4} key={`mint-collection-form-field-${item.name}`}>
            <Input
              type={item.type}
              name={item.name}
              ref={item.required ? register({ required: item.required }) : register}
              label={item.label}
              error={item.error}
            />
          </Box>
        ))}
        <Box mt={6}>
          <Button
            type="submit"
            form="mint-collection-form"
            colorScheme="pink"
            variant="solid"
            color="white"
            backgroundColor="pink.400">
            Turn into Remark
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MintCollectionForm;
