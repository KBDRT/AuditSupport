import { Button, Dialog, Field, Input, Portal, Stack, CloseButton, FileUpload, Icon, Box, Textarea, HStack, InputGroup, useFileUpload } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { type CreateVersionRequest } from "@/api/models";
import { MdSave, MdDescription } from "react-icons/md";
import { z } from 'zod'
import { LuFileUp } from "react-icons/lu";
import { useTeacherProgramsStore } from "@/stores/TeacherProgramsStore";

interface VersionInvalidFields {
  changes: boolean,
}

interface VersionCreateProps {
  programId: string
  open: boolean  
  onClose: () => void
}

const yearSchema = z.object({
  changes: z.string().min(1, 'Комментарий обязателен'),
})

const VersionCreate = ({ programId, open, onClose}: VersionCreateProps) => {
  const { addVersion } = useTeacherProgramsStore()
  const [formData, setFormData] = useState<CreateVersionRequest>({ changes: "", programId: programId })
  const [invalidFields, setInvalidFields] = useState<VersionInvalidFields>({ changes: false })
 
  useEffect(() => {
    if (!open) {
      setFormData({ changes: "" })
      setInvalidFields({ changes: false })
    }
  }, [open])

  const handleSave = async() => {
    try {
      yearSchema.parse(formData)
      
      setInvalidFields({ changes: false })
      

      const isSuccess = await addVersion({changes: formData?.changes, file: fileUpload.rejectedFiles[0].file, programId: formData?.programId})
      if (isSuccess) {
        onClose()
      }
      onClose()
    } 
    catch (error) 
    {
      if (error instanceof z.ZodError) {
        const newErrors = { changes: false }
        
        error.issues.forEach(issue => {
          const field = issue.path[0] as keyof VersionInvalidFields
          if (field in newErrors) {
            newErrors[field] = true
          }
        })
        
        setInvalidFields(newErrors)
      }
    }
  }

    const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 300000,
  })

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
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            borderRadius="2xl"
            boxShadow="2xl"
            maxW="500px"
            w="full"
          >
            <Dialog.Header borderBottom="1px solid" borderColor="gray.100" pb={2}>
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
                  <Icon as={MdDescription} boxSize="16px" color="white" />
                </Box>
                <Dialog.Title fontSize="xl" fontWeight="600" color="gray.800">
                  Новая версия программы
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
              <Stack gap={5}>
                <Field.Root invalid={invalidFields["changes"]}>
                  <Field.Label display="flex" alignItems="center" gap={2} mb={2}>
                    <Icon as={MdDescription} color="blue.500" boxSize="16px" />
                    Комментарий
                  </Field.Label>
                  <Textarea
                    value={formData.changes || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, changes: e.target.value })
                      setInvalidFields({ ...invalidFields, changes: false })
                    }}
                    placeholder="Введите комментарий к версии..."
                    rows={4}
                    resize="vertical"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                  <Field.ErrorText color="red.500" fontSize="12px">
                    Некорректный формат
                  </Field.ErrorText>
                </Field.Root>

                 <FileUpload.RootProvider value={fileUpload}>
                  <FileUpload.HiddenInput />
                  <FileUpload.Label>Загрузить файл</FileUpload.Label>
                  <InputGroup
                  
                    startElement={<LuFileUp />}
                    endElement={
                      <FileUpload.ClearTrigger asChild>
                        <CloseButton
                          me="-1"
                          size="xs"
                          variant="plain"
                          focusVisibleRing="inside"
                          focusRingWidth="2px"
                          pointerEvents="auto"
                        />
                      </FileUpload.ClearTrigger>
                    }
                  >
                    <Input asChild>
                      <FileUpload.Trigger>
                        Загрузить
                      {/* <FileUpload.FileText  lineClamp={1} /> */}
                      </FileUpload.Trigger>
                    </Input>
                  </InputGroup>
                </FileUpload.RootProvider>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer 
              borderTop="1px solid" 
              borderColor="gray.100" 
              pt={4}
              gap={3}
            >

              <Button colorPalette="green" size="sm" onClick={handleSave} variant="ghost">
                <MdSave />Сохранить
              </Button>
              {/* <Button
                variant="ghost"
                colorScheme="gray"
                size="sm"
                onClick={onClose}
                _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
              >
                <HStack gap={2}>
                  <Icon as={MdClose} />
                  <Text>Отмена</Text>
                </HStack>
              </Button>
              <Button
                bgGradient="linear(to-r, #3182CE, #2C5282)"
                color="white"
                size="sm"
                onClick={handleSave}
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
                  <Icon as={MdSave} />
                  <Text>Сохранить</Text>
                </HStack>
              </Button> */}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default VersionCreate