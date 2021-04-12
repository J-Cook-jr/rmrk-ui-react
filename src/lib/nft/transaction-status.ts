import { UseToastOptions } from '@chakra-ui/toast/dist/types/use-toast';
import React, { useState } from 'react';
import { createStandaloneToast } from '@chakra-ui/react';

const defaultToastOptions: Partial<UseToastOptions> = {
  position: 'top',
  duration: 5000,
  isClosable: true,
};

export const useTransactionStatus = (id: string) => {
  const toast = createStandaloneToast();
  const toastIdRef = React.useRef(null);
  const [loading, setLoading] = useState(false);

  const onCloseComplete = () => {
    setLoading(false);
  };

  const defaultOptions = { ...defaultToastOptions, onCloseComplete, id };

  const inProgress = (title: string, description?: string) => {
    reset();
    if (!toast.isActive(id)) {
      setLoading(true);
      // @ts-ignore
      toastIdRef.current = toast({
        ...defaultOptions,
        title,
        description,
        status: 'info',
        duration: null,
      });
    }
  };

  const success = (title: string, description?: string) => {
    reset();
    toast({
      ...defaultOptions,
      title,
      description,
      status: 'success',
    });
  };

  const warning = (title: string, description?: string) => {
    reset();
    if (!toast.isActive(id)) {
      setLoading(false);
      toast({
        ...defaultOptions,
        title,
        description,
        status: 'warning',
      });
    }
  };

  const error = (title: string, description?: string) => {
    reset();
    toast({
      ...defaultOptions,
      title,
      description,
      status: 'error',
    });
  };

  const reset = () => {
    if (toastIdRef.current) {
      // @ts-ignore
      toast.close(toastIdRef.current);
    }
    setLoading(false);
  };

  return { loading, inProgress, success, warning, error, reset };
};
