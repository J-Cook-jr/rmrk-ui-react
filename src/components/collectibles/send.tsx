import React, { useRef, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import { useDexieStore } from 'lib/dexie/store';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { send } from 'lib/nft/send';
import { BiGift } from 'react-icons/all';

interface IProps {
  nft: NFT;
  someoneInteractingWithNFT: boolean;
}

const Send = ({ nft, someoneInteractingWithNFT }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recipient, setRecipient] = useState('');
  const { isBlocksSynced } = useDexieStore((state) => ({ isBlocksSynced: state.isBlocksSynced }));
  const formRef = useRef(null);

  const transactionStatus = useTransactionStatus('send');

  const startSend = () => {
    //@TODO: Validate recipient address, and focus on input field if it is empty
    onClose();
    send(nft, recipient, transactionStatus);
  };

  const disableSend = !isBlocksSynced || transactionStatus.loading || someoneInteractingWithNFT;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value);

  return (
    <>
      <Button
        isLoading={!isBlocksSynced || transactionStatus.loading || someoneInteractingWithNFT}
        colorScheme="pink"
        size="sm"
        leftIcon={<BiGift />}
        // disable interactions till we launch list/buy
        // onClick={onOpen}
        // disabled={disableSend}
        disabled>
        Gift
      </Button>
      <Modal initialFocusRef={formRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send this NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Please enter recipient's Kusama address</FormLabel>
              <Input ref={formRef} placeholder="Kusama address" onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="pink"
              mr={3}
              onClick={startSend}
              disabled={!recipient || disableSend}>
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Send;
