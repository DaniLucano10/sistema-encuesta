import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Params {
  // Define los tipos de los parámetros aquí
  [key: string]: string | number;
}

interface ResponseData {
  // Define la estructura de los datos de respuesta aquí
  [key: string]: string;
}

export const useFetchAnswers = (params: Params) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = 'WhBBBgH35hnVBBiUyL1I';

  const memoizedParams = useMemo(() => params, [params]);

  const fetchAnswers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<ResponseData>(
        'http://demo.itsystems.ai:3010/form_sended',
        {
          params: memoizedParams,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
      console.log("Params:", memoizedParams);
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response
          ? (error.response.data as string)
          : 'Ha ocurrido un error al obtener los datos.'
      );
    } finally {
      setLoading(false);
    }
  }, [memoizedParams]);

  useEffect(() => {
    fetchAnswers(); // Solo se ejecutará una vez o cuando cambien los params
  }, [fetchAnswers]);

  return { loading, data, error, fetchAnswers };
};