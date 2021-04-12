import React, { useEffect, useState } from 'react';
import { Box, Button, Tooltip } from '@chakra-ui/react';
import { NFT } from 'rmrk-tools';
import { IFormattedReactionByAccount } from 'lib/types';
import Identicon from '@polkadot/react-identicon';
import { useEncodedUserAddress } from 'lib/accounts/use-encoded-address';
import Router from 'next/router';
import { formatNFTReactionsByAccount } from 'lib/utils/format-reactions';
import EventRecordId from 'components/common/event-record-id';

interface IProps {
  reactions: NFT['reactions'];
}

const WhoReactedByAccount = ({ reactions }: IProps) => {
  const [whoEmotedByAccount, setWhoEmotedByAccount] = useState<IFormattedReactionByAccount[]>();
  const userAddressEncoded = useEncodedUserAddress();

  useEffect(() => {
    if (reactions) {
      setWhoEmotedByAccount(formatNFTReactionsByAccount(reactions));
    }
  }, [reactions]);

  if (!whoEmotedByAccount) {
    return null;
  }

  const visitNest = (account: string) => {
    Router.push(`/nest/${account}`);
  };

  return (
    <Box>
      {whoEmotedByAccount.map((reactionByAccount, i) => {
        return (
          <Box
            py={2}
            key={`emote-history-item-${reactionByAccount.account}`}
            borderTopWidth={i === 0 ? undefined : '1px'}
            borderStyle="solid"
            borderColor="gray.100">
            <Box display="flex">
              <Box mr={4} display="flex">
                <Tooltip label={reactionByAccount.account} key={reactionByAccount.account}>
                  <Box>
                    <Identicon
                      value={reactionByAccount.account}
                      size={42}
                      theme="polkadot"
                      onCopy={() => {
                        visitNest(reactionByAccount.account);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </Box>
                </Tooltip>
              </Box>

              <Box display="flex" flexDirection="column" flexGrow={1}>
                <Box display="flex" mb={1}>
                  {reactionByAccount.account === userAddressEncoded ? (
                    <Box fontSize={12}>You</Box>
                  ) : (
                    <EventRecordId id={reactionByAccount.account} fontSize={12} />
                  )}
                  <Box ml={1} fontSize={12}>
                    reacted to this NFT:
                  </Box>
                </Box>

                <Box display="flex" flexWrap="wrap">
                  {reactionByAccount.reactions.map((reaction) => (
                    <Box mr={2} fontFamily="emoji" fontSize={18} key={reaction.unicode}>
                      {reaction.emoji}
                    </Box>
                  ))}
                </Box>
              </Box>
              {reactionByAccount.account !== userAddressEncoded && (
                <Box alignSelf="center">
                  <Button
                    variant="outline"
                    colorScheme="cyan"
                    size="xs"
                    onClick={() => {
                      visitNest(reactionByAccount.account);
                    }}>
                    Visit nest
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default WhoReactedByAccount;
