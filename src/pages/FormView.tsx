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
  Flex,
} from "@chakra-ui/react";
import { useFetchAnswers, useRegisterAnswer } from "../hook";
import { useLocation, useNavigate } from "react-router-dom";
import decryptId from "../utils/decrypt";

interface Question {
  id: string;
  type: string;
  text: string;
  options?: { id: string; text: string }[];
}

interface Item {
  id: string;
  form_id: {
    title: string;
    questions: Question[];
    description: string;
  };
  customer_data: {
    name: string;
  };
  advisor_data: {
    name: string;
  };
}

type Status = 'Enviado' | 'Completado' | 'Pendiente';


const FormView: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [formSendedId, setFormSendedId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useState<boolean>(() => new URLSearchParams(location.search).get('submitted') === 'true');
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    const encryptedId = new URLSearchParams(location.search).get("id");
    if (encryptedId) {
      const decryptedId = decryptId(encryptedId.replace(/ /g, "+"));
      setFormSendedId(decryptedId);
    }
  }, [location.search]);

  const formParams = useMemo(() => (formSendedId ? { id: formSendedId } : {}), [formSendedId]);
  const { data, loading, error } = useFetchAnswers(formParams);
  const { register, loading: loadingRegister } = useRegisterAnswer({ close: () => { }, fetch: () => { } });

  useEffect(() => {
    if (formSendedId) {
      console.log("Params enviados a la API:", { id: formSendedId });
    }
  }, [formSendedId]);

  useEffect(() => {
    if (data?.[0]?.status) {
      setStatus(data[0].status);
    }
  }, [data]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0 && data[0].form_id?.questions) {
      const initialAnswers = data[0].form_id.questions.reduce((acc: { [key: string]: string | string[] }, question: Question & { answer?: { text?: string; option_id?: number } }) => {
        const existingAnswer = question.answer?.text || question.answer?.option_id?.toString();
        if (existingAnswer) acc[question.id] = existingAnswer;
        return acc;
      }, {});
      setAnswers(initialAnswers);
    }
  }, [data]);

  const handleTextChange = (questionId: string, value: string) => setAnswers(prev => ({ ...prev, [questionId]: value }));

  const handleCheckboxChange = (questionId: string, optionId: string) => {
    setAnswers(prev => {
      const currentAnswers = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      return {
        ...prev,
        [questionId]: currentAnswers.includes(optionId)
          ? (currentAnswers as string[]).filter((id: string) => id !== optionId) // Remover si ya existe
          : [...currentAnswers, optionId], // Agregar si no existe
      };
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allQuestionsAnswered) {
      console.error("Debes contestar todas las preguntas antes de enviar.");
      return; // Detiene el envío
    }
    const formData = {
      form_sended_id: formSendedId ? parseInt(formSendedId) : 0,
      answers: Object.entries(answers).map(([questionId, response]) => ({
        question_id: parseInt(questionId),
        response: Array.isArray(response) ? response.join(", ") : response,
      })),
    };

    await register(formData);
    setStatus('Completado');
    localStorage.setItem("formStatus", "Completado");
    navigate(`${location.pathname}?${new URLSearchParams({ ...Object.fromEntries(new URLSearchParams(location.search)), submitted: 'true' })}`);

  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos: {error}</div>;

  if (!data || data.length === 0 || typeof data[0] !== "object" || !("form_id" in data[0]) || typeof (data[0] as { form_id: any }).form_id !== "object" || !Array.isArray((data[0] as { form_id: { questions: any[] } }).form_id.questions)) {
    return <div>No hay datos disponibles.</div>;
  }

  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestion(questionId);
  };

  const getCheckboxValue = (id: string) => {
    const value = answers[id];
    return Array.isArray(value) ? value : value ? [value] : [];
  };

  const allQuestionsAnswered = data?.[0]?.form_id?.questions.every((question: Question) => {
    const answer = answers[question.id];
  
    if (question.type === "Normal") {
      // Asegura que no sea undefined, vacío o solo espacios
      return typeof answer === "string" && answer.trim() !== "";
    }
  
    if (question.type === "Multiple") {
      // Asegura que la respuesta sea un arreglo y tenga al menos un valor
      return Array.isArray(answer) && answer.length > 0;
    }
  
    return true; 
  });
  
  // Mostrar mensaje de éxito si el estado es "Completado"
  if (status === 'Completado') {
    return (
      <Box bg="#F2F2F2" display="flex" alignItems="flex-start" justifyContent="center" width="100%" height="100vh">
        <Box width="90%" maxW="700px" mt={2} p={4} bg="#FFFFFF" borderRadius="md" borderTop="10px solid #019CFE">
          {data.map((item: Item) => (
            <Text key={item.id} color="#2D3748" fontWeight="bold" fontSize={{ base: "2xl", md: "2xl" }}>
              {item.form_id?.title}
            </Text>
          ))}
          <Text color="#718096" fontWeight="bold" fontSize={{ base: "1xl", md: "1xl" }}>
            Su respuesta ha sido registrada correctamente.
          </Text>
          <Text mt={2} color="#019CFE" cursor="pointer">Gracias</Text>
        </Box>
      </Box>
    );
  }


  return (
    <>
      {status === 'Enviado' &&
        (
          <>
            <Box>
              <Box bg="#F2F2F2">
                <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                  <Box width="90%" maxW="700px" mt={2}>
                    {data.map((item: Item) => (
                      <Box bg="#019CFE" p={{ base: 8, md: 12 }} borderRadius="md" mb={2} key={item.id}>
                        <Text color="white" fontWeight="bold" textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
                          <Text>{item.form_id.title}</Text>
                        </Text>
                      </Box>
                    ))}
                    {data.map((item: Item) => (
                      <Box
                        key={item.id}
                        mb={4}
                        p={4}
                        borderRadius="md"
                        bg="#FFFFFF"
                        borderTop="10px solid #019CFE"
                      >
                        <Text fontSize="2xl" fontWeight="bold" mb={0}>
                          Detalles de formulario
                        </Text>
                        <Text fontSize="md" color="#2D3748" mb={2}>
                          {item.form_id.description}
                        </Text>

                        <Flex alignItems="center">
                          <Text fontSize="xl" fontWeight="bold" color="#2D3748">
                            Alumno:
                          </Text>
                          <Text fontSize="xl" color="#2D3748" ml={4}>
                            {item.customer_data.name}
                          </Text>
                        </Flex>

                        <Flex alignItems="center">
                          <Text fontSize="xl" fontWeight="bold" color="#2D3748">
                            Asesor Comercial:
                          </Text>
                          <Text fontSize="xl" color="#2D3748" ml={4}>
                            {item.advisor_data.name}
                          </Text>
                        </Flex>
                      </Box>
                    ))}

                    <form onSubmit={handleSubmit}>
                      {data[0]?.form_id?.questions.map((question: Question) => (
                        <Box key={question.id} mb={4} p={4} borderRadius="md" bg="#FFFFFF" borderStart={selectedQuestion === question.id ? "7px solid #019CFE" : "none"} onClick={() => handleQuestionClick(question.id)} cursor="pointer">
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
                              <CheckboxGroup value={getCheckboxValue(question.id)}>
                                {question.options?.map(option => (
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
                      <Button mt={4} bg="#09155F" color="white" type="submit"    _hover={{ bg: "#0A3B7A" }}  isDisabled={!allQuestionsAnswered} isLoading={loadingRegister}>
                        Enviar
                      </Button>
                    </form>
                    <Box mt={8} textAlign="center">
                      <Text fontSize="sm" color="gray.600">
                        © {new Date().getFullYear()} Derechos reservados por ITSYSTEMS
                      </Text>
                    </Box>
                    <Box mt={8} />
                  </Box>
                </Box>
              </Box>


            </Box>
          </>
        )
      }
    </>
  );
};

export default FormView;
