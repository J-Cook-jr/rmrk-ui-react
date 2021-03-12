import { useColorMode, Switch, Box, Icon } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box display="flex" alignItems="center" data-name="dark-mode-switch">
      <Box mr={2} display="flex" alignItems="center">
        <Icon as={SunIcon} />
      </Box>
      <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
      <Box ml={2} display="flex" alignItems="center">
        <Icon as={MoonIcon} />
      </Box>
    </Box>
  );
};

export default DarkModeSwitch;
