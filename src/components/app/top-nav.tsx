import React from 'react';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import DarkModeSwitch from 'components/common/dark-mode-switch';
import SvgRmrkApp from 'components/common/icons/svg-rmrk-app';
import TopNavMenu from 'components/app/top-nav-menu';

const TopNav = () => {
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={6}
      h={70}
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor={isDark ? 'gray.300' : 'pink.400'}
      backgroundColor={isDark ? 'gray.800' : 'white'}
      transition="background-color ease 0.2s">
      <Box w={100}>
        <SvgRmrkApp />
      </Box>
      <Box display="flex" alignItems="center">
        <Box mr={6}>
          <TopNavMenu />
        </Box>
        <DarkModeSwitch />
      </Box>
    </Box>
  );
};

export default TopNav;
