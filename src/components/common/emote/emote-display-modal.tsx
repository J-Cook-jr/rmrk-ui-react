import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Switch,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import WhoReactedByAccount from 'components/common/emote/who-reacted-by-account';
import WhoReactedByEmote from 'components/common/emote/who-reacted-by-emote';

interface IProps {
  isOpen: boolean;
  reactions: NFT['reactions'];
  setIsOpen: (isOpen: boolean) => void;
}

const EmoteDisplayModal = ({ isOpen, reactions, setIsOpen }: IProps) => {
  const [byAccount, setByAccount] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setByAccount(event.target.checked);
  };

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>See who emoted on this</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={2}>
              <FormControl display="flex" alignItems="center">
                <Switch
                  id="emote-display-switch"
                  colorScheme="teal"
                  isChecked={byAccount}
                  onChange={handleChange}
                />
                <FormLabel htmlFor="emote-display-switch" mb="0" ml={2}>
                  View by account
                </FormLabel>
              </FormControl>
            </Box>
            <Box>
              {byAccount ? (
                <WhoReactedByAccount reactions={reactions} />
              ) : (
                <WhoReactedByEmote reactions={reactions} />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmoteDisplayModal;
