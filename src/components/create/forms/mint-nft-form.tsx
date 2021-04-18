import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import FormHeading from 'components/create/forms/form-heading';
import { useForm } from 'react-hook-form';
import Input from 'components/common/inputs/input';
import { IMintFormField } from 'lib/types';

const MintCollectionForm = () => {
  const { register, handleSubmit, errors } = useForm();

  const formFieldList: IMintFormField[] = [
    {
      name: 'collection',
      required: 'Please enter collection',
      label: 'Collection*',
      error: errors.collection,
    },
    {
      name: 'name',
      required: 'Please enter name',
      label: 'Name*',
      error: errors.name,
    },
    {
      name: 'instance',
      required: 'Please enter instance',
      label: 'Instance*',
      error: errors.instance,
    },
    {
      type: 'number',
      name: 'transferable',
      label: 'Transferable (0 = no, 1 = yes, 1> = block from which transfers are OK)',
    },
    {
      name: 'serialNumber',
      label: 'Serial number (incremental, auto-pads to 16)',
    },
    {
      name: 'metadata',
      required: 'Please enter ipfs metadata',
      label: 'Metadata* (IPFS hash)',
      error: errors.metadata,
    },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box data-name="mint-nft-form">
      <Box mb={4}>
        <FormHeading>Mint NFT</FormHeading>
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} id="mint-nft-form">
        {formFieldList.map((item, i) => (
          <Box mt={i === 0 ? undefined : 4} key={`mint-nft-form-field-${item.name}`}>
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
          <Button type="submit" form="mint-nft-form" colorScheme="pink" variant="solid">
            Turn into Remark
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MintCollectionForm;
