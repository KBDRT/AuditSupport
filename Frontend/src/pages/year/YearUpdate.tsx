import { Button, Dialog, Field, Input, Portal, Stack, CloseButton, Text, HStack, Icon, Box, Badge, Checkbox } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { UpdateYearRequest } from "@/api/models";
import { MdSave, MdDelete, MdNotifications, MdInfo, MdClose, MdLock, MdLockOpen } from "react-icons/md";
import { useYearsStore } from "@/stores/YearsStore";

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
    } 
  }

  const handleNotificate = async() => {
    await notificateUsers(formData.yearId ?? "")
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
            maxW="510px"
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
                  Редактирование учебного года
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
                <Field.Root invalid={invalidFields["name"]}>
                  <Field.Label display="flex" alignItems="center" gap={2}>
                    <Icon as={MdInfo} color="blue.500" boxSize="14px" />
                    Начало года
                  </Field.Label>
                  <Input
                    maxLength={4}
                    minLength={4}
                    value={formData.startYear || ""}
                    onChange={(e) => {setFormData({ ...formData, startYear: Number(e.target.value) }); setInvalidFields({...invalidFields, name: false})}}
                    placeholder="Введите год"
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
                    value={formData.description || ""}
                    onChange={(e) => {setFormData({ ...formData, description: e.target.value });}}
                    placeholder="Введите описание"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label display="flex" alignItems="center" gap={2}>
                    <Icon as={MdInfo} color="blue.500" boxSize="14px" />
                    Статус
                  </Field.Label>
                  <HStack flex="1">
                    <Badge 
                      colorPalette={changeStatusInfo.isOpened ? "green" : "red"}
                      fontSize="13px"
                      borderRadius="full"
                      px={3}
                      py={1.5}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Icon as={changeStatusInfo.isOpened ? MdLockOpen : MdLock} boxSize="12px" />
                      {changeStatusInfo.isOpened ? 'Открыт' : 'Закрыт'}
                    </Badge>
                  </HStack>
                </Field.Root>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt={4} gap={3}>
            <Box>
              <Button
                variant="ghost"
                colorPalette="gray"
                size="sm"
                onClick={handleSave}
              >
                <HStack gap={2}>
                  <Icon as={MdSave} />
                  <Text>Сохранить</Text>
                </HStack>
              </Button>

              {/* <Button
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
              </Button> */}

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size="sm" variant="ghost" colorPalette="gray">
                    <HStack gap={2}>
                      <Icon as={changeStatusInfo.isOpened ? MdLock : MdLockOpen} boxSize="14px" />
                      <Text>{changeStatusInfo.isOpened ? "Закрыть" : "Открыть"}</Text>
                    </HStack>
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content bg="white" borderRadius="2xl" boxShadow="2xl" maxW="450px" w="full">
                      <Dialog.Header borderBottom="1px solid" borderColor="gray.100">
                        <Dialog.Title fontWeight="600">Изменение статуса</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text fontSize="14px" color="gray.600">
                          Вы уверены, что хотите
                          <Text as="span" fontWeight="bold" display="inline">
                            {changeStatusInfo.isOpened ? " закрыть " : " открыть "}
                          </Text>
                          возможность загрузки программ для
                          <Text as="span" fontWeight="bold"  display="inline">
                            {item.startYear ? ` ${item.startYear}/${item.startYear + 1} ` : "-"}
                          </Text>
                          учебного года?
                        </Text>
                        <Checkbox.Root
                          mt={5}
                          checked={changeStatusInfo.sendNotifications}
                          onCheckedChange={(e) => setChangeStatusInfo({...changeStatusInfo, sendNotifications: !!e.checked})}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>Уведомить сотрудников</Checkbox.Label>
                        </Checkbox.Root>
                      </Dialog.Body>
                      <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt={4} gap={3}>
                        <Button colorPalette="green" size="sm" onClick={handleChangeStatus}>
                          Подтвердить
                        </Button>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline" colorPalette="gray" size="sm">Отмена</Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size="sm" variant="ghost" colorPalette="gray" disabled={!changeStatusInfo.isOpened}>
                    <HStack gap={2}>
                      <Icon as={MdNotifications} boxSize="14px" />
                      <Text>Уведомить</Text>
                    </HStack>
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content bg="white" borderRadius="2xl" boxShadow="2xl" maxW="450px" w="full">
                      <Dialog.Header borderBottom="1px solid" borderColor="gray.100">
                        <Dialog.Title fontWeight="600">Уведомление сотрудников</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text fontSize="14px" color="gray.600">
                          Вы уверены, что хотите уведомить сотрудников об открытии учебного года
                          <Text as="span" fontWeight="bold" display="inline">
                            {item.startYear ? ` ${item.startYear}/${item.startYear + 1} ` : " - "}
                          </Text>
                          для загрузки программ?
                        </Text>
                      </Dialog.Body>
                      <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt={4} gap={3}>
                        <Button colorPalette="green" size="sm" onClick={handleNotificate}>
                          Подтвердить
                        </Button>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline" colorPalette="gray" size="sm">Отмена</Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size="sm" variant="ghost" colorPalette="gray">
                    <HStack gap={2}>
                      <Icon as={MdDelete} boxSize="14px" />
                      <Text>Удалить</Text>
                    </HStack>
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content bg="white" borderRadius="2xl" boxShadow="2xl" maxW="450px" w="full">
                      <Dialog.Header borderBottom="1px solid" borderColor="gray.100">
                        <Dialog.Title fontWeight="600">Удаление</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text fontSize="14px" color="gray.600">
                          Вы уверены, что хотите удалить учебный год
                          <Text as="span" fontWeight="bold" display="inline">
                            {item.startYear ? ` ${item.startYear}/${item.startYear + 1} ` : "-"}
                          </Text>
                          ?
                        </Text>
                      </Dialog.Body>
                      <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt={4} gap={3}>
                        <Button colorPalette="red" size="sm" onClick={handleDelete}>
                          Удалить
                        </Button>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline" colorPalette="gray" size="sm">Отмена</Button>
                        </Dialog.ActionTrigger>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </Box>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default YearUpdate