import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { Box, useColorMode } from '@chakra-ui/react';

interface IProps {
  href: string;
  as?: string;
}

const MenuOption: FunctionComponent<IProps> = ({ children, href, as }) => {
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <Link href={href} as={as} passHref>
      <Box
        as="a"
        data-name="menu-option"
        fontFamily="mono"
        fontSize="md"
        color={isDark ? 'gray.300' : 'gray.800'}
        _hover={{
          color: 'pink.400',
          textDecoration: 'underline',
        }}>
        {children}
      </Box>
    </Link>
  );
};

export default MenuOption;
