import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { ImHeartBroken } from 'react-icons/im';
import { useAppStore } from 'lib/app/store';
import { blacklistedCountries } from 'lib/common/blacklisted-country-code-list';
import { useTranslation } from 'next-i18next';

const Unavailable = () => {
  const { t } = useTranslation('collectibles');
  const { countryCode } = useAppStore((state) => ({
    countryCode: state.countryCode,
  }));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const country = blacklistedCountries[countryCode];

  return (
    <>
      <Button colorScheme="green" size="sm" onClick={onOpen}>
        {t('button-no-claim')}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box display="flex" alignItems="center">
              {t('no-claim-modal-title')}
              <Box ml={2} color="pink.400">
                <ImHeartBroken />
              </Box>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box fontSize="sm" pb={3}>
              As a visitor from the {country}, you cannot participate in this process unless you are
              an accredited investor. For more information, please see our{' '}
              <NextLink href="/terms-and-conditions" passHref>
                <Link color="pink.400">Terms and Conditions</Link>
              </NextLink>
              , and if you are an accredited investor, please contact us via{' '}
              <Link color="pink.400" href="mailto:hello@rmrk.app">
                hello@rmrk.app
              </Link>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Unavailable;
