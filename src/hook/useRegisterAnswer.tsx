import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Answer {
    question_id: number;
    response: string;
}

interface FormData {
    form_sended_id: number;
    answers: Answer[];
}

export const useRegisterAnswer = ({ close, fetch }: { close: () => void; fetch: () => void }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<FormData | null>(null);
	
	const register = async (formData: FormData) => {
		setLoading(true);
		setError(null);
		
		try {
			const token = 'WhBBBgH35hnVBBiUyL1I';
			const response = await axios.post(
				'http://demo.itsystems.ai:3010/answer',
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setData(response.data);
			fetch();
			close();
		} catch (err) {	
			setError(
				(err as AxiosError).response
					? (err as AxiosError).response?.data as string
					: 'A ocurrido un error al intentar registrar.'
			);
		} finally {
			setLoading(false);
		}
	};

	return { register, data, loading, error };
};