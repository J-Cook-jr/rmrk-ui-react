import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface IProps {
  children: {
    props: {
      children: ReactNode;
    };
  }[];
}

const MdList = ({ children }: IProps) => (
  <Box as="ul" data-name="md-list" pl={[5, 8]} mb={4}>
    {children.map((item, i) => (
      <Box as="li" mt={i === 0 ? undefined : 2}>
        {item.props.children}
      </Box>
    ))}
  </Box>
);

export default MdList;
