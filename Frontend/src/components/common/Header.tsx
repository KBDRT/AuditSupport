import { useAuthStore } from "@/stores/AuthStore";
import { 
  Box, 
  Link, 
  Flex, 
  Spacer, 
  Button,
  Avatar,
  Text,
  HStack,
  Menu,
  Icon,
  Container,
  Badge,
  Portal
} from "@chakra-ui/react"
import { 
  MdExitToApp, 
  MdSchool,
  MdCategory,
  MdTextFields,
  MdFormatListNumbered,
  MdPeople,
  MdExpandMore
} from "react-icons/md";

const Header = () => {
  const { logout, user } = useAuthStore()

  // Определяем навигационные ссылки в зависимости от роли
  const getNavLinks = () => {
    if (user?.role === "Head") {
      return [
        { name: "Уч. года", href: "/Years", icon: MdSchool },
        { name: "Направленности", href: "/Directions", icon: MdCategory },
        { name: "Термины", href: "/Rules/Words", icon: MdTextFields },
        { name: "Разделы", href: "/Rules/Sections", icon: MdFormatListNumbered },
      ]
    }
    else if (user?.role === "Admin") {
      return [
        { name: "Пользователи", href: "/Users", icon: MdPeople },
      ]
    }
    else if (user?.role === "Teacher")
    {
      return [
        { name: "Учебные года", href: "/EduYears", icon: MdSchool },
      ]
    }
    return []
  }

  const navLinks = getNavLinks()

  const getViewText = (role: string) => {
  switch (role) {
    case 'Head':
      return 'Зам. директора';
    case 'Teacher':
      return 'Педагог';
    case 'Methodist':
      return 'Методист';
    case 'Admin':
      return 'Администратор';
    default:
      return '-';
    }
  };


  return (
    <Box 
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.100"
      boxShadow="sm"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "md"
      }}
    >
      <Container maxW="container.xl" px={6}>
        <Flex 
          h="70px" 
          alignItems="center" 
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={2}>
            <Box
              as="div"
              pl={4}
              pr={4}
            //   w="40px"
              h="40px"
              bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
              borderRadius="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="20px"
              color="white"
            >
              АУДИТ
            </Box>
            <Text
              fontSize="24px"
              fontWeight="bold"
              bgGradient="linear(to-r, #3182CE, #2C5282)"
              bgClip="text"
              letterSpacing="tight"
            >
              АУДИТ
            </Text>
          </Flex>

          <Spacer />

          {/* Навигация */}
          {navLinks.length > 0 && (
            <HStack gap={1} mr={8}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  px={4}
                  py={2}
                  borderRadius="lg"
                  fontSize="15px"
                  fontWeight="500"
                  color="gray.600"
                  transition="all 0.2s"
                  _hover={{
                    textDecoration: "none",
                    bg: "blue.50",
                    color: "blue.600",
                    transform: "translateY(-1px)"
                  }}
                >
                  <HStack gap={2}>
                    <Icon as={link.icon} boxSize="18px" />
                    <Text>{link.name}</Text>
                  </HStack>
                </Link>
              ))}
            </HStack>
          )}

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button 
                variant="ghost" 
                px={3} 
                py={2}
                borderRadius="full"
                transition="all 0.2s"
                _hover={{ bg: "blue.50" }}
              >
                <Flex alignItems="center" gap={3}>
                  <Avatar.Root size="sm">
                    <Avatar.Fallback/>
                    <Avatar.Image />
                  </Avatar.Root>
                  <Box textAlign="left" display={{ base: "none", md: "block" }}>
                    <Text fontSize="14px" fontWeight="600" color="gray.700">
                      {user?.login || user?.email?.split('@')[0]}
                    </Text>
                    <Badge 
                      colorScheme="blue"
                      fontSize="10px"
                      borderRadius="full"
                      px={2}
                    >
                      {user?.login || user?.email?.split('@')[0]}
                      {getViewText(user?.role || "")}
                    </Badge>
                  </Box>
                  <Icon as={MdExpandMore} color="gray.600" />
                </Flex>
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content 
                  py={2} 
                  shadow="lg" 
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.100"
                  minW="220px"
                >
                  <Menu.Item 
                    value="logout"
                    onClick={logout}
                    color="red.500"
                    _hover={{ bg: "red.50", color: "red.600" }}
                    fontWeight="500"
                  >
                    <HStack gap={2}>
                      <Icon as={MdExitToApp} />
                      <Text>Выйти</Text>
                    </HStack>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header;