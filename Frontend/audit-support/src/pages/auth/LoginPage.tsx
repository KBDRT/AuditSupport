"use client"

import { Button, Field, Input, Stack, Box, VStack, Heading } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

interface FormValues {
  username: string
  password: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="gray.50"
    >
      <VStack 
        p={8} 
        bg="white" 
        borderRadius="lg" 
        boxShadow="lg"
        maxW="md"
        w="full"
      >
        <Heading size="lg" color="gray.700">Вход в систему</Heading>
        
        <form onSubmit={onSubmit} style={{ width: '100%', marginTop: '20px' }}>
          <Stack gap="5" align="flex-start" w="full">
            <Field.Root invalid={!!errors.username}>
              <Field.Label>Имя пользователя</Field.Label>
              <Input 
                {...register("username", { required: "Введите имя пользователя" })} 
              />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Пароль</Field.Label>
              <Input 
                type="password"
                {...register("password", { required: "Введите пароль" })} 
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Button type="submit" colorScheme="blue" w="full">
              Войти
            </Button>
          </Stack>
        </form>
      </VStack>
    </Box>
  )
}

export default Login