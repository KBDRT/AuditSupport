import { Button, Dialog, Field, Input, Portal, Stack, CloseButton, Select, Box, Text, Center, Table, Editable, IconButton, HStack } from "@chakra-ui/react"
import { useState } from "react"
import { RuleSectionType, type CreateSectionRuleRequest } from "@/api/models";
import { MdAdd, MdSave  } from "react-icons/md";
import { z } from 'zod'
import { useSectionRulesStore } from "@/stores/SectionRules";
import { SECTION_RULE_TYPE_COLLECTION } from "@/constants/common";
import {  LuTrash2 } from "react-icons/lu";

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
    <>
    <Dialog.Root 
      open={open}
      placement="top"
      onOpenChange={(details) => {
        if (!details.open) {
          onClose()
        }
      }}
    >
      <Portal>  
        <Dialog.Backdrop />     
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Новый раздел</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["sectionName"]}>
                  <Field.Label>Раздел</Field.Label>
                  <Input
                    value={formData.sectionName || ""}
                    onChange={(e) => {setFormData({ ...formData, sectionName: e.target.value }); setInvalidFields({...invalidFields, sectionName: false})}}
                    placeholder="Введите название раздела"
                  />
                  <Field.ErrorText>Поля является обязательным</Field.ErrorText>
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Описание</Field.Label>
                  <Input
                    value={formData.commentary || ""}
                    onChange={(e) => {setFormData({ ...formData, commentary: e.target.value });}}
                  />
                </Field.Root>

                <Field.Root orientation="horizontal">
                  <Field.Label>Тип раздела</Field.Label>
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
                </Field.Root>
                {formData.type != RuleSectionType.NUMBER_0 && <Box mt={2}>
                  <Center>  
                    <Text fontWeight="semibold">Структура раздела
                        <IconButton variant="outline" size="xs" ml={2} onClick={handleAddStructure}>
                          <MdAdd />
                        </IconButton>
                    </Text>
                  </Center>
                  <Table.ScrollArea borderWidth="1px" maxH="150px" mt={2}>
                    <Table.Root size="sm">
                      <Table.Header>
                      </Table.Header>
                      <Table.Body>
                        {structure.map((item) => (
                          <Table.Row key={item.id}>
                            <Table.Cell p={0}>
                              <HStack>
                                <Editable.Root width="100%" 
                                    defaultValue="Click to edit" 
                                    value={item.value} 
                                    onValueChange={(e) => handleValueChange(item.id, e.value)}>
                                  <Editable.Preview  width="100%"/>
                                  <Editable.Input />
                                </Editable.Root>
                                <IconButton 
                                  variant="ghost" 
                                  size="sm"
                                  colorPalette="red"
                                  onClick={() => {handleDeleteStructure(item.id)}}>
                                  <LuTrash2 />
                                </IconButton>
                              </HStack>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Root>
                  </Table.ScrollArea>
                </Box>}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorPalette="green" size="sm" onClick={handleSave} variant="ghost">
                <MdSave />Сохранить
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    </>
  )
}

export default SectionRulesCreate

