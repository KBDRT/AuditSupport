import { useAuthStore } from "@/stores/AuthStore"
import { useTeacherProgramsStore } from "@/stores/TeacherProgramsStore"
import { GetStatusTypeName } from "@/utils/TextUtils"
import { Box, Button, Container,  HStack, Icon, Text, VStack, Badge,  AbsoluteCenter } from "@chakra-ui/react"
import { Accordion, } from "@chakra-ui/react"
import { useEffect } from "react"
import { MdAdd, MdCalendarToday } from "react-icons/md"
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { Link } from "react-router-dom"
import { CreateProgram } from "@/services/ProgramService"

const EduYearsPage = () => {
  const { user } = useAuthStore()
  const { fetch, years } = useTeacherProgramsStore()

  useEffect(() => {
    if (user?.userId) {
      fetch(user.userId)
    }
  }, [user?.userId])

  const handleAdd = async (yearId: string) => {
    await CreateProgram({agesOfChildrens: "", directionId: null, duration: "", name: "", teacherId: user?.userId, yearId: yearId})
  }

  return (
    <Box minH="100vh" width="auto" maxW="1000px" mx="auto">
      <Container maxW="container.xl" py={2}>
        <VStack align="stretch" gap={6}>
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            overflow="hidden"
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s ease"
          >
            {years.length === 0 ? (
              <VStack py={16} gap={3}>
                <Icon as={MdCalendarToday} boxSize="48px" color="gray.300" />
                <Text color="gray.500" fontSize="lg">
                  Нет учебных годов
                </Text>
              </VStack>
            ) : (
              <Accordion.Root variant="plain" collapsible defaultValue={years.length > 0 ? [years[0].period || `year-0`] : []}>
                {years.map((item, index) => (
                  <Accordion.Item
                    key={item.id}
                    value={item.period || `year-${index}`}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    _last={{ borderBottom: "none" }}
                  >
                    <Box position="relative">
                      <Accordion.ItemTrigger
                        _hover={{ bg: "gray.50" }}
                        transition="all 0.2s"
                        px={6}
                        py={4}
                      >
                        <HStack gap={3} flex="1">
                          <Icon
                            as={item.isOpened ? IoMdUnlock : IoMdLock}
                            color={item.isOpened ? "green.500" : "gray.400"}
                            boxSize="20px"
                          />
                          <Text fontWeight="600" fontSize="16px" color="gray.800">
                            {item.period}
                          </Text>
                        </HStack>
                        <Accordion.ItemIndicator />
                      </Accordion.ItemTrigger>
                      <AbsoluteCenter axis="vertical" insetEnd="4"  mr={10}>
                        {item.isOpened && (
                          <Button
                            variant="ghost"
                            colorPalette="blue"
                            size="sm"
                            onClick={() => handleAdd(item.id || "")}
                            _hover={{
                              bg: "blue.50",
                              transform: "translateY(-1px)"
                            }}
                          >
                            <HStack gap={1}>
                              <Icon as={MdAdd} boxSize="16px" />
                              <Text>Добавить</Text>
                            </HStack>
                          </Button>
                        )}
                      </AbsoluteCenter>
                    </Box>

                    <Accordion.ItemContent>
                      <Box px={6} py={4} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
                        <VStack align="stretch">
                          {item.programs?.length === 0 ? (
                            <Text color="gray.500" fontSize="14px" textAlign="center" py={2}>
                              Нет программ
                            </Text>
                          ) : (
                            item.programs?.map((program) => (
                              <Link to={`/EduProgram/${program.id}`} key={program.id}>
                              <Box
                                key={program.id}
                                p={3}
                                bg="white"
                                borderRadius="lg"
                                border="1px solid"
                                borderColor="gray.200"
                                transition="all 0.2s"
                                _hover={{
                                  borderColor: "blue.200",
                                  boxShadow: "sm"
                                }}
                              >
                                <HStack gap={2}>
                                  <Text fontSize="14px" color="gray.700">
                                    <Badge as="span" fontWeight="500">
                                      {program.status != undefined && GetStatusTypeName(program.status)}
                                    </Badge>
                                    <Text as="span" color="gray.500">
                                      {" «"}
                                    </Text>
                                    <Text as="span" fontWeight="500">
                                      {program.name}
                                    </Text>
                                    <Text as="span" color="gray.500">
                                      {"»"}
                                    </Text>
                                  </Text>
                                </HStack>
                              </Box>
                              </Link>
                            ))
                          )}
                        </VStack>
                      </Box>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default EduYearsPage