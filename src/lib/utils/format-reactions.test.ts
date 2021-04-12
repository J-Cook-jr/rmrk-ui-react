import {
  formatReactions,
  formatNFTReactionsByAccount,
  formatNFTReactionsByEmote,
} from './format-reactions';

const reactionsMock = {
  '1f601': ['DrcRYFFrKgMqiyJ9oWgsQzYRfKaPYC97HCXPUJ8BRxZbyDt'],
  '1f970': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f923': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f607': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f606': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f637': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f608': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f91d': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f624': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f605': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f4a9': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f616': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f432': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f9d1-200d-2708-fe0f': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f9b5': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f469-200d-1f52c': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f64d': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f92e': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f920': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f469-200d-1f9bd': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f9dc-200d-2640-fe0f': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f975': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f468-200d-1f469-200d-1f467': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f468-200d-1f680': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f437': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f433': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f984': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f37d-fe0f': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f358': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f422': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  '1f4cd': ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
  invalid: ['Gi5xtagP3JSTT7XWCta69JbuSpMv3EPKo4opVRcY76rNnh2'],
};

// Test formatPrice
describe('utils: formatReactions', () => {
  it('Should return formatted reactions', () => {
    expect(formatReactions(reactionsMock)).toMatchSnapshot();
  });
});

describe('utils: formatNFTReactionsByAccount', () => {
  it('Should return formatted price', () => {
    expect(formatNFTReactionsByAccount(reactionsMock)).toMatchSnapshot();
  });
});

describe('utils: formatNFTReactionsByEmote', () => {
  it('Should return formatted reactions', () => {
    expect(formatNFTReactionsByEmote(reactionsMock)).toMatchSnapshot();
  });
});
