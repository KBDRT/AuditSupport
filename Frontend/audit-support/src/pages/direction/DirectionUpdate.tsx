import { Button, Dialog, Field, Input, Portal, Stack,  CloseButton, Text} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { UpdateDirectionRequest } from "@/api/models";
import { MdSave, MdDelete  } from "react-icons/md";
import { useDirectionsStore } from "@/stores/DirectionsStore";

interface DirectionInvalidFields {
  name: boolean,
}

interface DirectionUpdateProps {
  open: boolean  
  item: UpdateDirectionRequest
  onClose: () => void
}

const DirectionUpdate = ({ open, item, onClose}: DirectionUpdateProps) => {
  const [formData, setFormData] = useState<UpdateDirectionRequest>(item)
  const { deleteItem, updateItem} = useDirectionsStore()
  const [invalidFields, setInvalidFields] = useState<DirectionInvalidFields>({name: false})

  useEffect(() => {
    setFormData(item)
  }, [item])

  const handleSave = async() => {

    if (formData.name?.length == 0)
    {
      setInvalidFields({...invalidFields, name: formData.name?.length == 0})
    }
    else
    {
      console.log(formData)
      const isSuccess = await updateItem(formData.directionId ?? "", formData)  
      if (isSuccess)
      {
        onClose()       
      } 
    } 
  }

  const handleDelete = async() => {
    const isSuccess = await deleteItem(formData.directionId ?? "")
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
              <Dialog.Title>Редактирование направленности</Dialog.Title>
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
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Описание</Field.Label>
                  <Input
                    value={formData.description || ""}
                    onChange={(e) => {setFormData({ ...formData, description: e.target.value });}}
                    placeholder="Введите описание"
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
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
                          Вы уверены, что хотите удалить направленность
                          <Text as="span" fontWeight="bold" color="black.600" my={2}>
                          {` ${formData.name} `}
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

export default DirectionUpdate

