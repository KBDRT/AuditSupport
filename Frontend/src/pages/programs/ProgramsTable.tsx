import { Table, Box, Center, Spinner, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react";
import { ProgramStatuses, type EduProgramShortDTO, type UpdateUserRequest } from "@/api/models";
import { FixDialog } from "@/utils/DialogFix";
import FilterTablePrograms from "./FilterTablePrograms";
import { useProgramsStore } from "@/stores/ProgramsStore";
import ProgramReviews from "../review/ProgramReviews";
import { MdVisibility, MdApproval } from "react-icons/md";
import { useAuthStore } from "@/stores/AuthStore";
import StatusBadge from "@/components/common/StatusBadge";

const ProgramsTable = () => {
  const { items, fetch, loading } = useProgramsStore()
  const [selectedItem] = useState<UpdateUserRequest | null>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [program, setProgram] = useState<EduProgramShortDTO>()
  const [isOpenReviews, setIsOpenReviews] = useState(false)
  const {user} = useAuthStore()

  const handleCloseDialog = () => {
    setIsOpenReviews(false);
    FixDialog()
  }

  useEffect(() => {
    fetch();
  }, []);


  return (
    <VStack align="stretch" gap={4}>
      <FilterTablePrograms />

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
              <Table.ColumnHeader w="100px" textAlign="center" maxW="100px">Статус</Table.ColumnHeader>
              <Table.ColumnHeader w="250px">Название</Table.ColumnHeader>
              <Table.ColumnHeader w="200px">Педагог</Table.ColumnHeader>
              <Table.ColumnHeader w="200px">Направление</Table.ColumnHeader>
              <Table.ColumnHeader w="100px" textAlign="center">Проверки</Table.ColumnHeader>
              {user?.role == "Head" &&
                <Table.ColumnHeader w="100px" textAlign="center">Утверждение</Table.ColumnHeader>
              }
            </Table.Row>
          </Table.Header>

          {loading ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={5} textAlign="center" h="200px">
                  <Center>
                    <Spinner size="xl" color="blue" />
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
                  style={{ cursor: "pointer" }}
                  bg={selectedItem?.userId === item.id ? "blue.50" : undefined}
                  _hover={{ bg: "gray.50" }}
                  transition="all 0.2s"
                >
                  <Table.Cell verticalAlign="middle" textAlign="center" maxW="160px">
                      {item?.programStatus != undefined && <StatusBadge status={item.programStatus} />}
                    {/* <Center>
                      <Badge
                        colorPalette="blue"
                        fontSize="12px"
                        borderRadius="full"
                        px={3}
                        py={1.5}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        // w="auto"
                      >
                        {item?.programStatus != undefined && GetStatusTypeName(item.programStatus)}
                      </Badge>
                    </Center> */}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" fontWeight="500">
                    {item.name || '—'}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" color="gray.600">
                    {item.teacher || '—'}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" color="gray.600">
                    {item.direction || '—'}
                  </Table.Cell>

                  <Table.Cell verticalAlign="middle" textAlign="center">
                    <Button
                      variant="ghost"
                      size="xs"
                      colorPalette="gray"
                      onClick={() => {setProgram(item); setIsOpenReviews(true)}}
                      _hover={{ bg: "blue.50", transform: "translateY(-1px)" }}
                      transition="all 0.2s"
                    >
                      <HStack gap={1}>
                        <Icon as={MdVisibility} boxSize="14px" />
                        <Text fontSize="12px">Просмотр</Text>
                      </HStack>
                    </Button>
                  </Table.Cell>


                    { user?.role == "Head" &&
                           <Table.Cell verticalAlign="middle" textAlign="center">
                    <Button
                      variant="ghost"
                      size="xs"
                      colorPalette="gray"
                      disabled={item.programStatus != ProgramStatuses.ReadyToApprove}
                      // onClick={() => {setProgram(item); setIsOpenReviews(true)}}
                      _hover={{ bg: "blue.50", transform: "translateY(-1px)" }}
                      transition="all 0.2s"
                    >
                      <HStack gap={1}>
                        <Icon as={MdApproval} boxSize="14px" />
                        <Text fontSize="12px">Утвердить</Text>
                      </HStack>
                    </Button>
                  </Table.Cell>
                    }

                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table.Root>
      </Box>

      {isOpenReviews && (
        <ProgramReviews
          program={program || {}}
          onClose={handleCloseDialog}
        />
      )}
    </VStack>
  )
}

export default ProgramsTable