import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
    name: string;
    email: string;
    address: string;
    phone?: string;
    feedback?: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Nombre es obligatorio'),
    email: yup.string().email('Email no válido').required('Email es obligatorio'),
    address: yup.string().required('Dirección es obligatoria'),
});

const SurveyForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    const handleCardClick = (card: string) => {
        setSelectedCard(card);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh" width="100%" margin={4}>
            <Box width="50%" p={6} >
                <Box bg="blue.500" p={20} borderRadius="md" mb={4}>
                    <Text color="white" fontSize="lg" fontWeight="bold" textAlign="center">Formulario de Encuesta</Text>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box 
                        mb={4} 
                        p={4} 
                        borderLeft={selectedCard === 'clientData' ? '4px solid teal' : 'none'}
                        onClick={() => handleCardClick('clientData')}
                        borderTop="4px solid teal"
                        borderRadius="md"
                        bg="gray.100"
                    >
                        <Text fontSize="xl" fontWeight="bold">Datos del Cliente</Text>
                        <Input
                            placeholder="Descripcion del formulario"
                            mt={2}
                            {...register('clientData')}
                        />
                    </Box>

                    <Box 
                        mb={4} 
                        p={4} 
                        borderLeft={selectedCard === 'name' ? '4px solid teal' : 'none'}
                        onClick={() => handleCardClick('name')}
                        borderTop="4px solid teal"
                        borderRadius="md"
                        bg="gray.100"
                    >
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel htmlFor="name">Nombre</FormLabel>
                            <Input id="name" placeholder="Ingresa tu nombre" {...register('name')} />
                        </FormControl>
                    </Box>

                    <Box 
                        mb={4} 
                        p={4} 
                        borderLeft={selectedCard === 'email' ? '4px solid teal' : 'none'}
                        onClick={() => handleCardClick('email')}
                        borderTop="4px solid teal"
                        borderRadius="md"
                        bg="gray.100"
                    >
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel htmlFor="email">Email <Text as="span" color="red.500">*</Text></FormLabel>
                            <Input id="email" type="email" placeholder="Ingresa tu email" {...register('email')} />
                        </FormControl>
                    </Box>

                    <Box 
                        mb={4} 
                        p={4} 
                        borderLeft={selectedCard === 'address' ? '4px solid teal' : 'none'}
                        onClick={() => handleCardClick('address')}
                        borderTop="4px solid teal"
                        borderRadius="md"
                        bg="gray.100"
                    >
                        <FormControl isInvalid={!!errors.address}>
                            <FormLabel htmlFor="address">Dirección <Text as="span" color="red.500">*</Text></FormLabel>
                            <Input id="address" placeholder="Ingresa tu dirección" {...register('address')} />
                        </FormControl>
                    </Box>

                    <Box 
                        mb={4} 
                        p={4} 
                        borderLeft={selectedCard === 'phone' ? '4px solid teal' : 'none'}
                        onClick={() => handleCardClick('phone')}
                        borderTop="4px solid teal"
                        borderRadius="md"
                        bg="gray.100"
                    >
                        <FormControl>
                            <FormLabel htmlFor="phone">Teléfono</FormLabel>
                            <Input id="phone" placeholder="Ingresa tu teléfono (opcional)" {...register('phone')} />
                        </FormControl>
                    </Box>

                    <Box 
                        mb={4} 
                        p={4} 
                        borderLeft={selectedCard === 'feedback' ? '4px solid teal' : 'none'}
                        onClick={() => handleCardClick('feedback')}
                        borderTop="4px solid teal"
                        borderRadius="md"
                        bg="gray.100"
                    >
                        <FormControl>
                            <FormLabel htmlFor="feedback">Comentarios</FormLabel>
                            <Input id="feedback" placeholder="Comentarios (opcional)" {...register('feedback')} />
                        </FormControl>
                    </Box>

                    <Button mt={4} colorScheme="teal" type="submit">Enviar</Button>
                </form>
            </Box>
        </Box>
    );
}

export default SurveyForm;
