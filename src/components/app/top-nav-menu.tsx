import React from 'react';
import { Box } from '@chakra-ui/react';
import MenuOption from 'components/app/menu-option';

const menuOptionList: { href: string; text: string }[] = [
  { href: '/create', text: 'Create' },
  { href: '/', text: 'Gallery' },
];

const TopNavMenu = () => (
  <Box display="flex" alignItems="center">
    {menuOptionList.map((item, i) => (
      <Box ml={i === 0 ? undefined : 4} key={`top-nav-meny-option-${item.text}`}>
        <MenuOption href={item.href}>{item.text}</MenuOption>
      </Box>
    ))}
  </Box>
);

export default TopNavMenu;
