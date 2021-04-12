import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
  mono: `'Menlo', monospace`,
  emoji: `"Apple Color Emoji", "Twemoji Mozilla", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Noto Color Emoji", "Android Emoji";`,
};

export const breakpointValues = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
};

const breakpoints = createBreakpoints({
  sm: breakpointValues.sm,
  md: breakpointValues.md,
  lg: breakpointValues.lg,
  xl: breakpointValues.xl,
});

const styles = {
  global: {
    'html, body, #__next': {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      minHeight: '100%',
    },
  },
};

const theme = extendTheme({
  styles,
  config: {
    useSystemColorMode: false,
    cssVarsPrefix: 'rmrk',
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  components: {
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset',
          },
        },
      },
    },
  },
});

export default theme;
