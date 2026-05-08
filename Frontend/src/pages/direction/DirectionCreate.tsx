import { Button, Dialog, Field, Input, Portal, Stack, CloseButton, HStack, Icon, Box, Text } from "@chakra-ui/react"
import { useState } from "react"
import { type CreateDirectionRequest } from "@/api/models";
import { MdSave, MdInfo, MdClose } from "react-icons/md";
import { z } from 'zod'
import { useDirectionsStore } from "@/stores/DirectionsStore";

interface DirectionInvalidFields {
  name: boolean,
}

interface DirectionCreateProps {
  open: boolean  
  onClose: () => void
}

const userSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
})

const DirectionCreate = ({ open, onClose}: DirectionCreateProps) => {
  const { addItem } = useDirectionsStore()
  const [formData, setFormData] = useState<CreateDirectionRequest>({name: "", description: ""})
  const [invalidFields, setInvalidFields] = useState<DirectionInvalidFields>({name: false})

  const handleSave = async() => {
    try {
      userSchema.parse(formData)
      setInvalidFields({ name: false})
      const isSuccess = await addItem(formData)
      if (isSuccess) {
        onClose()
      }
    } 
    catch (error) 
    {
      if (error instanceof z.ZodError) {
        const newErrors = { name: false}
        error.issues.forEach(issue => {
          const field = issue.path[0] as keyof DirectionInvalidFields
          if (field in newErrors) {
            newErrors[field] = true
          }
        })
        setInvalidFields(newErrors)
      }
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
                  Новое направление
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
                <Field.Root invalid={invalidFields["name"]}>
                  <Field.Label display="flex" alignItems="center" gap={2}>
                    <Icon as={MdInfo} color="blue.500" boxSize="14px" />
                    Название
                  </Field.Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => {setFormData({ ...formData, name: e.target.value }); setInvalidFields({...invalidFields, name: false})}}
                    placeholder="Введите название"
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
                    value={formData.description || ""}
                    onChange={(e) => {setFormData({ ...formData, description: e.target.value });}}
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

export default DirectionCreate