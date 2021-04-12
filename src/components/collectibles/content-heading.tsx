import React, { FunctionComponent } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

interface IProps extends HeadingProps {}

const ContentHeading: FunctionComponent<IProps> = ({
  children,
  fontSize,
  fontWeight,
  ...restProps
}) => (
  <Heading
    as="h5"
    data-name="content-heading"
    fontSize={fontSize || 'xl'}
    fontWeight={fontWeight || 'semibold'}
    {...restProps}>
    {children}
  </Heading>
);

export default ContentHeading;
