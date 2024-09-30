import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdCheckCircle } from "react-icons/md";

const SurveyForm: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
    setSelectedCard(card);
  };

  console.log(handleCardClick);
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
          <form >
            <Box
              mb={4}
              p={4}
              borderLeft={
                selectedCard === "clientData" ? "6px solid #019CFE" : "none"
              }
              onClick={() => handleCardClick("clientData")}
              borderTop="10px solid #12B75E"
              borderRadius="md"
              bg="#FFFFFF"
            >
              <Text fontSize="xl" fontWeight="bold">
                Datos del Cliente
              </Text>
              <List spacing={1}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Nombre:
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Asesor:
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Usuario:
                </ListItem>
              </List>
            </Box>

            <Box
              mb={4}
              p={4}
              borderLeft={
                selectedCard === "question1" ? "6px solid #019CFE" : "none"
              }
              onClick={() => handleCardClick("question1")}
              borderRadius="md"
              bg="#FFFFFF"
            >
              <FormControl>
                <FormLabel htmlFor="question1">Pregunta 1</FormLabel>
                <Input
                  id="question1"
                  placeholder="Respuesta"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="gray.300"
                />
              </FormControl>
            </Box>
            <Box
              mb={4}
              p={4}
              borderLeft={
                selectedCard === "question1" ? "6px solid #019CFE" : "none"
              }
              onClick={() => handleCardClick("question1")}
              borderRadius="md"
              bg="#FFFFFF"
            >
              <FormControl>
                <FormLabel htmlFor="question1">Pregunta 1</FormLabel>
                <Input
                  id="question1"
                  placeholder="Respuesta"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="gray.300"
                />
              </FormControl>
            </Box>
            <Box
              mb={4}
              p={4}
              borderLeft={
                selectedCard === "question1" ? "6px solid #019CFE" : "none"
              }
              onClick={() => handleCardClick("question1")}
              borderRadius="md"
              bg="#FFFFFF"
            >
              <FormControl>
                <FormLabel htmlFor="question1">Pregunta 1</FormLabel>
                <Input
                  id="question1"
                  placeholder="Respuesta"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="gray.300"
                />
              </FormControl>
            </Box>
            <Box
              mb={4}
              p={4}
              borderLeft={
                selectedCard === "question1" ? "6px solid #019CFE" : "none"
              }
              onClick={() => handleCardClick("question1")}
              borderRadius="md"
              bg="#FFFFFF"
            >
              <FormControl>
                <FormLabel htmlFor="question1">Pregunta 1</FormLabel>
                <Input
                  id="question1"
                  placeholder="Respuesta"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="gray.300"
                />
              </FormControl>
            </Box>
            <Box
              mb={4}
              p={4}
              borderLeft={
                selectedCard === "question1" ? "6px solid #019CFE" : "none"
              }
              onClick={() => handleCardClick("question1")}
              borderRadius="md"
              bg="#FFFFFF"
            >
              <FormControl>
                <FormLabel htmlFor="question1">Pregunta 1</FormLabel>
                <Input
                  id="question1"
                  placeholder="Respuesta"
                  border="none"
                  borderBottom="2px solid"
                  borderColor="gray.300"
                />
              </FormControl>
            </Box>

            <Button mt={4} bg="#09155F" color="white" type="submit">
              Guardar
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SurveyForm;
