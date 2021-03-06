import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';

const NoSSR: FunctionComponent = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
