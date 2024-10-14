import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import decryptId from '../utils/decrypt';

interface Params {
  id: string; // ID encriptado
}

interface ResponseData {
  // Define la estructura de los datos de respuesta aquí
  [key: string]: any; // Cambiado a 'any' para mayor flexibilidad
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
      // Desencriptar el ID
      const decryptedId = decryptId(memoizedParams.id);

      const response = await axios.get<ResponseData>(
        'http://demo.itsystems.ai:3010/form_sended',
        {
          params: { id: decryptedId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
      console.log("Decrypted ID:", decryptedId);
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
    fetchAnswers();
  }, [fetchAnswers]);

  return { loading, data, error, fetchAnswers };
};