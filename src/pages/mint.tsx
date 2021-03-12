import Page from 'components/common/page';
import MintPage from 'components/mint/mint-page';

const Mint = () => {
  const title = 'Mint';

  return (
    <Page title={title} data-name="mint">
      <MintPage />
    </Page>
  );
};

export default Mint;
