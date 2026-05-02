import { useAuthStore } from "@/stores/AuthStore"
import { useTeacherProgramsStore } from "@/stores/TeacherProgramsStore"
import { GetStatusTypeName } from "@/utils/TextUtils"
import { Box, Button, Container,  HStack, Icon, Text, VStack, Badge,  AbsoluteCenter } from "@chakra-ui/react"
import { Accordion, } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { MdAdd, MdCalendarToday } from "react-icons/md"
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { Link } from "react-router-dom"
import ProgramCreate from "./ProgramCreate"
import { FixDialog } from "@/utils/DialogFix"



const EduYearsPage = () => {
  const { user } = useAuthStore()
  const { fetch, years } = useTeacherProgramsStore()
  const [isOpenCreate, setOpenCreate] = useState<boolean>(false)
  const [yearId, setYearId] = useState<string>("")

  useEffect(() => {
    if (user?.userId) {
      fetch(user.userId)
    }
  }, [user?.userId])

  const handleClose = () => {
    setOpenCreate(false)
    FixDialog()
  }

  return (
    <>
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
                            onClick={() => {setYearId(item.id || ""); setOpenCreate(true);}}
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
                                  <Badge 
                                    fontWeight="500" 
                                    w="120px"  
                                    textAlign="center" 
                                    display="inline-flex" 
                                    alignItems="center" 
                                    justifyContent="center"
                                    flexShrink={0}
                                  >
                                    {program.status != undefined && GetStatusTypeName(program.status)}
                                  </Badge>
                                  
                                  <Text fontSize="14px" color="gray.700">
                                    <Text as="span" color="gray.500">«</Text>
                                    <Text as="span" fontWeight="500">{program.name}</Text>
                                    <Text as="span" color="gray.500">»</Text>
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

    {isOpenCreate && (
      <ProgramCreate 
        yearId={yearId}
        teacherId={user?.userId || ""}
        onClose={handleClose} />
    )}

    </>
  )
}

export default EduYearsPage