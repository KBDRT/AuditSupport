import {  Dialog, Portal, CloseButton, HStack, Text, VStack, Box, Icon, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { type ShortCheckErrorDTO } from "@/api/models";
import { GetErrorsForVersion } from "@/services/ProgramService";
import { MdCheckCircle, MdClose, MdContentCopy, MdError, MdInfo } from "react-icons/md";
import PageLoading from "@/components/common/PageLoading";
import { ShowToast } from "@/components/common/Alert";

interface VersionCheckInfoProps {
  checkId: string
  onClose: () => void
}

const VersionCheckInfo = ({ checkId, onClose}: VersionCheckInfoProps) => {
  const [formData, setFormData] = useState<ShortCheckErrorDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
 
  useEffect(() => {
    const loadErrors = async () => {
      if (checkId) {
        setLoading(true)
        const errors = await GetErrorsForVersion(checkId)
        if (errors.length > 0)
        {
          setFormData(errors)
        }
        setLoading(false)
      }
    };
    loadErrors();
  }, [checkId]);



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
            maxW="600px"
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
                  Результат технической проверки
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

              {formData.length === 0 ? (
                <VStack py={8} gap={3}>
                  <Icon as={MdCheckCircle} boxSize="48px" color="green.500" />
                  <Text fontSize="lg" fontWeight="500" color="gray.700">
                    Ошибок не найдено
                  </Text>
                  <Text fontSize="14px" color="gray.500">
                    Техническая проверка пройдена успешно
                  </Text>
                </VStack>
              ) : (
                <VStack align="stretch" gap={4}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="14px" fontWeight="600" color="gray.500">
                      Найдено ошибок: {formData.length}
                    </Text>
                    {/* <Badge colorPalette="red" borderRadius="full" px={3}>
                      Требуется исправление
                    </Badge> */}
                  </HStack>
                  
                  {formData.map((error, index) => (
                    <Box
                      key={index}
                      p={2}
                      bg="red.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="red.200"
                      _hover={{
                        borderColor: "red.300",
                        boxShadow: "sm"
                      }}
                      transition="all 0.2s"
                    >
                      <VStack align="stretch" gap={3}>
                        <HStack gap={2}>
                          <Icon as={MdError} color="red.500" boxSize="20px" />
                          <Text fontWeight="600" color="red.700" fontSize="14px">
                            {error.message}
                          </Text>
                        </HStack>
                        
                        {error.rule && (
                          <HStack gap={2} pl={1}>
                            <Text fontSize="12px" color="gray.500" fontWeight="500">
                              Правило:
                            </Text>
                            <Box flex="1">
                              <Text fontWeight="bold" colorPalette="blue" fontSize="12px" borderRadius="full" whiteSpace="normal" wordBreak="break-word" display="inline-block">
                                {error.rule}
                              </Text>
                            </Box>
                          </HStack>
                        )}
                        
                        {error.context && error.context.length > 0 && (
                    

                            <HStack gap={2} pl="1">
                            <Text fontSize="12px" color="gray.500" fontWeight="500">
                              Контекст:
                            </Text>
                                 <Box
                            p={1}
                            bg="white"
                            borderRadius="md"
                            border="1px solid"
                            borderColor="red.100"
                   
                          >
                              <Text fontSize="12px"  whiteSpace="normal">
                                {error.context}
                              </Text>
                            </Box>
                          </HStack>

                        )}
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              )}
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

              {formData.length > 0 && (
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
              )}

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

export default VersionCheckInfo