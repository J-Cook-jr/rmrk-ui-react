import React, { useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import { IReaction } from 'lib/types';
import Emotes from 'components/common/emote/emotes';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { useDexieStore } from 'lib/dexie/store';
import EmoteDisplayModal from 'components/common/emote/emote-display-modal';
import { formatReactions } from 'lib/utils/format-reactions';

interface IProps {
  nft: NFT;
  size?: 'sm' | 'lg';
  disabled?: boolean;
}

const EmoteDisplay = ({ nft, size, disabled }: IProps) => {
  const { isBlocksSynced } = useDexieStore((state) => ({ isBlocksSynced: state.isBlocksSynced }));
  const [isOpen, setIsOpen] = useState(false);
  const transactionStatus = useTransactionStatus('emote');
  const formattedReactions = formatReactions(nft.reactions);
  const isAnyReactions = formattedReactions.length > 0;

  const toggleEmojiDisplayModal = () => setIsOpen(!isOpen);

  if (!isAnyReactions) {
    return null;
  }

  return (
    <Box>
      <Box
        disabled={disabled || !isBlocksSynced}
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
        onClick={toggleEmojiDisplayModal}>
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
          <Emotes reactionList={formattedReactions as IReaction[]} />
        ) : (
          <Spinner size="sm" color="gray.600" />
        )}
      </Box>
      <EmoteDisplayModal reactions={nft.reactions} isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  );
};

export default EmoteDisplay;
