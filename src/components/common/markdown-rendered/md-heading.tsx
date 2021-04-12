import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';
import H3 from 'components/common/headings/h3';
import H5 from 'components/common/headings/h5';

interface IProps {
  level: number;
}

const MdHeading: FunctionComponent<IProps> = ({ children, level }) => {
  return (
    <Box data-name="md-heading">
      {level === 2 ? (
        <Box pt={4} pb={3}>
          <H5>{children}</H5>
        </Box>
      ) : (
        <Box pt={10} pb={3}>
          <H3>{children}</H3>
        </Box>
      )}
    </Box>
  );
};

export default MdHeading;
