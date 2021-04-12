import React from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import { FaShareAlt } from 'react-icons/fa';
import { getSocialShareUrls } from 'lib/collectibles/utils';
import { useRouter } from 'next/router';
import { dashify } from 'lib/utils';
import ShareCollectibleCopyUrl from 'components/collectibles/share-collectible-copy-url';
import { FaLink } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

interface IProps {
  name: string;
}

const ShareButton = ({ name }: IProps) => {
  const { t } = useTranslation('common');
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { asPath } = useRouter();
  const sharesList = getSocialShareUrls({ name, path: asPath });

  return (
    <Box>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="left"
        variant="responsive">
        <PopoverTrigger>
          <Button
            borderRadius="50px"
            boxShadow="0 4px 8px 0 rgba(0,0,0,0.1)"
            rightIcon={<FaShareAlt />}
            colorScheme="blue">
            {t('share')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Box boxShadow="0 4px 8px 0 rgba(0,0,0,0.5)" pt={4}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody pb={3}>
              {sharesList.map((item) => (
                <Link
                  py={1}
                  href={item.href}
                  isExternal
                  key={`share-button-item-${dashify(item.aria)}`}
                  display="block">
                  <Button
                    w="130px"
                    leftIcon={item.icon()}
                    variant="ghost"
                    onClick={onClose}
                    justifyContent="flexStart">
                    {item.name}
                  </Button>
                </Link>
              ))}
              <ShareCollectibleCopyUrl>
                <Button
                  w="130px"
                  leftIcon={<FaLink />}
                  variant="ghost"
                  onClick={onClose}
                  justifyContent="flexStart">
                  Copy Url
                </Button>
              </ShareCollectibleCopyUrl>
            </PopoverBody>
          </Box>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ShareButton;
