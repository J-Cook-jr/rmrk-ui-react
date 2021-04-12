import React, { useState, useEffect } from 'react';
import { useDexieStore } from 'lib/dexie/store';
import { Box, useColorMode, CircularProgress } from '@chakra-ui/react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { FaExclamationTriangle } from 'react-icons/fa';
import LoadingDots from 'components/common/loading-dots';
import { useTranslation } from 'next-i18next';

const BlockSyncIndicator = () => {
  const { t } = useTranslation('common');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);

  const { isBlocksSynced, isBlocksSyncError } = useDexieStore((state) => ({
    isBlocksSynced: state.isBlocksSynced,
    isBlocksSyncError: state.isBlocksSyncError,
  }));

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setTimerExpired(true);
    }
  }, [timeLeft]);

  const isDark = useColorMode().colorMode === 'dark';

  const animationValies: Record<TransitionStatus, string> = {
    entering: '100%',
    entered: '0',
    exiting: '100%',
    exited: '100%',
    unmounted: '100%',
  };

  const reloadOnError = () => {
    if (isBlocksSyncError) {
      window.location.reload();
    }
  };

  return (
    <Transition in={!isBlocksSynced} timeout={500} unmountOnExit>
      {(state) => (
        <Box
          p={3}
          onClick={reloadOnError}
          borderRadius="10px"
          display="flex"
          alignItems="center"
          backgroundColor={isBlocksSyncError ? 'red.500' : isDark ? 'white' : 'gray.800'}
          color={isBlocksSyncError ? 'white' : isDark ? 'gray.800' : 'white'}
          transition="transform 0.4s linear"
          transform={`translateX(${animationValies[state]})`}
          data-name="block-sync-indicator">
          <Box mr={4}>
            {isBlocksSyncError ? (
              t('sync-banner-error')
            ) : (
              <Box display="flex" flexDirection="column" justifyContent="center">
                {t('sync-banner-title')}
                <Box fontSize="xs" top="0" display="flex">
                  {timerExpired ? (
                    <>
                      {t('sync-banner-loading-msg')}
                      <LoadingDots />
                    </>
                  ) : (
                    t('sync-banner-msg')
                  )}
                </Box>
              </Box>
            )}
          </Box>
          {isBlocksSyncError ? (
            <FaExclamationTriangle />
          ) : (
            <CircularProgress
              isIndeterminate
              color={isDark ? 'gray.800' : 'white'}
              trackColor={isDark ? 'white' : 'gray.800'}
            />
          )}
        </Box>
      )}
    </Transition>
  );
};

export default BlockSyncIndicator;
