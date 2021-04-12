import { FaTelegramPlane, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { ISocialShare } from 'lib/types';
import { ReactElement } from 'react';
import { getCollectibleUrl } from 'lib/collectibles/utils';

export const getSocialShareUrls = ({
  name,
  path,
}: {
  name: string;
  path: string;
}): ISocialShare[] => {
  const shareText = `Check out my ${name}! @RmrkApp @KusamaNetwork`;
  const shareUrl = getCollectibleUrl(path);
  const hashtags = 'NFT,RmrkApp,KusamaNetwork';

  return [
    {
      href: `https://twitter.com/share?url=${shareUrl}&text=${shareText}&hashtags=${hashtags}`,
      icon: FaTwitter as () => ReactElement,
      aria: 'twitter share',
      name: 'Twitter',
    },
    {
      href: `https://t.me/share/url?url=${shareUrl}&text=${shareText} @kanaria_official`,
      icon: FaTelegramPlane as () => ReactElement,
      aria: 'telegram share',
      name: 'Telegram',
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`,
      icon: FaFacebookF as () => ReactElement,
      aria: 'facebook share',
      name: 'Facebook',
    },
  ];
};
