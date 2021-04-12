import React, { ReactNode } from 'react';
import { Link as LinkChakra } from '@chakra-ui/react';
import Link from 'next/link';

interface IProps {
  href: string;
  children: ReactNode;
}

const MdLink = ({ href, children }: IProps) => {
  const isExternal = href.startsWith('http');

  return isExternal ? (
    <LinkChakra data-name="md-link" href={href} target="_blank" color="pink.500">
      {children}
    </LinkChakra>
  ) : (
    <Link href={href} passHref>
      <LinkChakra data-name="md-link" color="pink.500">
        {children}
      </LinkChakra>
    </Link>
  );
};

export default MdLink;
