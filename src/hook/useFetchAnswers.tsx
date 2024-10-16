import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Params {
  id?: string; // Agregar el ID desencriptado como un parámetro opcional
  [key: string]: string | number | undefined; // Permitir otros parámetros
}

interface ResponseData {
  [key: string]: string;
}

export const useFetchAnswers = (params: Params) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = 'WhBBBgH35hnVBBiUyL1I';

  const memoizedParams = useMemo(() => params, [params]);

  const fetchAnswers = useCallback(async () => {
    if (!memoizedParams.id) {
      console.warn("No se proporcionó un ID para la consulta."); // Advertencia si no hay ID
      return; // No hacer la llamada si no hay ID
    }

    setLoading(true);
    setError(null);

    console.log("Params enviados a la API:", memoizedParams); // Verifica los parámetros

    try {
      const response = await axios.get<ResponseData>(
        'http://demo.itsystems.ai:3010/form_sended/list',
        {
          params: memoizedParams,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
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