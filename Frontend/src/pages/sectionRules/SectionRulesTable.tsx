import { Table, Box,  Center,  Spinner} from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import type {  UpdateSectionRuleRequest} from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import { useSectionRulesStore } from "@/stores/SectionRules";
import SectionRulesUpdate from "./SectionRulesUpdate";
import { GetSectionTypeName } from "@/utils/TextUtils";

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
              <Table.ColumnHeader w="200px">Раздел</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Комментарий</Table.ColumnHeader>
              <Table.ColumnHeader w="100px">Тип</Table.ColumnHeader>
              <Table.ColumnHeader w="100px">Структура</Table.ColumnHeader>
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
                >
                  <Table.Cell w="200px" verticalAlign="middle">
                    {item.sectionName}
                  </Table.Cell>

                  <Table.Cell w="250px" verticalAlign="middle">
                    {item.commentary}
                  </Table.Cell>

                  <Table.Cell w="100px" verticalAlign="middle">
                    {item.type != undefined && GetSectionTypeName(item.type)}
                  </Table.Cell>

                  <Table.Cell w="100px" verticalAlign="middle">
                     {item.structure && item.structure?.length > 0 ? 'Задана' : 'Отсутствует'}
                  </Table.Cell>

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
          onClose={handleClose} />
      )}

    </>
  )
}

export default SectionRulesTable