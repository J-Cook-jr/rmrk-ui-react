import React, { FunctionComponent } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

interface IProps {
  value: string;
}

const MdHtml: FunctionComponent<IProps> = ({ value }) => {
  const isDark = useColorMode().colorMode === 'dark';
  const innerHtml = { __html: value };

  return (
    <Box pt={6} pb={10}>
      <Box
        p={5}
        backgroundColor={isDark ? 'gray.600' : 'gray.50'}
        display="flex"
        justifyContent="center"
        dangerouslySetInnerHTML={innerHtml}
      />
    </Box>
  );
};

export default MdHtml;
