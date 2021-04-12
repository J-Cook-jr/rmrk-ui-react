import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

const LoadingDots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const updateDots = setTimeout(() => {
      if (dots === '...') {
        setDots('');
      } else {
        setDots(dots.concat('.'));
      }
    }, 300);

    return () => {
      clearTimeout(updateDots);
    };
  }, [dots]);

  return <Box data-name="loading-dots">{dots}</Box>;
};

export default LoadingDots;
