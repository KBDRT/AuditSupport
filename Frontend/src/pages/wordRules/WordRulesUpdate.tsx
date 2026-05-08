import { Button, Dialog, Field, Input, Portal, Stack, CloseButton, Text, HStack, Icon, Box } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { UpdateWordRuleRequest } from "@/api/models";
import { MdSave, MdDelete, MdInfo, MdClose } from "react-icons/md";
import { useWordRulesStore } from "@/stores/WordRules";

interface WordRulesInvalidFields {
  word: boolean,
}

interface WordRulesUpdateProps {
  open: boolean  
  item: UpdateWordRuleRequest
  onClose: () => void
}

const WordRulesUpdate = ({ open, item, onClose}: WordRulesUpdateProps) => {
  const [formData, setFormData] = useState<UpdateWordRuleRequest>(item)
  const { deleteItem, updateItem} = useWordRulesStore()
  const [invalidFields, setInvalidFields] = useState<WordRulesInvalidFields>({word: false})

  useEffect(() => {
    setFormData(item)
  }, [item])

  const handleSave = async() => {
    if (formData.word?.length == 0)
    {
      setInvalidFields({...invalidFields, word: true})
    }
    else
    {
      const isSuccess = await updateItem(formData.ruleId ?? "", formData)  
      if (isSuccess)
      {
        onClose()       
      } 
    } 
  }

  const handleDelete = async() => {
    const isSuccess = await deleteItem(formData.ruleId ?? "")
    if (isSuccess)
    {
      onClose()       
    } 
  }

  return (
    <Dialog.Root 
      open={open}
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
            maxW="500px"
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
                  <Icon as={MdInfo} boxSize="16px" color="white" />
                </Box>
                <Dialog.Title fontSize="xl" fontWeight="600" color="gray.800">
                  Редактирование термина
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
              <Stack gap={4}>
                <Field.Root invalid={invalidFields["word"]}>
                  <Field.Label display="flex" alignItems="center" gap={2}>
                    <Icon as={MdInfo} color="blue.500" boxSize="14px" />
                    Термин
                  </Field.Label>
                  <Input
                    value={formData.word || ""}
                    onChange={(e) => {setFormData({ ...formData, word: e.target.value}); setInvalidFields({...invalidFields, word: false})}}
                    placeholder="Введите термин"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                  <Field.ErrorText>Поле обязательно</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label display="flex" alignItems="center" gap={2}>
                    <Icon as={MdInfo} color="blue.500" boxSize="14px" />
                    Описание
                  </Field.Label>
                  <Input
                    value={formData.commentary || ""}
                    onChange={(e) => {setFormData({ ...formData, commentary: e.target.value})}}
                    placeholder="Введите описание"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt={4} gap={3}>

              <Button
                colorPalette="gray"
                size="sm"
                variant="ghost"
                onClick={handleSave}
              >
                <HStack gap={2}>
                  <Icon as={MdSave} />
                  <Text>Сохранить</Text>
                </HStack>
              </Button>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button colorPalette="gray" size="sm" variant="ghost">
                    <HStack gap={2}>
                      <Icon as={MdDelete} />
                      <Text>Удалить</Text>
                    </HStack>
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content bg="white" borderRadius="2xl" boxShadow="2xl" maxW="450px" w="full">
                      <Dialog.Header borderBottom="1px solid" borderColor="gray.100">
                        <Dialog.Title fontWeight="600">Удаление</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text fontSize="14px" color="gray.600">
                          Вы уверены, что хотите удалить термин
                          <Text as="span" fontWeight="bold" color="red.600" display="block" mt={2}>
                            {item.word}
                          </Text>
                          ?
                        </Text>
                      </Dialog.Body>
                      <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt={4} gap={3}>
                        <Button
                          colorPalette="red"
                          size="sm"
                          variant="ghost"
                          onClick={handleDelete}
                        >
                          <HStack gap={2}>
                            <Icon as={MdDelete} />
                            <Text>Удалить</Text>
                          </HStack>
                        </Button>
                        <Dialog.ActionTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            colorPalette="gray"
                            _hover={{ bg: "gray.100" }}
                          >
                            Отмена
                          </Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>


               <Button
                variant="ghost"
                size="sm"
                colorPalette="gray"
                onClick={onClose}
                _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
              >
                <HStack gap={2}>
                  <Icon as={MdClose} />
                  <Text>Отмена</Text>
                </HStack>
              </Button>

            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default WordRulesUpdate