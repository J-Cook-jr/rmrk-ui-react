import React, { forwardRef } from 'react';
import { Box, Textarea as TextareaChakra } from '@chakra-ui/react';
import Label from './label';
import Error from './error';
import { FieldError } from 'react-hook-form';

interface IProps {
  id?: string;
  label?: string;
  type?: string;
  name: string;
  error?: FieldError;
  readOnly?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(
  ({ id, label, type, name, error, readOnly }, ref) => (
    <Box data-name="textarea">
      {label && (
        <Box mb={1}>
          <Label htmlFor={id}>{label}</Label>
        </Box>
      )}
      <TextareaChakra type={type} name={name} id={id} ref={ref} readOnly={readOnly} />
      {error && (
        <Box mt={1}>
          <Error>{error.message}</Error>
        </Box>
      )}
    </Box>
  ),
);

export default Textarea;
