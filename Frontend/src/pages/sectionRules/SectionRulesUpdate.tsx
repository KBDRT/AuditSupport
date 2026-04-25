import { Button, Dialog, Field, Input, Portal, Stack,  CloseButton, Text, Center, Select, Box, IconButton, Table, Editable, HStack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { RuleSectionType, type UpdateSectionRuleRequest } from "@/api/models";
import { MdSave, MdDelete, MdAdd  } from "react-icons/md";
import { useSectionRulesStore } from "@/stores/SectionRules";
import { SECTION_RULE_TYPE_COLLECTION } from "@/constants/common";
import { LuTrash2 } from "react-icons/lu";
import type { SectionStructure } from "./SectionRulesCreate";

interface SectionRulesInvalidFields {
  sectionName: boolean,
}

interface SectionRulesUpdateProps {
  open: boolean  
  item: UpdateSectionRuleRequest
  onClose: () => void
}


const SectionRulesUpdate = ({ open, item, onClose}: SectionRulesUpdateProps) => {
  const [formData, setFormData] = useState<UpdateSectionRuleRequest>(item)
  const { deleteItem, updateItem} = useSectionRulesStore()
  const [invalidFields, setInvalidFields] = useState<SectionRulesInvalidFields>({sectionName: false})

  const [structure, setStructure] = useState<SectionStructure[]>([]);

  useEffect(() => {
    setFormData(item)
    if (formData.structure && formData.structure.length > 0) {
      const convertedStructure = formData.structure.map((item, index) => ({
        id: Date.now(),
        value: item.name || ""
      }))
    setStructure(convertedStructure)
    } else {
      setStructure([])
  }
  }, [item])

  const handleValueChange = (id: number, newValue: string) => {
    const updatedStructure = structure.map(item => 
      item.id === id ? { ...item, value: newValue } : item
    )
    setStructure(updatedStructure)
  }

  const handleAddStructure = () => {
    setStructure([...structure, {id: Date.now(), value: ""}])
  }

  const handleDeleteStructure = (id: number) => {
   const newStructure = structure.filter(item => item.id !== id)
   setStructure(newStructure)
  }


  const handleSave = async() => {
    if (formData.sectionName?.length == 0)
    {
      setInvalidFields({...invalidFields, sectionName: true})
    }
    else
    {
       const updatedFormData = {
            ...formData,
            structure: structure.map(item => ({ name: item.value })) 
        }
      const isSuccess = await updateItem(formData.ruleId ?? "", updatedFormData)  
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
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Редактирование раздела</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["sectionName"]}>
                  <Field.Label>Термин</Field.Label>
                  <Input
                    value={formData.sectionName || ""}
                    onChange={(e) => {setFormData({ ...formData, sectionName: e.target.value}); setInvalidFields({...invalidFields, sectionName: false})}}
                    placeholder="Введите термин"
                  />
                  <Field.ErrorText>Поля является обязательным</Field.ErrorText>
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Описание</Field.Label>
                  <Input
                    value={formData.commentary || ""}
                    onChange={(e) => {setFormData({ ...formData, commentary: e.target.value})}}
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
                {formData.type != RuleSectionType.Text && 
                <Box mt={2}>
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
                                  colorScheme="red"
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
              <Center>
              <Button colorPalette="green" size="sm" onClick={handleSave} variant="ghost">
                <MdSave />Сохранить
              </Button>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button colorPalette="red" size="sm" variant="ghost">
                    <MdDelete /> Удалить
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Удаление</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text>
                          Вы уверены, что хотите удалить раздел:
                          <Text as="span" fontWeight="bold" color="black.600" my={2}>
                            {` ${item.sectionName} `}
                          </Text>
                          ?
                        </Text>
                  
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button colorPalette="green" size="sm" onClick={handleDelete}>Подтвердить</Button>
                        </Dialog.ActionTrigger>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline" colorPalette="red" size="sm">Отмена</Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>

            </Center>
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

export default SectionRulesUpdate

