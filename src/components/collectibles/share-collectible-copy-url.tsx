import React, { FunctionComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getCollectibleUrl } from 'lib/collectibles/utils';
import { useRouter } from 'next/router';

const ShareCollectibleCopyUrl: FunctionComponent = ({ children }) => {
  const { asPath } = useRouter();
  const textToCopy = getCollectibleUrl(asPath);

  return <CopyToClipboard text={textToCopy}>{children}</CopyToClipboard>;
};

export default ShareCollectibleCopyUrl;
