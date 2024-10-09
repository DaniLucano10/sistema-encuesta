import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';

// Define tipos para los parámetros y la respuesta
type Params = Record<string, string | number>;
type ResponseData = []; 

export const useFetchAnswers = (params: Params) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const memoizedParams = useMemo(() => params, [params]);

  const fetchAnswers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ResponseData>(
        'http://demo.itsystems.ai:3010/form_sended',
        { params: memoizedParams }
      );
      setData(response.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response
          ? error.response.data as string
          : 'Ha ocurrido un error al obtener los datos.'
      );
    } finally {
      setLoading(false);
    }
  }, [memoizedParams]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  return { loading, data, error, fetchAnswers };
};