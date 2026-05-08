import { Table, Box, Center, Spinner, Badge, VStack, Icon } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type { UpdateYearRequest } from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import YearUpdate from "./YearUpdate";
import { useYearsStore } from "@/stores/YearsStore";
import { MdLock, MdLockOpen } from "react-icons/md";

const YearsTable = () => {
  const { items, fetch, loading } = useYearsStore()
  const [selectedItem, setSelectedItem] = useState<UpdateYearRequest | null>(null)
  const [selectedOpened, setSelectedOpened] = useState(false)
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
    <VStack align="stretch" gap={4}>
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
              <Table.ColumnHeader w="140px" textAlign="center">Статус</Table.ColumnHeader>
              <Table.ColumnHeader w="200px">Учебный год</Table.ColumnHeader>
              <Table.ColumnHeader>Комментарий</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          {loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center" h="200px">
                  <Center>
                    <Spinner size="xl" color="blue" />
                  </Center>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : items.length === 0 ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center" color="gray.500" h="200px">
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
                      yearId: item.id,
                      startYear: item.startYear, 
                      description: item.description
                    } as UpdateYearRequest)
                    setSelectedOpened(item.isOpened ?? false)
                    setIsOpenUpdate(true)
                  }}
                  style={{ cursor: "pointer" }}
                  bg={selectedItem?.yearId === item.id ? "blue.50" : undefined}
                  _hover={{ bg: "gray.50" }}
                  transition="all 0.2s"
                >

                  
                  <Table.Cell verticalAlign="middle" textAlign="center">
                    <Center>
                      <Badge 
                        colorPalette={item.isOpened ? "green" : "red"}
                        fontSize="12px"
                        borderRadius="full"
                        px={3}
                        py={1.5}
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <Icon as={item.isOpened ? MdLockOpen : MdLock} boxSize="12px" />
                        {item.isOpened ? 'Открыт' : 'Закрыт'}
                      </Badge>
                    </Center>
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" fontWeight="500">
                    {item.period}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" color="gray.600">
                    {item.description || "—"}
                  </Table.Cell>

                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
      </Box>

      {isOpenUpdate && selectedItem && (
        <YearUpdate 
          open={isOpenUpdate}
          item={selectedItem}
          isOpened={selectedOpened}
          onClose={handleClose}
        />
      )}
    </VStack>
  )
}

export default YearsTable