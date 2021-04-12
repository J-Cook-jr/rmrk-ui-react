import React, { useEffect, useState } from 'react';
import { Box, Tooltip } from '@chakra-ui/react';
import { NFT } from 'rmrk-tools';
import { IFormattedReactionByEmote } from 'lib/types';
import Identicon from '@polkadot/react-identicon';
import { useEncodedUserAddress } from 'lib/accounts/use-encoded-address';
import Router from 'next/router';
import { simplePluralize } from 'lib/utils/simple-pluralize';
import { formatNFTReactionsByEmote } from 'lib/utils/format-reactions';
import EventRecordId from 'components/common/event-record-id';

interface IProps {
  reactions: NFT['reactions'];
}

const WhoReactedByEmote = ({ reactions }: IProps) => {
  const [whoEmotedByEmote, setWhoEmotedByEmote] = useState<IFormattedReactionByEmote>();
  const userAddressEncoded = useEncodedUserAddress();
  useEffect(() => {
    if (reactions) {
      setWhoEmotedByEmote(formatNFTReactionsByEmote(reactions));
    }
  }, [reactions]);

  if (!whoEmotedByEmote) {
    return null;
  }

  const onCopy = (account: string) => {
    Router.push(`/nest/${account}`);
  };

  return (
    <Box>
      {whoEmotedByEmote.map((reaction, i) => (
        <Box
          key={reaction.unicode}
          borderTopWidth={i === 0 ? undefined : '1px'}
          borderStyle="solid"
          borderColor="gray.100"
          pt={1}>
          <Box display="flex">
            <Box mr={4} display="flex" fontFamily="emoji" fontSize={36}>
              {reaction.emoji}
            </Box>
            <Box display="flex" flexDirection="column">
              <Box ml={1} fontSize={12}>
                {reaction.accounts.length} {simplePluralize(reaction.accounts.length, 'person')}{' '}
                reacted to this NFT:
              </Box>
              <Box display="flex" flexWrap="wrap">
                {reaction.accounts.map((account, i) => (
                  <Box key={account} mr={4} display="flex" alignItems="center">
                    <Tooltip label={account}>
                      <Box>
                        <Identicon
                          value={account}
                          size={14}
                          theme="polkadot"
                          onCopy={() => {
                            onCopy(account);
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      </Box>
                    </Tooltip>
                    <Box ml={1} display="flex" alignItems="center">
                      {account === userAddressEncoded ? (
                        <Box fontSize={11}>You</Box>
                      ) : (
                        <EventRecordId id={account} fontSize={11} />
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WhoReactedByEmote;
