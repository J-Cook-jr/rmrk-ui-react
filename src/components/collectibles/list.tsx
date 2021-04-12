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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { NFT } from 'lib/models/NFT';
import { useDexieStore } from 'lib/dexie/store';
import { useTransactionStatus } from 'lib/nft/transaction-status';
import { listNFT } from 'lib/nft/list';
import { w3Store } from 'lib/w3/store';

interface IProps {
  nft: NFT;
  someoneInteractingWithNFT: boolean;
}

const List = ({ nft, someoneInteractingWithNFT }: IProps) => {
  const { systemProperties } = w3Store((state) => ({
    systemProperties: state.systemProperties,
  }));
  const isCurrentlyListed = nft.forsale > BigInt(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(isCurrentlyListed ? 0 : 1);
  const { isBlocksSynced } = useDexieStore((state) => ({ isBlocksSynced: state.isBlocksSynced }));
  const formRef = useRef(null);

  const transactionStatus = useTransactionStatus('list');
  const { owner } = nft;

  const startList = () => {
    //TODO: Validate recipient address, and focus on input field if it is empty
    onClose();
    listNFT(isCurrentlyListed ? 0 : price, nft, transactionStatus);
  };

  const disableList = !isBlocksSynced || transactionStatus.loading || someoneInteractingWithNFT;

  const handleChange = (stringValue: string, value: number) => setPrice(value);

  return (
    <>
      <Button
        isLoading={!isBlocksSynced || transactionStatus.loading || someoneInteractingWithNFT}
        colorScheme={isCurrentlyListed ? 'red' : 'green'}
        size="sm"
        variant={'solid'}
        // disable interactions till we launch list/buy
        // onClick={onOpen}
        // disabled={disableList}
        disabled>
        {isCurrentlyListed ? 'Cancel sell' : 'Sell'}
      </Button>
      <Modal initialFocusRef={formRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isCurrentlyListed ? 'Cancel sell of this NFT' : 'List your NFT for sale'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isCurrentlyListed && (
              <Box>Are you sure you want to delist this NFT? It will no longer be for sale</Box>
            )}
            {!isCurrentlyListed && (
              <FormControl>
                <FormLabel>
                  Please enter your listing price in {systemProperties.tokenSymbol}
                </FormLabel>
                <NumberInput
                  maxW={40}
                  defaultValue={1}
                  min={0.1}
                  step={0.1}
                  precision={2}
                  onChange={handleChange}>
                  <NumberInputField ref={formRef} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              // disable interactions till we launch list/buy
              // onClick={startList}
              // disabled={Boolean(!isCurrentlyListed && !price) || disableList}
              disabled>
              {isCurrentlyListed ? 'Cancel sell' : 'Sell'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default List;
