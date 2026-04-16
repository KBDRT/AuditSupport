import { Table, Box, HStack, Center, Badge, ActionBar, Portal, Button, Separator } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type { Direction } from '@/types/Direction';
import { useUsersStore } from "@/stores/UsersStore";
import type { GetUserDTO, Roles } from "@/api/models";
import { Input, InputGroup, Kbd } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { Checkbox, createListCollection, Select } from "@chakra-ui/react"

const UsersTable = () => {
  const { items, deleteItem, updateItem, fetchUsers } = useUsersStore()
  const [selectedItem, setSelectedItem] = useState<GetUserDTO | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  const hasSelection = selectedItem !== null

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setSelectedItem(null) 
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить?')) {
      deleteItem(id)
      setSelectedItem(null)
    }
  }

  const handleOpen = (item: GetUserDTO) => {
    setSelectedItem(item)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedItem(null)

    setTimeout(() => {
      document.body.style.pointerEvents = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.paddingRight = ''  
      
      document.body.style.removeProperty('padding-right')
    }, 0)
  }


  const handleSave = (updatedItem: Direction) => {
    updateItem(updatedItem.id, updatedItem)  
    handleClose()  
  }

  const getRoleName = (role: Roles) => {
    switch (role) {
      case 0: return 'Педагог';
      case 1: return 'Методист';
      case 2: return 'Зам. директора';
      case 3: return 'Администратор';
      default: return 'Не указано';
    }
  }


  const frameworks = createListCollection({
    items: [
      { label: "Педагоги", value: "0" },
      { label: "Методисты", value: "1" },
      { label: "Зам. директора", value: "2" },
      { label: "Админ", value: "3" },
    ],
  })

  return (
    <>
      <Box 
        ref={tableRef}
        overflowX="auto" 
        maxW="100%"
      >

        <Box>

        <HStack>
          <InputGroup flex="1"  startElement={<LuSearch />} endElement={<></>}>
            <Input placeholder="ФИО или Логин" size="sm"/>
          </InputGroup>
          <Separator orientation="vertical" height="8"/>
          <Select.Root multiple collection={frameworks} size="sm" width="320px">
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Выберите роли" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.ClearTrigger />
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          <Separator orientation="vertical" height="8"/>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>Только активные пользователи</Checkbox.Label>
          </Checkbox.Root>
        </HStack>

        </Box>


        <Table.Root 
          size="sm" 
          interactive 
          variant="outline" 
          showColumnBorder
          w="100%"
          mt="3"
          borderWidth="1px"
          minW="800px"  
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="200px">ФИО</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Логин</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Email</Table.ColumnHeader>
              <Table.ColumnHeader w="150px">Роль</Table.ColumnHeader>
              <Table.ColumnHeader w="150px" textAlign="center">Статус</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{ cursor: "pointer" }}
                bg={selectedItem?.id === item.id ? "blue.50" : undefined}
                _hover={{ bg: "gray.50" }}
              >
                <Table.Cell w="200px" verticalAlign="middle">
                  {item.initials?.short || item.initials?.surname || '—'}
                </Table.Cell>

                <Table.Cell w="250px" verticalAlign="middle">
                  {item.login || '—'}
                </Table.Cell>

                <Table.Cell w="250px" verticalAlign="middle">
                  {item.email || '—'}
                </Table.Cell>

                <Table.Cell w="150px" verticalAlign="middle">
                  {getRoleName(item.role ?? 0)}
                </Table.Cell>

                <Table.Cell w="150px" verticalAlign="middle" textAlign="center">
                  <Center>
                    <Badge 
                      colorPalette={item.isActive ? "green" : "red"}
                      variant="solid"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {item.isActive ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </Center>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <Button 
                variant="outline" 
                size="sm"
                colorScheme="blue"
                onClick={() => {
                  if (selectedItem) {
                    handleOpen(selectedItem)
                  }
                }}
              >
                Редактировать
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                colorScheme="red"
                onClick={() => {
                  if (selectedItem?.id) {
                    handleDelete(selectedItem.id)
                  }
                }}
              >
                Удалить
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>

      {/* {isOpen && selectedItem && (
        <DirectionUpdate 
          open={isOpen}
          item={selectedItem}
          onClose={handleClose}
          onSave={handleSave}
        />
      )} */}
    </>
  )
}

export default UsersTable