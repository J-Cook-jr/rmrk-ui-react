import { polkadotApi } from 'lib/app/get-polkadot-api';

type TPolkadotHumanIdentity = {
  deposit: string;
  info: {
    display: {
      Raw?: string;
    };
  };
};

/**
 * Get polkadot onchain identity by id or return back id
 * @param id
 */
export const getPolkadotIdentity = async (id: string) => {
  const identity = await polkadotApi.query.identity.identityOf(id);
  const identityJson: TPolkadotHumanIdentity = identity.toHuman() as TPolkadotHumanIdentity;

  if (identityJson && identityJson.info.display?.Raw) {
    return identityJson.info.display.Raw;
  }

  if (identityJson === null) {
    const identitySuper = await polkadotApi.query.identity.superOf(id);
    const identitySuperJson: TPolkadotHumanIdentity = identitySuper.toHuman() as TPolkadotHumanIdentity;

    if (identitySuperJson && Array.isArray(identitySuperJson)) {
      const idOfSuper = await polkadotApi.query.identity.identityOf(identitySuperJson[0]);
      const idOfSuperJson: TPolkadotHumanIdentity = idOfSuper.toHuman() as TPolkadotHumanIdentity;

      if (idOfSuperJson && idOfSuperJson.info.display?.Raw) {
        return idOfSuperJson.info.display.Raw;
      }
    }

    return id;
  }

  return id;
};
