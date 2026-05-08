import { Table, Box, Center, Spinner, VStack, HStack, Icon, Text, Badge } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type { UpdateWordRuleRequest } from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import WordRulesUpdate from "./WordRulesUpdate";
import { useWordRulesStore } from "@/stores/WordRules";
import { MdInfo, MdTextFields } from "react-icons/md";

const WordRulesTable = () => {
  const { items, fetch, loading } = useWordRulesStore()
  const [selectedItem, setSelectedItem] = useState<UpdateWordRuleRequest | null>(null)
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
              <Table.ColumnHeader w="400px">Термин</Table.ColumnHeader>
              <Table.ColumnHeader>Описание</Table.ColumnHeader>
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
                  key={item.ruleId}
                  onDoubleClick={() => {
                    setSelectedItem({
                      ruleId: item.ruleId,
                      word: item.word, 
                      commentary: item.commentary
                    } as UpdateWordRuleRequest)
                    setIsOpenUpdate(true)
                  }}
                  style={{ cursor: "pointer" }}
                  bg={selectedItem?.ruleId === item.ruleId ? "blue.50" : undefined}
                  _hover={{ bg: "gray.50" }}
                  transition="all 0.2s"
                >
                  <Table.Cell verticalAlign="middle">
                    <HStack gap={2}>
                      {/* <Icon as={MdTextFields} color="blue.500" boxSize="16px" /> */}
                      <Text fontWeight="500">{item.word}</Text>
                    </HStack>
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" color="gray.600">
                    {item.commentary || "—"}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
      </Box>

      {isOpenUpdate && selectedItem && (
        <WordRulesUpdate 
          open={isOpenUpdate}
          item={selectedItem}
          onClose={handleClose}
        />
      )}
    </VStack>
  )
}

export default WordRulesTable