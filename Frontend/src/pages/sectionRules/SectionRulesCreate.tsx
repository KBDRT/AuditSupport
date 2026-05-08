import { Button, Dialog, Field, Input, Portal, Stack, CloseButton, Select, Box, Text, Center, Table, Editable, IconButton, HStack, Icon, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { RuleSectionType, type CreateSectionRuleRequest } from "@/api/models";
import { MdAdd, MdSave, MdInfo, MdClose } from "react-icons/md";
import { z } from 'zod'
import { useSectionRulesStore } from "@/stores/SectionRules";
import { SECTION_RULE_TYPE_COLLECTION } from "@/constants/common";
import { LuTrash2 } from "react-icons/lu";

interface SectionRulesUpdateInvalidFields {
  sectionName: boolean,
}

interface SectionRulesCreateProps {
  open: boolean  
  onClose: () => void
}

const sectionSchema = z.object({
  sectionName: z.string().min(1),
})

export interface SectionStructure
{
  id: number,
  value: string
}

const SectionRulesCreate = ({ open, onClose}: SectionRulesCreateProps) => {
  const { addItem } = useSectionRulesStore()
  const [formData, setFormData] = useState<CreateSectionRuleRequest>(
    {
      sectionName: "", 
      commentary: "", 
      type: RuleSectionType.NUMBER_0,
      structure: [] 
    })
  const [invalidFields, setInvalidFields] = useState<SectionRulesUpdateInvalidFields>({sectionName: false})
  const [structure, setStructure] = useState<SectionStructure[]>([]);

  const handleValueChange = (id: number, newValue: string) => {
    const updatedStructure = structure.map(item => 
      item.id === id ? { ...item, value: newValue } : item
    )
    setStructure(updatedStructure)
  }

  const handleSave = async() => {
    try {
      sectionSchema.parse(formData)
      setInvalidFields({ sectionName: false})
      const updatedFormData = {
        ...formData,
        structure: structure.map(item => ({ name: item.value })) 
      }
      const isSuccess = await addItem(updatedFormData)
      if (isSuccess) {
        setFormData(updatedFormData)
        onClose()
      }
    } 
    catch (error) 
    {
      if (error instanceof z.ZodError) {
        const newErrors = { sectionName: false}
        error.issues.forEach(issue => {
          const field = issue.path[0] as keyof SectionRulesUpdateInvalidFields
          if (field in newErrors) {
            newErrors[field] = true
          }
        })
        setInvalidFields(newErrors)
      }
    }
  }

  const handleAddStructure = () => {
    setStructure([...structure, {id: Date.now(), value: ""}])
  }

  const handleDeleteStructure = (id: number) => {
    const newStructure = structure.filter(item => item.id !== id)
    setStructure(newStructure)
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
            maxW="600px"
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
                  Новый раздел
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
                <Field.Root invalid={invalidFields["sectionName"]}>
                  <Field.Label display="flex" alignItems="center" gap={2}>
                    <Icon as={MdInfo} color="blue.500" boxSize="14px" />
                    Раздел
                  </Field.Label>
                  <Input
                    value={formData.sectionName || ""}
                    onChange={(e) => {setFormData({ ...formData, sectionName: e.target.value }); setInvalidFields({...invalidFields, sectionName: false})}}
                    placeholder="Введите название раздела"
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
                    onChange={(e) => {setFormData({ ...formData, commentary: e.target.value });}}
                    placeholder="Введите описание"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                </Field.Root>

                {/* <Field.Root>
                  <Field.Label display="flex" alignItems="center" gap={2}>
                    <Icon as={MdInfo} color="blue.500" boxSize="14px" />
                    Тип раздела
                  </Field.Label>
                  <Select.Root
                    collection={SECTION_RULE_TYPE_COLLECTION}
                    size="sm"
                    value={[formData.type?.toString() || ""]}
                    onValueChange={({ value }) => {
                      setFormData({ ...formData, type: Number(value[0]) as RuleSectionType })
                      setStructure([])
                    }}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Выберите тип" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {SECTION_RULE_TYPE_COLLECTION.items.map((type) => (
                            <Select.Item item={type} key={type.value}>
                              {type.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root> */}

                {formData.type != RuleSectionType.NUMBER_0 && (
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="500" color="gray.700">
                        Структура раздела
                      </Text>
                      <IconButton
                        variant="ghost"
                        size="xs"
                        colorPalette="blue"
                        onClick={handleAddStructure}
                        _hover={{ bg: "blue.50", transform: "translateY(-1px)" }}
                      >
                        <MdAdd />
                      </IconButton>
                    </HStack>
                    <Box
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="lg"
                      maxH="200px"
                      overflowY="auto"
                    >
                      <Table.Root size="sm">
                        <Table.Body>
                          {structure.map((item) => (
                            <Table.Row key={item.id} _hover={{ bg: "gray.50" }}>
                              <Table.Cell p={2}>
                                <HStack>
                                  <Editable.Root
                                    width="100%"
                                    value={item.value}
                                    onValueChange={(e) => handleValueChange(item.id, e.value)}
                                  >
                                    <Editable.Preview width="100%" py={1} px={2} />
                                    <Editable.Input
                                      _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "0 0 0 1px #3182CE"
                                      }}
                                    />
                                  </Editable.Root>
                                  <IconButton
                                    variant="ghost"
                                    size="sm"
                                    colorPalette="red"
                                    onClick={() => handleDeleteStructure(item.id)}
                                    _hover={{ bg: "red.50" }}
                                  >
                                    <LuTrash2 />
                                  </IconButton>
                                </HStack>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Box>
                  </Box>
                )}
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

export default SectionRulesCreate