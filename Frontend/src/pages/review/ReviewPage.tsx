import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Field,
  HStack,
  Input,
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
  Table,
  Checkbox,
} from "@chakra-ui/react"

import {
  MdSave,
  MdSend,
  MdWarning,
  MdCheck,
  MdClose,
  MdDelete,
  MdDownload,
  MdPreview,
  MdVisibility,
  MdPerson,
  MdEmail,
  MdCategory,
  MdCalendarToday,
  MdInfo,
  MdWork,
  MdFlag
} from "react-icons/md"

import { useEffect, useState } from "react";
import { FormatDateTime, GetStatusTypeName } from './../../utils/TextUtils';
import { useDirectionsStore } from "@/stores/DirectionsStore";
import PageLoading from "@/components/common/PageLoading";
import { useProgramStore } from "@/stores/ProgramStore";
import ReviewEditor from "./ReviewEditor";
import { useReviewStore } from "@/stores/ReviewStore";
import VersionCheckInfo from "../program/VersionCheckInfo";
import PreviewProgramFile from "../program/PreviewProgramFile";
import { FixDialog } from "@/utils/DialogFix";
import type { GetReviewResponseDTO } from "@/api/models/getReviewResponseDTO";

const DialogName = {
  None: 0,
  CreateVersion: 1,
  VersionCheckInfo: 2,
  PreviewVersionFile: 3,
} as const;

type DialogName = typeof DialogName[keyof typeof DialogName];

const ReviewPage = () => {
  const { reviewId } = useParams();
  const { fetch, items: directions } = useDirectionsStore()
  const { fetchReview, review, setPreSave, loading, setEndCheck } = useReviewStore()
  const [openAccordion, setOpenAccordion] = useState<boolean>(true)
  const programFromStore = reviewId ? review : undefined
  const [localFormData, setLocalFormData] = useState<GetReviewResponseDTO | undefined>()
  const navigate = useNavigate();
  const { downloadVersionFile } = useProgramStore()
  const [isSuccessCheck, setIsSuccessCheck] = useState<boolean>(false)

  const [openedDialog, setOpenedDialog] = useState<DialogName>(DialogName.None)

  const handleCloseDialog = () => {
    setOpenAccordion(true)
    setOpenedDialog(DialogName.None);
    FixDialog()
  }

  useEffect(() => {
    if (programFromStore) {
      setLocalFormData(programFromStore)
    }
  }, [programFromStore?.id]) 

  useEffect(() => {
    const loadProgram = async () => {
      if (reviewId) {
        await fetchReview(reviewId)
      }
      fetch()
    };
    loadProgram();
  }, [reviewId]);

  const handleSave = async () => {
    if (localFormData) {
      setPreSave()
    }
  }

  
  const handleEndCheck = async () => {
    if (localFormData) {
      setEndCheck(isSuccessCheck)
    }
  }

  const handleDownloadFile = async (id: string) => {
    await downloadVersionFile(id)
  }

  const handleDelete = async() => {}

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <PageLoading />
      </Box>
    )
  }

  return (
    <>
      <Box bg="gray.50" minH="100vh">
        <Container maxW="container.lg">
          <VStack align="stretch" gap={6}>
            <Box>
              <HStack gap={3} mb={2}>
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
              </HStack>

              <Box
                bg="white"
                borderRadius="2xl"
                boxShadow="sm"
                p={4}
                _hover={{ boxShadow: "md" }}
                transition="all 0.3s ease"
              >
                <VStack gap={5} align="stretch">
                  <Grid templateColumns="140px 1fr 1fr" gap={5}>
                    <GridItem>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdInfo} color="blue.500" boxSize="14px" />
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
                        >
                          {programFromStore?.program?.programStatus != undefined && GetStatusTypeName(programFromStore?.program?.programStatus)}
                        </Badge>
                      </Field.Root>
                    </GridItem>

                    <GridItem colSpan={2}>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdWork} color="blue.500" boxSize="14px" />
                          Название программы
                        </Field.Label>
                        <Input
                          name="name"
                          readOnly
                          size="sm"
                          fontSize="15px"
                          bg="gray.50"
                          value={localFormData?.program?.name || ""}
                        />
                      </Field.Root>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns="140px 1fr 1fr 1fr" gap={5}>
                    <GridItem>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdCalendarToday} color="blue.500" boxSize="14px" />
                          Учебный год
                        </Field.Label>
                        <Input
                          textAlign="center"
                          value={localFormData?.program?.year || ""}
                          readOnly
                          bg="gray.50"
                          size="sm"
                        />
                      </Field.Root>
                    </GridItem>

                    <GridItem>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdCategory} color="blue.500" boxSize="14px" />
                          Направление
                        </Field.Label>
                        <Input
                          value={localFormData?.program?.direction || ""}
                          readOnly
                          bg="gray.50"
                          size="sm"
                        />
                      </Field.Root>
                    </GridItem>

                    <GridItem>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdPerson} color="blue.500" boxSize="14px" />
                          Возраст
                        </Field.Label>
                        <Input
                          value={localFormData?.program?.agesOfChildrens || ""}
                          readOnly
                          bg="gray.50"
                          size="sm"
                        />
                      </Field.Root>
                    </GridItem>

                    <GridItem>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdCalendarToday} color="blue.500" boxSize="14px" />
                          Срок реализации
                        </Field.Label>
                        <Input
                          value={localFormData?.program?.duration || ""}
                          readOnly
                          bg="gray.50"
                          size="sm"
                        />
                      </Field.Root>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns="1fr 1fr" gap={5}>
                    <GridItem>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdPerson} color="blue.500" boxSize="14px" />
                          Педагог
                        </Field.Label>
                        <Input
                          readOnly
                          bg="gray.50"
                          size="sm"
                          value={localFormData?.program?.teacher || ""}
                        />
                      </Field.Root>
                    </GridItem>

                    <GridItem>
                      <Field.Root>
                        <Field.Label display="flex" alignItems="center" gap={2}>
                          <Icon as={MdEmail} color="blue.500" boxSize="14px" />
                          Email педагога
                        </Field.Label>
                        <Input
                          readOnly
                          bg="gray.50"
                          size="sm"
                          value={localFormData?.program?.email || ""}
                        />
                      </Field.Root>
                    </GridItem>
                  </Grid>
                </VStack>
              </Box>
            </Box>

            <Box>
              <HStack gap={3} mb={2}>
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
                  Программа
                </Text>
              </HStack>

              <Box
                bg="white"
                borderRadius="2xl"
                boxShadow="sm"
                p={4}
                overflow="hidden"
                _hover={{ boxShadow: "md" }}
                transition="all 0.3s ease"
              >
                <Table.Root size="sm" interactive variant="outline" w="100%" borderWidth="0" showColumnBorder>
                  <Table.Header>
                    <Table.Row bg="gray.50">
                      <Table.ColumnHeader w="150px">Дата и время создания</Table.ColumnHeader>
                      <Table.ColumnHeader>Комментарий</Table.ColumnHeader>
                      <Table.ColumnHeader w="200px" textAlign="center">Файл</Table.ColumnHeader>
                      <Table.ColumnHeader w="180px" textAlign="center">Статус тех. проверки</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row _hover={{ bg: "gray.50" }} transition="all 0.2s" key={review?.programVersion?.id}>
                      <Table.Cell>{FormatDateTime(review?.programVersion?.createdDate || "")}</Table.Cell>
                      <Table.Cell color="gray.600">{review?.programVersion?.changes || "—"}</Table.Cell>
                      <Table.Cell>
                        <HStack gap={2} justify="center">
                          <Button
                            variant="ghost"
                            size="xs"
                            colorPalette="blue"
                            onClick={() => handleDownloadFile(review?.programVersion?.id || "")}
                            _hover={{ bg: "blue.50", transform: "translateY(-1px)" }}
                          >
                            <HStack gap={1}>
                              <Icon as={MdDownload} boxSize="14px" />
                              <Text fontSize="12px">Скачать</Text>
                            </HStack>
                          </Button>
                          <Button
                            variant="ghost"
                            size="xs"
                            colorPalette="gray"
                            onClick={() => { setOpenAccordion(false); setOpenedDialog(DialogName.PreviewVersionFile) }}
                            _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
                          >
                            <HStack gap={1}>
                              <Icon as={MdPreview} boxSize="14px" />
                              <Text fontSize="12px">Предпросмотр</Text>
                            </HStack>
                          </Button>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell>
                        <HStack gap={2} justify="center">
                          <Badge colorPalette={review?.programVersion?.isSuccessCheck ? "green" : "red"} borderRadius="full" px={3}>
                            {review?.programVersion?.isSuccessCheck ? "Пройдена" : "Ошибки"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="xs"
                            colorPalette="gray"
                            onClick={() => { setOpenAccordion(false); setOpenedDialog(DialogName.VersionCheckInfo) }}
                            _hover={{ bg: "gray.100" }}
                          >
                            <HStack gap={1}>
                              <Icon as={MdVisibility} boxSize="14px" />
                              <Text fontSize="12px">Результат</Text>
                            </HStack>
                          </Button>
                        </HStack>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Box>
            </Box>

            <Box>
              <HStack gap={3} mb={2}>
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
                  Комментарий
                </Text>
              </HStack>

              <Box
                bg="white"
                borderRadius="2xl"
                boxShadow="sm"
                p={4}
                _hover={{ boxShadow: "md" }}
                transition="all 0.3s ease"
              >
                <ReviewEditor initialCommentary={review?.commentary ?? ""} />
              </Box>
            </Box>
          </VStack>
        </Container>

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
                    <Button
                      variant="outline"
                      size="sm"
                      colorPalette="green"
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "md",
                        bg: "green.50"
                      }}
                      transition="all 0.2s"
                    >
                      <HStack gap={2}>
                        <Icon as={MdFlag} boxSize="16px" />
                        <Text>Завершить проверку</Text>
                      </HStack>
                    </Button>
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
                              <Icon as={MdFlag} boxSize="16px" color="white" />
                            </Box>
                            <Dialog.Title fontSize="xl" fontWeight="600" color="gray.800">
                              Завершение проверки
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
                              Вы уверены, что хотите завершить проверку?
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
                                  После завершения проверки данные нельзя будет изменить.
                                </Text>
                              </HStack>
                            </Box>
                          </VStack>

                          <Checkbox.Root
                            mt="5"
                            checked={isSuccessCheck}
                            onCheckedChange={(e) => setIsSuccessCheck(!!e.checked)}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>Необходимо исправление</Checkbox.Label>
                          </Checkbox.Root>
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
                              onClick={handleEndCheck}
                              _hover={{ bg: "red.50", transform: "translateY(-1px)" }}
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

      {openedDialog == DialogName.VersionCheckInfo && (
        <VersionCheckInfo
          checkId={review?.programVersion?.techCheckId || ""}
          onClose={handleCloseDialog}
        />
      )}

      {openedDialog == DialogName.PreviewVersionFile && (
        <PreviewProgramFile  
          versionId={review?.programVersion?.id || ""}
          onClose={handleCloseDialog}
        />
      )}
    </>
  )
}

export default ReviewPage