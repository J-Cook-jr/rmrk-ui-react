import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';
import H1 from 'components/common/headings/h1';

const PageHeading: FunctionComponent = ({ children }) => (
  <Box
    data-name="page-heading"
    textAlign="center"
    display="flex"
    justifyContent="center"
    pt={10}
    pb={20}>
    <H1>{children}</H1>
  </Box>
);

export default PageHeading;
