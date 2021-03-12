import { useColorMode, Switch, Box, Icon } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Box display="flex" alignItems="center" data-name="dark-mode-switch">
      <Box mr={2}>
        <Icon as={isDark ? MoonIcon : SunIcon} />
      </Box>
      <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
    </Box>
  );
};

export default DarkModeSwitch;
