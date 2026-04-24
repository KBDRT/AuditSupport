import { Button, Field, Input, Stack, Box, VStack, Heading, Center } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/AuthStore"
import PageLoading from "@/components/common/PageLoading";

export const roleRedirects: Record<string, string> = {
  'Admin': '/users',
  'Head': '/years',
  'Teacher': '/profile',
  'Manager': '/reports',
};

const LoginPage = () => {
  const [userLogin, setLogin] = useState("")
  const [password, setPassword] = useState("")
  
  const { user, loading, login } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) 
    {
      navigate(roleRedirects[user.role], { replace: true })
    }
  }, [user, loading])


  const handleSubmit = async () => {
    try {
      const success = await login(userLogin, password)
      if (success && user) 
      {

      } 
      else 
      {

      }
    } 
    catch (error) 
    {

    }
  }

  if (loading) {
    return (
      <PageLoading />
    )
  }

  if (user) {
    return null
  }

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="gray.50"
    >
      <Center>
        <VStack 
          p={8} 
          bg="white" 
          borderRadius="lg" 
          boxShadow="lg"
          maxW="md"
          w="xs"
        >
          <Heading size="lg" color="gray.700">Вход в систему</Heading>
          
          <Stack gap="5" align="flex-start" w="full">
            <Field.Root>
              <Field.Label>Логин</Field.Label>
              <Input 
                placeholder="Введите ваш логин"
                value={userLogin}
                onChange={(e) => {
                  setLogin(e.target.value)
                }}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Пароль</Field.Label>
              <Input 
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </Field.Root>

            <Button 
              onClick={handleSubmit}
              colorScheme="blue" 
              w="full"
              loadingText="Вход..."
            >
              Войти
            </Button>
          </Stack>
        </VStack>
      </Center>
    </Box>
  )
}

export default LoginPage