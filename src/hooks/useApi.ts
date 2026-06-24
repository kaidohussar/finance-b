import { useCallback, useEffect, useState } from 'react';

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  /** Re-run the fetcher (e.g. after a mutation). */
  refetch: () => void;
  /** Locally override the data without a network round-trip. */
  setData: (updater: T | ((prev: T | null) => T)) => void;
}

/**
 * Generic GET hook: runs `fetcher` on mount (and whenever `deps` change),
 * exposing `{ data, loading, error, refetch }`.
 */
export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseApiResult<T> {
  const [data, setDataState] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(fetcher, deps);

  const load = useCallback(() => {
    let active = true;
    setLoading(true);
    setError(null);
    run()
      .then((result) => {
        if (active) setDataState(result);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [run]);

  useEffect(() => load(), [load]);

  const setData = useCallback((updater: T | ((prev: T | null) => T)) => {
    setDataState((prev) =>
      typeof updater === 'function' ? (updater as (p: T | null) => T)(prev) : updater
    );
  }, []);

  return { data, loading, error, refetch: load, setData };
}
