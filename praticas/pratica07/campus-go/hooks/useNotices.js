import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.get('posts?_limit=10');
      setNotices(Array.isArray(result) ? result : []);
    } catch (requestError) {
      setNotices([]);
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os avisos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  return { notices, isLoading, error, reload };
}
