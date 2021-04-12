import React, { useState, useEffect, ReactNode, ReactElement } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

type IProps = {
  children: ReactNode;
  waitBeforeShow?: number;
};

const Delayed: React.FC<IProps> = ({ children, waitBeforeShow = 500 }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShown ? (
    (children as ReactElement<any>)
  ) : (
    <Box width="100%" display="flex" alignItems="center" justifyContent="center" py={1}>
      <Spinner size="md" />
    </Box>
  );
};

export default Delayed;
