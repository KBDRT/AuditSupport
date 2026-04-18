import { Button, Dialog, Field, Input, Portal, Stack, Select, CloseButton} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Roles, type CreateUserRequest } from "@/api/models";
import { ROLE_COLLECTION} from "@/constants/roles"
import { MdSave  } from "react-icons/md";
import { useUsersStore } from "@/stores/UsersStore";
import { withMask } from "use-mask-input"
import { z } from 'zod'

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

const userSchema = z.object({
  email: z.string().email('Неверный формат email').min(1, 'Email обязателен'),
  name: z.string().min(1, 'Имя обязательно'),
  surname: z.string().min(1, 'Фамилия обязательна'),
  login: z.string().min(1, 'Логин обязателен'),
})


const UserCreate = ({ open, onClose}: UserCreateProps) => {
  const { addItem } = useUsersStore()
  const [formData, setFormData] = useState<CreateUserRequest>({ surname: "",
                                                                name: "",
                                                                patronymic: "",
                                                                login: "",
                                                                email: "",
                                                                role: Roles.NUMBER_0,
                                                                isSendPassword: false})
  const [invalidFields, setInvalidFields] = useState<UserInvalidFields>({email: false, name: false, surname: false, login: false})

  useEffect(() => {
  }, [])

  const handleSave = async() => {
    try {
      userSchema.parse(formData)
      
      setInvalidFields({ email: false, name: false, surname: false, login: false })
      
      const isSuccess = await addItem(formData)
      if (isSuccess) {
        onClose()
      }
    } 
    catch (error) 
    {
      if (error instanceof z.ZodError) {
        const newErrors = { email: false, name: false, surname: false, login: false }
        
        error.issues.forEach(issue => {
          const field = issue.path[0] as keyof UserInvalidFields
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
              <Dialog.Title>Новый пользователь</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="2">
              <Stack gap="2">
                <Field.Root orientation="horizontal"  invalid={invalidFields["login"]}>
                  <Field.Label>Логин</Field.Label>
                  <Input
                    value={formData.login || ""}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^[a-zA-Z]*$/.test(value)) {
                        setFormData({ ...formData, login: value })
                        setInvalidFields({...invalidFields, login: false})
                      }
                    }}
                    placeholder="Введите логин"
                  />
                  <Field.ErrorText>Поле является обязательным.</Field.ErrorText>
                </Field.Root>
                <Field.Root orientation="horizontal" invalid={invalidFields["email"]}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    value={formData.email || ""}
                    ref={withMask("email")}
                    onChange={(e) => {setFormData({ ...formData, email: e.target.value }); setInvalidFields({...invalidFields, email: false})}}
                    placeholder="Введите email"
                  />
                  <Field.ErrorText>Неверный формат.</Field.ErrorText>
                </Field.Root>
                <Field.Root orientation="horizontal" invalid={invalidFields["surname"]}>
                  <Field.Label>Фамилия</Field.Label>
                  <Input
                    value={formData.surname || ""}
                    onChange={(e) => {setFormData({ ...formData, surname: e.target.value }); setInvalidFields({...invalidFields, surname: false})}}
                    placeholder="Введите фамилию"
                  />
                  <Field.ErrorText>Поле является обязательным.</Field.ErrorText>
                </Field.Root>
                <Field.Root orientation="horizontal" invalid={invalidFields["name"]}>
                  <Field.Label>Имя</Field.Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => {setFormData({ ...formData, name: e.target.value }); setInvalidFields({...invalidFields, name: false})}}
                    placeholder="Введите имя"
                  />
                  <Field.ErrorText>Поле является обязательным.</Field.ErrorText>
                </Field.Root>
                <Field.Root orientation="horizontal">
                  <Field.Label>Отчество</Field.Label>
                  <Input
                    value={formData.patronymic || ""}
                    onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
                    placeholder=""
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

