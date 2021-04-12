import React from 'react';
import { Button, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useTranslation } from 'next-i18next';

interface IProps {
  href: string;
}

const IpfsVeryfyLink = ({ href }: IProps) => {
  const { t } = useTranslation('collectibles');

  return (
    <Link href={href} isExternal color="pink.400">
      {t('verify-on-ipfs')} <ExternalLinkIcon mx="2px" />
    </Link>
  );
};

export default IpfsVeryfyLink;
