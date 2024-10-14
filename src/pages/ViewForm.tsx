import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useFetchAnswers, useRegisterAnswer } from "../hook";

interface Question {
  id: string;
  type: string;
  text: string;
  options?: { id: string; text: string }[];
}

const ViewForm: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Pasar el parámetro 'id' que deseas filtrar
  const formSendedId = 2;
  const formParams = useMemo(() => ({ id: formSendedId }), [formSendedId]);
  const { data, loading, error } = useFetchAnswers(formParams);
  const { register, loading: loadingRegister, error: errorRegister } = useRegisterAnswer({
    close: () => { },
    fetch: () => { },
  });

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      console.log(data); // Verifica la estructura de los datos recibidos
      const initialAnswers: { [key: string]: string | string[] } = {};

      // Accede al primer elemento del array y sus preguntas
      data[0].form_id?.questions?.forEach((question: Question & { answer?: { text?: string; option_id?: number } }) => {
        const existingAnswer = question.answer?.text || question.answer?.option_id?.toString();
        if (existingAnswer) {
          initialAnswers[question.id] = existingAnswer;
        }
      });

      setAnswers(initialAnswers);
    }
  }, [data]);

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      if (currentAnswers.includes(optionId)) {
        return { ...prev, [questionId]: currentAnswers.filter((id) => id !== optionId) };
      } else {
        return { ...prev, [questionId]: [...currentAnswers, optionId] };
      }
    });
  };

  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestion(questionId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      form_sended_id: formSendedId, 
      answers: Object.entries(answers).map(([questionId, response]) => {
          const formattedResponse = Array.isArray(response)
              ? response.join(", ") //respuestas multiples
              : response;  // Respuestas normales
          return {
              question_id: parseInt(questionId), 
              response: formattedResponse, 
          };
      }),
  };

  await register(formData);
  console.log(formData); // Para verificar el dato enviados
  setSubmitted(true);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos: {error}</div>;

  // Verifica si data tiene el formulario antes de renderizar
  if (!data || data.length === 0 || typeof data[0] !== 'object' || typeof data[0].form_id !== 'object' || !data[0].form_id.questions) {
    return <div>No hay datos disponibles.</div>;
  }

  if (submitted) {
    return (
      <Box bg="#F2F2F2" display="flex" alignItems="center" justifyContent="center" width="100%" >
        <Box width="90%" maxW="700px" mt={2} p={4} bg="#FFFFFF" borderRadius="md" borderTop="10px solid #019CFE">
          {data.map((item) => (
            <Text key={item.id} color="#2D3748" fontWeight="bold"  fontSize={{ base: "2xl", md: "2xl" }} >
              {item.form_id?.title}
            </Text>

          ))}
          <Text
            color="#718096"
            fontWeight="bold"
            fontSize={{ base: "1xl", md: "1xl" }}
          >
            Su respuesta ha sido registrada correctamente.
          </Text>
          <Text
            mt={2}
            color="#019CFE"
            textDecoration="underline"
            cursor="pointer"
            onClick={() => setSubmitted(false)}
          >
            Regresar
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="#F2F2F2">
      <Box display="flex" alignItems="center" justifyContent="center" width="100%">
        <Box width="90%" maxW="700px" mt={2}>
          {data.map((item) => (
            <Box bg="#019CFE" p={{ base: 8, md: 12 }} borderRadius="md" mb={2} key={item.id}>
              <Text color="white" fontWeight="bold" textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
                <Text>{item.form_id.title}</Text>
              </Text>
            </Box>
          ))}

          {data.map((item) => (
            <Box key={item.id} mb={4} p={4} borderRadius="md" bg="#FFFFFF" borderTop="10px solid #019CFE">
              <Text fontSize="lg" fontWeight="bold">Detalles del Cliente</Text>
              <Text>Cliente: {item.customer_data.name}</Text>
              <Text>Instructor : {item.instructor_data.name}</Text>
              <Text>Asesor: {item.advisor_data.name}</Text>
              <Text>Programacion: {item.programming_data.code}</Text>
            </Box>
          ))}
          <form onSubmit={handleSubmit}>
            {data[0]?.form_id?.questions.map((question: Question) => (
              <Box
                key={question.id}
                mb={4}
                p={4}
                borderRadius="md"
                bg="#FFFFFF"
                borderStart={selectedQuestion === question.id ? "7px solid #019CFE" : "none"}
                onClick={() => handleQuestionClick(question.id)}
                cursor="pointer"
              >
                <FormControl>
                  <FormLabel htmlFor={question.id}>{question.text}</FormLabel>
                  {question.type === "Normal" ? (
                    <Input
                      id={question.id}
                      value={answers[question.id] || ""}
                      onChange={(e) => handleTextChange(question.id, e.target.value)}
                      placeholder="Respuesta"
                      border="none"
                      borderBottom="2px solid"
                      borderColor="gray.300"
                    />
                  ) : (
                    <CheckboxGroup value={answers[question.id] || []}>
                      {question.options?.map((option) => (
                        <Box key={option.id}>
                          <Checkbox
                            value={option.id}
                            isChecked={answers[question.id]?.includes(option.id)}
                            onChange={() => handleCheckboxChange(question.id, option.id)}
                          >
                            {option.text}
                          </Checkbox>
                        </Box>
                      ))}
                    </CheckboxGroup>
                  )}
                </FormControl>
              </Box>
            ))}
            <Button mt={4} bg="#09155F" color="white" type="submit" isLoading={loadingRegister} _hover={{ bg: "#0A3B7A" }}>
              Guardar
            </Button>
            {errorRegister && typeof errorRegister === 'object' && 'message' in errorRegister ? (
              <Text color="red.500">Error: {(errorRegister as { message: string}).message}</Text>
            ) : (
              <Text color="red.500">Error: {errorRegister}</Text>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewForm;
