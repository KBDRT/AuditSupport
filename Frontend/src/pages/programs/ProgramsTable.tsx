import { Table, Box,  Center, Badge, Spinner} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type {  UpdateUserRequest } from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import FilterTablePrograms from "./FilterTablePrograms";
import { useProgramsStore } from "@/stores/ProgramsStore";
import { GetStatusTypeName } from "@/utils/TextUtils";


const ProgramsTable = () => {
  const { items, fetch, loading } = useProgramsStore()
  const [selectedLogin, setSelectedLogin] = useState("") 
  const [selectedItem, setSelectedItem] = useState<UpdateUserRequest | null>(null)
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch();
  }, []);

  const handleClose = () => {
    setIsOpenUpdate(false)
    setSelectedItem(null)
    FixDialog()
  }

  return (
    <>

      <Box 
        ref={tableRef}
        overflowX="auto" 
        maxW="100%"
      >
        <FilterTablePrograms />

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
              <Table.ColumnHeader w="200px">Название</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Педагог</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Направление</Table.ColumnHeader>
              {/* <Table.ColumnHeader w="150px">Роль</Table.ColumnHeader> */}
              <Table.ColumnHeader w="150px" textAlign="center">Статус</Table.ColumnHeader>
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
                  // onDoubleClick={() => {
                  //   setSelectedItem({
                  //     email: item.email, 
                  //     userId: item.id, 
                  //     isActive: item.isActive, 
                  //     name: item.initials?.name, 
                  //     surname: item.initials?.surname,
                  //     patronymic: item.initials?.patronymic,
                  //     role: item.role
                  //   } as UpdateUserRequest)
                  //   setSelectedLogin(item.login ?? "")
                  //   setIsOpenUpdate(true)
                  // }}
                  style={{ cursor: "pointer" }}
                  bg={selectedItem?.userId === item.id ? "blue.50" : undefined}
                  _hover={{ bg: "gray.50" }}
                >
                  <Table.Cell w="200px" verticalAlign="middle">
                    {item.name || '—'}
                  </Table.Cell>

                  <Table.Cell w="250px" verticalAlign="middle">
                    {item.teacher || '—'}
                  </Table.Cell>

                  <Table.Cell w="250px" verticalAlign="middle">
                    {item.direction || '—'}
                  </Table.Cell>

                  {/* <Table.Cell w="150px" verticalAlign="middle">
                    {GetRoleName(item.role ?? 0)}
                  </Table.Cell> */}

                  <Table.Cell w="150px" verticalAlign="middle" textAlign="center">
                    <Center>
                      <Badge 
                        colorPalette="blue"
                        // colorPalette={item.isActive ? "green" : "red"}
                        variant="solid"
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {item.programStatus && GetStatusTypeName(item.programStatus)}
                        {/* {item.isActive ? 'Активен' : 'Неактивен'} */}
                      </Badge>
                    </Center>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
      </Box>

    </>
  )
}

export default ProgramsTable