import React from 'react';
import { Box } from '@chakra-ui/react';
import { IReaction } from 'lib/types';

interface IProps {
  reactionList: IReaction[];
}

const Emotes = ({ reactionList }: IProps) => {
  const reducedReactions = reactionList.slice(0, 3);

  let total = 0;
  reactionList.forEach((reaction) => (total += reaction.count));

  return (
    <>
      {reducedReactions.map((reaction, i) => (
        <Box
          key={reaction.emoji}
          position="relative"
          ml={i === 0 ? undefined : '-0.5em'}
          fontFamily="emoji"
          zIndex={reducedReactions.length - i}>
          {reaction.emoji}
        </Box>
      ))}
      {total > reducedReactions.length && (
        <Box fontSize="xs" fontWeight="semibold" color="pink.400" ml={1}>
          {total}
        </Box>
      )}
    </>
  );
};

export default Emotes;
