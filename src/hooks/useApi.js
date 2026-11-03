"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiRequest } from "@/lib/api";


export function useApi(path, { auth = false } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const lastRequest = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++lastRequest.current;
    setLoading(true);
    setError("");
    try {
      const result = await apiRequest(path, { auth });
      if (requestId === lastRequest.current) setData(result); // ignore old responses
    } catch (err) {
      if (requestId === lastRequest.current) setError(err.message);
    } finally {
      if (requestId === lastRequest.current) setLoading(false);
    }
  }, [path, auth]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, setData, loading, error, reload: load };
}
