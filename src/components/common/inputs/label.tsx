import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';

interface IProps {
  htmlFor?: string;
}

const Label: FunctionComponent<IProps> = ({ children, htmlFor }) => (
  <Box
    as="label"
    htmlFor={htmlFor}
    data-name="label"
    fontWeight="semibold"
    fontFamily="mono"
    fontSize="sm">
    {children}
  </Box>
);

export default Label;
