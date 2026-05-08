import { Table, Box, Center, Badge, Spinner, VStack } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import { useUsersStore } from "@/stores/UsersStore";
import type { UpdateUserRequest } from "@/api/models";
import FilterTable from "./FilterPanel";
import { GetRoleName } from "@/utils/TextUtils";
import UserUpdate from "./UserUpdate";
import { FixDialog } from "@/utils/DialogFix";

const UsersTable = () => {
  const { items, fetchUsers, loading } = useUsersStore()
  const [selectedLogin, setSelectedLogin] = useState("") 
  const [selectedItem, setSelectedItem] = useState<UpdateUserRequest | null>(null)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClose = () => {
    setIsOpenUpdate(false)
    setSelectedItem(null)
    FixDialog()
  }

  return (
    <VStack align="stretch" gap={4}>
      <FilterTable />

      <Box 
        ref={tableRef}
        overflowX="auto"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.200"
        bg="white"
      >
        <Table.Root 
          size="sm" 
          interactive 
          variant="outline" 
          showColumnBorder
          w="100%"
          borderWidth="0"
        >
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader w="200px">ФИО</Table.ColumnHeader>
              <Table.ColumnHeader w="200px">Логин</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Email</Table.ColumnHeader>
              <Table.ColumnHeader w="120px">Роль</Table.ColumnHeader>
              <Table.ColumnHeader w="100px" textAlign="center">Статус</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          {loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={5} textAlign="center" h="200px">
                  <Center>
                    <Spinner size="xl" color="blue"/>
                  </Center>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : items.length === 0 ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={5} textAlign="center" color="gray.500" h="200px">
                  Нет данных
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : (
            <Table.Body>
              {items.map((item) => (
                <Table.Row 
                  key={item.id}
                  onDoubleClick={() => {
                    setSelectedItem({
                      email: item.email, 
                      userId: item.id, 
                      isActive: item.isActive, 
                      name: item.initials?.name, 
                      surname: item.initials?.surname,
                      patronymic: item.initials?.patronymic,
                      role: item.role
                    } as UpdateUserRequest)
                    setSelectedLogin(item.login ?? "")
                    setIsOpenUpdate(true)
                  }}
                  style={{ cursor: "pointer" }}
                  bg={selectedItem?.userId === item.id ? "blue.50" : undefined}
                  _hover={{ bg: "gray.50" }}
                  transition="all 0.2s"
                >
                  <Table.Cell verticalAlign="middle" fontWeight="500">
                    {`${item.initials?.surname || ''} ${item.initials?.name || ''} ${item.initials?.patronymic || ''}`.trim() || '—'}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" color="gray.600">
                    {item.login || '—'}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" color="gray.600">
                    {item.email || '—'}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle">
                    <Badge colorPalette="blue" fontSize="11px" borderRadius="full" px={2}>
                      {GetRoleName(item.role ?? 0)}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" textAlign="center">
                    <Center>
                      <Badge 
                        colorPalette={item.isActive ? "green" : "red"}
                        fontSize="11px"
                        borderRadius="full"
                        px={2}
                        py={1}
                      >
                        {item.isActive ? 'Активен' : 'Неактивен'}
                      </Badge>
                    </Center>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
      </Box>

      {isOpenUpdate && selectedItem && (
        <UserUpdate 
          open={isOpenUpdate}
          item={selectedItem}
          userLogin={selectedLogin}
          onClose={handleClose} />
      )}
    </VStack>
  )
}

export default UsersTable