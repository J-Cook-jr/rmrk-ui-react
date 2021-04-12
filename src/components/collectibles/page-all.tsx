import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import NftList from 'components/common/nft/nft-list';
import CollectiblesPagination from 'components/collectibles/pagination';
import NftsClaimedIndicator from 'components/common/nfts-claimed-indicator';
import { indicatorTitles } from 'lib/common/egg-grades';
import { useDexieStore } from 'lib/dexie/store';
import PageContainer from 'components/common/page-container';
import { usePaginatedList } from 'lib/hooks';
import H1 from 'components/common/headings/h1';
import Filters from 'components/collectibles/filters/filters';
import NoResults from 'components/collectibles/no-results';

interface IProps {
  title: string;
}

const PageAll = ({ title }: IProps) => {
  const { isBlocksSynced } = useDexieStore((state) => ({ isBlocksSynced: state.isBlocksSynced }));
  const {
    nftList,
    pageNumber,
    totalPages,
    loading,
    type,
    onSearch,
    searchValue,
    isTypeMostEmoted,
  } = usePaginatedList();

  return (
    <PageContainer>
      <Box data-name="page-all">
        <Box pt={10} pb={10} display="flex" flexDirection="column" alignItems="center">
          <H1>{title}</H1>
        </Box>
        {(loading || !nftList || !isBlocksSynced) && (
          <Box justifyContent="center" py={2} display="flex" width="100%">
            <Spinner size="xl" />
          </Box>
        )}
        {!loading && (
          <>
            <NftsClaimedIndicator
              title={indicatorTitles[type]}
              type={isTypeMostEmoted ? undefined : type}
            />
            <Box mt={10}>
              <Filters onSearch={onSearch} searchValue={searchValue} />
            </Box>
            <Box justifyContent="center" display="flex" pt={4} pb={4}>
              <CollectiblesPagination pageNumber={pageNumber} totalPages={totalPages} />
            </Box>
            {nftList.length > 0 && <NftList grid={[3, 4, 5, 7]} nfts={nftList} markUnsold />}
            <Box paddingY={2} marginTop={2} justifyContent="center" display="flex">
              <CollectiblesPagination pageNumber={pageNumber} totalPages={totalPages} />
            </Box>
            {nftList.length === 0 && (
              <Box py={10}>
                <NoResults />
              </Box>
            )}
          </>
        )}
      </Box>
    </PageContainer>
  );
};

export default PageAll;
