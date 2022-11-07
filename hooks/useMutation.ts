import { useState } from 'react';

import { clientAuthApi as ax } from '../apis/auth';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string,
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    //   },
    //   body: JSON.stringify(data),
    // })
    ax.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((res) => res.data)
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false })),
      );
  }
  return [mutation, { ...state }];
}
