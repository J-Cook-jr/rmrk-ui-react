export enum WS_PROVIDER_URLS {
  rmrk = 'wss://node.rmrk.app',
  rmrkStaging = 'wss://staging.node.rmrk.app',
  kusama = 'wss://kusama-rpc.polkadot.io',
  local = 'ws://127.0.0.1:9944',
}

export const isProd =
  process.env.NEXT_PUBLIC_RMRK_UI_STAGE === 'production' ||
  (!process.env.NEXT_PUBLIC_RMRK_UI_STAGE &&
    typeof window !== 'undefined' &&
    window.location.origin.includes('ui.rmrk.app'));

export const DEFAULT_WS_PROVIDER_URL = isProd
  ? WS_PROVIDER_URLS.rmrk
  : WS_PROVIDER_URLS.rmrkStaging;

export const SEED_DUMP_PRECONSOLIDATED_URL = isProd
  ? [
      'https://gateway.pinata.cloud/ipns/precon.rmrk.app',
      'https://cloudflare-ipfs.com/ipns/precon.rmrk.app',
    ]
  : [
      'https://gateway.pinata.cloud/ipns/staging.precon.rmrk.app',
      'https://cloudflare-ipfs.com/ipns/staging.precon.rmrk.app',
    ];

export const SEED_DUMP_INTERACTIONS_URL = isProd
  ? [
      'https://gateway.pinata.cloud/ipns/interactions.rmrk.app',
      'https://cloudflare-ipfs.com/ipns/interactions.rmrk.app',
    ]
  : [
      'https://gateway.pinata.cloud/ipns/staging.latestdump.rmrk.app',
      'https://cloudflare-ipfs.com/ipns/staging.latestdump.rmrk.app',
    ];

export const RMRK_PREFIXES = ['0x726d726b', '0x524d524b'];
