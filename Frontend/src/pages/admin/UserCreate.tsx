import { Button, Dialog, Field, Input, Portal, Stack, Select, CloseButton, HStack, Icon, Box, Text, Checkbox } from "@chakra-ui/react"
import { useState } from "react"
import { Roles, type CreateUserRequest } from "@/api/models";
import { ROLE_COLLECTION } from "@/constants/common"
import { MdSave, MdInfo, MdClose } from "react-icons/md";
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
  const [formData, setFormData] = useState<CreateUserRequest>({ surname: "", name: "", patronymic: "", login: "", email: "", role: Roles.NUMBER_0, isSendPassword: false})
  const [invalidFields, setInvalidFields] = useState<UserInvalidFields>({email: false, name: false, surname: false, login: false})

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
            maxW="550px"
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
                  Новый пользователь
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
                <Field.Root invalid={invalidFields["login"]}>
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
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                  <Field.ErrorText>Поле обязательно</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={invalidFields["email"]}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    value={formData.email || ""}
                    ref={withMask("email")}
                    onChange={(e) => {setFormData({ ...formData, email: e.target.value }); setInvalidFields({...invalidFields, email: false})}}
                    placeholder="Введите email"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                  <Field.ErrorText>Некорректный формат email</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={invalidFields["surname"]}>
                  <Field.Label>Фамилия</Field.Label>
                  <Input
                    value={formData.surname || ""}
                    onChange={(e) => {setFormData({ ...formData, surname: e.target.value }); setInvalidFields({...invalidFields, surname: false})}}
                    placeholder="Введите фамилию"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                  <Field.ErrorText>Поле обязательно</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={invalidFields["name"]}>
                  <Field.Label>Имя</Field.Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => {setFormData({ ...formData, name: e.target.value }); setInvalidFields({...invalidFields, name: false})}}
                    placeholder="Введите имя"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                  <Field.ErrorText>Поле обязательно</Field.ErrorText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Отчество</Field.Label>
                  <Input
                    value={formData.patronymic || ""}
                    onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
                    placeholder="Введите отчество"
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182CE"
                    }}
                  />
                </Field.Root>

                <Field.Root>
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
                        <Select.ValueText placeholder="Выберите роль" />
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

                <Checkbox.Root 
                  checked={formData.isSendPassword} 
                  onCheckedChange={(e) => setFormData({ ...formData, isSendPassword: !!e.checked })}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Label>Отправить пароль на email</Checkbox.Label>
                  <Checkbox.Control ml={2} />
                </Checkbox.Root>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer borderTop="1px solid" borderColor="gray.100" pt={4} gap={3}>
              
              <Button
                colorPalette="gray"
                variant="ghost"
                size="sm"
                onClick={handleSave}
              >
                <HStack gap={2}>
                  <Icon as={MdSave} />
                  <Text>Сохранить</Text>
                </HStack>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                colorPalette="gray"
                onClick={onClose}
              >
                <HStack gap={2}>
                  <Icon as={MdClose} />
                  <Text>Отмена</Text>
                </HStack>
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default UserCreate