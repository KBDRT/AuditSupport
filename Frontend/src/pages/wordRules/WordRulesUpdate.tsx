import { Button, Dialog, Field, Input, Portal, Stack,  CloseButton, Text, Center } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { UpdateWordRuleRequest } from "@/api/models";
import { MdSave, MdDelete  } from "react-icons/md";
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
              <Dialog.Title>Редактирование термина</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["word"]}>
                  <Field.Label>Термин</Field.Label>
                  <Input
                    value={formData.word || ""}
                    onChange={(e) => {setFormData({ ...formData, word: e.target.value}); setInvalidFields({...invalidFields, word: false})}}
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
                          Вы уверены, что хотите удалить термин:
                          <Text as="span" fontWeight="bold" color="black.600" my={2}>
                            {` ${item.word} `}
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

export default WordRulesUpdate

