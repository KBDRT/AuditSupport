import { Button, Dialog, Field, Input, Portal, Stack, CloseButton} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { type CreateYearRequest } from "@/api/models";
import { MdSave  } from "react-icons/md";
import { z } from 'zod'
import { useYearsStore } from "@/stores/YearsStore";

interface YearInvalidFields {
  startYear: boolean,
}

interface YearCreateProps {
  open: boolean  
  onClose: () => void
}

const yearSchema = z.object({
  startYear: z.number().min(2020, 'Год обязателен'),
})


const YearCreate = ({ open, onClose}: YearCreateProps) => {
  const { addItem } = useYearsStore()
  const [formData, setFormData] = useState<CreateYearRequest>({
                                                               description: ""})
  const [invalidFields, setInvalidFields] = useState<YearInvalidFields>({startYear: false})

  useEffect(() => {
  }, [])

  const handleSave = async() => {
    try {
      yearSchema.parse(formData)
      
      setInvalidFields({ startYear: false})
      
      const isSuccess = await addItem(formData)
      if (isSuccess) {
        onClose()
      }
    } 
    catch (error) 
    {
      if (error instanceof z.ZodError) {
        const newErrors = { startYear: false}
        
        error.issues.forEach(issue => {
          const field = issue.path[0] as keyof YearInvalidFields
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
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Новый учебный год</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["startYear"]}>
                  <Field.Label>Начало уч. года</Field.Label>
                  <Input
                    maxLength={4}
                    minLength={4}
                    value={formData.startYear || ""}
                    onChange={(e) => {setFormData({ ...formData, startYear: Number(e.target.value) }); setInvalidFields({...invalidFields, name: false})}}
                    placeholder="Введите начало года"
                  />
                  <Field.ErrorText>Некорректный формат</Field.ErrorText>
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Описание</Field.Label>
                  <Input
                    value={formData.description || ""}
                    onChange={(e) => {setFormData({ ...formData, description: e.target.value }); }}
                    placeholder="Введите описание"
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

export default YearCreate

