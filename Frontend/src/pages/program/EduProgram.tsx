import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Field,
  HStack,
  Input,
  NativeSelect,
  VStack,
  Text,
  Icon,
  Grid,
  GridItem,
  Badge,
  ActionBar,
  Portal,
} from "@chakra-ui/react"
import { MdWork, MdPerson, MdCalendarToday, MdCategory, MdInfo } from "react-icons/md";
import { useEffect, useState } from "react";
import { type EduProgramDTO } from "@/api/models";
import { GetStatusTypeName } from './../../utils/TextUtils';
import { useDirectionsStore } from "@/stores/DirectionsStore";
import { useTeacherProgramsStore } from "@/stores/TeacherProgramsStore";
import VersionsTable from "./VersionsTable";
import PageLoading from "@/components/common/PageLoading";

const EduProgram = () => {
  const { id } = useParams();
  const { fetch, items: directions } = useDirectionsStore()
  const { fetchProgram, programs, updateProgram } = useTeacherProgramsStore()

  const [openAccordion, setOpenAccordion] = useState<boolean>(true)

  const programFromStore = id ? programs[id] : undefined
  
  const [localFormData, setLocalFormData] = useState<EduProgramDTO | undefined>()

  useEffect(() => {
    if (programFromStore) {
      setLocalFormData(programFromStore)
    }
  }, [programFromStore?.id, programFromStore?.name, programFromStore?.directionId]) 

  useEffect(() => {
    const loadProgram = async () => {
      if (id && !programFromStore) {
        await fetchProgram(id)
      }
      fetch()
    };
    loadProgram();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFormData(prev => prev ? { ...prev, [name]: value } : undefined)
  };

  const handleSave = async () => {
    if (localFormData) {
      await updateProgram({
        agesOfChildrens: localFormData.agesOfChildrens,
        directionId: localFormData.directionId || "",
        duration: localFormData.duration,
        name: localFormData.name,
        programId: localFormData.id
      })
    }
  }

  const handleChangeCreatePage = (stat: boolean) => {
    setOpenAccordion(stat)
  }

  if (!programFromStore) return <PageLoading />

  return (
    <Box  bg="gray.50">
      <Container maxW="container.lg" py={2}>
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
            Информация
          </Text>
          {/* <Spacer /> */}
        </HStack>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            p={6}
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s ease"
          >
            <VStack gap={6} align="stretch">
              <Grid templateColumns="120px 1fr" gap={6}>
                <GridItem>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdInfo} color="blue.500" boxSize="16px" />
                      Статус
                    </Field.Label>
                    <Badge
                      colorScheme="blue"
                      fontSize="14px"
                      borderRadius="full"
                      px={4}
                      py={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      w="full"
                      minH="40px"
                    >
                      {programFromStore?.programStatus != undefined && GetStatusTypeName(programFromStore.programStatus)}
                    </Badge>
                  </Field.Root>
                </GridItem>

                <GridItem>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdWork} color="blue.500" boxSize="16px" />
                      Название программы
                    </Field.Label>
                    <Input
                      name="name"
                      onChange={handleChange}
                      placeholder="Введите название программы"
                      size="lg"
                      fontSize="16px"
                      value={localFormData?.name || ""}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182CE"
                      }}
                    />
                  </Field.Root>
                </GridItem>
              </Grid>

                <Grid templateColumns="120px 1fr 1fr 1fr" gap={6}>
                 <GridItem>
                  <Field.Root>
                     <Field.Label display="flex" alignItems="center" gap={2}>
                       <Icon as={MdCalendarToday} color="blue.500" boxSize="16px" />
                       Учебный год
                     </Field.Label>
                     <Input
                      name="year"
                      value={localFormData?.year || ""}
                      readOnly
                      // disabled
                      bg="gray.50"
                      _disabled={{
                        opacity: 0.8,
                        cursor: "not-allowed"
                      }}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182CE"
                      }}
                    />
                  </Field.Root>
                </GridItem>

                <GridItem>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdCategory} color="blue.500" boxSize="16px" />
                      Направление
                    </Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182CE"
                        }}
                        value={localFormData?.directionId || ''}
                        onChange={(e) => setLocalFormData({ ...localFormData, directionId: e.currentTarget.value })}
                      >
                        {directions.map((direction) => (
                          <option key={direction.id} value={direction.id}>{direction.name}</option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </GridItem>

                <GridItem>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdPerson} color="blue.500" boxSize="16px" />
                      Возраст учащихся
                    </Field.Label>
                    <Input
                      name="agesOfChildrens"
                      placeholder="Например: 8-15 лет"
                      onChange={handleChange}
                      value={localFormData?.agesOfChildrens || ""}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182CE"
                      }}
                    />
                  </Field.Root>
                </GridItem>

                <GridItem>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdCalendarToday} color="blue.500" boxSize="16px" />
                      Срок реализации
                    </Field.Label>
                    <Input
                      name="duration"
                      placeholder="Например: 3 года"
                      onChange={handleChange}
                      value={localFormData?.duration || ""}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182CE"
                      }}
                    />
                  </Field.Root>
                </GridItem>
              </Grid>
            </VStack>
          </Box>
        </VStack>
      </Container>

      <VersionsTable programId={id} onChangeCreatePage={handleChangeCreatePage} />

      <ActionBar.Root open={openAccordion} placement={"bottom"}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <Button variant="outline" size="sm" onClick={handleSave}>
                Сохранить информацию
              </Button>
              <ActionBar.Separator />
              <Button variant="outline" size="sm">
                Отправить на проверку
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </Box>
  )
}

export default EduProgram