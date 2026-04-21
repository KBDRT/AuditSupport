import { Table, Box,  Center,  Spinner, Badge} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type {  UpdateYearRequest} from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import YearUpdate from "./YearUpdate";
import { useYearsStore } from "@/stores/YearsStore";

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
    <>

      <Box 
        ref={tableRef}
        overflowX="auto" 
        maxW="100%"
      >

        <Table.Root 
          size="sm" 
          interactive 
          variant="outline" 
          showColumnBorder
          w="100%"
          mt="2"
          borderWidth="1px"
          minW="800px"  
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="200px">Учебный год</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Комментарий</Table.ColumnHeader>
              <Table.ColumnHeader w="100px">Статус</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          {loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={5} textAlign="center" h="200px">
                  <Center>
                    <Spinner size="xl" />
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
                >
                  <Table.Cell w="200px" verticalAlign="middle">
                    {item.period}
                  </Table.Cell>

                  <Table.Cell w="250px" verticalAlign="middle">
                    {item.description}
                  </Table.Cell>

                  <Table.Cell w="100px" verticalAlign="middle" textAlign="center">
                    <Center>
                      <Badge 
                        colorPalette={item.isOpened ? "green" : "red"}
                        variant="solid"
                        borderRadius="full"
                        px={4}
                        py={1}
                      >
                        {item.isOpened ? 'Открыт' : 'Закрыт'}
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
        <YearUpdate 
          open={isOpenUpdate}
          item={selectedItem}
          isOpened={selectedOpened}
          onClose={handleClose} />
      )}

    </>
  )
}

export default YearsTable