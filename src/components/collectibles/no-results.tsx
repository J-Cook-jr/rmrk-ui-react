import React from 'react';
import { Box, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ImHeartBroken } from 'react-icons/im';

const NoResults = () => (
  <Box data-name="no-results" display="flex" flexDirection="column" alignItems="center">
    <Box display="flex" alignItems="center">
      Sorry! There are no collectibles matching your search{' '}
      <Box color="pink.400" ml={1}>
        <ImHeartBroken color="pink.400" />
      </Box>
    </Box>
    <Box mt={4}>
      <NextLink href="/collectibles">
        <Link
          color="pink.400"
          _hover={{
            textDecoration: 'none',
          }}>
          <Button colorScheme="pink">Reset filters</Button>
        </Link>
      </NextLink>
    </Box>
  </Box>
);

export default NoResults;
