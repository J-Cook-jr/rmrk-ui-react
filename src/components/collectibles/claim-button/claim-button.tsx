import React from 'react';
import Claim from 'components/collectibles/claim-button/claim';
import { NFT } from 'lib/models/NFT';

interface IProps {
  nft: NFT;
  someoneInteractingWithNFT: boolean;
}

const ClaimButton = ({ nft, someoneInteractingWithNFT }: IProps) => {
  return <Claim nft={nft} someoneInteractingWithNFT={someoneInteractingWithNFT} />;
};

export default ClaimButton;
