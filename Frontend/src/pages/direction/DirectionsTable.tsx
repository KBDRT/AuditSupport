import { Table, Box,  Center,  Spinner} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type {  UpdateDirectionRequest} from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import { useDirectionsStore } from "@/stores/DirectionsStore";
import DirectionUpdate from "./DirectionUpdate";

const DirectionsTable = () => {
  const { items, fetch, loading } = useDirectionsStore()
  const [selectedItem, setSelectedItem] = useState<UpdateDirectionRequest | null>(null)
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
              <Table.ColumnHeader w="200px">Название</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Комментарий</Table.ColumnHeader>
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
                      directionId: item.id,
                      name: item.name, 
                      description: item.description
                    } as UpdateDirectionRequest)
                    setIsOpenUpdate(true)
                  }}
                  style={{ cursor: "pointer" }}
                  bg={selectedItem?.directionId === item.id ? "blue.50" : undefined}
                  _hover={{ bg: "gray.50" }}
                >
                  <Table.Cell w="200px" verticalAlign="middle">
                    {item.name}
                  </Table.Cell>

                  <Table.Cell w="250px" verticalAlign="middle">
                    {item.description}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
      </Box>

      {isOpenUpdate && selectedItem && (
        <DirectionUpdate 
          open={isOpenUpdate}
          item={selectedItem}
          onClose={handleClose} />
      )}

    </>
  )
}

export default DirectionsTable