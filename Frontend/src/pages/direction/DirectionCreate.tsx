import { Button, Dialog, Field, Input, Portal, Stack, CloseButton} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { type CreateDirectionRequest } from "@/api/models";
import { MdSave  } from "react-icons/md";
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
  const [formData, setFormData] = useState<CreateDirectionRequest>({name: "",
                                                                    description: ""})
  const [invalidFields, setInvalidFields] = useState<DirectionInvalidFields>({name: false})

  useEffect(() => {
  }, [])

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
              <Dialog.Title>Новая направленность</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["name"]}>
                  <Field.Label>Название</Field.Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => {setFormData({ ...formData, name: e.target.value }); setInvalidFields({...invalidFields, name: false})}}
                    placeholder="Введите название"
                  />
                  <Field.ErrorText>Поле является обязательным.</Field.ErrorText>
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

export default DirectionCreate

