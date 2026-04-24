import { Button, Dialog, Field, Input, Portal, Stack,  CloseButton, Text, Center, Badge, HStack, Checkbox } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { UpdateYearRequest } from "@/api/models";
import { MdSave, MdDelete, MdNotifications  } from "react-icons/md";
import { useYearsStore } from "@/stores/YearsStore";
import { IoMdLock, IoMdUnlock } from "react-icons/io";

interface YearInvalidFields {
  name: boolean,
}

interface YearUpdateProps {
  open: boolean  
  item: UpdateYearRequest
  isOpened: boolean
  onClose: () => void
}

interface YearChangeStatus
{
  isOpened: boolean,
  sendNotifications: boolean
}


const YearUpdate = ({ open, item, isOpened, onClose}: YearUpdateProps) => {
  const [formData, setFormData] = useState<UpdateYearRequest>(item)
  const { deleteItem, updateItem, changeStatus, notificateUsers} = useYearsStore()
  const [changeStatusInfo, setChangeStatusInfo] = useState<YearChangeStatus>({isOpened: isOpened, sendNotifications: true})
  const [invalidFields, setInvalidFields] = useState<YearInvalidFields>({name: false})

  useEffect(() => {
    setFormData(item)
  }, [item])

  const handleSave = async() => {
    if (formData.startYear == 0)
    {
      setInvalidFields({...invalidFields, name: formData.startYear == 0})
    }
    else
    {
      const isSuccess = await updateItem(formData.yearId ?? "", formData)  
      if (isSuccess)
      {
        onClose()       
      } 
    } 
  }

  const handleDelete = async() => {
    const isSuccess = await deleteItem(formData.yearId ?? "")
    if (isSuccess)
    {
      onClose()       
    } 
  }

  const handleChangeStatus = async() => {
    const isSuccess = await changeStatus(formData.yearId ?? "", !changeStatusInfo.isOpened, changeStatusInfo.sendNotifications)
    if (isSuccess)
    {
      setChangeStatusInfo({...changeStatusInfo, isOpened: !changeStatusInfo.isOpened})
      // onClose()       
    } 
  }

  const handleNotificate = async() => {
    const isSuccess = await notificateUsers(formData.yearId ?? "")
    // if (isSuccess)
    // {
    //   onClose()       
    // } 
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
              <Dialog.Title>Редактирование учебного года</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal" invalid={invalidFields["name"]}>
                  <Field.Label>Начало года</Field.Label>
                  <Input
                    maxLength={4}
                    minLength={4}
                    value={formData.startYear || ""}
                    onChange={(e) => {setFormData({ ...formData, startYear: Number(e.target.value) }); setInvalidFields({...invalidFields, name: false})}}
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

                <Field.Root orientation="horizontal">
                  <Field.Label >Статус</Field.Label>
                  <HStack flex="1" justify="flex-start">
                  <Badge 
                    colorPalette={changeStatusInfo.isOpened ? "green" : "red"}
                    variant="solid"
                    borderRadius="full"
                    size="md"
                    px={4}
                    py={1}
                  >
                    {changeStatusInfo.isOpened ? 'Открыт' : 'Закрыт'}
                  </Badge>
                </HStack>
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
                <Button size="sm" variant="ghost">
                  {changeStatusInfo.isOpened ? <IoMdLock /> : <IoMdUnlock />} {changeStatusInfo.isOpened ? "Закрыть" : "Открыть"}
                </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Изменение статуса</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text>
                          Вы уверены, что хотите 
                          <Text as="span" fontWeight="bold" color="black.600" my={2}>
                            {changeStatusInfo.isOpened ? ` закрыть ` : " открыть "} 
                          </Text>
                          возможность загрузки дополнительных общеразвивающих программ для
                          <Text as="span" fontWeight="bold" color="black.600" my={2}>
                            {item.startYear ? ` ${item.startYear}/${item.startYear + 1} ` : "-"}
                          </Text>
                          учебного года? 
                        </Text>
                        
                        <Checkbox.Root
                          mt="5"
                          checked={changeStatusInfo.sendNotifications}
                          onCheckedChange={(e) => setChangeStatusInfo({...changeStatusInfo, sendNotifications: !!e.checked})}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>Уведомить сотрудников</Checkbox.Label>
                        </Checkbox.Root>

                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button colorPalette="green" size="sm" onClick={handleChangeStatus}>Подтвердить</Button>
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

              <Dialog.Root>
                <Dialog.Trigger asChild>
                <Button size="sm" variant="ghost" disabled={!changeStatusInfo.isOpened}>
                  <MdNotifications /> Уведомить
                </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Уведомление сотрудников</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text>
                          Вы уверены, что хотите уведомить сотрудников по почте об открытии учебного года
                           <Text as="span" fontWeight="bold" color="black.600" my={2}>
                            {item.startYear ? ` ${item.startYear}/${item.startYear + 1} ` : "-"}
                          </Text>
                          для загрузки дополнительных общеразвивающих программ? 
                        </Text>
                        
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button colorPalette="green" size="sm" onClick={handleNotificate}>Подтвердить</Button>
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
                          Вы уверены, что хотите удалить учебный год:
                          <Text as="span" fontWeight="bold" color="black.600" my={2}>
                            {item.startYear ? ` ${item.startYear}/${item.startYear + 1} ` : " - "}
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

export default YearUpdate

