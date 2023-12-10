import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ReturnData<T> {
  response: AxiosResponse<T> | null;
  error: AxiosError<any> | null;
  isLoading: boolean;
}

const useApi = <T = any>(config: AxiosRequestConfig): ReturnData<T> => {
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null);
  const [error, setError] = useState<AxiosError<any> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.request<T>(config);
        setResponse(result);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.url]);

  return { response, error, isLoading };
};

export default useApi;
