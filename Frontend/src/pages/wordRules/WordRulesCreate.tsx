import { Button, Dialog, Field, Input, Portal, Stack, CloseButton} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { type CreateWordRuleRequest } from "@/api/models";
import { MdSave  } from "react-icons/md";
import { z } from 'zod'
import { useWordRulesStore } from "@/stores/WordRules";

interface WordRulesUpdateInvalidFields {
  word: boolean,
}

interface WordRulesCreateProps {
  open: boolean  
  onClose: () => void
}

const wordSchema = z.object({
  word: z.string().min(1),
})


const WordRulesCreate = ({ open, onClose}: WordRulesCreateProps) => {
  const { addItem } = useWordRulesStore()
  const [formData, setFormData] = useState<CreateWordRuleRequest>({word: "", commentary: ""})
  const [invalidFields, setInvalidFields] = useState<WordRulesUpdateInvalidFields>({word: false})

  useEffect(() => {
  }, [])

  const handleSave = async() => {
    try {
      wordSchema.parse(formData)
      
      setInvalidFields({ word: false})
      
      const isSuccess = await addItem(formData)
      if (isSuccess) {
        onClose()
      }
    } 
    catch (error) 
    {
      if (error instanceof z.ZodError) {
        const newErrors = { word: false}
        
        error.issues.forEach(issue => {
          const field = issue.path[0] as keyof WordRulesUpdateInvalidFields
          if (field in newErrors) {
            newErrors[field] = true
          }
        })
        
        setInvalidFields(newErrors)
      }
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
              <Dialog.Title>Новый термин</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["word"]}>
                  <Field.Label>Термин</Field.Label>
                  <Input
                    value={formData.word || ""}
                    onChange={(e) => {setFormData({ ...formData, word: e.target.value }); setInvalidFields({...invalidFields, word: false})}}
                    placeholder="Введите термин"
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

export default WordRulesCreate

