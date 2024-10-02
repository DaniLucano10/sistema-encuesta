import React, { useState } from "react";
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
import { Question } from "../data/Questions";

const questions: Question[] = [
  { id: "q1", text: "¿Cuál es tu nombre?", type: "text" },
  { id: "q2", text: "¿Cuál es tu color favorito?", type: "text" },
  {
    id: "q3",
    text: "¿Qué deportes practicas?",
    type: "multiple",
    options: ["Fútbol", "Baloncesto", "Tenis", "Natación"],
  },
  {
    id: "q4",
    text: "¿Qué géneros de música prefieres?",
    type: "multiple",
    options: ["Rock", "Pop", "Jazz", "Clásica"],
  },
];

const SurveyForm: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (questionId: string, value: string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestion(questionId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(answers);
    // Aquí puedes enviar las respuestas a tu backend
  };

  return (
    <Box bg="#F2F2F2">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Box width="90%" maxW="700px" mt={2}>
          <Box bg="#12B75E" p={{ base: 8, md: 16 }} borderRadius="md" mb={2}>
            <Text
              color="white"
              fontWeight="bold"
              textAlign="center"
              fontSize={{ base: "2xl", md: "3xl" }}
            >
              Formulario de Encuesta
            </Text>
          </Box>
          <form onSubmit={handleSubmit}>
            {questions.map((question) => (
              <Box
                key={question.id}
                mb={4}
                p={4}
                borderLeft={
                  selectedQuestion === question.id
                    ? "6px solid #019CFE"
                    : "none"
                }
                onClick={() => handleQuestionClick(question.id)}
                borderRadius="md"
                bg="#FFFFFF"
              >
                <FormControl>
                  <FormLabel htmlFor={question.id}>{question.text}</FormLabel>
                  {question.type === "text" ? (
                    <Input
                      id={question.id}
                      value={(answers[question.id] as string) || ""}
                      onChange={(e) =>
                        handleTextChange(question.id, e.target.value)
                      }
                      placeholder="Respuesta"
                      border="none"
                      borderBottom="2px solid"
                      borderColor="gray.300"
                    />
                  ) : (
                    <CheckboxGroup
                      value={(answers[question.id] as string[]) || []}
                      onChange={(value) =>
                        handleCheckboxChange(question.id, value as string[])
                      }
                    >
                      {question.options?.map((option) => (
                        <Box key={option}>
                          <Checkbox value={option}>{option}</Checkbox>
                        </Box>
                      ))}
                    </CheckboxGroup>
                  )}
                </FormControl>
              </Box>
            ))}
            <Button
              mt={4}
              bg="#09155F"
              color="white"
              type="submit"
              _hover={{
                bg: "#0A1A7D", 
                boxShadow: "0px 4px 10px rgba(9, 21, 95, 0.3)", 
              }}
            >
              Guardar
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SurveyForm;
