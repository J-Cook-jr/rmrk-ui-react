import React from 'react';
import { Box } from '@chakra-ui/react';
import H2 from 'components/common/headings/h2';
import { getMarkdownSection } from 'components/home/markdown';
import MdContent from 'components/common/markdown-rendered/md-content';
import Description from 'components/common/description';
interface IProps {
  heading?: string;
  onShuffle?: () => void;
  sectionMd?: 'foundersListSection' | 'commonListSection' | 'rareListSection';
}

const NftListHeader = ({ heading, sectionMd }: IProps) => (
  <Box data-name="nft-list-header">
    <Box display="flex" alignItems="center" mb={4}>
      <H2>{heading}</H2>
    </Box>
    {sectionMd && (
      <Description>
        <MdContent markdown={getMarkdownSection(sectionMd)} />
      </Description>
    )}
  </Box>
);

export default NftListHeader;
