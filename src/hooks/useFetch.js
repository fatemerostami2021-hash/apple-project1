import { useState, useEffect, useCallback, useRef } from "react";

/* ══════════════════════════════════════════════
   hook عمومی برای تمام API call ها
   استفاده: const { data, loading, error, refetch } = useFetch(getProducts, { brand: "Apple" })
══════════════════════════════════════════════ */
export function useFetch(apiFn, params = null, options = {}) {
  const { immediate = true, fallback = null } = options;
  const [data,    setData]    = useState(fallback);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);
  const cancelRef = useRef(false);

  const fetch = useCallback(async (overrideParams) => {
    cancelRef.current = false;
    setLoading(true);
    setError(null);
    try {
      const res = await apiFn(overrideParams ?? params);
      if (!cancelRef.current) setData(res.data);
    } catch (err) {
      if (!cancelRef.current) {
        setError(err.response?.data?.message || "خطا در دریافت اطلاعات");
        if (fallback !== null) setData(fallback);
      }
    } finally {
      if (!cancelRef.current) setLoading(false);
    }
  }, [apiFn, JSON.stringify(params)]);

  useEffect(() => {
    if (immediate) fetch();
    return () => { cancelRef.current = true; };
  }, [fetch, immediate]);

  return { data, loading, error, refetch: fetch };
}

/* ══════════════════════════════════════════════
   hook برای pagination
══════════════════════════════════════════════ */
export function usePaginatedFetch(apiFn, baseParams = {}) {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useFetch(
    apiFn,
    { ...baseParams, page, limit: 12 }
  );

  return {
    data:    data?.products || data || [],
    total:   data?.total    || 0,
    loading,
    error,
    page,
    setPage,
    refetch,
  };
}
