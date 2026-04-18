import { Button, Dialog, Field, Input, Portal, Stack, Select, CloseButton, Text} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import type { CreateUserRequest, Roles, UpdateUserRequest } from "@/api/models";
import { ROLE_COLLECTION, STATUS_COLLECTION} from "@/constants/roles"
import { MdSave, MdLockReset, MdDelete  } from "react-icons/md";
import { useUsersStore } from "@/stores/UsersStore";
import { withMask } from "use-mask-input"

interface UserInvalidFields {
  surname: boolean,
  name: boolean,
  email: boolean
  login: boolean
}

interface UserCreateProps {
  open: boolean  
  onClose: () => void
}

const UserCreate = ({ open, onClose}: UserCreateProps) => {
  const { addItem } = useUsersStore()
  const [formData, setFormData] = useState<CreateUserRequest>({})
  const [invalidFields, setInvalidFields] = useState<UserInvalidFields>({email: false, name: false, surname: false, login: false})

  useEffect(() => {
  }, [])

  const handleSave = async() => {
    
    if (formData.email?.length == 0 || formData.name?.length == 0 || formData.surname?.length == 0 || formData.login?.length == 0)
    {
      setInvalidFields({...invalidFields, email: formData.email?.length == 0, name: formData.name?.length == 0, surname: formData.surname?.length == 0, login: formData.login?.length == 0 })
    }
    else
    {
      const isSuccess = await addItem(formData)
      if (isSuccess)
      {
        onClose()   
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
              <Dialog.Title>Новый пользователь</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal"  >
                  <Field.Label>Логин</Field.Label>
                  <Input
                    value={formData.login || ""}
                    onChange={(e) => {setFormData({ ...formData, login: e.target.value }); setInvalidFields({...invalidFields, login: false})}}
                    placeholder="Введите логин"
                  />
                </Field.Root>
                <Field.Root orientation="horizontal" invalid={invalidFields["surname"]}>
                  <Field.Label>Фамилия</Field.Label>
                  <Input
                    value={formData.surname || ""}
                    onChange={(e) => {setFormData({ ...formData, surname: e.target.value }); setInvalidFields({...invalidFields, surname: false})}}
                    placeholder="Введите фамилию"
                  />
                </Field.Root>
                <Field.Root orientation="horizontal" invalid={invalidFields["name"]}>
                  <Field.Label>Имя</Field.Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => {setFormData({ ...formData, name: e.target.value }); setInvalidFields({...invalidFields, name: false})}}
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
                <Field.Root orientation="horizontal" invalid={invalidFields["email"]}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    value={formData.email || ""}
                    ref={withMask("email")}
                    onChange={(e) => {setFormData({ ...formData, email: e.target.value }); setInvalidFields({...invalidFields, email: false})}}
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

export default UserCreate

