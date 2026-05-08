import { Table, Box, Center, Spinner, VStack, HStack, Icon, Text, Badge } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type { UpdateSectionRuleRequest } from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import { useSectionRulesStore } from "@/stores/SectionRules";
import SectionRulesUpdate from "./SectionRulesUpdate";
import { GetSectionTypeName } from "@/utils/TextUtils";
import { MdInfo, MdCategory, MdCheckCircle, MdClose } from "react-icons/md";

const SectionRulesTable = () => {
  const { items, fetch, loading } = useSectionRulesStore()
  const [selectedItem, setSelectedItem] = useState<UpdateSectionRuleRequest | null>(null)
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
              <Table.ColumnHeader w="200px">Раздел</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Описание</Table.ColumnHeader>
              {/* <Table.ColumnHeader w="120px">Тип</Table.ColumnHeader>
              <Table.ColumnHeader w="100px" textAlign="center">Структура</Table.ColumnHeader> */}
            </Table.Row>
          </Table.Header>

          {loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={4} textAlign="center" h="200px">
                  <Center>
                    <Spinner size="xl" color="blue" />
                  </Center>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : items.length === 0 ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={4} textAlign="center" color="gray.500" h="200px">
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
                      sectionName: item.sectionName, 
                      commentary: item.commentary,
                      type: item.type,
                      structure: item.structure
                    } as UpdateSectionRuleRequest)
                    setIsOpenUpdate(true)
                  }}
                  style={{ cursor: "pointer" }}
                  bg={selectedItem?.ruleId === item.ruleId ? "blue.50" : undefined}
                  _hover={{ bg: "gray.50" }}
                  transition="all 0.2s"
                >
                  <Table.Cell verticalAlign="middle">
                    <HStack gap={2}>
                      {/* <Icon as={MdCategory} color="blue.500" boxSize="16px" /> */}
                      <Text fontWeight="500">{item.sectionName}</Text>
                    </HStack>
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" color="gray.600">
                    {item.commentary || "—"}
                  </Table.Cell>

                  {/* <Table.Cell verticalAlign="middle">
                    <Badge colorPalette="blue" fontSize="11px" borderRadius="full" px={2}>
                      {item.type != undefined && GetSectionTypeName(item.type)}
                    </Badge>
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" textAlign="center">
                    {item.structure && item.structure?.length > 0 ? (
                      <HStack justify="center">
                        <Icon as={MdCheckCircle} color="green.500" boxSize="14px" />
                        <Text fontSize="12px" color="gray.600">{item.structure.length} пунктов</Text>
                      </HStack>
                    ) : (
                      <HStack justify="center">
                        <Icon as={MdClose} color="gray.400" boxSize="14px" />
                        <Text fontSize="12px" color="gray.400">Отсутствует</Text>
                      </HStack>
                    )}
                  </Table.Cell> */}
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
      </Box>

      {isOpenUpdate && selectedItem && (
        <SectionRulesUpdate 
          open={isOpenUpdate}
          item={selectedItem}
          onClose={handleClose}
        />
      )}
    </VStack>
  )
}

export default SectionRulesTable