import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Field,
  HStack,
  Input,
  NativeSelect,
  VStack,
  Text,
  Icon,
  Grid,
  GridItem,
  Badge,
  ActionBar,
  Portal,
  Dialog,
  CloseButton,
} from "@chakra-ui/react"

import {
  MdSave,
  MdSend,
  MdWarning,
  MdCheck,
  MdClose,
  MdDelete
} from "react-icons/md"

import { MdWork, MdPerson, MdCalendarToday, MdCategory, MdInfo } from "react-icons/md";
import { useEffect, useState } from "react";
import { ProgramStatuses, type EduProgramDTO } from "@/api/models";
import { GetStatusTypeName } from './../../utils/TextUtils';
import { useDirectionsStore } from "@/stores/DirectionsStore";
import VersionsTable from "./VersionsTable";
import PageLoading from "@/components/common/PageLoading";
import { Tooltip } from "@/components/ui/tooltip"
import { useProgramStore } from "@/stores/ProgramStore";

const EduProgram = () => {
  const { id } = useParams();
  const { fetch, items: directions } = useDirectionsStore()
  const { fetchProgram, program, updateProgram, selectedVersion, changeStatus, deleteProgram } = useProgramStore()
  const [openAccordion, setOpenAccordion] = useState<boolean>(true)
  const programFromStore = id ? program : undefined
  const [localFormData, setLocalFormData] = useState<EduProgramDTO | undefined>()
  const navigate = useNavigate();

  useEffect(() => {
    if (programFromStore) {
      setLocalFormData(programFromStore)
    }
  }, [programFromStore?.id, programFromStore?.name, programFromStore?.directionId]) 

  useEffect(() => {
    const loadProgram = async () => {
      if (id) {
        await fetchProgram(id)
      }
      fetch()
    };
    loadProgram();
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => prev ? { ...prev, [name]: value } : undefined)
  };

  const handleSave = async () => {
    if (localFormData) {
      await updateProgram({
        agesOfChildrens: localFormData.agesOfChildrens,
        directionId: localFormData.directionId || "",
        duration: localFormData.duration,
        name: localFormData.name,
        programId: localFormData.id
      })
    }
  }

  const handleChangeCreatePage = (stat: boolean) => {
    setOpenAccordion(stat)
  }

  const handleDelete = async() => {
    const isSuccess = await deleteProgram(id || "");

    if (isSuccess)
    {
      navigate('/eduyears');
    }
  }

  const handleSendToReview = async() =>
  {
    const isSuccess = await changeStatus({newStatus: ProgramStatuses.ReadyToCheck, programId: id, versionId: selectedVersion?.id})
    if (isSuccess)
    {

    }
  }

  if (!programFromStore) {
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

  return (
    <>
      <Box bg="gray.50">
        <Container maxW="container.lg" py={2}>
          <VStack align="stretch" gap={3}>
          
          <HStack gap={3}>
            <Box
              as="div"
              w="32px"
              h="32px"
              bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={MdInfo} boxSize="16px" color="white" />
            </Box>
            <Text fontSize="lg" fontWeight="600" color="gray.700">
              Информация
            </Text>
            {/* <Spacer /> */}
          </HStack>

            <Box
              bg="white"
              borderRadius="2xl"
              boxShadow="sm"
              p={4}
              _hover={{ boxShadow: "md" }}
              transition="all 0.3s ease"
            >
              <VStack gap={6} align="stretch">
                <Grid templateColumns="140px 1fr" gap={6}>
                  <GridItem>
                    <Field.Root>
                      <Field.Label display="flex" alignItems="center" gap={2}>
                        <Icon as={MdInfo} color="blue.500" boxSize="16px" />
                        Статус
                      </Field.Label>
                      <Badge
                        colorPalette="blue"
                        fontSize="13px"
                        borderRadius="full"
                        px={3}
                        py={2.5}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="full"
                        minH="32px"
                      >
                        {programFromStore?.programStatus != undefined && GetStatusTypeName(programFromStore.programStatus)}
                      </Badge>
                    </Field.Root>
                  </GridItem>

                  <GridItem>
                    <Field.Root>
                      <Field.Label display="flex" alignItems="center" gap={2}>
                        <Icon as={MdWork} color="blue.500" boxSize="16px" />
                        Название программы
                      </Field.Label>
                      <Input
                        name="name"
                        onChange={handleChange}
                        placeholder="Введите название программы"
                        size="sm"
                        fontSize="16px"
                        value={localFormData?.name || ""}
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182CE"
                        }}
                      />
                    </Field.Root>
                  </GridItem>
                </Grid>

                <Grid templateColumns="140px 1fr 1fr 1fr" gap={6}>
                  <GridItem>
                    <Field.Root>
                      <Field.Label display="flex" alignItems="center" gap={2}>
                        <Icon as={MdCalendarToday} color="blue.500" boxSize="16px" />
                        Учебный год
                      </Field.Label>
                      <Input
                        textAlign="center"
                        name="year"
                        value={localFormData?.year || ""}
                        readOnly
                        // disabled
                        bg="gray.50"
                        _disabled={{
                          opacity: 0.8,
                          cursor: "not-allowed"
                        }}
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182CE"
                        }}
                      />
                    </Field.Root>
                  </GridItem>

                  <GridItem>
                    <Field.Root>
                      <Field.Label display="flex" alignItems="center" gap={2}>
                        <Icon as={MdCategory} color="blue.500" boxSize="16px" />
                        Направление
                      </Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field 
                          placeholder="Выберите направление"
                          _focus={{
                            borderColor: "blue.500",
                            boxShadow: "0 0 0 1px #3182CE"
                          }}
                          value={localFormData?.directionId || ''}
                          onChange={(e) => setLocalFormData({ ...localFormData, directionId: e.currentTarget.value })}
                        >
                          {directions.map((direction) => (
                            <option key={direction.id} value={direction.id}>{direction.name}</option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                  </GridItem>

                  <GridItem>
                    <Field.Root>
                      <Field.Label display="flex" alignItems="center" gap={2}>
                        <Icon as={MdPerson} color="blue.500" boxSize="16px" />
                        Возраст учащихся
                      </Field.Label>
                      <Input
                        name="agesOfChildrens"
                        placeholder="Например: 8-15 лет"
                        onChange={handleChange}
                        value={localFormData?.agesOfChildrens || ""}
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182CE"
                        }}
                      />
                    </Field.Root>
                  </GridItem>

                  <GridItem>
                    <Field.Root>
                      <Field.Label display="flex" alignItems="center" gap={2}>
                        <Icon as={MdCalendarToday} color="blue.500" boxSize="16px" />
                        Срок реализации
                      </Field.Label>
                      <Input
                        name="duration"
                        placeholder="Например: 3 года"
                        onChange={handleChange}
                        value={localFormData?.duration || ""}
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182CE"
                        }}
                      />
                    </Field.Root>
                  </GridItem>
                </Grid>
              </VStack>
            </Box>
          </VStack>
        </Container>

        <VersionsTable programId={id} onChangeCreatePage={handleChangeCreatePage} />

        <ActionBar.Root open={openAccordion} placement={"bottom"}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.100"
              p={2}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                colorPalette="blue"
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "md",
                  bg: "blue.50"
                }}
                transition="all 0.2s"
              >
                <HStack gap={2}>
                  <Icon as={MdSave} boxSize="16px" />
                  <Text>Сохранить информацию</Text>
                </HStack>
              </Button>
              
              <ActionBar.Separator />

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  {selectedVersion ? (
                    <Button
                      variant="outline"
                      size="sm"
                      bgGradient="linear(to-r, #3182CE, #2C5282)"
                      transition="all 0.2s"
                      colorPalette="gray"
                    >
                      <HStack gap={2}>
                        <Icon as={MdSend} boxSize="16px" />
                        <Text>Отправить на проверку</Text>
                      </HStack>
                    </Button>
                  ) : (
                    <Tooltip content="Выберите строку с версией для проверки!" contentProps={{ css: { "--tooltip-bg": "blue" } }}>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        colorPalette="gray"
                        opacity={0.5}
                      >
                        <HStack gap={2}>
                          <Icon as={MdSend} boxSize="16px" />
                          <Text>Отправить на проверку</Text>
                        </HStack>
                      </Button>
                    </Tooltip>
                  )}
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content
                      bg="white"
                      borderRadius="2xl"
                      boxShadow="2xl"
                      maxW="450px"
                      w="full"
                    >
                      <Dialog.Header borderBottom="1px solid" borderColor="gray.100" pb={3}>
                        <HStack gap={3}>
                          <Box
                            as="div"
                            w="32px"
                            h="32px"
                            bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
                            borderRadius="8px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon as={MdSend} boxSize="16px" color="white" />
                          </Box>
                          <Dialog.Title fontSize="xl" fontWeight="600" color="gray.800">
                            Отправка программы на проверку
                          </Dialog.Title>
                        </HStack>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton
                            size="sm"
                            _hover={{ bg: "gray.100", transform: "rotate(90deg)" }}
                            transition="all 0.2s"
                          />
                        </Dialog.CloseTrigger>
                      </Dialog.Header>

                      <Dialog.Body pb={4} pt={4}>
                        <VStack align="stretch" gap={4}>
                          <Text fontSize="14px" color="gray.600">
                            Вы уверены, что хотите отправить программу на проверку?
                          </Text>
                          <Box
                            p={3}
                            bg="blue.50"
                            borderRadius="lg"
                            border="1px solid"
                            borderColor="blue.200"
                          >
                            <HStack gap={2}>
                              <Icon as={MdInfo} color="blue.500" boxSize="16px" />
                              <Text fontSize="13px" color="blue.700">
                                На проверку будет отправлена выбранная версия программы.
                              </Text>
                            </HStack>
                          </Box>
                          <Box
                            p={3}
                            bg="yellow.50"
                            borderRadius="lg"
                            border="1px solid"
                            borderColor="yellow.200"
                          >
                            <HStack gap={2}>
                              <Icon as={MdWarning} color="yellow.600" boxSize="16px" />
                              <Text fontSize="13px" color="yellow.700">
                                После отправки данные нельзя будет изменить.
                              </Text>
                            </HStack>
                          </Box>
                        </VStack>
                      </Dialog.Body>

                      <Dialog.Footer
                        borderTop="1px solid"
                        borderColor="gray.100"
                        pt={4}
                        gap={3}
                      >
                        <Dialog.ActionTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            colorPalette="gray"
                            onClick={handleSendToReview}
                            _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
                          >
                            <HStack gap={2}>
                              <Icon as={MdCheck} />
                              <Text>Подтвердить</Text>
                            </HStack>
                          </Button>
                        </Dialog.ActionTrigger>
                        <Dialog.ActionTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            colorPalette="red"
                            _hover={{ bg: "red.50", transform: "translateY(-1px)" }}
                          >
                            <HStack gap={2}>
                              <Icon as={MdClose} />
                              <Text>Отмена</Text>
                            </HStack>
                          </Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  {program?.programStatus == ProgramStatuses.Created && (
                    <Button
                      variant="outline"
                      size="sm"
                      colorPalette="red"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "md",
                        bg: "red.50"
                      }}
                      transition="all 0.2s"
                    >
                      <HStack gap={2}>
                        <Icon as={MdDelete} boxSize="16px" />
                        <Text>Удалить программу</Text>
                      </HStack>
                    </Button>
                  )}
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content
                      bg="white"
                      borderRadius="2xl"
                      boxShadow="2xl"
                      maxW="450px"
                      w="full"
                    >
                      <Dialog.Header borderBottom="1px solid" borderColor="gray.100" pb={3}>
                        <HStack gap={3}>
                          <Box
                            as="div"
                            w="32px"
                            h="32px"
                            bg="linear-gradient(135deg, #e53e3e 0%, #c53030 100%)"
                            borderRadius="8px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon as={MdDelete} boxSize="16px" color="white" />
                          </Box>
                          <Dialog.Title fontSize="xl" fontWeight="600" color="gray.800">
                            Удаление программы
                          </Dialog.Title>
                        </HStack>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton
                            size="sm"
                            _hover={{ bg: "gray.100", transform: "rotate(90deg)" }}
                            transition="all 0.2s"
                          />
                        </Dialog.CloseTrigger>
                      </Dialog.Header>

                      <Dialog.Body pb={4} pt={4}>
                        <VStack align="stretch" gap={4}>
                          <Text fontSize="14px" color="gray.600">
                            Вы уверены, что хотите удалить программу?
                          </Text>
                          <Box
                            p={3}
                            bg="red.50"
                            borderRadius="lg"
                            border="1px solid"
                            borderColor="red.200"
                          >
                            <HStack gap={2}>
                              <Icon as={MdWarning} color="red.500" boxSize="16px" />
                              <Text fontSize="13px" color="red.700">
                                Вся информация, включая версии, будет удалена без возможности восстановления.
                              </Text>
                            </HStack>
                          </Box>
                        </VStack>
                      </Dialog.Body>

                      <Dialog.Footer
                        borderTop="1px solid"
                        borderColor="gray.100"
                        pt={4}
                        gap={3}
                      >
                        <Dialog.ActionTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            colorPalette="red"
                            onClick={handleDelete}
                            _hover={{ bg: "red.50", transform: "translateY(-1px)" }}
                          >
                            <HStack gap={2}>
                              <Icon as={MdDelete} />
                              <Text>Удалить</Text>
                            </HStack>
                          </Button>
                        </Dialog.ActionTrigger>
                        <Dialog.ActionTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            colorPalette="gray"
                            _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
                          >
                            <HStack gap={2}>
                              <Icon as={MdClose} />
                              <Text>Отмена</Text>
                            </HStack>
                          </Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
        </ActionBar.Root>
      </Box>
    </>
  )
}

export default EduProgram