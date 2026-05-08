import { Table, Box, Center, Spinner, VStack, HStack, Icon, Text, Container, Flex, Badge } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type { UpdateDirectionRequest } from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import { useDirectionsStore } from "@/stores/DirectionsStore";
import DirectionUpdate from "./DirectionUpdate";
import { MdInfo, MdCategory } from "react-icons/md";

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
              <Table.ColumnHeader w="400px">Название</Table.ColumnHeader>
              <Table.ColumnHeader>Комментарий</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          {loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={2} textAlign="center" h="200px">
                  <Center>
                    <Spinner size="xl" color="blue" />
                  </Center>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : items.length === 0 ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={2} textAlign="center" color="gray.500" h="200px">
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
                  transition="all 0.2s"
                >
                  <Table.Cell verticalAlign="middle" fontWeight="500">
                    <HStack gap={2}>
                      {/* <Icon as={MdCategory} color="blue.500" boxSize="16px" /> */}
                      <Text>{item.name}</Text>
                    </HStack>
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
        <DirectionUpdate 
          open={isOpenUpdate}
          item={selectedItem}
          onClose={handleClose}
        />
      )}
    </VStack>
  )
}

export default DirectionsTable