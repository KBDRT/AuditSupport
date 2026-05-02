import { Button, Box, Container, HStack, VStack, Text, Icon, Table, Spacer, Badge } from "@chakra-ui/react"
import { MdInfo, MdDownload, MdVisibility, MdPreview, MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import VersionCreate from "./VersionCreate";
import { FixDialog } from "@/utils/DialogFix";
import { FormatDateTime } from './../../utils/TextUtils';
import VersionCheckInfo from "./VersionCheckInfo";
import PreviewProgramFile from "./PreviewProgramFile";
import { useProgramStore } from "@/stores/ProgramStore";

const DialogName = {
  None: 0,
  CreateVersion: 1,
  VersionCheckInfo: 2,
  PreviewVersionFile: 3,
} as const;

type DialogName = typeof DialogName[keyof typeof DialogName];


const VersionsTable = ({ programId, onChangeCreatePage }: { programId?: string, onChangeCreatePage: (stat: boolean) => void }) => {
  const { fetchProgram, program: programFromStore, downloadVersionFile, setSelectedVersion, selectedVersion } = useProgramStore()
  const program = programId ? programFromStore : undefined
  const versions = program?.versions || []
  const [openedDialog, setOpenedDialog] = useState<DialogName>(DialogName.None)
  const [dialogId, setDialogId] = useState<string>()

  useEffect(() => {
    const loadProgram = async () => {
      if (programId && !program) {
        await fetchProgram(programId)
      }
    };
    loadProgram();
  }, [programId]);


  const handleCloseDialog = () => {
    onChangeCreatePage(true)
    setOpenedDialog(DialogName.None);
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
              onClick={() => {setOpenedDialog(DialogName.CreateVersion); onChangeCreatePage(false)}}
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
            <Table.ScrollArea borderWidth="1px" rounded="md" maxH="480px">
            <Table.Root size="sm" interactive variant="outline" w="100%" borderWidth="0" showColumnBorder stickyHeader>
              <Table.Header>
                <Table.Row bg="gray.50">
                  <Table.ColumnHeader w="60px" textAlign="center">№ п/п</Table.ColumnHeader>
                  <Table.ColumnHeader w="150px">Дата и время создания</Table.ColumnHeader>
                  <Table.ColumnHeader>Комментарий</Table.ColumnHeader>
                  <Table.ColumnHeader w="200px" textAlign="center">Файл</Table.ColumnHeader>
                  <Table.ColumnHeader w="180px" textAlign="center">Статус тех. проверки</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

            {versions.length === 0 ? (
            <Table.Body>
              <Table.Row>
                <Table.Cell colSpan={5} textAlign="center" color="gray.500" h="200px">
                  Нет данных
                </Table.Cell>
              </Table.Row>
            </Table.Body>) : 
              <Table.Body>
                {versions.map((version, index) => (
                  <Table.Row 
                    bg={selectedVersion?.id === version.id ? "blue.100" : undefined}
                    _hover={{ bg: "gray.50" }} 
                    style={{ cursor: "pointer" }} 
                    // transition="all 0.2s" 
                    key={version.id} 
                    onClick={() => {setSelectedVersion(version); 
                  }}>
                    <Table.Cell textAlign="center" fontWeight="500">{index + 1}</Table.Cell>
                    <Table.Cell>{FormatDateTime(version.createdDate || "")}</Table.Cell>
                    <Table.Cell color="gray.600">{version.changes || "—"}</Table.Cell>
                    <Table.Cell>
                      <HStack gap={2} justify="center">
                        <Button
                          variant="ghost"
                          size="xs"
                          colorPalette="blue"
                          onClick={() => handleDownloadFile(version.id || "")}
                        >
                          <HStack gap={1}>
                            <Icon as={MdDownload} boxSize="14px" />
                            <Text fontSize="12px">Скачать</Text>
                          </HStack>
                        </Button>
                        <Button variant="ghost" size="xs" colorPalette="gray" onClick={() => {setDialogId(version.id || ""); setOpenedDialog(DialogName.PreviewVersionFile); onChangeCreatePage(false)}}>
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
                        <Button variant="ghost" size="xs" colorPalette="gray" onClick={() => {setDialogId(version.techCheckId); setOpenedDialog(DialogName.VersionCheckInfo); onChangeCreatePage(false)}}>
                          <HStack gap={1}>
                            <Icon as={MdVisibility} boxSize="14px" />
                            <Text fontSize="12px">Результат</Text>
                          </HStack>
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body> }
            </Table.Root>
            </Table.ScrollArea>
          </Box>
        </VStack>
      </Container>

      {openedDialog == DialogName.CreateVersion && (
        <VersionCreate
          programId={programId || ""}
          onClose={handleCloseDialog}
        />
      )}

      {openedDialog == DialogName.VersionCheckInfo && (
        <VersionCheckInfo
          checkId={dialogId || ""}
          onClose={handleCloseDialog}
        />
      )}

      {openedDialog == DialogName.PreviewVersionFile && (
        <PreviewProgramFile  
          versionId={dialogId || ""}
          onClose={handleCloseDialog}/>
      )}
    </>
  )
}

export default VersionsTable