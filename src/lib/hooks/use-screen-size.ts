import { useMediaQuery } from '@chakra-ui/react';
import { breakpointValues } from '../../theme';

export const useScreenSize = () => {
  const [isSm, isMd, isLg, isXl, isXxl] = useMediaQuery([
    `(max-width: ${breakpointValues.sm})`,
    `(max-width: ${breakpointValues.md})`,
    `(max-width: ${breakpointValues.lg})`,
    `(max-width: ${breakpointValues.xl})`,
    `(min-width: ${breakpointValues.xl})`,
  ]);

  return { isSm, isMd, isLg, isXl, isXxl };
};
