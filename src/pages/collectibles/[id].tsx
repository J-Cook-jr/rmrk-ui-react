import React, { useEffect } from 'react';
import Page from 'components/common/page';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const PageCollectable = dynamic(() => import('components/collectibles/page-collectible'), {
  ssr: false,
});

interface IProps {}

const Collectable = ({}: IProps) => {
  const { t } = useTranslation('collectibles');

  const title = t('page-title');
  const router = useRouter();
  const { id } = router.query;

  return <Page title={title}>{id && <PageCollectable id={id as string} />}</Page>;
};

// export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// };

export default Collectable;
