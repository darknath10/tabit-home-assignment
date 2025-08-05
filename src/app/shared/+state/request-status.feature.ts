import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type RequestStatus = 'idle' | 'pending' | 'fulfilled' | { error: string };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<{ requestStatus: RequestStatus }>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === 'pending'),
      isFulfilled: computed(() => requestStatus() === 'fulfilled'),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' && 'error' in status ? status.error : null;
      }),
    })),
  );
}

const setRequestStatus = (requestStatus: RequestStatus) => ({ requestStatus });

export const setPending = () => setRequestStatus('pending');

export const setFulfilled = () => setRequestStatus('fulfilled');

export const setError = (error: string) => setRequestStatus({ error });
