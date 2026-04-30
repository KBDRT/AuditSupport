import { Button, Box, Container, HStack, VStack, Text, Icon, Table, Spacer, Badge } from "@chakra-ui/react"
import { MdInfo, MdDownload, MdVisibility, MdPreview, MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import VersionCreate from "./VersionCreate";
import { FixDialog } from "@/utils/DialogFix";
import { FormatDateTime } from './../../utils/TextUtils';
import { useTeacherProgramsStore } from "@/stores/TeacherProgramsStore";
import VersionCheckInfo from "./VersionCheckInfo";

const VersionsTable = ({ programId, onChangeCreatePage }: { programId?: string, onChangeCreatePage: (stat: boolean) => void }) => {
  const { fetchProgram, programs, downloadVersionFile } = useTeacherProgramsStore()
  
  const program = programId ? programs[programId] : undefined
  const versions = program?.versions || []

  useEffect(() => {
    const loadProgram = async () => {
      if (programId && !program) {
        await fetchProgram(programId)
      }
    };
    loadProgram();
  }, [programId]);

  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenInfo, setIsOpenInfo] = useState(false)
  const [checkId, setCheckId] = useState<string>()

  const handleCloseCreate = () => {
    onChangeCreatePage(true)
    setIsOpenCreate(false)
    FixDialog()
  }

  const handleCloseInfo = () => {
    onChangeCreatePage(true)
    setIsOpenInfo(false)
    FixDialog()
  }

  const handleDownloadFile = async (id: string) => {
    await downloadVersionFile(id)
  }

  return (
    <>
      <Container maxW="container.lg" py={6}>
        <VStack align="stretch" gap={3}>
          <HStack gap={3}>
            <Box
              as="div"
              w="32px"
              h="32px"
              bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={MdInfo} boxSize="16px" color="white" />
            </Box>
            <Text fontSize="lg" fontWeight="600" color="gray.700">
              Версии программы
            </Text>
            <Spacer />
            <Button
              onClick={() => {setIsOpenCreate(true); onChangeCreatePage(false)}}
              variant="solid"
              colorPalette="blue"
              size="sm"
            >
              <HStack gap={2}>
                <Icon as={MdAdd} boxSize="16px" />
                <Text>Добавить версию</Text>
              </HStack>
            </Button>
          </HStack>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            overflow="auto"
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s ease"
          >
            <Table.ScrollArea borderWidth="1px" rounded="md" height="480px">
            <Table.Root size="sm" interactive variant="outline" w="100%" borderWidth="0" showColumnBorder stickyHeader>
              <Table.Header>
                <Table.Row bg="gray.50">
                  <Table.ColumnHeader w="80px" textAlign="center">№ п/п</Table.ColumnHeader>
                  <Table.ColumnHeader w="200px">Дата и время создания</Table.ColumnHeader>
                  <Table.ColumnHeader>Комментарий</Table.ColumnHeader>
                  <Table.ColumnHeader w="200px" textAlign="center">Файл</Table.ColumnHeader>
                  <Table.ColumnHeader w="180px" textAlign="center">Статус тех. проверки</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {versions.map((version, index) => (
                  <Table.Row _hover={{ bg: "gray.50" }} transition="all 0.2s" key={version.id}>
                    <Table.Cell textAlign="center" fontWeight="500">{index + 1}</Table.Cell>
                    <Table.Cell>{FormatDateTime(version.createdDate || "")}</Table.Cell>
                    <Table.Cell color="gray.600">{version.changes || "—"}</Table.Cell>
                    <Table.Cell>
                      <HStack gap={2} justify="center">
                        <Button
                          variant="ghost"
                          size="xs"
                          colorScheme="blue"
                          onClick={() => handleDownloadFile(version.id || "")}
                        >
                          <HStack gap={1}>
                            <Icon as={MdDownload} boxSize="14px" />
                            <Text fontSize="12px">Скачать</Text>
                          </HStack>
                        </Button>
                        <Button variant="ghost" size="xs" colorScheme="gray">
                          <HStack gap={1}>
                            <Icon as={MdPreview} boxSize="14px" />
                            <Text fontSize="12px">Предпросмотр</Text>
                          </HStack>
                        </Button>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack gap={2} justify="center">
                        <Badge colorPalette={version.isSuccessCheck ? "green" : "red"} borderRadius="full" px={3}>{version.isSuccessCheck ? "Пройдена" : "Ошибки"}</Badge>
                        <Button variant="ghost" size="xs" colorScheme="gray"  onClick={() => {setCheckId(version.techCheckId); setIsOpenInfo(true); onChangeCreatePage(false)}}>
                          <HStack gap={1}>
                            <Icon as={MdVisibility} boxSize="14px" />
                            <Text fontSize="12px">Результат</Text>
                          </HStack>
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            </Table.ScrollArea>
          </Box>
        </VStack>
      </Container>

      {isOpenCreate && (
        <VersionCreate
          programId={programId || ""}
          open={isOpenCreate}
          onClose={handleCloseCreate}
        />
      )}

      {isOpenInfo && (
        <VersionCheckInfo
          checkId={checkId || ""}
          open={isOpenInfo}
          onClose={handleCloseInfo}
        />
      )}
    </>
  )
}

export default VersionsTable