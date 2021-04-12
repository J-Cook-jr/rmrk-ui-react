import React from 'react';
import Page from 'components/common/page';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const PageAll = dynamic(() => import('components/collectibles/page-all'), { ssr: false });

const Index = () => {
  const { t } = useTranslation('page-all');

  const title = t('page-title-all');

  return (
    <Page title={title}>
      <PageAll title={title} />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'page-all'])),
    },
  };
};

export default Index;
