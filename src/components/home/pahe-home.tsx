import React from 'react';
import dynamic from 'next/dynamic';
import PageContainer from 'components/common/page-container';
import { Box } from '@chakra-ui/react';

const CuratedPicks = dynamic(() => import('components/home/curated-picks'), { ssr: false });

interface IProps {}

const Index = ({}: IProps) => {
  return (
    <PageContainer>
      <Box data-name="page-home" flexGrow={1} display="flex" flexDirection="column">
        <Box>
          <CuratedPicks />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Index;
