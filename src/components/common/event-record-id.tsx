import React from 'react';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePolkadotIdentity } from 'lib/hooks';
import { shortenAccountId } from 'lib/utils/shorten-account-id';

interface IProps {
  id: string;
  fontSize: number;
}

const EventRecordId = ({ id, fontSize }: IProps) => {
  const { userName } = usePolkadotIdentity(id);
  const isPolkadotIdentity = id !== userName;

  return (
    <NextLink href={`/nest/${id}`} passHref>
      <Link color="pink.400" fontSize={fontSize}>
        {isPolkadotIdentity ? shortenAccountId(userName) : shortenAccountId(id, true)}
      </Link>
    </NextLink>
  );
};

export default EventRecordId;
