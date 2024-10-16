import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  Text, IconButton,
  useClipboard,
} from "@chakra-ui/react";
import { encryptId } from "../utils/crypto"; // Suponiendo que tienes una función para encriptar el ID en utils/crypto
import { FiLock, FiCopy } from "react-icons/fi";

const EncryptPage: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [encryptedUrl, setEncryptedUrl] = useState<string>("");
  const { hasCopied, onCopy } = useClipboard(encryptedUrl);

  const handleEncrypt = () => {
    // Verificar si el campo de entrada está vacío
    if (!id.trim()) {
      setError("Debe ingresar un ID");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    // Encriptar el ID cuando se hace clic en el botón
    const encryptedId = encryptId(id); // Suponiendo que esta función encripta el ID
    setError("");
    setEncryptedUrl(`http://localhost:5173/viewform?id=${encryptedId}`); // Almacenar la URL encriptada en el estado
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    setError(""); // Limpiar el mensaje de error al cambiar el valor del campo
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      color="black"
      height="100vh"
      bg="transparent"
    >
      <Box
        maxWidth="500px"
        bg="white"
        width="100%"
        p={6}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading as="h1" size="xl" mb={6}>
          Encriptar URL
        </Heading>
        <Text>Ingrese el ID del formulario</Text>
        <InputGroup>
          <InputLeftAddon
            borderColor={error ? "red.400" : "gray"}
            children={<FiLock />}
          />
          <Input
            placeholder="Ingrese el ID de la Inscripción"
            value={id}
            borderColor={error ? "red.400" : "gray"} // Cambiar el color del borde si hay un error
            onChange={handleChange}
            mb={4}
            variant="filled"
            type="tel"
            isInvalid={!!error} // Marcar el campo como inválido si hay un error
            errorBorderColor="red.400" // Establecer el color del borde en caso de error
            required
          />
        </InputGroup>
        {error && (
          <Box color="red.500" fontSize="sm" mb={2}>
            {error}
          </Box>
        )}
        <Button bg="#09155F" _hover={{ bg: "#019CFE", cursor: "pointer" }} onClick={handleEncrypt} mb={4}>
          Encriptar
        </Button>
        {encryptedUrl && (
          <Box>
            <InputGroup>
              <Input borderColor="gray" _hover={{borderColor:"black"}} value={encryptedUrl} isReadOnly pr="4.5rem" />
              <IconButton
                aria-label="Copiar URL"
                icon={<FiCopy />}
                onClick={onCopy}
                position="absolute"
                right="0"
                color="black"
                top="0"
                h="100%"
            
              />
            </InputGroup>
            {hasCopied && (
              <Text fontSize="sm" color="green.500">
                URL copiada al portapapeles
              </Text>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EncryptPage;
