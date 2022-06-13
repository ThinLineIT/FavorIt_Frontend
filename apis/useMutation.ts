import { useState } from 'react';

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
    fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/fund/create',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1MDQ3MjA3LCJpYXQiOjE2NTUwNDY5MDcsImp0aSI6Ijk4N2U4NjU0YjU4MDRhYjQ4MzhjZjIwYWM1YTZlNjgzIiwidXNlcl9pZCI6MX0.9Kk1oODZGXs0fK_GZFwz_bVyd-KyK7pkNBY5fDpRbkk',
      },
      body: JSON.stringify(data),
    })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false })),
      );
  }
  return [mutation, { ...state }];
}
