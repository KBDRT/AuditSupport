import { Button, Dialog, Field, Input, Portal, Stack, Select, CloseButton, Text, HStack} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { Roles, UpdateUserRequest } from "@/api/models";
import { ROLE_COLLECTION, STATUS_ITEMS, STATUS_COLLECTION} from "@/constants/roles"
import { MdSave, MdLockReset, MdDelete  } from "react-icons/md";
import { useUsersStore } from "@/stores/UsersStore";

interface UserUpdateProps {
  open: boolean  
  item: UpdateUserRequest
  userLogin: string
  onClose: () => void
  onSave: (item: UpdateUserRequest) => void
  onDelete: (id: string) => void
}

const UserUpdate = ({ open, item, userLogin, onClose, onSave, onDelete }: UserUpdateProps) => {
  const [formData, setFormData] = useState<UpdateUserRequest>(item)
  const { resetPassword } = useUsersStore()

  useEffect(() => {
    setFormData(item)
  }, [item])

  const handleSave = () => {
    onSave(formData)
    onClose()         
  }

  const handleDelete = () => {
    onDelete(formData?.userId || ""); 
    onClose(); 
  }

  const handleResetPassword = () => {
    resetPassword(formData?.userId || ""); 
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
              <Dialog.Title>Редактирование пользователя</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal">
                  <Field.Label>Логин</Field.Label>
                  <Input value={userLogin|| ""} readOnly autoFocus/>
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Фамилия</Field.Label>
                  <Input
                    value={formData.surname || ""}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    placeholder="Введите фамилию"
                  />
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Имя</Field.Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите имя"
                  />
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Отчество</Field.Label>
                  <Input
                    value={formData.patronymic || ""}
                    onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
                    placeholder="Введите отчество"
                  />
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Email</Field.Label>
                  <Input
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Введите email"
                  />
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Роль</Field.Label>
                  <Select.Root
                    collection={ROLE_COLLECTION}
                    size="sm"
                    value={[formData.role?.toString() || ""]}
                    onValueChange={({ value }) => setFormData({ ...formData, role: Number(value[0]) as Roles })}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Выберите роли" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {ROLE_COLLECTION.items.map((role) => (
                            <Select.Item item={role} key={role.value}>
                              {role.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Статус</Field.Label>
                  <Select.Root
                    collection={STATUS_COLLECTION}
                    size="sm"
                    value={[formData.isActive == true ? "active" : "inactive"]}
                    onValueChange={({ value }) => setFormData({ ...formData, isActive: value[0] == "active" })}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {STATUS_COLLECTION.items.map((status) => (
                            <Select.Item item={status} key={status.value}>
                              {status.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button colorPalette="green" size="sm" onClick={handleSave} variant="ghost">
                <MdSave />Сохранить
              </Button>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button  size="sm" variant="ghost">
                    <MdLockReset /> Сбросить пароль
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Подтверждение</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text>
                        Внимание, новый пароль будет отправлен на почту:
                        </Text>
                        <Text fontWeight="bold" color="black.600" mt={2} mb={3}>
                          {formData.email}
                        </Text>
                        <Text>
                          Продолжить?
                        </Text>
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button colorPalette="green" size="sm" onClick={handleResetPassword}>Подтвердить</Button>
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
                          Вы уверены, что хотите удалить пользователя?
                        </Text>
                        <Text fontWeight="bold" color="black.600" my={2}>
                          {formData.surname} {formData.name} {formData.patronymic}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          Это действие нельзя отменить.
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

export default UserUpdate

