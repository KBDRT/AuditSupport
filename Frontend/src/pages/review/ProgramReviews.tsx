import {  Dialog, Portal, CloseButton, HStack, Text, VStack, Box, Icon, Button, Table } from "@chakra-ui/react"
import { useEffect } from "react"
import { MdAdd,  MdClose,  MdInfo, MdVisibility } from "react-icons/md";
import PageLoading from "@/components/common/PageLoading";
import {   useNavigate } from "react-router-dom";
import { useReviewsStore } from "@/stores/ReviewsStore";
import { useAuthStore } from "@/stores/AuthStore";
import { FormatDateTime } from "@/utils/TextUtils";
import { ProgramStatuses, type EduProgramShortDTO } from "@/api/models";

interface ProgramReviewsProps {
  program: EduProgramShortDTO
  onClose: () => void
}

const ProgramReviews = ({ program, onClose}: ProgramReviewsProps) => {
  const navigate = useNavigate()
  const {items : reviews, fetch, loading, addItem} = useReviewsStore()
  const {user} = useAuthStore()

 
  useEffect(() => {
    const load = async () => {
      await fetch(program?.id || "")
    };
    load();
  }, [program?.id]);


  
  const handleAddReview = async() => {
    const id = await addItem({auditorId: user?.userId, programId: program?.id})
    if (id.length > 0)
    {
      onClose()
      const reviewId = id
      navigate(`/Review/${reviewId}`)
    }
  };



  return (
    <Dialog.Root 
      size={"lg"}
      open={true}
      placement="center"
      onOpenChange={(details) => {
        if (!details.open) {
          onClose()
        }
      }}
    >
      <Portal>      
        <Dialog.Backdrop />  
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            borderRadius="2xl"
            boxShadow="2xl"
            maxW="800px"
            w="full"
          >
            <Dialog.Header borderBottom="1px solid" borderColor="gray.100" py={4} px={6}>
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
                <Dialog.Title fontSize="xl" fontWeight="600" color="gray.800">
                  Проверки учебной программы
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


            {loading ? (<Dialog.Body maxH="100px" pb={4} pt={4} px={6}><PageLoading /></Dialog.Body>) : 
            <Dialog.Body pb={4} pt={4} px={6} maxH="500px" overflowY="auto">

                <VStack align="stretch">
                  <Table.Root size="sm" interactive variant="outline" w="100%" borderWidth="0" showColumnBorder stickyHeader>
                  <Table.Header>
                    <Table.Row bg="gray.50">
                      {/* <Table.ColumnHeader w="60px" textAlign="center">№ п/п</Table.ColumnHeader> */}
                      <Table.ColumnHeader minW="100px">Дата и время создания</Table.ColumnHeader>
                      <Table.ColumnHeader minW="250px" textAlign="center">Аудитор</Table.ColumnHeader>
                      <Table.ColumnHeader minW="100px" textAlign="center">Статус проверки</Table.ColumnHeader>
                      <Table.ColumnHeader minW="100px" textAlign="center">Результат проверки</Table.ColumnHeader>
                      <Table.ColumnHeader minW="100px"  textAlign="center">Действие</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
    

                  <Table.Body>
                    


                  {reviews.map((review) => (
                <Table.Row 
                  // bg={selectedVersion?.id === version.id ? "blue.100" : undefined}
                  _hover={{ bg: "gray.50" }} 
                  // style={{ cursor: "pointer" }} 
                  // transition="all 0.2s" 
                  key={review.id}>
                  {/* <Table.Cell textAlign="center" fontWeight="500">{version.}</Table.Cell> */}
                  <Table.Cell minW="100px">{FormatDateTime(review.createdDate || "")}</Table.Cell>
                  <Table.Cell minW="250px">{review.auditor}</Table.Cell>   
                  <Table.Cell minW="100px">{review.isFinished ? "Завершена" : "В работе"}</Table.Cell>
                  <Table.Cell minW="100px">{review.isSuccess ? "Замечаний нет" : "Есть замечания"}</Table.Cell>

                  <Table.Cell minW="100px">
                       <Button
                          variant="ghost"
                          size="xs"
                          colorPalette="gray"
                          onClick={() => {  navigate(`/Review/${review.id}`) }}
                          _hover={{ bg: "gray.100" }}
                        >
                          <HStack gap={1}>
                            <Icon as={MdVisibility} boxSize="14px" />
                            <Text fontSize="12px">Перейти</Text>
                          </HStack>
                        </Button>
                  </Table.Cell>


                  {/* <Table.Cell color="gray.600">{version.changes || "—"}</Table.Cell>
                  <Table.Cell>
                    <HStack gap={2} justify="center">
                      <Button
                        variant="ghost"
                        size="xs"
                        colorPalette="blue"
                        // onClick={() => handleDownloadFile(version.id || "")}
                      >
                        <HStack gap={1}>
                          <Icon as={MdDownload} boxSize="14px" />
                          <Text fontSize="12px">Скачать</Text>
                        </HStack>
                      </Button>
                      <Button variant="ghost" size="xs" colorPalette="gray">
                        <HStack gap={1}>
                          <Icon as={MdPreview} boxSize="14px" />
                          <Text fontSize="12px">Предпросмотр</Text>
                        </HStack>
                      </Button>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={2} justify="center">
                      <Badge colorPalette={version.isSuccessCheck ? "green" : "red"} borderRadius="full" px={3}>{version.isSuccessCheck ? "Пройдена" : "Ошибки"}</Badge>
                      <Button variant="ghost" size="xs" colorPalette="gray">
                        <HStack gap={1}>
                          <Icon as={MdVisibility} boxSize="14px" />
                          <Text fontSize="12px">Результат</Text>
                        </HStack>
                      </Button>
                    </HStack>
                  </Table.Cell> */}
                </Table.Row>

                  ))}

                </Table.Body> 
                </Table.Root>
                </VStack>
              
            </Dialog.Body>
            }

            <Dialog.Footer 
              borderTop="1px solid" 
              borderColor="gray.100" 
              pt={4}
              pb={4}
              px={6}
              gap={3}
              justifyContent="flex-end"
            >

              {/* {formData.length > 0 && (
                <Button
                  colorPalette="blue"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      formData.map(e => {
                      let message = ``
                      
                      if (e.ruleType === 1) {
                        message = `${e.message}: ${e.rule}, Контекст: ${e.context}`
                      }
                      
                      if (e.ruleType === 0) {
                        message = `${e.message}: ${e.rule}`
                      }
                      
                      return message
                      }).join('\n')
                    )

                    ShowToast("Успешно!", "Скопировано в буфер обмена", "success")
                  }}
                >
                  <HStack gap={2}>
                    <Icon as={MdContentCopy} />
                    <Text>Копировать ошибки</Text>
                  </HStack>
                </Button>
              )} */}

                  <Button
                variant="ghost"
                colorPalette="blue"
                size="sm"
                onClick={handleAddReview}
                disabled={program?.programStatus != ProgramStatuses.ReadyToCheck}
                _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
              >
                <HStack gap={2}>
                  <Icon as={MdAdd} />
                  <Text>Новая</Text>
                </HStack>
              </Button>


              <Button
                variant="ghost"
                colorPalette="gray"
                size="sm"
                onClick={onClose}
                _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
              >
                <HStack gap={2}>
                  <Icon as={MdClose} />
                  <Text>Закрыть</Text>
                </HStack>
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ProgramReviews