import React, { useState } from 'react';
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Portal,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import { sendEmote } from 'lib/nft/emote';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { useDexieStore } from 'lib/dexie/store';
import Delayed from 'components/common/delayed-render';
import { Picker } from 'emoji-mart';
import { BaseEmoji } from 'emoji-mart/dist-es/utils/emoji-index/nimble-emoji-index';
import { formatReactions } from 'lib/utils/format-reactions';
import { useTranslation } from 'next-i18next';

interface IProps {
  nft: NFT;
  size?: 'sm' | 'lg';
  hideIfNone: boolean;
}

const EmoteButton = ({ nft, size, hideIfNone }: IProps) => {
  const { t } = useTranslation('common');
  const { isBlocksSynced } = useDexieStore((state) => ({ isBlocksSynced: state.isBlocksSynced }));
  const [isOpen, setIsOpen] = useState(false);
  const transactionStatus = useTransactionStatus('emote');
  const closePopover = () => setIsOpen(false);
  const themeMode = useColorMode().colorMode;

  const formattedReactions = formatReactions(nft.reactions);
  const isAnyReactions = formattedReactions.length > 0;
  const toggleEmojiPopover = () => setIsOpen(!isOpen);

  const onEmojiSelect = (emoji: BaseEmoji) => {
    sendEmote(emoji, nft, transactionStatus);
    closePopover();
  };

  if (!isAnyReactions && hideIfNone) {
    return null;
  }

  return (
    <Box>
      <Popover isOpen={isOpen} onClose={toggleEmojiPopover} placement="top" isLazy>
        <>
          <PopoverTrigger>
            <Box>
              <Box
                disabled={!isBlocksSynced}
                role="group"
                as="button"
                position="relative"
                display="flex"
                alignItems="center"
                fontSize={size === 'sm' ? 'md' : '2xl'}
                lineHeight="1em"
                borderRadius="50px"
                px={size === 'sm' ? 2 : 4}
                py={size === 'sm' ? 1 : 2}
                backgroundColor="white"
                transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)"
                sx={{
                  WebkitBackfaceVisibility: 'hidden',
                  WebkitTransform: 'perspective(1000px)',
                }}
                _hover={{
                  transform: 'scale(1.1, 1.1)',
                }}
                _focus={{
                  outline: 'none',
                }}
                onClick={toggleEmojiPopover}>
                <Box
                  position="absolute"
                  zIndex="-1"
                  left="0"
                  top="0"
                  w="100%"
                  h="100%"
                  opacity="0"
                  borderRadius="50px"
                  boxShadow="0 5px 15px rgba(0,0,0,0.3)"
                  transition="opacity 0.3s ease-in-out"
                  _groupHover={{ opacity: 1 }}
                />
                {!transactionStatus.loading ? (
                  <Box opacity={0.7} sx={{ filter: 'grayscale(100%)' }} fontFamily="emoji">
                    ❤️
                  </Box>
                ) : (
                  <Spinner size="sm" color="gray.600" />
                )}
              </Box>
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>{t('react-popover-title')}</PopoverHeader>
              <PopoverBody display="flex" placement="top">
                <Delayed>
                  <Picker
                    native
                    onSelect={onEmojiSelect}
                    style={{ width: '100%' }}
                    theme={themeMode}
                    title=""
                  />
                </Delayed>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      </Popover>
    </Box>
  );
};

export default EmoteButton;
