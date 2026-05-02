import { Button, Field, Input, Stack, Box, VStack,  Center, Text, Icon, HStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/AuthStore"
import PageLoading from "@/components/common/PageLoading";
import { MdLock, MdLogin, MdPerson } from "react-icons/md";

export const roleRedirects: Record<string, string> = {
  'Admin': '/Users',
  'Head': '/Years',
  'Teacher': '/EduYears',
  'Methodist': '/Programs',
};

const LoginPage = () => {
  const [userLogin, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { user, loading, login } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) 
    {
      navigate(roleRedirects[user.role], { replace: true })
    }
  }, [user, loading, navigate])

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const success = await login(userLogin, password)
      if (success && user) 
      {
      } 
      else 
      {
        console.error("Login failed")
      }
    } 
    catch (error) 
    {
      console.error("Login error:", error)
    } 
    finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <Box 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <PageLoading />
      </Box>
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
      bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    >
      <Center>
        <VStack 
          p={10} 
          bg="white" 
          borderRadius="2xl" 
          boxShadow="2xl"
          w="400px"
          gap={6}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            bg: "linear-gradient(90deg, #3182CE 0%, #2C5282 100%)"
          }}
        >
          <Box
            as="div"
            w="70px"
            h="70px"
            bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
            borderRadius="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
            fontSize="28px"
            color="white"
            mb={2}
          >
            А
          </Box>

          <Stack gap="5" align="flex-start" w="full">
            <Field.Root>
              <Field.Label display="flex" alignItems="center" gap={2}>
                <Icon as={MdPerson} color="blue.500" />
                Логин
              </Field.Label>
              <Input 
                placeholder="Введите ваш логин"
                value={userLogin}
                onChange={(e) => {
                  setLogin(e.target.value)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit()
                  }
                }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182CE"
                }}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label display="flex" alignItems="center" gap={2}>
                <Icon as={MdLock} color="blue.500" />
                Пароль
              </Field.Label>
              <Input 
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit()
                  }
                }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182CE"
                }}
              />
            </Field.Root>

            <Button 
              onClick={handleSubmit}
              bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
              bgGradient="linear(to-r, #3182CE, #2C5282)"
              color="white"
              w="full"
              mt={2}
              loading={isLoading}
              loadingText="Вход..."
              _hover={{
                bgGradient: "linear(to-r, #2C5282, #1A365D)",
                transform: "translateY(-1px)",
                boxShadow: "lg"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              transition="all 0.2s"
            >
              <HStack gap={2}>
                <Icon as={MdLogin} />
                <Text>Войти</Text>
              </HStack>
            </Button>
          </Stack>

          <Text fontSize="xs" color="gray.500" textAlign="center" mt={2}>
            Система внутреннего аудита
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}

export default LoginPage